import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { LLM_PROVIDER } from '../src/ai-actions/llm/llm-provider';
import { AppModule } from '../src/app.module';
import { FlagsService } from '../src/flags/flags.service';
import { PrismaService } from '../src/prisma/prisma.service';

const PATIENT_ID = '11111111-1111-4111-8111-111111111111';

describe('AI actions (e2e)', () => {
  let app: INestApplication;
  const llm = {
    completeJson: jest.fn(),
  };
  const flagsService = {
    list: jest.fn(),
    isEnabled: jest.fn(),
  };
  const prisma = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .overrideProvider(FlagsService)
      .useValue(flagsService)
      .overrideProvider(LLM_PROVIDER)
      .useValue(llm)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1', {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    flagsService.isEnabled.mockReset();
    llm.completeJson.mockReset();
  });

  it('POST /v1/patients/:id/ai-actions returns 403 and skips the LLM when the kill switch is off', async () => {
    flagsService.isEnabled.mockResolvedValue(false);

    await request(app.getHttpServer())
      .post(`/v1/patients/${PATIENT_ID}/ai-actions`)
      .expect(403)
      .expect((res) => {
        expect(res.body.code).toBe('AI_DISABLED');
      });

    expect(llm.completeJson).not.toHaveBeenCalled();
  });

  it('POST /v1/patients/:id/ai-actions returns 400 for an invalid id', async () => {
    await request(app.getHttpServer())
      .post('/v1/patients/not-a-uuid/ai-actions')
      .expect(400);

    expect(llm.completeJson).not.toHaveBeenCalled();
  });
});

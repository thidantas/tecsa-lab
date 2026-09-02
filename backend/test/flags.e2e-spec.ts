import { RequestMethod } from '@nestjs/common';
import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Flags (e2e)', () => {
  let app: INestApplication;
  const prisma = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    featureFlag: {
      findMany: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1', {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /v1/flags is fail-closed when ai_actions is missing', async () => {
    prisma.featureFlag.findMany.mockResolvedValue([]);

    await request(app.getHttpServer())
      .get('/v1/flags')
      .expect(200)
      .expect({ flags: { ai_actions: false } });
  });

  it('GET /v1/flags returns the stored kill switch', async () => {
    prisma.featureFlag.findMany.mockResolvedValue([
      { key: 'ai_actions', enabled: true },
    ]);

    await request(app.getHttpServer())
      .get('/v1/flags')
      .expect(200)
      .expect({ flags: { ai_actions: true } });
  });
});

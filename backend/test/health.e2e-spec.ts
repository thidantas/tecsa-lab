import { RequestMethod } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { type INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Health (e2e)', () => {
  let app: INestApplication;
  const prisma = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $queryRaw: jest.fn(),
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

  it('GET /health returns 200 when the database is up', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok', database: 'up' });
  });

  it('GET /health returns 503 when the database is down', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('down'));

    await request(app.getHttpServer())
      .get('/health')
      .expect(503)
      .expect((res) => {
        expect(res.body.status).toBe('error');
        expect(res.body.database).toBe('down');
      });
  });
});

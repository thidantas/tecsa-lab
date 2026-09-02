import { ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HealthService', () => {
  const prisma = {
    $queryRaw: jest.fn(),
  };
  const service = new HealthService(prisma as unknown as PrismaService);

  beforeEach(() => {
    prisma.$queryRaw.mockReset();
  });

  it('returns ok when the database answers', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await expect(service.getStatus()).resolves.toEqual({
      status: 'ok',
      database: 'up',
    });
  });

  it('throws 503 when the database is down', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('connection refused'));

    await expect(service.getStatus()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});

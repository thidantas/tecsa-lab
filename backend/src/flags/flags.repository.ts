import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlagsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.featureFlag.findMany({
      orderBy: { key: 'asc' },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(search?: string) {
    return this.prisma.patient.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        birthDate: true,
        sex: true,
      },
    });
  }

  findById(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: {
        biomarkers: { orderBy: { measuredAt: 'desc' } },
      },
    });
  }
}

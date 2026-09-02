import { Module } from '@nestjs/common';
import { FlagsModule } from './flags/flags.module';
import { HealthModule } from './health/health.module';
import { PatientsModule } from './patients/patients.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, PatientsModule, FlagsModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FlagsController } from './flags.controller';
import { FlagsRepository } from './flags.repository';
import { FlagsService } from './flags.service';

@Module({
  controllers: [FlagsController],
  providers: [FlagsService, FlagsRepository],
  exports: [FlagsService],
})
export class FlagsModule {}

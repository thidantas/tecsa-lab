import { Injectable } from '@nestjs/common';
import { FlagsRepository } from './flags.repository';

@Injectable()
export class FlagsService {
  constructor(private readonly flagsRepository: FlagsRepository) {}

  async list() {
    const rows = await this.flagsRepository.findAll();
    const flags: Record<string, boolean> = { ai_actions: false };

    for (const flag of rows) {
      flags[flag.key] = flag.enabled;
    }

    return { flags };
  }
}

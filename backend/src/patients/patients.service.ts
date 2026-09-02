import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientsRepository } from './patients.repository';

@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  list(search?: string) {
    return this.patientsRepository.findMany(search);
  }

  async getById(id: string) {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new NotFoundException(`Patient ${id} not found`);
    }

    return patient;
  }
}

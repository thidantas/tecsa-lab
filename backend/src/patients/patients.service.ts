import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientNotesDto } from './dto/update-patient-notes.dto';
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

  async updateNotes(id: string, dto: UpdatePatientNotesDto) {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new NotFoundException(`Patient ${id} not found`);
    }

    return this.patientsRepository.updateNotes(id, dto.notes.trim() || null);
  }
}

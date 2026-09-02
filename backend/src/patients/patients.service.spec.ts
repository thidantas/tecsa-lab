import { NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsRepository } from './patients.repository';

const patient = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'Ana Almeida',
  birthDate: new Date('1990-01-15'),
  sex: 'F',
  notes: 'retorno',
  biomarkers: [],
};

describe('PatientsService', () => {
  const patientsRepository = {
    findMany: jest.fn(),
    findById: jest.fn(),
    updateNotes: jest.fn(),
  };
  const service = new PatientsService(
    patientsRepository as unknown as PatientsRepository,
  );

  beforeEach(() => {
    patientsRepository.findMany.mockReset();
    patientsRepository.findById.mockReset();
    patientsRepository.updateNotes.mockReset();
  });

  it('lists through the repository', async () => {
    patientsRepository.findMany.mockResolvedValue([patient]);

    await expect(service.list('Ana')).resolves.toEqual([patient]);
    expect(patientsRepository.findMany).toHaveBeenCalledWith('Ana');
  });

  it('throws when the patient does not exist', async () => {
    patientsRepository.findById.mockResolvedValue(null);

    await expect(service.getById(patient.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('trims empty notes to null', async () => {
    patientsRepository.findById.mockResolvedValue(patient);
    patientsRepository.updateNotes.mockResolvedValue({ ...patient, notes: null });

    await service.updateNotes(patient.id, { notes: '   ' });

    expect(patientsRepository.updateNotes).toHaveBeenCalledWith(
      patient.id,
      null,
    );
  });
});

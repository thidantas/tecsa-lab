import type { PatientsRepository } from '@/domain/repositories/PatientsRepository';
import type { ListPatientsQuery } from '@/domain/models/patients';

import type {
  PatientDetailDto,
  PatientListItemDto,
} from '../../adapters/patients/patientDto';
import { toPatientDetail, toPatientListItem } from '../../adapters/patients/toPatient';
import type { HttpClient } from '../../api/HttpClient';

export function createTecsaNestPatientsRepository(
  http: HttpClient,
): PatientsRepository {
  return {
    async list(query?: ListPatientsQuery) {
      const dto = await http.get<PatientListItemDto[]>('/v1/patients', {
        params: query?.search ? { search: query.search } : undefined,
      });

      return dto.map(toPatientListItem);
    },
    async getById(id: string) {
      const dto = await http.get<PatientDetailDto>(`/v1/patients/${id}`);
      return toPatientDetail(dto);
    },
  };
}

import type {
  ListPatientsQuery,
  PatientDetail,
  PatientListItem,
} from '../models/patients';

export type PatientsRepository = {
  list(query?: ListPatientsQuery): Promise<PatientListItem[]>;
  getById(id: string): Promise<PatientDetail>;
};

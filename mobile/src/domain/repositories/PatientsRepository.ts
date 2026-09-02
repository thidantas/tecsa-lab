import type {
  ListPatientsQuery,
  PatientDetail,
  PatientListItem,
} from '../models/patients';

export type PatientsRepository = {
  list(query?: ListPatientsQuery): Promise<PatientListItem[]>;
  getById(id: string): Promise<PatientDetail>;
  updateNotes(id: string, notes: string): Promise<PatientDetail>;
};

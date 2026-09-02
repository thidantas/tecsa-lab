export type PatientListItem = {
  id: string;
  name: string;
  birthDate: string;
  sex: string | null;
};

export type Biomarker = {
  id: string;
  patientId: string;
  name: string;
  value: number;
  unit: string;
  measuredAt: string;
  refLow: number | null;
  refHigh: number | null;
};

export type PatientDetail = PatientListItem & {
  notes: string | null;
  createdAt: string;
  biomarkers: Biomarker[];
};

export type ListPatientsQuery = {
  search?: string;
};

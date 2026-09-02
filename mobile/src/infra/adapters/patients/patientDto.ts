export type PatientListItemDto = {
  id: string;
  name: string;
  birthDate: string;
  sex?: string | null;
};

export type BiomarkerDto = {
  id: string;
  patientId: string;
  name: string;
  value: number;
  unit: string;
  measuredAt: string;
  refLow?: number | null;
  refHigh?: number | null;
};

export type PatientDetailDto = PatientListItemDto & {
  notes?: string | null;
  createdAt: string;
  biomarkers: BiomarkerDto[];
};

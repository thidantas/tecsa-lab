import type {
  Biomarker,
  PatientDetail,
  PatientListItem,
} from '@/domain/models/patients';

import type { BiomarkerDto, PatientDetailDto, PatientListItemDto } from './patientDto';

function toIsoDate(value: string) {
  return value;
}

export function toPatientListItem(dto: PatientListItemDto): PatientListItem {
  return {
    id: dto.id,
    name: dto.name,
    birthDate: toIsoDate(dto.birthDate),
    sex: dto.sex ?? null,
  };
}

export function toBiomarker(dto: BiomarkerDto): Biomarker {
  return {
    id: dto.id,
    patientId: dto.patientId,
    name: dto.name,
    value: dto.value,
    unit: dto.unit,
    measuredAt: toIsoDate(dto.measuredAt),
    refLow: dto.refLow ?? null,
    refHigh: dto.refHigh ?? null,
  };
}

export function toPatientDetail(dto: PatientDetailDto): PatientDetail {
  return {
    ...toPatientListItem(dto),
    notes: dto.notes ?? null,
    createdAt: toIsoDate(dto.createdAt),
    biomarkers: dto.biomarkers.map(toBiomarker),
  };
}

import type { AiAction } from '@/domain/models/aiActions';
import type { FeatureFlags } from '@/domain/models/flags';
import type { PatientDetail, PatientListItem } from '@/domain/models/patients';

export const patientList: PatientListItem[] = [
  {
    id: 'patient-ana',
    name: 'Ana Almeida',
    birthDate: '1988-03-12',
    sex: 'F',
  },
  {
    id: 'patient-bruno',
    name: 'Bruno Costa',
    birthDate: '1979-11-02',
    sex: 'M',
  },
];

export const patientDetail: PatientDetail = {
  ...patientList[0],
  notes: null,
  createdAt: '2026-08-01T00:00:00.000Z',
  biomarkers: [],
};

export const aiActions: AiAction[] = [
  {
    title: 'Revisar glicemia de jejum',
    reason: 'O valor está no limite da faixa de referência.',
    recommendation: 'Combinar horário da coleta na próxima consulta.',
  },
  {
    title: 'Acompanhar vitamina D',
    reason: 'Reposição só faz sentido com o contexto alimentar.',
    recommendation: 'Checar exposição solar antes de suplementar.',
  },
  {
    title: 'Pesar de novo em 4 semanas',
    reason: 'Uma medida isolada não mostra tendência.',
    recommendation: 'Agendar retorno com o mesmo protocolo de pesagem.',
  },
];

export const flagsOn: FeatureFlags = { aiActions: true };
export const flagsOff: FeatureFlags = { aiActions: false };

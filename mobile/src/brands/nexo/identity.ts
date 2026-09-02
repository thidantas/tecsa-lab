import type { BrandIdentity } from '@/core/brand/types';

export const nexoIdentity: BrandIdentity = {
  id: 'nexo',
  logo: {
    wordmark: 'nexo',
    monogram: 'n',
  },
  copy: {
    appName: 'nexo',
    homeTitle: 'nexo',
    homeSubtitle: 'O que exige ação agora.',
    patientsTitle: 'Caseload',
    patientDetailTitle: 'Registro',
    patientDetailPlaceholder: 'Painel do paciente entra depois do contrato da API.',
    patientsEmpty: 'Nenhum registro na carteira.',
    healthCardTitle: 'Status da API',
    aiActionsLabel: 'Alertas clínicos',
    aiActionsHint: 'O que exige ação a partir dos exames.',
    aiActionsGenerate: 'Gerar alertas',
    patientUnlockTitle: 'Registro protegido',
    patientUnlockSubtitle: 'Confirme para ver biomarcadores e notas.',
    patientUnlockAction: 'Desbloquear',
    patientUnlockCancel: 'Cancelar',
    patientUnlockPrompt: 'Desbloquear o registro',
    patientUnlockError: 'Falha na confirmação. Tente de novo.',
    patientNotesLabel: 'Notas clínicas',
    patientNotesSave: 'Registrar',
    patientNotesPlaceholder: 'O que exige acompanhamento',
    patientNotesError: 'Falha ao registrar. Reconecte e tente de novo.',
  },
};

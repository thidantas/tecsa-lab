import type { BrandIdentity } from '@/core/brand/types';

export const vitaIdentity: BrandIdentity = {
  id: 'vita',
  logo: {
    wordmark: 'vita',
    monogram: 'v',
  },
  copy: {
    appName: 'vita',
    homeTitle: 'vita',
    homeSubtitle: 'Vamos ver juntos o ritmo do consultório.',
    patientsTitle: 'Carteira',
    patientDetailTitle: 'Paciente',
    patientDetailPlaceholder: 'Detalhe da carteira entra depois do contrato da API.',
    patientsEmpty: 'Nenhum paciente por aqui ainda.',
    healthCardTitle: 'Conexão com o lab',
    aiActionsLabel: 'Sugestões de hábito',
    aiActionsHint: 'A partir do que medimos nesta consulta.',
    aiActionsGenerate: 'Gerar sugestões',
    patientUnlockTitle: 'Vamos ver juntos',
    patientUnlockSubtitle: 'Confirme para abrir biomarcadores e anotações.',
    patientUnlockAction: 'Desbloquear',
    patientUnlockCancel: 'Agora não',
    patientUnlockPrompt: 'Desbloquear o paciente',
    patientUnlockError: 'Não deu para confirmar. Tente de novo.',
    patientNotesLabel: 'Anotações',
    patientNotesSave: 'Salvar',
    patientNotesPlaceholder: 'O que vimos nesta consulta',
    patientNotesError: 'Não deu para salvar. Tente de novo com rede.',
  },
};

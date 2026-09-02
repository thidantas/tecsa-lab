type PromptPatient = {
  name: string;
  birthDate: Date;
  sex: string | null;
  notes: string | null;
  biomarkers: Array<{
    name: string;
    value: number;
    unit: string;
    measuredAt: Date;
    refLow: number | null;
    refHigh: number | null;
  }>;
};

function ageYears(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();

  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

export const AI_ACTIONS_SYSTEM_PROMPT = `Você é um assistente de um nutricionista.
Gere de 3 a 5 ações estruturadas a partir dos biomarcadores.
Não faça diagnóstico médico nem conversa livre.
Responda APENAS com JSON no formato:
{"actions":[{"title":"string","reason":"string","recommendation":"string"}]}
title: ação curta. reason: por que importa neste registro. recommendation: o que o nutricionista pode fazer agora.`;

export function buildAiActionsUserPrompt(patient: PromptPatient) {
  const markers =
    patient.biomarkers.length === 0
      ? 'Nenhum biomarcador neste registro.'
      : patient.biomarkers
          .map((marker) => {
            const range =
              marker.refLow != null && marker.refHigh != null
                ? `ref ${marker.refLow}–${marker.refHigh}`
                : 'sem faixa';
            return `- ${marker.name}: ${marker.value} ${marker.unit} (${range}; ${marker.measuredAt.toISOString().slice(0, 10)})`;
          })
          .join('\n');

  return [
    `Paciente: ${patient.name}`,
    `Idade aproximada: ${ageYears(patient.birthDate)}`,
    `Sexo: ${patient.sex ?? 'não informado'}`,
    `Notas: ${patient.notes?.trim() || 'nenhuma'}`,
    'Biomarcadores:',
    markers,
  ].join('\n');
}

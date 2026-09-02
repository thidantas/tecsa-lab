import type { AiActionsRepository } from '@/domain/repositories/AiActionsRepository';

export function createInMemoryAiActionsRepository(): AiActionsRepository {
  return {
    generate() {
      return Promise.resolve([
        {
          title: 'Revisar glicemia de jejum',
          reason: 'O valor está no limite da faixa de referência.',
          recommendation: 'Combinar horário da coleta e último lanche na próxima consulta.',
        },
        {
          title: 'Acompanhar vitamina D',
          reason: 'Reposição só faz sentido com o contexto alimentar.',
          recommendation: 'Checar exposição solar e fontes alimentares antes de suplementar.',
        },
        {
          title: 'Pesar de novo em 4 semanas',
          reason: 'Uma medida isolada não mostra tendência.',
          recommendation: 'Agendar retorno com o mesmo protocolo de pesagem.',
        },
      ]);
    },
  };
}

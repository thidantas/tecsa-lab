# Tecsa Lab — contexto do agente

Índice da documentação: [`docs/README.md`](docs/README.md).

Leia nesta ordem antes de implementar:

1. [`docs/brief.md`](docs/brief.md) — enunciado (1º de setembro de 2026, 14h)
2. [`docs/adr/001-stack-e-arquitetura.md`](docs/adr/001-stack-e-arquitetura.md) — stack fechada
3. [`docs/escopo.md`](docs/escopo.md) — epic, stories, tasks

## Próximo trabalho

**US-05** — carteira (FlashList, quatro estados, detalhe). Domain (repository + operations) e infra HTTP estão feitos.

## Restrições (do enunciado)

- Core desacoplado da marca; TypeScript em todo o JS
- Controller só valida; Service tem negócio e LLM; Repository acessa o banco
- Lista virtualizada; quatro estados de UI; flags com kill switch de IA
- Chave de LLM só em env, nunca no git
- `docker compose up` sobe API na **9000** + banco

## Nunca

Marca no core; regra de negócio no Controller; JS sem TypeScript; secret de LLM no commit; sem testes; lista sem virtualização.

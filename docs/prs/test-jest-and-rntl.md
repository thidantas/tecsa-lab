# test/jest-and-rntl

Labels: `test` + `api` + `mobile`

## Summary

Este PR fecha os testes da entrega: Jest no Nest (Services + e2e) e Jest + RNTL no app, com a mesma camada `test-utils` do digital-nomad-app (`renderComponent`, `renderApp`, mocks de repository). Cobre o que é sensível — kill switch, flags fail-closed, LLM sem chave, busca da carteira e os quatro estados de UI. Sem secret no git.

### Backend

`npm test` nos Services; `npm run test:e2e` sobe a app Nest com Prisma stubado (sem Docker).

- Flag `ai_actions` off → `POST /v1/patients/:id/ai-actions` 403 (`AI_DISABLED`) e o `LlmProvider` não é chamado
- Sem `OPENAI_API_KEY` → 503 e `fetch` não dispara
- `GET /v1/flags` fail-closed quando a tabela está vazia
- Health 200 / 503 conforme o banco

### App

Scripts iguais ao nomad: `test`, `test:watch`, `test:watch:all`, `test:coverage`, `typecheck`.

- `src/test-utils` — harness, fixtures e doubles
- Unitário: brand resolver, tema, flags, SearchField, Button, QueryState
- Integração: carteira (lista, filtro, vazio) e card de IA (some com flag off; gera 3 ações; 403 usa o copy de desligado)

## Test plan

- [ ] `cd backend && npm test` passa
- [ ] `cd backend && npm run test:e2e` passa
- [ ] `cd mobile && npm test` passa
- [ ] `cd mobile && npm run typecheck` passa
- [ ] Flag off no e2e: POST de AI → 403 e o mock do LLM não é chamado
- [ ] Sem chave: unitário do `OpenAiLlmProvider` não chama `fetch`
- [ ] Carteira: busca `bruno` esconde Ana; `xyz` mostra vazio
- [ ] Card de IA some com kill switch off
- [ ] `mobile/.env` e chave de LLM não estão no git

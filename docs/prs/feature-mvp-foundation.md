# feature/mvp-foundation

Labels: `feat` + `api` + `mobile`

## Summary

Este PR entrega o domínio da carteira no Nest, duas identidades visuais no mesmo app Expo e uma camada tipada no mobile para consumir a API sem a UI conhecer Axios nem o backend.

### Backend (Nest, porta 9000)

Prefixo global `v1`, exceto `GET /health`. Controller só valida; Service aplica regra; Repository fala com o Prisma.

**Modelo**

- `Patient` — `id`, `name`, `birthDate`, `sex`, `notes`
- `Biomarker` — `name`, `value`, `unit`, `measuredAt`, `refLow`, `refHigh` (ligado ao paciente)
- `FeatureFlag` — `key` + `enabled` (`ai_actions` no seed)

**Rotas**

| Método | Path | Comportamento |
| --- | --- | --- |
| `GET` | `/health` | `{ status, database }` |
| `GET` | `/v1/patients` | lista (`id`, `name`, `birthDate`, `sex`); `?search=` filtra nome (case-insensitive, máx. 80) |
| `GET` | `/v1/patients/:id` | detalhe com biomarcadores e notas; UUID inválido ou ausente → 404 |
| `GET` | `/v1/flags` | `{ flags: { ai_actions } }` |

Seed: 200 pacientes + labs (glicose, HbA1c, vitamina D, peso) se a tabela estiver vazia.

### Mobile — duas marcas, um core

`brandId` (`vita` \| `nexo`) resolve tema + identity. Telas usam tokens (`background`, `accent`, `borderRadii.default`) e `identity.copy`. Sem hex de marca em `StyleSheet` e sem `if (vita)` em tela.

| | vita | nexo |
| --- | --- | --- |
| Papel | consultório de hábito | clínica de biomarcadores |
| Fundo / accent | cream `#FAFAF5` / sage `#2F5D50` | slate `#F4F6F8` / dusty blue `#4A7C96` |
| Raio (`default`) | 16 | 8 |
| Logo | mark SVG do broto + wordmark | mark SVG do nó + wordmark |
| Copy | “Vamos ver juntos…”, Carteira, Sugestões de hábito | “O que exige ação agora.”, Caseload, Alertas clínicos |

Primitivos novos: `Box`, `Text`, `Card`, `Button`, `BrandLogo`, ícones SVG. Fonte Poppins. A marca default do binário vem do ambiente local, sem secret no repositório.

### Mobile — domain e infra

A UI não importa o client. Fluxo: **tela → operation (TanStack Query) → interface de repository → implementação na infra**.

```
src/domain
  models/           Patient, Biomarker, HealthStatus
  repositories/     HealthRepository, PatientsRepository (só contrato)
  operations/       useHealthQuery, usePatientsQuery, usePatientQuery

src/infra
  api/              Axios, base URL, ApiError
  adapters/         DTO do Nest → model do domain
  repositories/
    tecsaNestApi/   HTTP real (9000)
    inMemoryApi/    fixture local
  profiles/         escolhe o backend e injeta no RepositoriesProvider
```

O perfil de backend (Nest ou memória) e a URL da API ficam só no ambiente local. `.env` não entra no git; `.env.example` tem placeholders, sem credencial.

A home já usa `useHealthQuery` (pending / success / error). `usePatientsQuery` e `usePatientQuery` existem; a lista virtualizada ainda não.

## Test plan

- [ ] `docker compose up` sobe API + Postgres; [health](http://localhost:9000/health) responde `ok` / `up`
- [ ] `GET /v1/patients` lista pacientes; `?search=` filtra por nome
- [ ] `GET /v1/patients/:id` devolve biomarcadores e notas; id inexistente → 404
- [ ] `GET /v1/flags` inclui `ai_actions`
- [ ] `cd mobile && npx tsc --noEmit` passa
- [ ] Home mostra `status: ok · database: up` com a API no ar
- [ ] Home mostra erro se a API estiver down
- [ ] Trocar a marca no ambiente local muda fundo, accent, raio, logo e copy (restart do Expo)
- [ ] `mobile/.env` não está no git; `.env.example` não contém secret

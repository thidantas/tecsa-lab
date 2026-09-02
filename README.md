# Tecsa Lab

MVP white-label de saúde: **um core Expo**, duas marcas (**vita** / **nexo**), fatia vertical do app do nutricionista — carteira, biomarcadores, notas e ações de IA.

O core não importa marca. Telas falam com operations e interfaces de repository. Chave de LLM só em env, nunca no git.

Docs: [`docs/README.md`](docs/README.md). Enunciado: [`docs/brief.md`](docs/brief.md). Escopo: [`docs/escopo.md`](docs/escopo.md). ADRs: [`docs/decisoes.md`](docs/decisoes.md).

## Subir

```bash
cp .env.example .env
docker compose up --build
```

- API: [http://localhost:9000](http://localhost:9000)
- Health: [http://localhost:9000/health](http://localhost:9000/health)
- Pacientes: [http://localhost:9000/v1/patients](http://localhost:9000/v1/patients) (`?search=` opcional); detalhe `GET /v1/patients/:id`; notas `PATCH /v1/patients/:id`
- Flags: [http://localhost:9000/v1/flags](http://localhost:9000/v1/flags) (`ai_actions` = kill switch)
- IA: `POST /v1/patients/:id/ai-actions` — 3–5 itens; flag off → 403 **sem** chamar o LLM
- Postgres no host: `localhost:5433` (user/senha/db `tecsa`)

```bash
cd mobile
cp .env.example .env
npm start
```

Web: `npm run web`. Emulador Android usa `http://10.0.2.2:9000` se `EXPO_PUBLIC_API_URL` estiver vazio. Marca do binário: `EXPO_PUBLIC_BRAND=vita|nexo` (splash nativa muda no restart/prebuild). Perfil default `hybrid`: Nest + SQLite; geração de IA é fixture local (sem token). LLM de verdade: `EXPO_PUBLIC_API_PROFILE=tecsaNest` + `OPENAI_API_KEY` no `.env` do host + API rebuildada.

API local sem Docker da API (Postgres no Compose):

```bash
docker compose up postgres -d
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```

## Testes

```bash
cd backend && npm test && npm run test:e2e
cd mobile && npm test && npm run typecheck
```

## Decisões

Detalhe nas ADRs. Aqui é o que a banca precisa defender sem abrir o código.

| Tema | Escolha | Por quê |
| --- | --- | --- |
| Backend | NestJS + Prisma + PostgreSQL | Enunciado pede Controller / Service / Repository. Prisma fica **atrás** do repo. Porta **9000** no Compose. |
| Mobile | Expo + TypeScript + Restyle | Obrigatório. Tokens tipados; sem Material / Carbon / NativeBase. |
| White-label | `src/brands` + `BrandProvider` | Core usa tokens e `identity.copy`. Hex de marca não mora em `StyleSheet`. Produção: `EXPO_PUBLIC_BRAND`. Switch na home é **só demonstração** para o vídeo. |
| Estado servidor | TanStack Query | Cache, retry, optimistic update das notas. Casa com offline. |
| Estado de marca | `BrandProvider` (React state) | Um `brandId`. Store extra (Zustand estava no ADR) não se justifica para um enum e um switch de demo. |
| Navegação | Expo Router | File-based; deep link `/patients/[id]`. Home sem header do Stack (`safeTop` no `Screen`). |
| Lista | FlashList | Virtualização (~200 no seed). Red flag se faltasse. |
| Offline | Perfil `hybrid` + SQLite | Nest primeiro; cache do que já abriu. Sem rede, lê SQLite. Nota só persiste com `PATCH`; a UI atualiza na hora e faz rollback se falhar. |
| Flags | `GET /v1/flags` próprio | Sem LaunchDarkly. Fail-closed: só gera se `ai_actions === true`. Offline usa o último valor no SQLite. |
| IA | `LlmProvider` + JSON 3–5 | Sem chat. Service lê a flag **antes** do provider. Sem chave → 503, sem `fetch`. Hybrid não gasta token. |
| Nativo | Biometria no detalhe | App do **nutricionista**. HealthKit no aparelho dele não é produto. Sem sensor, o gate abre (web/emulador). |
| OTA | `expo-updates` (EAS Update) | O enunciado pede OTA de **bundle JS**. Mesmo binário white-label recebe tela, copy e cliente de flag sem store. Nativo (biometria, SQLite, splash) não vai por OTA. Publicar update é opcional; sem projeto EAS o app ignora o check. |
| Testes | Jest Nest + Jest/RNTL | Services e e2e do kill switch; no app, `test-utils` (`renderComponent` / `renderApp`), brand resolver, busca e card de IA. |

### Arquitetura em uma frase

UI → operation (TanStack) → interface de repository → infra (perfil `hybrid` | `tecsaNest` | `inMemory`). Controller só valida. Service tem negócio e LLM. Repository acessa o banco.

### O que ficou de fora

Auth, HealthKit, LaunchDarkly, chat de LLM, segundo backend, UI kit pronto. Nutricionista único via seed.

## Relatório de uso de IA

O desafio pede este relatório no README. Trabalhei com o agente do Cursor (orquestração de arquivos, diffs e testes). Eu fechei produto, ordem de PRs e o que entra no git.

### O que a IA fez

- Scaffold e camadas Nest (health, patients, flags, `AiActionsService`, `LlmProvider`, kill switch 403).
- Core Expo: Restyle, domain/infra, perfil hybrid, FlashList, notas otimistas, flags, biometria, splash por marca.
- Home de entrada, switch demonstrativo, safe area.
- Suíte Jest (API + RNTL), camada `test-utils`, rascunhos de PR em `docs/prs/`.
- Texto de ADRs e deste README a partir das decisões que eu confirmei.

### O que eu decidi e revisei

- Stack Nest (não Laravel), Postgres na **5433**, hybrid default para não queimar token na demo.
- Nomes de branch e ordem de commits (`feat/` vs `feature/`, `test/jest-and-rntl`).
- UX: notas vazias no seed, data/sexo por extenso, splash que não pode ser o ícone do Expo Go, home que não pode cobrir a status bar.
- O switch de marca é teatro para o vídeo, não fluxo de consultório.
- Nada de `project-archives/`, `.env` ou chave de LLM no commit.

### O que a IA não fez

- Vídeo de 3–5 min (T-09.4).
- Push, merge e e-mail de entrega.
- Rodar OpenAI de verdade na banca (a demo usa fixture no hybrid).
- Assinar o que não conferi no aparelho.

Uso: acelerar digitação e navegação no repo. Arquitetura, red flags e o que o avaliador vê na tela foram revisados por mim.

## Vídeo

Loom 3–5 min (T-09.4): duas marcas no switch, carteira virtualizada, detalhe, offline/nota, kill switch, health na home. O link entra no e-mail de entrega.

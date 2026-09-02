# Labels

GitHub labels alinhadas ao Conventional Commits do repo:

`type(scope): description`

Na PR, use **1 type** (obrigatório) e **1–2 scopes** (opcional). O type da label deve bater com o type da branch e dos commits principais.

## Type

| Label | Color | Description |
| --- | --- | --- |
| `feat` | `#12A150` | New feature |
| `fix` | `#D73A4A` | Bug fix |
| `refactor` | `#A2EEEF` | Rename or extract with no behavior change |
| `chore` | `#C5DEF5` | Deps, scripts, tooling |
| `docs` | `#0075CA` | README, ADRs, scope, brief |
| `test` | `#FBCA04` | Test setup, unit, and e2e |

## Scope

Same scopes as commits. Shared color (`#5319E7`) for the group.

| Label | Description |
| --- | --- |
| `api` | NestJS (`backend/`), Prisma, modules, health |
| `mobile` | Expo app (`mobile/`), Router, HTTP client |
| `infra` | Docker Compose, Dockerfile, ports |
| `theme` | Restyle, tokens, `Box` / `Text` primitives |
| `brands` | Vita/nexo themes, brand switch |
| `patients` | Patient wallet, biomarkers, details |
| `flags` | Feature flags and AI kill switch |
| `ai` | LLM and generated actions |
| `deps` | Dependencies (`package.json`) |

## Como aplicar

1. Type = prefixo da branch (`feat/scaffolds` → `feat`). Se o trabalho é só testes, use `test` mesmo com branch `feat/...`.
2. Scopes = áreas que concentram o diff, não cada arquivo tocado.
3. Se o diff mistura types, prevalece o da branch. `fix` e `refactor` pontuais dentro de um `feat` não viram label extra.

Exemplos:

- `feat(api): bootstrap tecsa-lab-api with Prisma and health check` → `feat` + `api`
- `feat(infra): add Docker Compose for API and Postgres` → `feat` + `infra`
- `feat(mobile): bootstrap Expo app with Restyle placeholder` → `feat` + `mobile` + `theme`
- `fix(mobile): resolve Android localhost when calling the API` → `fix` + `mobile`
- `docs: record Expo scaffold and app runbook` → `docs`
- `chore(deps): bump NestJS` → `chore` + `deps`
- `feat/scaffolds` → `feat` + `api` + `mobile`

## Criar no GitHub

```bash
gh label create feat --color 12A150 --description "New feature"
gh label create fix --color D73A4A --description "Bug fix"
gh label create refactor --color A2EEEF --description "Refactor with no behavior change"
gh label create chore --color C5DEF5 --description "Deps, scripts, tooling"
gh label create docs --color 0075CA --description "Documentation and setup"
gh label create test --color FBCA04 --description "Test setup and coverage"

gh label create api --color 5319E7 --description "NestJS API, Prisma, and health"
gh label create mobile --color 5319E7 --description "Expo app"
gh label create infra --color 5319E7 --description "Docker Compose and Dockerfile"
gh label create theme --color 5319E7 --description "Restyle, tokens, and primitives"
gh label create brands --color 5319E7 --description "Vita/nexo brands and white-label"
gh label create patients --color 5319E7 --description "Patient wallet, biomarkers, and details"
gh label create flags --color 5319E7 --description "Feature flags and AI kill switch"
gh label create ai --color 5319E7 --description "LLM and generated actions"
gh label create deps --color 5319E7 --description "Dependencies"
```

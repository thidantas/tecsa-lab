# ADR-002 — Domain e infra no app Expo

- **Status:** Aceita
- **Data:** 2026-09-02
- **Contexto:** US-05 (carteira). Ver [`001-stack-e-arquitetura.md`](001-stack-e-arquitetura.md).

## Decisão

- **`src/domain`**
  - `repositories/` — interfaces. O app só conhece esse contrato.
  - `operations/` — TanStack Query (estados async).
  - `models/` — tipos que o front interpreta.
- **`src/infra`**
  - `api/` — client HTTP (Axios, URL, erros de rede). Transporte, não regra de tela.
  - `adapters/` — DTO do backend → model do domain. Só ajuste de dado.
  - `repositories/` — uma pasta por backend (`hybridApi`, `tecsaNestApi`, `inMemoryApi`, `sqliteApi` como store local). Cada uma implementa as mesmas interfaces (sqlite é cache, não perfil sozinho).
  - `profiles/` — escolhe o backend (`EXPO_PUBLIC_API_PROFILE`) e injeta no `RepositoriesProvider`.

A UI chama operation → interface. Qual API responde é o perfil.

Offline da carteira (US-06): o perfil `hybrid` tenta Nest, grava no SQLite o que já foi carregado e, em falha de rede, lê o cache. Nota só persiste no servidor (`PATCH`); a mutation do Query atualiza a UI na hora e faz rollback se o PATCH falhar.

Flags (US-07): o mesmo híbrido cacheia `ai_actions`. Sem valor local e sem rede, a query falha e a UI trata como off (fail-closed).

## Perfis

| Perfil | Pasta |
| --- | --- |
| `hybrid` (default) | Nest na 9000 + SQLite da carteira |
| `tecsaNest` | `repositories/tecsaNestApi` — só HTTP |
| `inMemory` | `repositories/inMemoryApi` — fixture local |

## Por quê

O repository permanece agnóstico. Trocar Nest por outro backend é pasta + perfil novos, sem mudar operation nem tela. O adapter isola o formato do payload; o client fica na `api`. Offline não clona o Postgres: só o que o nutricionista já abriu.

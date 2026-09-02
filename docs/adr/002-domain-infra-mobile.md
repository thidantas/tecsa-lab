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
  - `repositories/` — uma pasta por backend (`tecsaNestApi`, `inMemoryApi`; `supabaseApi` quando existir). Cada uma implementa as mesmas interfaces.
  - `profiles/` — escolhe o backend (`EXPO_PUBLIC_API_PROFILE`) e injeta no `RepositoriesProvider`.

A UI chama operation → interface. Qual API responde é o perfil.

## Perfis

| Perfil | Pasta |
| --- | --- |
| `tecsaNest` (default) | `repositories/tecsaNestApi` — Nest na 9000 |
| `inMemory` | `repositories/inMemoryApi` — fixture local |

## Por quê

O repository permanece agnóstico. Trocar Nest por outro backend é pasta + perfil novos, sem mudar operation nem tela. O adapter isola o formato do payload; o client fica na `api`.

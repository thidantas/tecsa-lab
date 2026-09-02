# ADR-003 — Flags, biometria e OTA

- **Status:** Aceita
- **Data:** 2026-09-02
- **Contexto:** US-07. Ver [`001-stack-e-arquitetura.md`](001-stack-e-arquitetura.md) e [`002-domain-infra-mobile.md`](002-domain-infra-mobile.md).

## Decisão

- Flags: `GET /v1/flags` no Nest; no app, `FlagsRepository` + cache SQLite no perfil `hybrid`. Kill switch `ai_actions` é fail-closed: só mostra geração se o valor for explicitamente `true`.
- Biometria: `expo-local-authentication` no detalhe do paciente. Sem sensor ou sem biometria cadastrada, o detalhe abre (web e emulador continuam usáveis).
- OTA: `expo-updates` (EAS Update) no `app.json`. Publicar update é opcional. Justificativa: corrigir JS (telas, copy, cliente de flag) no mesmo binário white-label, sem review da store. Código nativo não vai por OTA.

## Por quê

Endpoint próprio evita LaunchDarkly. Biometria no detalhe protege dado de saúde no aparelho do nutricionista (HealthKit não cabe). EAS Update é a ferramenta de OTA do Expo, alinhada ao SDK.

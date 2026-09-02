# Tecsa Lab

Plataforma white-label das marcas de saúde do grupo — fatia vertical do app do nutricionista.

Documentação: [`docs/README.md`](docs/README.md). Labels de PR: [`docs/labels.md`](docs/labels.md). Descritivos de PR: [`docs/prs/`](docs/prs/README.md).

## Subir backend e banco

```bash
cp .env.example .env
docker compose up --build
```

- API: [http://localhost:9000](http://localhost:9000)
- Health: [http://localhost:9000/health](http://localhost:9000/health)
- Pacientes: [http://localhost:9000/v1/patients](http://localhost:9000/v1/patients) (`?search=` opcional); detalhe `GET /v1/patients/:id`
- Flags: [http://localhost:9000/v1/flags](http://localhost:9000/v1/flags) (`ai_actions` = kill switch de IA)
- Ações de IA: `POST /v1/patients/:id/ai-actions` — 3–5 itens estruturados; flag off → 403 sem chamar o LLM
- Postgres no host: `localhost:5433` (user/senha/db: `tecsa`; internamente o Compose usa `5432`)

## Subir o app (Expo)

Com a API no ar:

```bash
cd mobile
cp .env.example .env
npm start
```

Web: `npm run web`. Android emulador usa `http://10.0.2.2:9000` se `EXPO_PUBLIC_API_URL` não estiver definido.

## Flags, biometria e OTA

- Kill switch: `GET /v1/flags` → `ai_actions`. `false` esconde a geração no detalhe e a API responde 403 **sem** chamar o LLM. Offline usa o último valor gravado no SQLite. Para desligar no banco local: `UPDATE "FeatureFlag" SET enabled = false WHERE key = 'ai_actions';`
- LLM: no perfil `hybrid` (default) a geração usa fixture local — card ativo, sem token. A rota Nest e a chave no `.env` do host ficam prontas; para gastar OpenAI de verdade, use o perfil `tecsaNest`.
- Biometria: `expo-local-authentication` no detalhe. Sem hardware ou biometria cadastrada (web, muitos emuladores), o gate é pulado.
- OTA: `expo-updates` no app (EAS Update). Publicar um update é opcional neste MVP. Escolhemos EAS Update porque o enunciado pede OTA de **bundle JS** sem review da store — o mesmo binário veste vita/nexo e recebe correção de tela, flag client e copy sem rebuild nativo. Native (biometria, SQLite) continua preso à store. Sem projeto EAS o app ignora check de update; `runtimeVersion` segue `appVersion`.

Dev local da API (Postgres no Compose):

```bash
docker compose up postgres -d
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```

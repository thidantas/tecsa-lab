# Tecsa Lab

Plataforma white-label das marcas de saúde do grupo — fatia vertical do app do nutricionista.

Documentação: [`docs/README.md`](docs/README.md).

## Subir backend e banco

```bash
cp .env.example .env
docker compose up --build
```

- API: [http://localhost:9000](http://localhost:9000)
- Health: [http://localhost:9000/health](http://localhost:9000/health)
- Postgres no host: `localhost:5433` (user/senha/db: `tecsa`; internamente o Compose usa `5432`)

## Subir o app (Expo)

Com a API no ar:

```bash
cd mobile
cp .env.example .env
npm start
```

Web: `npm run web`. Android emulador usa `http://10.0.2.2:9000` se `EXPO_PUBLIC_API_URL` não estiver definido.

Dev local da API (Postgres no Compose):

```bash
docker compose up postgres -d
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```

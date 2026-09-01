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

Dev local da API (Postgres no Compose):

```bash
docker compose up postgres -d
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```

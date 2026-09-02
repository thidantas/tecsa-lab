# feat/scaffold-mobile

Labels: `feat` + `mobile` + `theme`

## Summary

Sobe o scaffold do app Expo (US-02) sobre a API já no ar: core white-label vazio, um tema Restyle placeholder e chamada tipada a `GET /health`.

- Cria `mobile/` (Expo SDK 57, TypeScript, pacote `tecsa-lab-mobile`) com Expo Router.
- Tela inicial **Tecsa Lab** e rota reservada `patients/[id]` para o deep link da carteira.
- Adiciona Restyle com um único `placeholderTheme` e primitivos `Box` / `Text`. Marcas vita/nexo ficam para a próxima fatia.
- Estrutura `src/core` (API client) e `src/brands` vazia.
- Resolve `localhost` no Android via host do Metro (ou `10.0.2.2` no emulador), para o health não apontar para o próprio aparelho.
- Documenta como rodar o app, marca US-02 como feita e adiciona o padrão de labels de PR.

## Test plan

- [ ] `cd mobile && npx tsc --noEmit` passa
- [ ] API healthy em [http://localhost:9000/health](http://localhost:9000/health)
- [ ] `npm start` abre o Metro; web (`npm run web`) carrega a home **Tecsa Lab**
- [ ] Home mostra `status: ok · database: up` com a API no ar
- [ ] Home mostra estado de erro se a API estiver down
- [ ] Expo Go / emulador Android alcança a API (não usa `127.0.0.1` do aparelho)
- [ ] Rota `/patients/1` abre o placeholder de paciente
- [ ] `mobile/.env` não está no git; `.env.example` está
- [ ] README da raiz descreve `cd mobile && npm start`

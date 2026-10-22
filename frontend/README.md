# Frontend — ENCOMP Agenda

HTML + CSS + JS vanilla consumindo a API de eventos.

## Rodar local

1. Suba o backend em `http://localhost:3000`.
2. Em `js/app.js`, confira `API_BASE` (local ou URL do Render).
3. Abra o front com um servidor estático (evite `file://` por CORS):

```bash
cd frontend
npx --yes serve .
```

Ou use a extensão Live Server no VS Code.

## Depois do deploy da API

Troque em `js/app.js`:

```js
const API_BASE = "https://SEU-SERVICO.onrender.com";
```

## Funcionalidades

- Listar eventos
- Criar / editar / excluir
- Estados de loading, erro e lista vazia
- Confirmação antes de excluir

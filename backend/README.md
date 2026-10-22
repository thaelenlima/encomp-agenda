# Backend — ENCOMP Agenda API

API REST de eventos (Node.js + Express + SQLite).

## Rodar local

```bash
cd backend
npm install
npm start
```

API em `http://localhost:3000`.

## Endpoints

| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/health` | Health check |
| GET | `/eventos` | Listar |
| GET | `/eventos/:id` | Buscar por id |
| POST | `/eventos` | Criar |
| PUT | `/eventos/:id` | Atualizar |
| DELETE | `/eventos/:id` | Remover |

Detalhes do contrato: [docs/04-modelo-api.md](../docs/04-modelo-api.md).

## Deploy no Render

Checklist passo a passo: [docs/05-checklist-deploy.md](../docs/05-checklist-deploy.md).

Resumo rápido:

1. Repositório no GitHub
2. New → Web Service → Root Directory: `backend`
3. Build: `npm install` · Start: `npm start`
4. Copie a URL pública

URL base (preencher após o deploy):

```
https://SEU-SERVICO.onrender.com
```

Persistência: SQLite em `data/agenda.db` (criado automaticamente; não versionar o `.db`).

No plano gratuito do Render o disco é efêmero: o banco pode resetar após sleep/redeploy (o seed roda de novo). Para a aula isso é aceitável.

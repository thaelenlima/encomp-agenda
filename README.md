# ENCOMP — Agenda de Eventos

Projeto didático para dois minicursos:

1. **Backend (3h30):** API REST em Node.js + Express, persistência em JSON, deploy no Render.
2. **Frontend (4h):** HTML + CSS + JS vanilla consumindo a API.

## Estrutura

```
encomp/
  backend/    # API Express
  frontend/   # HTML + CSS + JS
  docs/       # Planejamento e roteiros
```

## Subir local

Terminal 1:

```bash
cd backend
npm install
npm start
```

Terminal 2:

```bash
cd frontend
npx --yes serve .
```

Abra a URL do `serve` e use a API em `http://localhost:3000`.

## Documentação

| Doc | Conteúdo |
|-----|----------|
| [docs/01-nivel-e-tema.md](docs/01-nivel-e-tema.md) | Nível e tema |
| [docs/02-escopo.md](docs/02-escopo.md) | Escopo e stack |
| [docs/03-roteiro.md](docs/03-roteiro.md) | Roteiro das aulas |
| [docs/04-modelo-api.md](docs/04-modelo-api.md) | Contrato REST |
| [backend/README.md](backend/README.md) | Como rodar e publicar a API |
| [frontend/README.md](frontend/README.md) | Como rodar o front |
| [docs/05-checklist-deploy.md](docs/05-checklist-deploy.md) | Checklist GitHub + Render |

## Deploy

Siga o [checklist completo](docs/05-checklist-deploy.md). Resumo: root `backend` no Render, depois aponte `API_BASE` em `frontend/js/app.js` para a URL pública.

# Escopo fechado

## Estrutura do repositório (alvo de implementação)

```
encomp/
  backend/     # API Node.js + Express
  frontend/    # HTML + CSS + JS vanilla
  docs/        # Planejamento e roteiros
```

Front e back separados. No dia 1 sobe só o `backend`. No dia 2 o `frontend` consome a URL pública.

## Stack decidida

| Camada | Escolha | Motivo |
|--------|---------|--------|
| Runtime | Node.js (LTS) | Padrão de mercado, fácil de instalar |
| Framework API | Express | Poucas linhas, documentação abundante |
| Persistência | SQLite (`data/agenda.db` via `better-sqlite3`) | Banco local real; SQL na aula; um arquivo, sem servidor de DB |
| Cliente HTTP (aula) | Thunder Client (VS Code) ou Insomnia | Testar API antes do front |
| Frontend | HTML + CSS + JS (sem bundler) | Cabe em 4h; `fetch` nativo |
| Deploy API | Render (Web Service) | Free tier, deploy por GitHub, variáveis de ambiente |
| Hospedagem front (opcional) | GitHub Pages ou abrir `index.html` local apontando para a API | Evita complicar o dia 2 |

SQLite via `better-sqlite3`: ensina SQL sem instalar Postgres/MySQL. O arquivo `.db` fica em `backend/data/` (gitignored). No Render free o disco continua efêmero (dados podem resetar após sleep/redeploy).

**Atenção na turma (Windows):** `better-sqlite3` compila nativo. Se `npm install` falhar, instalar [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (workload “Desktop development with C++”) ou usar Node LTS com binários pré-compilados da lib.

## O que ENTRA

### Backend

- `GET /health`
- CRUD de `/eventos`
- Validação mínima de body (campos obrigatórios)
- Respostas JSON e status HTTP corretos (200, 201, 400, 404)
- CORS liberado
- `PORT` via variável de ambiente
- Persistência em SQLite (tabela `eventos`)
- Deploy no Render
- README com URL base

### Frontend

- Uma página principal (lista + formulário)
- Listar, criar, editar e excluir via `fetch`
- Estados de loading, erro e lista vazia
- CSS simples e responsivo o bastante para celular

## O que NÃO ENTRA

- Autenticação (login, JWT, sessions)
- Upload de arquivos/imagens
- WebSockets
- Testes automatizados (só mencionar)
- ORM, Docker, CI/CD
- React/Vue/Angular
- Paginação, busca complexa, roles
- Postgres ou banco gerenciado
- Relacionamentos entre entidades (só um recurso)

## Extensões só se sobrar tempo

- Filtro por status no front
- `confirm()` antes de excluir
- Campo `descricao` opcional (já previsto no modelo; pode ficar de fora do formulário inicial)

## Critério de “API completa” neste minicurso

CRUD de um recurso + persistência + CORS + URL pública. Não significa microserviços, auth ou múltiplos domínios.

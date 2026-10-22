# Checklist: GitHub + Render

Use este roteiro na véspera ou no bloco de deploy do dia 1.

## 1. Contas

- [ ] Conta GitHub criada e logada no navegador
- [ ] Conta Render criada ([https://render.com](https://render.com)) com o mesmo GitHub conectado (Authorize)

## 2. Repositório Git

Repo já publicado:

**https://github.com/thaelenlima/encomp-agenda**

Para atualizar depois de mudanças locais:

```powershell
cd C:\Users\thael\Documents\dev\encomp
git add .
git commit -m "sua mensagem"
git push
```

- [x] Código no GitHub (incluindo `backend/`, `frontend/`, `docs/`)
- [ ] Confirme no site que `node_modules/` **não** aparece no remoto

## 3. Web Service no Render

1. Dashboard Render → **New** → **Web Service**
2. Conecte o repositório `encomp-agenda`
3. Preencha:

| Campo | Valor |
|-------|--------|
| Name | `encomp-agenda-api` (ou similar) |
| Region | Oregon (ou a mais próxima) |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

4. **Create Web Service**
5. Espere o build (2–5 min na primeira vez)

- [ ] Deploy com status **Live**
- [ ] URL copiada (ex.: `https://encomp-agenda-api.onrender.com`)

## 4. Testar a API publicada

No Thunder Client ou navegador:

- [ ] `GET https://SUA-URL.onrender.com/health` → `{ "ok": true }`
- [ ] `GET .../eventos` → array com os seeds
- [ ] `POST .../eventos` com JSON de um evento → 201
- [ ] `PUT` e `DELETE` de um id de teste

## 5. Ligar o frontend

Em `frontend/js/app.js`:

```js
const API_BASE = "https://SUA-URL.onrender.com";
```

- [ ] Front local lista os eventos da API na nuvem
- [ ] Criar/editar/excluir pelo browser funciona

## Problemas comuns

| Sintoma | O que checar |
|---------|----------------|
| Build falha | Root Directory = `backend`; `package.json` no lugar certo |
| App cai ao subir | Start Command = `npm start`; logs no Render |
| `GET` local ok, nuvem 404 | URL sem barra no fim errada; caminho `/eventos` |
| Front: CORS / Failed to fetch | API no ar? Render free “dorme” após ~15 min; espere 30–60s e tente de novo |
| Dados sumiram | Disco efêmero no free: sleep/redeploy recria o SQLite com o seed (normal na aula) |
| Cold start lento | Primeira request após sleep pode demorar; avise a turma |

## Plano B (só instrutor)

Se o Render falhar no dia: deixe a API rodando na sua máquina e exponha com um túnel (ex.: Cloudflare Tunnel / ngrok). Anote a URL HTTPS no quadro e use o mesmo `API_BASE` no front.

## URL da turma (preencher no dia)

```
API_BASE = _______________________________
```

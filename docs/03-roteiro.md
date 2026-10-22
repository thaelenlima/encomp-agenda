# Roteiro detalhado dos dois dias

Buffer incluso em cada bloco para dúvidas e problemas de ambiente. Horários são relativos ao início da aula.

---

## Pré-requisitos (véspera / início)

Instrutor prepara:

- [ ] Repositório GitHub criado (pode estar vazio; código nasce na aula)
- [ ] Conta Render pronta + app de teste já linkado uma vez (para antecipar surpresas)
- [ ] Slides curtos (máx. 8–10) só de conceitos HTTP/REST
- [ ] Snippets de referência (não entregar o projeto pronto)
- [ ] Seed de 2–3 eventos (já no `db.js` na primeira execução)

Aluno precisa ter:

- [ ] Node.js LTS instalado (`node -v`, `npm -v`)
- [ ] VS Code + extensão Thunder Client (ou Insomnia)
- [ ] Conta GitHub
- [ ] Conta Render (mesmo e-mail do GitHub ajuda)

---

## Dia 1 — Backend (3h30)

### Bloco 1 — Conceitos (0:00–0:20)

- O que é API e por que separar front/back
- HTTP: método, URL, headers, body, status
- JSON como formato de troca
- REST em uma frase: recurso + verbo
- Demo rápida: chamar uma API pública no Thunder Client

**Saída:** turma entende o vocabulário do resto do dia.

### Bloco 2 — Setup Express (0:20–0:45)

- `npm init -y`, instalar `express` e `cors`
- `index.js` com `app.listen`
- Rota `GET /health` → `{ "ok": true }`
- Rodar local e testar no Thunder Client

**Saída:** servidor local respondendo.

### Bloco 3 — Modelo + SQLite + leitura (0:45–1:25)

- Definir o recurso `evento` e os campos (ver [04-modelo-api.md](04-modelo-api.md))
- Instalar `better-sqlite3` e criar `db.js` (tabela `eventos` + seed se vazia)
- Mostrar o arquivo `data/agenda.db` gerado
- `GET /eventos` e `GET /eventos/:id` com `SELECT` (404 se não achar)

**Saída:** API lê dados do banco local.

### Bloco 4 — Criação + validação (1:25–2:05)

- `POST /eventos` com `express.json()`
- Validar `titulo`, `data`, `local` obrigatórios → 400
- Gerar `id` (timestamp ou uuid simples)
- Status padrão `agendado`
- Responder 201 + recurso criado
- Consultar de novo no Thunder Client e mostrar que persistiu no SQLite

**Saída:** criação funcionando de ponta a ponta.

### Bloco 5 — Atualização e exclusão (2:05–2:35)

- `PUT /eventos/:id` (substituição dos campos editáveis)
- `DELETE /eventos/:id` → 204 ou 200 com mensagem
- 404 consistente nos dois

**Saída:** CRUD completo local.

### Bloco 6 — CORS, env e organização (2:35–2:55)

- `app.use(cors())` e por que o browser exige isso
- `process.env.PORT || 3000`
- Separar em pastas leves: `routes/eventos.js` (+ handler no mesmo arquivo se preferir menos arquivos)
- `.gitignore`: `node_modules/`

**Saída:** código pronto para publicar.

### Bloco 7 — Deploy (2:55–3:30)

- Push para GitHub
- Criar Web Service no Render (Root Directory: `backend`)
- Start command: `node index.js` (ou `npm start`)
- Aguardar deploy, testar `/health` e um `GET/POST` na URL pública
- Anotar a URL base no README / quadro (será a base do dia 2)

**Buffer:** usar qualquer atraso de build/DNS aqui; se o Render falhar, ter ngrok ou similar como plano B só do instrutor.

**Entrega do dia 1:** API pública com CRUD de eventos.

---

## Dia 2 — Frontend (4h)

Premissa: URL da API do dia 1 no quadro. Front roda com Live Server ou `npx serve`, apontando `API_BASE` para a URL do Render.

### Bloco 1 — HTML da tela (0:00–0:25)

- Estrutura: header, formulário, lista, área de mensagens
- Inputs: título, data, local, status (select)
- Botões: salvar, (editar/excluir nos itens)
- Sem framework; IDs/classes estáveis para o JS

**Saída:** página estática montada.

### Bloco 2 — CSS (0:25–1:05)

- Layout em coluna (mobile-first)
- Tipografia e espaçamento
- Card/item da lista sem overengineering
- Classes de estado: `.loading`, `.erro`, `.vazio`
- Ajuste rápido para telas largas (max-width + centralizar)

**Saída:** UI usável e legível.

### Bloco 3 — Listar com fetch (1:05–1:50)

- Constante `API_BASE`
- `GET /eventos` → `json()`
- Renderizar lista no DOM (`innerHTML` ou `createElement`)
- Tratar lista vazia e erro de rede/CORS

**Saída:** dados reais na tela.

### Bloco 4 — Criar (1:50–2:35)

- Submit do formulário com `preventDefault`
- `POST` com `Content-Type: application/json`
- Limpar form e recarregar lista
- Mostrar erro 400 da API na UI

**Saída:** cadastro pelo browser.

### Bloco 5 — Editar e excluir (2:35–3:15)

- Botão editar: preencher form + guardar `id` em edição
- `PUT` no submit quando houver id
- Botão excluir: `DELETE` + refresh da lista
- Evitar estado inconsistente (cancelar edição)

**Saída:** CRUD completo no front.

### Bloco 6 — UX mínima (3:15–3:40)

- Loading durante requests
- Mensagens de sucesso/erro
- Revisar CORS na prática (se alguém abrir file:// vs http://localhost)

### Bloco 7 — Opcional + encerramento (3:40–4:00)

- Se sobrar: filtro por status ou `confirm` no delete
- Recap: request → API → JSON → DOM
- Próximos passos sugeridos (auth, banco real, framework) sem implementar

**Entrega do dia 2:** frontend consumindo a API publicada.

---

## Checklist de sucesso

### Dia 1

- [ ] `/health` público responde
- [ ] CRUD de `/eventos` testado no Thunder Client na URL do Render
- [ ] URL anotada para o dia 2

### Dia 2

- [ ] Lista carrega da API
- [ ] Criar, editar e excluir refletem na API (verificar no Thunder Client)
- [ ] Erro de API aparece na interface

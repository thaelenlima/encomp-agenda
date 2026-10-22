# Modelo do recurso e endpoints REST

Base URL (exemplo após deploy): `https://encomp-agenda-api.onrender.com`

Todas as respostas de sucesso/erro em JSON, exceto `DELETE` que pode retornar 204 sem body.

---

## Recurso: Evento

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `id` | string | sim (gerado pelo servidor) | Ex.: `"1712345678901"` |
| `titulo` | string | sim | 3–120 caracteres (validação mínima na aula: não vazio) |
| `data` | string | sim | ISO date `YYYY-MM-DD` (input `type="date"` no front) |
| `local` | string | sim | Ex.: `"Auditório A"` |
| `status` | string | não (default) | Enum: `agendado` \| `em_andamento` \| `concluido` \| `cancelado`. Default: `agendado` |
| `descricao` | string | não | Opcional; pode ficar de fora do formulário inicial |

### Exemplo de objeto

```json
{
  "id": "1712345678901",
  "titulo": "Minicurso de Backend com Node.js",
  "data": "2026-10-23",
  "local": "Lab 2",
  "status": "agendado",
  "descricao": "Construção de uma API REST em 3h30"
}
```

### Seed sugerido (`data/eventos.json`)

```json
[
  {
    "id": "1",
    "titulo": "Abertura do evento",
    "data": "2026-10-23",
    "local": "Auditório",
    "status": "agendado",
    "descricao": "Boas-vindas e agenda do dia"
  },
  {
    "id": "2",
    "titulo": "Minicurso de Frontend",
    "data": "2026-10-24",
    "local": "Lab 1",
    "status": "agendado",
    "descricao": "Consumindo a API com HTML, CSS e JS"
  }
]
```

---

## Endpoints

### Health

```
GET /health
→ 200 { "ok": true }
```

### Listar eventos

```
GET /eventos
→ 200 Evento[]
```

### Buscar por id

```
GET /eventos/:id
→ 200 Evento
→ 404 { "erro": "Evento não encontrado" }
```

### Criar

```
POST /eventos
Content-Type: application/json

{
  "titulo": "Workshop de Git",
  "data": "2026-10-25",
  "local": "Sala 3",
  "status": "agendado",
  "descricao": "Opcional"
}

→ 201 Evento (com id gerado)
→ 400 { "erro": "titulo, data e local são obrigatórios" }
```

Regras:

- Se `status` omitido → `agendado`
- Se `descricao` omitida → `""` ou omitir o campo (escolher um e manter consistente)
- Não aceitar `id` do cliente (ignorar se vier no body)

### Atualizar

```
PUT /eventos/:id
Content-Type: application/json

{
  "titulo": "Workshop de Git (atualizado)",
  "data": "2026-10-25",
  "local": "Sala 4",
  "status": "em_andamento",
  "descricao": "Inclui exercícios"
}

→ 200 Evento
→ 400 campos inválidos
→ 404 { "erro": "Evento não encontrado" }
```

Na aula, `PUT` atualiza os campos editáveis; `id` não muda.

### Excluir

```
DELETE /eventos/:id
→ 204 (sem body)
→ 404 { "erro": "Evento não encontrado" }
```

Alternativa didática (se preferir ver JSON no Thunder Client): `200 { "ok": true }`.

---

## Mapa verbo × ação (quadro da aula)

| Verbo | Caminho | Ação |
|-------|---------|------|
| GET | `/eventos` | listar |
| GET | `/eventos/:id` | detalhar |
| POST | `/eventos` | criar |
| PUT | `/eventos/:id` | atualizar |
| DELETE | `/eventos/:id` | remover |

---

## Contrato para o frontend

```js
const API_BASE = "https://SUA-URL.onrender.com";

// Listar
fetch(`${API_BASE}/eventos`)

// Criar
fetch(`${API_BASE}/eventos`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo, data, local, status }),
})

// Atualizar
fetch(`${API_BASE}/eventos/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo, data, local, status, descricao }),
})

// Excluir
fetch(`${API_BASE}/eventos/${id}`, { method: "DELETE" })
```

CORS: backend com `cors()` liberado para qualquer origem na aula (simples e suficiente).

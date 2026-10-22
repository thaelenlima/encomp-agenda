const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "..", "data", "eventos.json");
const STATUS_VALIDOS = ["agendado", "em_andamento", "concluido", "cancelado"];

function lerEventos() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function salvarEventos(eventos) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(eventos, null, 2), "utf8");
}

function validarBody(body) {
  const titulo = typeof body.titulo === "string" ? body.titulo.trim() : "";
  const data = typeof body.data === "string" ? body.data.trim() : "";
  const local = typeof body.local === "string" ? body.local.trim() : "";

  if (!titulo || !data || !local) {
    return { erro: "titulo, data e local são obrigatórios" };
  }

  const status =
    typeof body.status === "string" && body.status.trim()
      ? body.status.trim()
      : "agendado";

  if (!STATUS_VALIDOS.includes(status)) {
    return {
      erro: `status inválido. Use: ${STATUS_VALIDOS.join(", ")}`,
    };
  }

  const descricao =
    typeof body.descricao === "string" ? body.descricao.trim() : "";

  return {
    dados: { titulo, data, local, status, descricao },
  };
}

router.get("/", (req, res) => {
  const eventos = lerEventos();
  res.json(eventos);
});

router.get("/:id", (req, res) => {
  const eventos = lerEventos();
  const evento = eventos.find((item) => item.id === req.params.id);

  if (!evento) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.json(evento);
});

router.post("/", (req, res) => {
  const resultado = validarBody(req.body || {});
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  const eventos = lerEventos();
  const novo = {
    id: String(Date.now()),
    ...resultado.dados,
  };

  eventos.push(novo);
  salvarEventos(eventos);
  res.status(201).json(novo);
});

router.put("/:id", (req, res) => {
  const eventos = lerEventos();
  const indice = eventos.findIndex((item) => item.id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  const resultado = validarBody(req.body || {});
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  const atualizado = {
    id: eventos[indice].id,
    ...resultado.dados,
  };

  eventos[indice] = atualizado;
  salvarEventos(eventos);
  res.json(atualizado);
});

router.delete("/:id", (req, res) => {
  const eventos = lerEventos();
  const indice = eventos.findIndex((item) => item.id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  eventos.splice(indice, 1);
  salvarEventos(eventos);
  res.status(204).send();
});

module.exports = router;

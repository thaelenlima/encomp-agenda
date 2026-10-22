const express = require("express");
const db = require("../db");

const router = express.Router();
const STATUS_VALIDOS = ["agendado", "em_andamento", "concluido", "cancelado"];

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
  const eventos = db
    .prepare("SELECT id, titulo, data, local, status, descricao FROM eventos ORDER BY data, titulo")
    .all();
  res.json(eventos);
});

router.get("/:id", (req, res) => {
  const evento = db
    .prepare("SELECT id, titulo, data, local, status, descricao FROM eventos WHERE id = ?")
    .get(req.params.id);

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

  const novo = {
    id: String(Date.now()),
    ...resultado.dados,
  };

  db.prepare(`
    INSERT INTO eventos (id, titulo, data, local, status, descricao)
    VALUES (@id, @titulo, @data, @local, @status, @descricao)
  `).run(novo);

  res.status(201).json(novo);
});

router.put("/:id", (req, res) => {
  const existente = db
    .prepare("SELECT id FROM eventos WHERE id = ?")
    .get(req.params.id);

  if (!existente) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  const resultado = validarBody(req.body || {});
  if (resultado.erro) {
    return res.status(400).json({ erro: resultado.erro });
  }

  const atualizado = {
    id: existente.id,
    ...resultado.dados,
  };

  db.prepare(`
    UPDATE eventos
    SET titulo = @titulo, data = @data, local = @local,
        status = @status, descricao = @descricao
    WHERE id = @id
  `).run(atualizado);

  res.json(atualizado);
});

router.delete("/:id", (req, res) => {
  const info = db.prepare("DELETE FROM eventos WHERE id = ?").run(req.params.id);

  if (info.changes === 0) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }

  res.status(204).send();
});

module.exports = router;

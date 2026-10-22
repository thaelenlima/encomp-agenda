const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "agenda.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS eventos (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    data TEXT NOT NULL,
    local TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'agendado',
    descricao TEXT NOT NULL DEFAULT ''
  )
`);

const total = db.prepare("SELECT COUNT(*) AS total FROM eventos").get().total;

if (total === 0) {
  const inserir = db.prepare(`
    INSERT INTO eventos (id, titulo, data, local, status, descricao)
    VALUES (@id, @titulo, @data, @local, @status, @descricao)
  `);

  const seed = [
    {
      id: "1",
      titulo: "Abertura do evento",
      data: "2026-10-23",
      local: "Auditório",
      status: "agendado",
      descricao: "Boas-vindas e agenda do dia",
    },
    {
      id: "2",
      titulo: "Minicurso de Frontend",
      data: "2026-10-24",
      local: "Lab 1",
      status: "agendado",
      descricao: "Consumindo a API com HTML, CSS e JS",
    },
  ];

  const tx = db.transaction((itens) => {
    for (const item of itens) inserir.run(item);
  });

  tx(seed);
}

module.exports = db;

const express = require("express");
const cors = require("cors");
require("./db");
const eventosRouter = require("./routes/eventos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/eventos", eventosRouter);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

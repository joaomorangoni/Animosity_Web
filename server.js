import express from "express";
import cors from "cors"; // ⬅️ IMPORTANTE

import usuariosRouter from "./usuarios.js";
import avaliacoesRouter from "./avaliacoes.js";

const app = express();
const PORT = 3000;

app.use(cors()); // ⬅️ LIBERA ACESSO DO FRONTEND
app.use(express.json());

// Rotas
app.use("/", usuariosRouter);
app.use("/", avaliacoesRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

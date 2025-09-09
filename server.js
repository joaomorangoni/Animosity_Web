// server.js
import express from 'express';
import cors from 'cors';

import avaliacoesRouter from './avaliacoes.js';
import usuariosRouter from './usuarios.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API OK'));

// Rotas
app.use('/avaliacoes', avaliacoesRouter);
app.use('/', usuariosRouter);

app.listen(PORT, () => {
  console.log(`API ouvindo em http://localhost:${PORT}`);
});

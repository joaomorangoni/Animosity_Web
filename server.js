// server.js
import express from 'express';
import cors from 'cors';
import usuariosRouter from './usuarios.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// rota teste
app.get('/', (req, res) => res.send('API OK'));

// rotas de usuários
app.use('/', usuariosRouter);

app.listen(PORT, () => {
  console.log(`API ouvindo em http://localhost:${PORT}`);
});

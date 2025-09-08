import express from 'express';
import usuariosRouter from './usuarios.js';
import avaliacoesRouter from './avaliacoes.js';

const app = express();
app.use(express.json());

// Rotas
app.use('/', usuariosRouter);
app.use('/', avaliacoesRouter);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

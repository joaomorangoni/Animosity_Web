// server.js
import express from 'express';
import cors from 'cors';
import connection from './conexao.js'; // Certifique-se de ter sua conexão MySQL aqui
import bcrypt from 'bcrypt';
import {
  GetUser,
  InsertUser,
  UpdateUser,
  DeleteUser,
  LoginUser
} from './components_api/UsuarioController.js';
import {
  GetFeed,
  InsertFeed,
  UpdateFeed,
  DeleteFeed
} from './components_api/FeedbacksController.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =======================
// Rotas de Usuários
// =======================

// Criar usuário
app.post('/usuarios', async (req, res) => InsertUser(req, res));

// Listar usuários
app.get('/usuarios', (req, res) => GetUser(res));

// Atualizar usuário
app.put('/usuarios/:id', (req, res) => UpdateUser(req, res));

// Deletar usuário
app.delete('/usuarios/:id', (req, res) => DeleteUser(req, res));

// Login
app.post('/usuarios/login', async (req, res) => LoginUser(req, res));

// =======================
// Rotas de Feedbacks
// =======================

// Criar feedback
app.post('/feedbacks/:id_usuario', (req, res) => InsertFeed(req, res));

// Listar feedbacks
app.get('/feedbacks/:id_usuario', (req, res) => GetFeed(res));

// Atualizar feedback
app.put('/feedbacks/:id_usuario', (req, res) => UpdateFeed(req, res));

// Deletar feedback
app.delete('/feedbacks/:id_usuario', (req, res) => DeleteFeed(req, res));

// =======================
// Inicia servidor
// =======================
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

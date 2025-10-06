// server.js
import express from 'express';
import cors from 'cors';
import connection from './conexao.js'; // conexão com o MySQL
import bcrypt from 'bcrypt';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import {
  GetUser,
  InsertUser,
  UpdateUserWithPhoto,
  DeleteUser,
  LoginUser
} from './components_api/UsuarioController.js';

import {
  InsertFeed,
  GetFeed
} from './components_api/FeedbacksController.js';

// =======================
// Inicialização do servidor
// =======================
const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Configuração da pasta de uploads
// =======================
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Torna a pasta "uploads" pública
app.use('/uploads', express.static(uploadDir));

// =======================
// Configuração do multer (upload de imagens)
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas imagens são permitidas!'));
    }
    cb(null, true);
  }
});

// =======================
// Rotas de Usuários
// =======================

// Criar usuário
app.post('/usuarios', async (req, res) => InsertUser(req, res));

// Listar usuários
app.get('/usuarios', (req, res) => GetUser(res));

// Atualizar usuário (com foto)
app.put('/api/usuarios/:id', upload.single('foto'), (req, res) => UpdateUserWithPhoto(req, res));

// Deletar usuário
app.delete('/usuarios/:id', (req, res) => DeleteUser(req, res));

// Login de usuário
app.post('/usuarios/login', async (req, res) => LoginUser(req, res));

// =======================
// Rotas de Feedbacks
// =======================

// Criar novo feedback
app.post('/api/feedback', (req, res) => InsertFeed(req, res));

// Buscar feedbacks por ID de usuário
app.get('/api/feedback/:id_usuario', (req, res) => GetFeed(req, res));

// =======================
// Inicialização do servidor
// =======================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

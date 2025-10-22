// server.js
import express from 'express';
import cors from 'cors';
import connection from './conexao.js'; // conexão com o MySQL

import multer from 'multer';
import fs from 'fs';
import path from 'path';

import session from "express-session";

import {
  GetUser,
  InsertUser,
  UpdateUserWithPhoto,
  DeleteUser,
  LoginUser,
  LoginGoogleUser
} from './components_api/UsuarioController.js';

import {
  InsertFeed,
  GetFeed,
  GetAllFeed
} from './components_api/FeedbacksController.js';

import {
  GetAtualizacoes,
  InsertAtualizacao,
  DeleteAtualizacao,
  getVersoes
} from './components_api/AtualizacoesController.js';


const app = express();
app.use(cors());
app.use(express.json());


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


app.use('/uploads', express.static(uploadDir));




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


app.use(
  session({
    secret: "chave_muito_segura_aqui", // troque por algo forte
    resave: false,
    saveUninitialized: false,
  })
);


function verificarLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login"); // ou res.status(401).json({ erro: "Usuário não logado" });
  }
  next();
}

// Middleware: verifica se o usuário é administrador
function verificarAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  
  // Se o campo adm for 1, ele é admin
  if (req.session.user.adm !== 1) {
    return res.redirect("/profile"); // redireciona usuários comuns
  }

  next(); // tudo certo, pode continuar
}

// rota comum (somente logados)
app.get("/profile", verificarLogin, (req, res) => {
  res.send(`Bem-vindo ao seu perfil, ${req.session.usuario.nome}!`);
});

// rota admin (somente admin = 1)
app.get("/dev", verificarAdmin, (req, res) => {
  res.send(`Painel de administrador - ${req.session.usuario.nome}`);
});





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


app.post('/usuarios/login/google', async (req, res) => LoginGoogleUser(req, res));


// Rotas de Feedbacks


// Criar novo feedback
app.post('/api/feedback', (req, res) => InsertFeed(req, res));

// Buscar feedbacks por ID de usuário
app.get('/api/feedback/:id_usuario', (req, res) => GetFeed(req, res));

// Buscar todos os feedbacks
app.get('/feedbacks', (req, res) => GetAllFeed(req, res));


// Deletar feedback por id_usuario + versao + mensagem
app.delete('/api/feedback/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  const { versao, mensagem } = req.query;

  if (!versao || !mensagem) {
    return res.status(400).json({ erro: "Versão e mensagem são obrigatórias!" });
  }

  const query = "DELETE FROM feedback WHERE id_usuario = ? AND versao = ? AND mensagem = ?";
  connection.query(query, [id_usuario, versao, mensagem], (err, result) => {
    if (err) {
      console.error("Erro ao deletar feedback:", err);
      return res.status(500).json({ erro: "Erro ao deletar feedback" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Feedback não encontrado" });
    }

    res.status(200).json({ mensagem: "Feedback deletado com sucesso" });
  });
});

// Listar todas as atualizações
app.get('/api/atualizacoes', (req, res) => GetAtualizacoes(req, res));

// Criar nova atualização
app.post('/api/atualizacoes', (req, res) => InsertAtualizacao(req, res));

// Deletar atualização
app.delete('/api/atualizacoes/:id', (req, res) => DeleteAtualizacao(req, res));

app.put('/api/atualizacoes/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, versao } = req.body;

  try {
    await connection.execute(
      'UPDATE atualizacoes SET titulo = ?, descricao = ?, versao = ? WHERE id = ?',
      [titulo, descricao, versao, id]
    );
    res.json({ message: 'Atualização alterada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

// Login com Google
app.post('/usuarios/login/google', async (req, res) => LoginGoogleUser(req, res));


app.get('/api/versoes', (req, res) => getVersoes(req, res));








const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));

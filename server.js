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
  InsertPost,
  GetPosts,
  UpdatePost,
  DeletePost,
  LikePost,
  CommentPost,
  GetComments
} from './components_api/PostController.js';


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


//-------------------------- POSTAGEMM KRAI KKKKKKKKKK----------------------------


// Listar todos os posts ordenados pelos mais novos
app.get("/posts", async (req, res) => {
  try {
    const [rows] = await connection.promise().query(
      `SELECT posts.id, posts.conteudo, posts.usuario_id, usuarios.nome AS usuario, posts.curtidas, posts.criado_em
       FROM posts
       JOIN usuarios ON posts.usuario_id = usuarios.id
       ORDER BY posts.criado_em DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar post
app.post("/posts/:id_usuario", async (req, res) => {
  const { id_usuario } = req.params;
  const { conteudo } = req.body;
  try {
    const [result] = await connection.promise().query(
      "INSERT INTO posts (usuario_id, conteudo, curtidas, criado_em) VALUES (?, ?, 0, NOW())",
      [id_usuario, conteudo]
    );
    res.json({ id: result.insertId, usuario_id: id_usuario, conteudo, curtidas: 0, criado_em: new Date() });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Curtir post
app.post("/posts/:id_post/like", async (req, res) => {
  const { id_post } = req.params;
  try {
    await connection.promise().query(
      "UPDATE posts SET curtidas = curtidas + 1 WHERE id = ?",
      [id_post]
    );
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar post
app.delete("/posts/:id_post", async (req, res) => {
  const { id_post } = req.params;
  try {
    await connection.promise().query("DELETE FROM posts WHERE id = ?", [id_post]);
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});
// -----------------------
// Inicia servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

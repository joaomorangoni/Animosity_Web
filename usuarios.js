// usuarios.js
import express from 'express';
const router = express.Router();

// "banco de dados" em memória
let usuarios = [];
let nextId = 1;

// Cadastro
router.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(400).json({ mensagem: "Usuário já existe." });
  }

  const novoUsuario = { id: nextId++, nome, email, senha };
  usuarios.push(novoUsuario);

  return res.status(201).json({ mensagem: "Cadastro realizado!", usuario: novoUsuario });
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Preencha email e senha." });
  }

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ mensagem: "Credenciais inválidas." });
  }

  return res.json({ mensagem: "Login realizado!", usuario });
});

// Atualização de perfil
router.put('/usuarios/update', (req, res) => {
  const { id, nome, senha, foto } = req.body;
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });

  if (nome) usuario.nome = nome;
  if (senha) usuario.senha = senha;
  if (foto) usuario.foto = foto;

  return res.json(usuario);
});

export default router;

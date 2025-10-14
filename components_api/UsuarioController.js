import connection from '../conexao.js';
import bcrypt from "bcrypt";
import fs from 'fs';
import path from 'path';
import axios from "axios";

export async function GetUser(res) {
  connection.query('SELECT * FROM usuarios', (err, Usuarios) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);  // Log detalhado para erros de consulta
      return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: err.message });
    }

    res.status(200).json(Usuarios);
  });
}

export async function InsertUser(req, res) {
  try {
    const { email, senha, nome } = req.body;
    if (!senha && !google_id) {
      return res.status(400).json({ erro: "Usuário precisa de senha ou login Google." });
    }

    // 1️⃣ Gerar hash da senha
    const saltRounds = 10; // nível de segurança
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // 2️⃣ Inserir no banco usando o hash
    connection.query(
      "INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)",
      [email, hashedPassword, nome], // <-- aqui o hashedPassword substitui a senha
      (err, usuario) => {
        if (err) {
          console.error("Erro ao inserir usuário:", err);
          return res.status(500).json({ erro: "Erro ao inserir usuário." });
        } else {
          res.status(201).json({
            mensagem: "Usuário inserido com sucesso",
            user: usuario,
          });
        }
      }
    );
  } catch (error) {
    console.error("Erro no InsertUser:", error);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
}
 
// Atualiza usuário (nome e opcionalmente foto)
export async function UpdateUserWithPhoto(req, res) {
  const { id } = req.params;
  const { nome } = req.body;
  const foto = req.file ? '/uploads/' + req.file.filename : null;

  try {
    await connection.promise().execute(
      "UPDATE usuarios SET nome = ?, foto = COALESCE(?, foto) WHERE id = ?",
      [nome, foto, id]
    );

    res.status(200).json({
      mensagem: "Perfil atualizado com sucesso",
      nome,
      foto // retorna caminho público da foto
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
}


export async function DeleteUser(req, res){
  const { id } = req.params;
  connection.query("DELETE from usuarios WHERE id = ?", [id], (err, usuario)=>{
    if (err) {
      console.error('Erro ao editar usuario:', err);
      return res.status(500).json({ erro: 'Erro ao excluir usuário' });
  }else{
      res.status(201).json({mensagem: 'excluído com sucesso',user: usuario});
  }
  } )
}



export async function LoginUser(req, res) {
  try {
    const { email, senha } = req.body;

    connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Erro ao buscar usuário:", err);
          return res.status(500).json({ erro: "Erro no servidor" });
        }

        if (results.length === 0) {
          return res.status(401).json({ erro: "Usuário não encontrado" });
        }

        const usuario = results[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
          return res.status(401).json({ erro: "Senha incorreta" });
        }

        // Retorna dados do usuário
        res.status(200).json({
          message: "Login realizado com sucesso!",
          user: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
          }
        });
      }
    );
  } catch (error) {
    console.error("Erro no LoginUser:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}



export async function LoginGoogleUser(req, res) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ erro: "Token do Google não fornecido" });
    }

    //  Verifica token com a API do Google
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    const payload = response.data;
    const { sub: googleId, name, email, picture } = payload;
    const foto = picture || null;

    //  Verifica se o usuário já existe
    const [rows] = await connection.promise().query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      const usuario = rows[0];
      return res.status(200).json({
        mensagem: "Login com Google realizado com sucesso!",
        user: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          foto: usuario.foto,
        },
      });
    }

    //  Usuário não existe → cria no banco
    const [insertResult] = await connection.promise().query(
      "INSERT INTO usuarios (nome, email, foto, senha) VALUES (?, ?, ?, ?)",
      [name, email, foto, null]
    );

    res.status(201).json({
      mensagem: "Usuário criado e logado com Google!",
      user: {
        id: insertResult.insertId,
        nome: name,
        email,
        foto,
      },
    });
  } catch (error) {
    console.error("Erro no LoginGoogleUser:", error);
    res.status(500).json({ erro: "Erro ao autenticar com Google" });
  }
}


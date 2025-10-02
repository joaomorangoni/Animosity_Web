import connection from '../conexao.js';
import bcrypt from "bcrypt";

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
 
export async function UpdateUser(req, res){
  const { id } = req.params;
  const { email, senha, nome } = req.body;
  connection.query("UPDATE usuarios SET email = ?, senha = ?, nome = ? WHERE id = ?", [email, senha, nome, id], (err, usuario)=>{
    if (err) {
      console.error('Erro ao editar usuario:', err);
      return res.status(500).json({ erro: 'Erro ao editar usuario.' });
  }else{
      res.status(201).json({mensagem: 'Editado com sucesso',user: usuario});
  }
  } )
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
import connection from '../conexao.js';

export async function GetUser(res) {
  connection.query('SELECT * FROM usuarios', (err, Usuarios) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);  // Log detalhado para erros de consulta
      return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: err.message });
    }

    res.status(200).json(Usuarios);
  });
}

export async function InsertUser(req, res){
    const {email, senha, nome} = req.body;
    connection.query("INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)", [email, senha, nome], (err, usuario) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ erro: 'Erro ao inserir usuário.' });
        }else{
            res.status(201).json({mensagem: 'inserimo', user: usuario

            });
        }
    }) // o [] subistitui o valor da requisição "???"
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




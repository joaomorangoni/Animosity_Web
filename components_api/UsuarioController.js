import connection from '../conexao.js';

export async function GetAlunos(res) {
  connection.query('SELECT * FROM usuarios', (err, Usuarios) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);  // Log detalhado para erros de consulta
      return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: err.message });
    }

    res.status(200).json(Usuarios);
  });
}

export async function InsertAluno(req, res){
    const {email, senha, nome} = req.body;
    connection.query("INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)", [email, senha, nome], (err, usuario) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ erro: 'Erro ao inserir usuário.' });
        }else{
            res.status(201).json({mensagem: 'inserimo'});
        }
    }) // o [] subistitui o valor da requisição "???"
}



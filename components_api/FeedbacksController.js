import connection from '../conexao.js';

export async function GetFeed(res) {
  connection.query('SELECT * FROM feedback', (err, Feedback) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);  // Log detalhado para erros de consulta
      return res.status(500).json({ erro: 'Erro ao buscar feedbacks', detalhes: err.message });
    }

    res.status(200).json(Feedback);
  });
}

export async function InsertFeed(req, res){
    const {mensagem, versao, estrelas} = req.body;
    connection.query("INSERT INTO feedback (mensagem, versao, estrelas) VALUES (?, ?, ?)", [mensagem, versao, estrelas], (err, feedback) => {
        if (err) {
            console.error('Erro ao inserir feedback:', err);
            return res.status(500).json({ erro: 'Erro ao inserir feedback.' });
        }else{
            res.status(201).json({mensagem: 'inserimo', user: feedback

            });
        }
    }) // o [] subistitui o valor da requisição "???"
}


export async function UpdateFeed(req, res){
  const { id_usuario } = req.params;
  const { mensagem, versao, estrelas } = req.body;
  connection.query("UPDATE feedback SET mensagem = ?, versao = ?, estrelas = ? WHERE id_usuario = ?", [mensagem, versao, estrelas, id_usuario], (err, feedback)=>{
    if (err) {
      console.error('Erro ao editar feedback:', err);
      return res.status(500).json({ erro: 'Erro ao editar feedback.' });
  }else{
      res.status(201).json({mensagem: 'Editado com sucesso',user: feedback});
  }
  } )
}


export async function DeleteFeed(req, res){
  const { id_usuario } = req.params;
  connection.query("DELETE from feedback WHERE id_usuario = ?", [id_usuario], (err, feedback)=>{
    if (err) {
      console.error('Erro ao editar feedback:', err);
      return res.status(500).json({ erro: 'Erro ao excluir feedback' });
  }else{
      res.status(201).json({mensagem: 'excluído com sucesso',user: feedback});
  }
  } )
}




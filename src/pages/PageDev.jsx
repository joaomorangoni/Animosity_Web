import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./pagedev.css";
import Particles from '../components/Particles.jsx';
import Grafico from '../components/Grafico.jsx';
import Barras from '../components/Barras.jsx';
import Footer from '../components/footer/Footer.jsx';

export default function PageDev() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState({ 1:0, 2:0, 3:0, 4:0, 5:0 });
  const [atualizacoes, setAtualizacoes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ titulo: "", descricao: "", versao: "" });
  const nome= localStorage.getItem("userName")

  // Buscar feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`https://backend-animosity.vercel.app/feedbacks`);
      const data = await res.json();
      setFeedbacks(data);

      const estrelas = { 1:0, 2:0, 3:0, 4:0, 5:0 };
      data.forEach(f => {
        if (f.estrelas >= 1 && f.estrelas <= 5) estrelas[f.estrelas]++;
      });
      setAvaliacoes(estrelas);
    } catch (err) {
      console.error("Erro ao buscar feedbacks:", err);
    }
  };

  // Buscar atualizações
  const fetchAtualizacoes = async () => {
    try {
      const res = await fetch("https://backend-animosity.vercel.app/api/atualizacoes");
      const data = await res.json();
      setAtualizacoes(data);
    } catch (err) {
      console.error("Erro ao buscar atualizações:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchAtualizacoes();
  }, []);

  // Deletar feedback
  const handleDeleteFeedback = async (id_usuario, versao, mensagem) => {
    try {
      const res = await fetch(`https://backend-animosity.vercel.app/api/feedback/${id_usuario}?versao=${versao}&mensagem=${encodeURIComponent(mensagem)}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchFeedbacks();
    } catch (err) {
      console.error('Erro ao deletar feedback:', err);
    }
  };

  // Editar atualização
  const handleEditAtualizacao = (atual) => {
    setEditId(atual.id);
    setForm({ titulo: atual.titulo, descricao: atual.descricao, versao: atual.versao });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ titulo: "", descricao: "", versao: "" });
  };

  const handleSaveAtualizacao = async (id) => {
    try {
      const res = await fetch(`https://backend-animosity.vercel.app/api/atualizacoes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchAtualizacoes();
        handleCancelEdit();
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  const handleDeleteAtualizacao = async (id) => {
    try {
      const res = await fetch(`https://backend-animosity.vercel.app/api/atualizacoes/${id}`, {
        method: "DELETE"
      });
      if (res.ok) fetchAtualizacoes();
    } catch (err) {
      console.error("Erro ao deletar atualização:", err);
    }
  };
  // Função para enviar atualização
const handleEnviarAtualizacao = async () => {
  try {
    if(!form.titulo || !form.descricao || !form.versao )  {
      alert("Preencha todos os campos!");
      return;
    }

    const res = await fetch("https://backend-animosity.vercel.app/api/atualizacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if(res.ok) {
      setForm({ titulo: "", descricao: "", versao: "" , jogo: "" }); // limpa inputs
      fetchAtualizacoes(); // atualiza tabela
    } else {
      console.error("Erro ao enviar atualização");
    }
  } catch(err) {
    console.error("Erro ao enviar atualização:", err);
  }
};

const handleEnviarJogo = async () =>{
  try{
    const res = await fetch("https://backend-animosity.vercel.app/api/downloads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if(res.ok){
      
      setForm({ jogo: "" });
      alert("Jogo atualizado com sucesso!");
    } else{
      console.error("Erro ao atualizar jogo");
    }
  }catch(err){
    console.error("Erro ao atualizar jogo:", err);
  }


}





  return (
    <div className="conteudo-dev">

      <div className="banner-dev">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={1200}
          particleSpread={35}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <h1 className="olatitle">Bem vindo, dev {nome}!</h1>
      
 

      <div className="conteudo_baixo">

        <div className="caixasdodev">
          <h2>Instalações</h2>
          <Grafico/>
        </div>

        <div className="caixasdodev">
          <h2>Feedbacks</h2>
          <div className="feedbacks-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {feedbacks.length > 0 ? (
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Estrelas</th>
                    <th>Mensagem</th>
                    <th>Versão</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f, idx) => (
                    <tr key={idx}>
                      <td>{f.estrelas} ⭐</td>
                      <td>{f.mensagem}</td>
                      <td>{f.versao}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteFeedback(f.id_usuario, f.versao, f.mensagem)}
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum feedback encontrado.</p>
            )}
          </div>
        </div>

        <div className="caixasdodev">
          <h2>Avaliações</h2>
          <div className="avaliacoes-container">
            {Object.entries(avaliacoes).map(([estrela, count]) => (
              count > 0 && (
                <div key={estrela} className="avaliacao-item">
                  <span>{estrela} ⭐</span>
                  <span>{count}</span>
                </div>
              )
            ))}
          </div>
          <Barras/>
        </div>

      </div>

      <div className="conteudo_baixo">

        <div className="caixasdodev">
          <h2>Enviar Atualizações</h2>
          <input 
  className="stylish" 
  type="text" 
  placeholder="Título" 
  value={form.titulo} 
  onChange={e => setForm({...form, titulo: e.target.value})}
/>

<input 
  className="stylish" 
  type="text" 
  placeholder="Descrição" 
  value={form.descricao} 
  onChange={e => setForm({...form, descricao: e.target.value})}
/>

<input 
  className="stylish" 
  type="number" 
  placeholder="Nova Versão" 
  value={form.versao} 
  onChange={e => setForm({...form, versao: e.target.value})}
/>

<input 
  className="stylish" 
  type="text" 
  placeholder="Download do Jogo" 
  value={form.jogo || ""} 
  onChange={e => setForm({...form, jogo: e.target.value})}
/>



           <button
      className="buttonfoda"
      onClick={() => {
        handleEnviarAtualizacao();
        handleEnviarJogo();
      }}
    >
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
            </div>
            <span>Enviar</span>
          </button>
        </div>

        <div className="caixasdodev">
          <h2>Gerenciar atualizações</h2>
          <div className="feedbacks-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {atualizacoes.length > 0 ? (
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Versão</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atualizacoes.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {editId === a.id ? (
                          <input type="text" value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})} />
                        ) : (
                          a.titulo
                        )}
                      </td>
                      <td>
                        {editId === a.id ? (
                          <input type="text" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} />
                        ) : (
                          a.descricao
                        )}
                      </td>
                      <td>
                        {editId === a.id ? (
                          <input type="number" value={form.versao} onChange={(e) => setForm({...form, versao: e.target.value})} />
                        ) : (
                          a.versao
                        )}
                      </td>
                      <td>
                        {editId === a.id ? (
                          <>
                            <button className="buttondev" onClick={() => handleSaveAtualizacao(a.id)}>Salvar</button>
                            <button className="buttondev" onClick={handleCancelEdit}>Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button className="buttondev" onClick={() => handleEditAtualizacao(a)}>Editar</button>
                            <button className="buttondev" onClick={() => handleDeleteAtualizacao(a.id)}>Apagar</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhuma atualização encontrada.</p>
            )}
          </div>
          
        </div>

      </div>
      <Footer/>

    </div>
    
  );
}

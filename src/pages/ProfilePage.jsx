import React, { useState, useEffect } from 'react';
import Particles from '../components/Particles.jsx';
import "./Styles.css";
import "./ProfilePage.css";
import { CircleUserRound } from "lucide-react";
import TextType from '../components/TextType';
import Modal from "../components/Modal.jsx";
import Footer from '../components/footer/Footer.jsx';

export default function Profile() {
  // Pega dados do usuário do localStorage
  const user = {
    id: localStorage.getItem("userId"),
    nome: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail")
  };
  const [atualizacoes, setAtualizacoes] = useState([]);

  // Estados principais
  const [feedbacks, setFeedbacks] = useState([]);
  const [modal, setModal] = useState({ show: false, message: "" });
  const [show, setShow] = useState(false);

  // Estados para edição de perfil
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState(user.nome || "");
  const [foto, setFoto] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(localStorage.getItem("userPhoto") || null);

  // Busca os feedbacks do usuário
  useEffect(() => {
    if (!user.id) return;

    fetch(`http://localhost:3000/api/feedback/${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Feedbacks recebidos:", data);
        setFeedbacks(data);
      })
      .catch(err => {
        console.error("Erro ao buscar feedbacks:", err);
        setModal({ show: true, message: "Erro ao carregar feedbacks!" });
      });
  }, [user.id]);

  // Abre o modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Atualiza o preview da foto ao selecionar
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Salva alterações
 const handleSave = async () => {
  const userId = user.id; // pega do localStorage
  if (!userId) {
    setModal({ show: true, message: 'Usuário não encontrado.' });
    return;
  }

  const formData = new FormData();
  formData.append('nome', nome);
  if (foto) formData.append('foto', foto); // 'foto' é o arquivo selecionado

  try {
    const res = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
      method: 'PUT',
      body: formData // NÃO setar headers 'Content-Type'
    });

    // DEBUG: log status e body raw
    console.log('Status da resposta:', res.status);
    const data = await res.json();

    if (!res.ok) {
      console.error('Erro do servidor:', data);
      setModal({ show: true, message: data.erro || 'Erro ao atualizar perfil' });
      return;
    }

    console.log('Resposta do servidor:', data);
    setModal({ show: true, message: data.mensagem || 'Atualizado' });

    // atualizar localStorage e UI
    if (data.foto) {
      // foto salva no servidor: caminho público /uploads/...
      localStorage.setItem('userPhoto', data.foto);
      setAvatarPreview(window.location.origin + data.foto); // ou só data.foto dependendo de como você usa
    }
    localStorage.setItem('userName', nome);
    setNome(nome);
    closeModal();
  } catch (err) {
    console.error('Erro no fetch:', err);
    setModal({ show: true, message: 'Erro ao atualizar perfil!' });
  }
};

  // Navbar efeito
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
  fetch("http://localhost:3000/api/atualizacoes")
    .then(res => res.json())
    .then(data => setAtualizacoes(data))
    .catch(err => console.error("Erro ao buscar atualizações:", err));
}, []);

  return (
    <div className="conteudo">
      <nav className={`navbar ${show ? "show" : ""}`}>
        <a href="/contact">Feedback</a>
        <a href="/perfil">Perfil</a>
        <a href="#">Sair</a>
      </nav>

      {/* Banner */}
      <div className="banner-profile">
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

        <div className="profile-container">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Foto de Perfil"
              className="profile-photo"
              onClick={openModal}
            />
          ) : (
            <CircleUserRound
              className="profile-photo"
              size={90}
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            />
          )}
          <h2>{nome}</h2>
        </div>
      </div>

      {/* Modal de edição */}
      {showModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Editar Perfil</h3>

            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Foto de Perfil:</label>
            <input type="file" accept="image/*" onChange={handleFotoChange} />

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Preview"
                className="avatar-preview"
              />
            )}

            <div className="modal-buttons">
              <button onClick={handleSave}>Salvar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo inferior */}
      <div className="conteudo_baixo">
        <div className="feedbackdouser">
          <h2>Meus Feedbacks</h2>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>ESTRELAS</th>
                  <th>FEEDBACK</th>
                  <th>VERSÃO</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map(f => (
                    <tr key={f.id}>
                      <td>{f.estrelas} ⭐</td>
                      <td>{f.mensagem}</td>
                      <td>{f.versao}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Nenhum feedback encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="feedbackdouser">
          <h2>Jogue Agora!</h2>
          <p>Clique em instalar para começar sua aventura única e incrível</p>
          <p>Ao clicar, seu download iniciará em 5 segundos.</p>
          <button className="button">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              height="40"
              width="40"
              className="button__icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path>
              <path d="M7 11l5 5 5-5"></path>
              <path d="M12 4l0 12"></path>
            </svg>
            <span className="button__text">Download</span>
          </button>
        </div>

        <div className="feedbackdouser">
          <h2>Atualizações</h2>
          {atualizacoes.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Versão</th>
        </tr>
      </thead>
      <tbody>
        {atualizacoes.map((a, idx) => (
          <tr key={idx}>
            <td>{a.titulo}</td>
            <td>{a.descricao}</td>
            <td>{a.versao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p style={{ textAlign: "center" }}>Nenhuma atualização encontrada.</p>
  )}
          
        </div>
      </div>

      {/* Modal de mensagens */}
      <Modal show={modal.show} message={modal.message} onClose={() => setModal({ ...modal, show: false })} />
      <Footer/>
    </div>
  );
}

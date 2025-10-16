import React, { useState, useEffect } from 'react';
import Particles from '../components/Particles.jsx';
import { CircleUserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal.jsx";
import StarRating from "../components/StarRating.jsx";
import Footer from '../components/footer/Footer.jsx';
import "./ProfilePage.css";
import "./Styles.css";
import '../App.css';

export default function Contact() {
  // ----------------- USUÁRIO -----------------
  const user = {
    id: localStorage.getItem("userId"),
    nome: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail")
  };
  console.log("Usuário carregado do localStorage:", user);

  // ----------------- NAVBAR -----------------
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      setShowNavbar(e.clientY < 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ----------------- MODAL FEEDBACK -----------------
  const [feedbackModal, setFeedbackModal] = useState({ show: false, message: "" });
  const closeFeedbackModal = () => setFeedbackModal({ ...feedbackModal, show: false });

  // ----------------- MODAL EDIÇÃO PERFIL -----------------
  const [editModal, setEditModal] = useState(false);
  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);

  // ----------------- FEEDBACK -----------------
  const [feedback, setFeedback] = useState({
    mensagem: "",
    estrelas: 5,
    versao: "1.1"
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const handleFeedbackSubmit = () => {
    const trimmedMensagem = feedback.mensagem.trim();
    if (!trimmedMensagem) {
      setFeedbackModal({ show: true, message: "Por favor, escreva seu feedback!" });
      return;
    }
    if (trimmedMensagem.length < 10) {
      setFeedbackModal({ show: true, message: "O feedback deve ter pelo menos 10 caracteres!" });
      return;
    }

    const payload = { ...feedback, id_usuario: user.id };

    fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Resposta do servidor:", data);
        setFeedbackModal({ show: true, message: "Feedback enviado com sucesso!" });
        setFeedback({ mensagem: "", estrelas: 5, versao: "1.1" });
        // Atualiza lista local de feedbacks
        setFeedbacks(prev => [...prev, payload]);
      })
      .catch(err => {
        console.error("Erro no envio:", err);
        setFeedbackModal({ show: true, message: "Erro ao enviar feedback!" });
      });
  };

  useEffect(() => {
    if (!user.id) return;
    fetch(`http://localhost:3000/api/feedback/${user.id}`)
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => setFeedbackModal({ show: true, message: "Erro ao carregar feedbacks!" }));
  }, [user.id]);

  // ----------------- PERFIL -----------------
  const [nome, setNome] = useState(user.nome || "");
  const [foto, setFoto] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(localStorage.getItem("userPhoto") || null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!user.id) {
      setFeedbackModal({ show: true, message: "Usuário não encontrado." });
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    if (foto) formData.append('foto', foto);

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${user.id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        setFeedbackModal({ show: true, message: data.erro || "Erro ao atualizar perfil" });
        return;
      }

      if (data.foto) {
        localStorage.setItem('userPhoto', data.foto);
        setAvatarPreview(window.location.origin + data.foto);
      }
      localStorage.setItem('userName', nome);
      setNome(nome);
      closeEditModal();
      setFeedbackModal({ show: true, message: data.mensagem || "Perfil atualizado!" });
    } catch (err) {
      console.error(err);
      setFeedbackModal({ show: true, message: "Erro ao atualizar perfil!" });
    }
  };

  return (
    <div className="conteudo">
      {/* Navbar */}
      <AnimatePresence>
              {showNavbar && (
                <motion.nav
                  className="navbar-round"
                  initial={{ opacity: 0, y: -25, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ul>
                    <li><a href="/">Início</a></li>
                    <li><a href="/profile">Perfil</a></li>
                    <li><a href="/contato">Sair</a></li>
                  </ul>
                </motion.nav>
              )}
              </AnimatePresence>

      {/* Banner + Perfil */}
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
              style={{ borderRadius: "50%" }}
              onClick={openEditModal}
            />
          ) : (
            <CircleUserRound
              size={90}
              className="profile-photo"
              onClick={openEditModal}
              style={{ cursor: "pointer" }}
            />
          )}
          <h2>{nome}</h2>
        </div>
      </div>

      {/* Modal de edição do perfil */}
      <AnimatePresence>
        {editModal && (
          <motion.div
            className="edit-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="edit-modal-content"
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3>Editar Perfil</h3>
              <label>Nome:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

              <label>Foto de Perfil:</label>
              <label className="file-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: "none" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Foto</span>
              </label>

              {avatarPreview && (
                <img src={avatarPreview} alt="Preview" className="avatar-preview" style={{ borderRadius: "50%" }} />
              )}

              <div className="modal-buttons">
                <button onClick={handleSaveProfile}>Salvar</button>
                <button onClick={closeEditModal}>Cancelar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <div className="box1">
        <h1 className="titulo">Feedback!</h1>

        <StarRating
          rating={feedback.estrelas}
          setRating={(newRating) => setFeedback({ ...feedback, estrelas: newRating })}
        />

        <textarea
          className="input1"
          placeholder="Escreva seu feedback..."
          value={feedback.mensagem}
          onChange={(e) => setFeedback({ ...feedback, mensagem: e.target.value })}
        />

        <div className="version-dropdown">
          <label htmlFor="versao">Versão do jogo</label>
          <select
            value={feedback.versao}
            onChange={(e) => setFeedback({ ...feedback, versao: e.target.value })}
          >
            <option value="1.1">1.1</option>
            <option value="1.1.1">1.1.1</option>
            <option value="1.2">1.2</option>
            <option value="1.3">1.3</option>
          </select>
        </div>

        <div className="button-container">
          <button className="button1" onClick={handleFeedbackSubmit}>Enviar</button>
        </div>


       
      </div>

      {/* Modal de alerta/feedback */}
      <Modal
        show={feedbackModal.show}
        message={feedbackModal.message}
        onClose={closeFeedbackModal}
      />

      <Footer />
    </div>
  );
}

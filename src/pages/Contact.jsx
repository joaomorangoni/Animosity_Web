import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Download,
  SendHorizontal,
  UserRound,
  X,
  Camera
} from "lucide-react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [feedback, setFeedback] = useState("");
  const [estrelas, setEstrelas] = useState(0); // ⭐ novo estado para estrelas
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    nome: "Username",
    email: "email@exemplo.com",
    foto: "",
    senha: ""
  });

  // Buscar avaliações da API
  useEffect(() => {
    fetch("http://localhost:5000/avaliacoes")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Erro ao carregar avaliações:", err));
  }, []);

  // Enviar avaliação para API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (estrelas < 1) {
      alert("Selecione ao menos 1 estrela!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/avaliacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: profile.nome,
          estrelas,
          texto: feedback
        })
      });

      const novo = await res.json();
      if (res.ok) {
        setFeedbacks((prev) => [...prev, novo.avaliacao]);
        setFeedback("");
        setEstrelas(0); // ⭐ resetar estrelas após envio
      } else {
        alert(novo.mensagem || "Erro ao enviar feedback.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleModalToggle = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setProfile((prev) => ({ ...prev, foto: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Perfil atualizado com sucesso!");
    setShowModal(false);
  };

  return (
    <div className="pg">
      {/* TOPO COM PARTÍCULAS */}
      <div className="starsWrap" aria-hidden="true">
        <div className="stars layer1" />
        <div className="stars layer2" />
        <div className="stars layer3" />
      </div>

      {/* CARTÃO PRINCIPAL */}
      <main className="card">
        {/* AVATAR CENTRAL SOBREPOSTO */}
        <div className="avatarWrap">
          <div className="avatar">
            {profile.foto ? (
              <img
                src={profile.foto}
                alt="avatar"
                style={{ width: "100%", height: "100%", borderRadius: "999px" }}
              />
            ) : (
              <UserRound className="avatarIcon" />
            )}
            <button
              className="editBadge"
              title="Editar perfil"
              onClick={handleModalToggle}
            >
              <Pencil size={16} />
            </button>
          </div>
          <h2 className="hello">Olá {profile.nome}</h2>
        </div>

        {/* CONTEÚDO EM 3 COLUNAS */}
        <section className="grid">
          {/* ESQUERDA — ATUALIZAÇÕES */}
          <motion.aside
            className="panel updates"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Atualizações</h3>
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
          </motion.aside>

          {/* CENTRO — FEEDBACK */}
          <motion.section
            className="panel feedback"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <h3>Deixe um feedback!</h3>
            <form onSubmit={handleSubmit} className="feedbackForm">
              {/* ⭐ input de estrelas */}
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => setEstrelas(num)}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: num <= estrelas ? "#FFD700" : "#ccc"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Escreva seu feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                aria-label="Área de feedback"
              />
              {/* Botão só aparece com 10+ chars */}
              <AnimatePresence>
                {feedback.trim().length >= 10 && (
                  <motion.button
                    type="submit"
                    className="btnSend"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SendHorizontal size={18} />
                    Enviar
                  </motion.button>
                )}
              </AnimatePresence>
            </form>

            {/* Lista de avaliações */}
            <div className="feedbackList">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="feedbackItem">
                  <strong>{fb.nome}</strong> —{" "}
                  {Array.from({ length: fb.estrelas }, (_, i) => (
                    <span key={i} style={{ color: "#FFD700" }}>★</span>
                  ))}
                  {Array.from({ length: 5 - fb.estrelas }, (_, i) => (
                    <span key={i} style={{ color: "#ccc" }}>★</span>
                  ))}
                  <p>{fb.texto}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* DIREITA — BAIXE AGORA */}
          <motion.aside
            className="panel download"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>baixe agora!</h3>
            <p className="dlText">animosidade é um jogo blablabla</p>
            <button className="btnInstall" type="button">
              <Download size={18} />
              INSTALAR!
            </button>
          </motion.aside>
        </section>
      </main>

      {/* MODAL DE EDIÇÃO */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="modalOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="modalContent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="closeModal" onClick={handleModalToggle}>
                <X size={20} />
              </button>
              <h2>Editar Perfil</h2>
              <div className="modalForm">
                <div className="photoPreview">
                  {profile.foto ? (
                    <img src={profile.foto} alt="avatar" />
                  ) : (
                    <Camera size={40} color="#fff" />
                  )}
                </div>
                <label>
                  Nome:
                  <input
                    type="text"
                    name="nome"
                    value={profile.nome}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                  />
                </label>
                <label>
                  Nova senha:
                  <input
                    type="password"
                    name="senha"
                    placeholder="Digite a nova senha"
                    value={profile.senha}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Alterar foto:
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </label>
                <button className="btnSave" onClick={handleSave}>
                  Salvar alterações
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

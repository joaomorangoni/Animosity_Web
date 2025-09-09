// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Download,
  SendHorizontal,
  UserRound,
  X,
  Camera,
} from "lucide-react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [feedback, setFeedback] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [erroEstrelas, setErroEstrelas] = useState("");
  const [profile, setProfile] = useState({
    nome: "Username",
    email: "email@exemplo.com",
    foto: "",
    senha: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const res = await fetch("http://localhost:5000/avaliacoes");
        if (!res.ok) {
          console.warn("fetch /avaliacoes retornou status:", res.status);
          setFeedbacks([]);
          return;
        }
        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar avaliações:", err);
        setFeedbacks([]);
      }
    };
    fetchAvaliacoes();

    const saved = localStorage.getItem("erroEstrelas");
    if (saved) setErroEstrelas(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estrelas < 1) {
      const msg = "É necessário selecionar pelo menos 1 estrela!";
      setErroEstrelas(msg);
      try { localStorage.setItem("erroEstrelas", msg); } catch {}
      return;
    }

    setLoadingSubmit(true);
    try {
      const res = await fetch("http://localhost:5000/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: profile.nome,
          email: profile.email,
          estrelas,
          texto: feedback,
        }),
      });

      let novo = {};
      try { novo = await res.json(); } catch {}

      if (res.ok) {
        const created = novo.avaliacao ? novo.avaliacao : novo;
        setFeedbacks((prev) => [...prev, created]);
        setFeedback("");
        setEstrelas(0);
        setErroEstrelas("");
        try { localStorage.removeItem("erroEstrelas"); } catch {}
      } else {
        const mensagem = novo.mensagem || "Erro ao enviar feedback.";
        alert(mensagem);
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação. Veja o console.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleModalToggle = () => setShowModal(!showModal);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((prev) => ({ ...prev, foto: reader.result }));
    reader.readAsDataURL(file);
  };
  const handleSave = () => {
    alert("Perfil atualizado com sucesso!");
    setShowModal(false);
  };

  const meusFeedbacks = feedbacks.filter(
    (fb) => fb.email === profile.email
  );

  return (
    <div className="pg">
      <div className="starsWrap" aria-hidden="true">
        <div className="stars layer1" />
        <div className="stars layer2" />
        <div className="stars layer3" />
      </div>

      <main className="card">
        <div className="avatarWrap">
          <div className="avatar" onClick={handleModalToggle} style={{ cursor: "pointer" }}>
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
          <h2 className="hello">Olá {profile.email}</h2>
        </div>

        <section className="grid">
          <motion.aside className="panel updates" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Atualizações</h3>
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
          </motion.aside>

          <motion.section className="panel feedback" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h3>Deixe um feedback!</h3>
            <form onSubmit={handleSubmit} className="feedbackForm">
              <div className="stars-input" aria-label="Classificação por estrelas">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => {
                      setEstrelas(num);
                      if (erroEstrelas) {
                        setErroEstrelas("");
                        try { localStorage.removeItem("erroEstrelas"); } catch {}
                      }
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: num <= estrelas ? "#FFD700" : "#ccc",
                    }}
                    role="button"
                    aria-pressed={num <= estrelas}
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

              {erroEstrelas && (
                <p style={{ color: "red", marginTop: 6, marginBottom: 8 }}>{erroEstrelas}</p>
              )}

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
                    disabled={loadingSubmit}
                  >
                    <SendHorizontal size={18} />
                    {loadingSubmit ? "Enviando..." : "Enviar"}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>

            {!erroEstrelas && (
              <div className="feedbackList">
                {meusFeedbacks.length === 0 && <p className="emptyFeedbacks">Você ainda não enviou nenhum feedback.</p>}
                {meusFeedbacks.map((fb) => (
                  <div key={fb.id ?? `${fb.nome}-${Math.random()}`} className="feedbackItem">
                    <strong>{fb.nome}</strong> —{" "}
                    {Array.from({ length: fb.estrelas }, (_, i) => (
                      <span key={i} style={{ color: "#FFD700" }}>★</span>
                    ))}
                    {Array.from({ length: 5 - (fb.estrelas || 0) }, (_, i) => (
                      <span key={i} style={{ color: "#ccc" }}>★</span>
                    ))}
                    <p>{fb.texto}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          <motion.aside className="panel download" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
      {/* Overlay */}
      <motion.div
        className="modalOverlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleModalToggle}
      />

      {/* Conteúdo do modal */}
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
          {/* Preview da foto */}
          <div className="photoPreview">
            {profile.foto ? (
              <img src={profile.foto} alt="avatar" />
            ) : (
              <Camera size={40} color="#fff" />
            )}
            {/* Input de upload sobreposto à imagem */}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          {/* Nome */}
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={profile.nome}
              onChange={handleChange}
            />
          </label>

          {/* Email (não editável) */}
          <label>
            Email:
            <input type="email" name="email" value={profile.email} readOnly />
          </label>

          {/* Senha */}
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

          {/* Botão salvar */}
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

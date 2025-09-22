// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Download, SendHorizontal, UserRound, X, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [erroEstrelas, setErroEstrelas] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [profile, setProfile] = useState({ nome: "", email: "", foto: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return navigate("/login");
    try {
      setProfile(JSON.parse(savedUser));
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const res = await fetch("http://localhost:5000/avaliacoes");
        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch {
        setFeedbacks([]);
      }
    };
    fetchAvaliacoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim().length < 10) {
      setTooltip(true);
      setTimeout(() => setTooltip(false), 2000);
      return;
    }
    if (estrelas < 1) {
      setErroEstrelas("É necessário selecionar pelo menos 1 estrela!");
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
      const novo = await res.json();
      if (res.ok) {
        setFeedbacks((prev) => [...prev, novo.avaliacao ?? novo]);
        setFeedback("");
        setEstrelas(0);
        setErroEstrelas("");
      } else alert(novo.mensagem ?? "Erro ao enviar feedback.");
    } catch {
      alert("Erro ao enviar avaliação. Veja o console.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleModalToggle = () => setShowModal(!showModal);
  const handleChange = (e) => setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((prev) => ({ ...prev, foto: reader.result }));
    reader.readAsDataURL(file);
  };
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/usuarios/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.mensagem ?? "Erro ao atualizar perfil.");
        return;
      }
      const atualizado = await res.json();
      setProfile(atualizado);
      localStorage.setItem("user", JSON.stringify(atualizado));
      alert("Perfil atualizado com sucesso!");
      setShowModal(false);
    } catch {
      alert("Erro ao atualizar perfil.");
    }
  };

  const meusFeedbacks = feedbacks.filter((fb) => fb.email === profile.email);
  const firstPartEmail = profile.email?.split("@")[0] ?? "";

  return (
    <div className="pg">
      <div className="starsWrap" aria-hidden="true">
        <div className="stars layer1" />
        <div className="stars layer2" />
        <div className="stars layer3" />
      </div>

      <main className="card">
        <div className="avatarWrap">
          <div className="avatar">
            {profile.foto ? (
              <img src={profile.foto} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "999px" }} />
            ) : (
              <UserRound className="avatarIcon" />
            )}
            <button className="editBadge" title="Editar perfil" onClick={handleModalToggle}><Pencil size={16} /></button>
          </div>
          <h2 className="hello">Olá {profile.nome || firstPartEmail}</h2>
        </div>

        {/* GRID LADO A LADO */}
        <section className="gridPanelsRow">
          {/* Atualizações */}
          <motion.aside className="panel updates" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Atualizações</h3>
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
          </motion.aside>

          {/* Feedback */}
          <motion.section className="panel feedback" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h3>Deixe um feedback!</h3>
            <form onSubmit={handleSubmit} className="feedbackForm">
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} onClick={() => { setEstrelas(num); if (erroEstrelas) setErroEstrelas(""); }} style={{ cursor: "pointer", fontSize: "20px", color: num <= estrelas ? "#FFD700" : "#ccc" }}>
                    ★
                  </span>
                ))}
              </div>
              <textarea placeholder="Escreva seu feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              {erroEstrelas && <p style={{ color: "red" }}>{erroEstrelas}</p>}

              <div style={{ position: "relative" }}>
                <button
                  type="submit"
                  disabled={feedback.trim().length < 10 || loadingSubmit}
                  className="btnSend"
                  style={{ opacity: feedback.trim().length < 10 ? 0 : 1, pointerEvents: feedback.trim().length < 10 ? "none" : "auto" }}
                >
                  {loadingSubmit ? "Enviando..." : "Enviar"} <SendHorizontal size={18} />
                </button>

                {feedback.trim().length < 10 && tooltip && (
                  <div className="tooltip">É necessário escrever pelo menos 10 caracteres!</div>
                )}
              </div>
            </form>

            <div className="feedbackList">
              {meusFeedbacks.length === 0 && <p className="emptyFeedbacks">Você ainda não enviou nenhum feedback.</p>}
              {meusFeedbacks.map((fb) => (
                <div key={fb.id ?? `${fb.nome}-${Math.random()}`} className="feedbackItem">
                  <strong>{fb.nome}</strong> — {Array.from({ length: fb.estrelas }, (_, i) => <span key={i} style={{ color: "#FFD700" }}>★</span>)}
                  {Array.from({ length: 5 - fb.estrelas }, (_, i) => <span key={i} style={{ color: "#ccc" }}>★</span>)}
                  <p>{fb.texto}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Download do jogo */}
          <motion.aside className="panel download" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3>Baixe agora!</h3>
            <p className="dlText">Animosidade é um jogo incrível! Instale e divirta-se.</p>
            <button className="btnInstall" type="button">
              <Download size={18} /> INSTALAR!
            </button>
          </motion.aside>
        </section>
      </main>

      {/* MODAL DE EDIÇÃO */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={handleModalToggle} />
            <motion.div className="modalContent" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <button className="closeModal" onClick={handleModalToggle}><X size={20} /></button>
              <h2>Editar Perfil</h2>
              <div className="modalForm">
                <div className="photoPreview">
                  {profile.foto ? <img src={profile.foto} alt="avatar" /> : <Camera size={40} color="#fff" />}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>

                <label>Nome:
                  <input type="text" name="nome" value={profile.nome} onChange={handleChange} />
                </label>

                <label>Email:
                  <input type="email" name="email" value={profile.email} readOnly />
                </label>

                <label>Nova senha:
                  <button className="btnChangePassword" type="button" onClick={() => navigate("/mudar-senha")}>
                    Alterar senha
                  </button>
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

// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Download, SendHorizontal, UserRound, X, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  // ======= Estados =======
  const [profile, setProfile] = useState({ nome: "", email: "", foto: "" });
  const [showEditModal, setShowEditModal] = useState(false);

  // Feedback
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Modal de status (erro/sucesso)
  const [statusModal, setStatusModal] = useState({ show: false, success: false, message: "" });

  // Editar feedback
  const [editingFeedback, setEditingFeedback] = useState(null);

  // ======= Carregar perfil =======
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return navigate("/login");
    try {
      setProfile(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  // ======= Carregar feedbacks =======
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

  // ======= Função enviar/editar feedback =======
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim().length < 10) {
      return showStatusModal(false, "Feedback deve ter pelo menos 10 caracteres!");
    }
    if (estrelas < 1) {
      return showStatusModal(false, "Selecione pelo menos 1 estrela!");
    }

    setLoadingSubmit(true);
    try {
      let res;
      if (editingFeedback) {
        res = await fetch(`http://localhost:5000/avaliacoes/${editingFeedback.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: feedback, estrelas }),
        });
      } else {
        res = await fetch("http://localhost:5000/avaliacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: profile.nome, email: profile.email, estrelas, texto: feedback }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || "Erro ao enviar feedback.");

      if (editingFeedback) {
        setFeedbacks((prev) =>
          prev.map((fb) => (fb.id === editingFeedback.id ? { ...fb, texto: feedback, estrelas } : fb))
        );
      } else {
        setFeedbacks((prev) => [...prev, data.avaliacao ?? data]);
      }

      setFeedback("");
      setEstrelas(0);
      setEditingFeedback(null);
      showStatusModal(true, "Feedback enviado com sucesso!");
    } catch (err) {
      showStatusModal(false, err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ======= Modal de status =======
  const showStatusModal = (success, message) => {
    setStatusModal({ show: true, success, message });
  };

  const closeStatusModal = () => {
    setStatusModal({ show: false, success: false, message: "" });
  };

  // ======= Deletar feedback =======
  const handleDeleteFeedback = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/avaliacoes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar feedback.");
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
      showStatusModal(true, "Feedback deletado!");
    } catch (err) {
      showStatusModal(false, err.message);
    }
  };

  // ======= Editar feedback =======
  const handleEditFeedback = (fb) => {
    setFeedback(fb.texto);
    setEstrelas(fb.estrelas);
    setEditingFeedback(fb);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ======= Modal de edição do perfil =======
  const handleEditToggle = () => setShowEditModal(!showEditModal);

  const handleChange = (e) => setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);
        setProfile((prev) => ({ ...prev, foto: canvas.toDataURL("image/png") }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => setProfile((prev) => ({ ...prev, foto: "" }));

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/usuarios/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const err = await res.json();
        return showStatusModal(false, err.mensagem || "Erro ao atualizar perfil.");
      }
      const atualizado = await res.json();
      setProfile(atualizado);
      localStorage.setItem("user", JSON.stringify(atualizado));
      showStatusModal(true, "Perfil atualizado!");
      setShowEditModal(false);
    } catch {
      showStatusModal(false, "Erro ao atualizar perfil.");
    }
  };

  const meusFeedbacks = feedbacks.filter((fb) => fb.email === profile.email);
  const firstPartEmail = profile.email?.split("@")[0] ?? "";

  return (
    <div className="pg">
      {/* ======= Topo com estrelas ======= */}
      <div className="starsWrap">
        <div className="stars layer1" />
        <div className="stars layer2" />
        <div className="stars layer3" />
      </div>

      {/* ======= Cartão principal ======= */}
      <main className="card">
        {/* Avatar e nome */}
        <div className="avatarWrap">
          <div className="avatar">
            {profile.foto ? <img src={profile.foto} alt="avatar" /> : <UserRound className="avatarIcon" />}
            <button className="editBadge" onClick={handleEditToggle}><Pencil size={16} /></button>
          </div>
          <h2 className="hello">Olá {profile.nome || firstPartEmail}</h2>
        </div>

        {/* ======= Seções lado a lado ======= */}


            {/* Feedback */}
          <motion.section className="panel feedback" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h3>Deixe um feedback!</h3>
            <form onSubmit={handleSubmit} className="feedbackForm">
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} onClick={() => setEstrelas(num)} style={{ cursor: "pointer", fontSize: "20px", color: num <= estrelas ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>
              <textarea placeholder="Escreva seu feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />

              <div className="submitWrapper">
                <div className="tooltipWrapper">
                  <button
  type="submit"
  className={`btnSend ${feedback.trim().length < 10 ? "disabled" : ""}`}
  disabled={feedback.trim().length < 10 || loadingSubmit}
>
  {loadingSubmit ? "Enviando..." : editingFeedback ? "Atualizar" : "Enviar"} <SendHorizontal size={18} />
</button>

                  {feedback.trim().length < 10 && (
                    <span className="tooltip">O feedback precisa ter pelo menos 10 caracteres</span>
                  )}
                </div>
              </div>
            </form>

            {/* Lista de feedbacks do usuário */}
            <div className="feedbackList">
              {meusFeedbacks.map((fb) => (
                <div key={fb.id} className="feedbackItem">
                  <div className="feedbackHeader">
                    <strong>{fb.nome}</strong>
                    <div className="feedbackStars">
                      {[...Array(5)].map((_, i) => <span key={i} style={{ color: i < fb.estrelas ? "#FFD700" : "#ccc" }}>★</span>)}
                    </div>
                  </div>
                  <p>{fb.texto}</p>
                  <div className="feedbackActions">
                    <button onClick={() => handleEditFeedback(fb)}><Edit2 size={16} /></button>
                    <button onClick={() => handleDeleteFeedback(fb.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        <section className="gridPanelsRow">
          {/* Atualizações */}
          <motion.aside className="panel updates" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Atualizações</h3>
            <div className="pill" />
            <div className="pill" />
            <div className="pill" />
          </motion.aside>

      

          {/* Baixe agora */}
          <motion.aside className="panel download" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3>Baixe agora</h3>
            <div className="dlText">Versão 1.2.3 disponível</div>
            <button className="btnInstall">
              <Download size={16} /> Instalar
            </button>
          </motion.aside>
        </section>
      </main>

      {/* ======= Modal de edição perfil ======= */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modalContent" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <button className="closeModal" onClick={handleEditToggle}><X size={18} /></button>
              <h3>Editar Perfil</h3>

              <div className="photoPreview">
                {profile.foto && <img src={profile.foto} alt="avatar" />}
                <input type="file" onChange={handlePhotoChange} />
                {profile.foto && (
                  <button onClick={handleDeletePhoto} style={{ position: "absolute", top: 4, right: 4, background: "#e74c3c", border: "none", borderRadius: "50%", color: "#fff", width: 24, height: 24, cursor: "pointer" }}>X</button>
                )}
              </div>

              <div className="modalForm">
                <label>
                  Nome
                  <input type="text" name="nome" value={profile.nome} onChange={handleChange} />
                </label>
                <label>
                  Email
                  <input type="email" name="email" value={profile.email} readOnly />
                </label>

                <button className="btnSave" onClick={handleSave}>Salvar</button>
                <button className="btnSave" style={{ backgroundColor: "#2f8bff" }} onClick={() => navigate("/alterar-senha")}>
                  Alterar senha
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======= Modal de status (sucesso/erro) ======= */}
      <AnimatePresence>
        {statusModal.show && (
          <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modalContent" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "12px" }}>
                {statusModal.success ? "✅" : "❌"}
              </div>
              <p style={{ textAlign: "center" }}>{statusModal.message}</p>
              <button className="btnSave" onClick={closeStatusModal} style={{ alignSelf: "center", marginTop: "8px" }}>OK</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// src/components/Login.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

export default function Login() {
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  // canvas de estrelas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 2 + 1,
      }));
    };

    const animate = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#B3E8E5";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.z;
        if (s.y > h) s.y = 0;
      });
      rafId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // cadastro
  const handleCadastro = async () => {
    setLoading(true);
    setMensagem("");
    if (!email || !senha) {
      setMensagem("Preencha email e senha.");
      setLoading(false);
      return;
    }

    const nomeDefault = email.split("@")[0];

    try {
      const res = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, nome: nomeDefault }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.usuario));
        window.location.href = "/contact";
      } else {
        setMensagem(data.mensagem || "Erro no cadastro.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  // login
  const handleLogin = async () => {
    setLoading(true);
    setMensagem("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.usuario));
        window.location.href = "/contact";
      } else {
        setMensagem(data.mensagem || "Credenciais inválidas.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao logar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="login-box">
        <h1>Bem-vindo!</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button onClick={handleCadastro} disabled={loading}>{loading ? "Aguarde..." : "Registrar"}</button>
        <button onClick={() => setModalOpen(true)}>Entrar</button>

        {mensagem && <p className="login-message">{mensagem}</p>}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target.classList.contains("modal-backdrop") && setModalOpen(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2>Login</h2>
              <div className="social-login">
                <button><FcGoogle /> Google</button>
                <button>Steam</button>
                <button>PSN</button>
                <button>Nintendo</button>
              </div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
              <button onClick={handleLogin} disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
              {mensagem && <p>{mensagem}</p>}
              <button onClick={() => setModalOpen(false)}>Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// src/components/Login.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

/**
 * Componente de login robusto:
 * - mantém animação em canvas
 * - usa window.location.href para navegar (não depende de useNavigate/Router)
 * - usa imagens via /img/... (coloque seus arquivos em public/img/)
 */

export default function Login() {
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  // animação de estrelas (canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId = null;

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
      ctx.fillStyle = "#9DB2BF";
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
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // função de cadastro (mantida como exemplo)
  const handleCadastro = async () => {
    setLoading(true);
    try {
      const resposta = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();
      setMensagem(dados.mensagem || (resposta.ok ? "Cadastro realizado!" : "Erro no cadastro"));
      // opcional: redirecionar após cadastro bem-sucedido
      if (resposta.ok) {
        // navegação segura (sempre funciona)
        window.location.href = "/contact";
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setMensagem("Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  // função de login: redireciona para /contact em caso de sucesso
  const handleLogin = async () => {
    setLoading(true);
    setMensagem("");
    try {
      const resposta = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      // tenta parsear resposta JSON (pode falhar se backend não retornar JSON)
      let dados = {};
      try {
        dados = await resposta.json();
      } catch (e) {
        // ignore parsing error
      }

      if (resposta.ok) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("usuario", email);
        setModalOpen(false);

        // Redirecionamento: window.location.href é compatível mesmo sem Router ativo
        window.location.href = "/contact";
      } else {
        setMensagem(dados.mensagem || "Credenciais inválidas.");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      setMensagem("Erro ao logar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* canvas de fundo */}
      <canvas ref={canvasRef} className="stars-canvas" />

      {/* logo (coloque logoimg.png dentro de public/img/) */}
      <div className="logo-left">
        <img src="/img/logoimg.png" alt="Logo" className="logo-image" onError={(e)=>{e.currentTarget.style.display='none'}} />
      </div>

      {/* formulário principal */}
      <motion.div
        className="login-box"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="login-title">Instale já!</h1>
        <p className="login-subtitle">Inscreva-se hoje</p>

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="input-field"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="btn-create" onClick={handleCadastro} disabled={loading}>
          {loading ? "Aguarde..." : "Registrar"}
        </button>

        <div className="divider"><span>OU</span></div>

        <button className="btn-create" onClick={() => setModalOpen(true)}>
          Entrar
        </button>

        <button className="btn-back" onClick={() => (window.location.href = "/")}>
          Voltar
        </button>

        {mensagem && <p className="login-message">{mensagem}</p>}
      </motion.div>

      {/* Modal de login */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target.classList.contains("modal-backdrop") && setModalOpen(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="modal-title">Login</h2>

              <div className="modal-buttons">
                <button className="btn-google"><FcGoogle /> Google</button>

                {/* imagens via public/img/ (coloque os arquivos lá) */}
                <button className="btn-steam">
                  <img src="/img/steam.svg" className="icon-img" alt="Steam" onError={(e)=>{e.currentTarget.style.display='none'}} /> Steam
                </button>
                <button className="btn-ps4">
                  <img src="/img/PS4.svg" className="icon-img" alt="PS4" onError={(e)=>{e.currentTarget.style.display='none'}} /> PS4
                </button>
                <button className="btn-xbox">
                  <img src="/img/Xbox.svg" className="icon-img" alt="Xbox" onError={(e)=>{e.currentTarget.style.display='none'}} /> Xbox
                </button>
                <button className="btn-nintendo">
                  <img src="/img/Nintendo.svg" className="icon-img" alt="Nintendo" onError={(e)=>{e.currentTarget.style.display='none'}} /> Nintendo
                </button>
              </div>

              <div className="modal-divider"><span>OU</span></div>

              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className="input-field"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button className="btn-create" onClick={handleLogin} disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>

              {mensagem && <p className="login-message">{mensagem}</p>}

              <p className="login-footer">
                <span className="login-link" onClick={() => setModalOpen(false)}>Fechar ✖</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

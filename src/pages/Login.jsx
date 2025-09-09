import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import SteamIcon from "../../public/img/steam.svg";
import PS4Icon from "../../public/img/PS4.svg";
import XboxIcon from "../../public/img/Xbox.svg";
import NintendoIcon from "../../public/img/Nintendo.svg";

import "./Login.css";

export default function Login() {
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ⬅️ NOVO: estados para email, senha e mensagem
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w, h;

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
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // ⬅️ NOVO: funções para cadastro e login
  const handleCadastro = async () => {
    try {
      const resposta = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
    } catch (err) {
      setMensagem("Erro ao cadastrar.");
    }
  };

  const handleLogin = async () => {
    try {
      const resposta = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("usuario", email); // ⬅️ NOVO exemplo
        setModalOpen(false);
      } else {
        setMensagem(dados.mensagem);
      }
    } catch (err) {
      setMensagem("Erro ao logar.");
    }
  };

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="stars-canvas" />

      <div className="logo-left">
        <img src="../../public/img/logoimg.png" alt="Logo" className="logo-image" />
      </div>

      {/* Animação do formulário */}
      <motion.div
        className="login-box"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="login-title">Instale já!</h1>
        <p className="login-subtitle">Inscreva-se hoje</p>

        {/* ⬅️ ALTERADO: inputs controlados */}
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

        {/* ⬅️ ALTERADO: botão chama cadastro */}
        <button className="btn-create" onClick={handleCadastro}>
          Registrar
        </button>

        <div className="divider"><span>OU</span></div>

        <button className="btn-create" onClick={() => setModalOpen(true)}>Entrar</button>
        
        {/* Botão Voltar */}
        <button
          className="btn-back"
          onClick={() => (window.location.href = "/")}
        >
          Voltar
        </button>

        {/* ⬅️ NOVO: mensagem de feedback */}
        {mensagem && <p className="login-message">{mensagem}</p>}
      </motion.div>

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
                <button className="btn-steam"><img src={SteamIcon} className="icon-img" alt="Steam" /> Steam</button>
                <button className="btn-ps4"><img src={PS4Icon} className="icon-img" alt="PS4" /> PS4</button>
                <button className="btn-xbox"><img src={XboxIcon} className="icon-img" alt="Xbox" /> Xbox</button>
                <button className="btn-nintendo"><img src={NintendoIcon} className="icon-img" alt="Nintendo" /> Nintendo</button>
              </div>

              <div className="modal-divider"><span>OU</span></div>

              {/* ⬅️ ALTERADO: inputs controlados */}
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

              {/* ⬅️ ALTERADO: botão chama login */}
              <button className="btn-create" onClick={handleLogin}>
                Entrar
              </button>

              {/* feedback dentro do modal */}
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

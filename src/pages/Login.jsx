import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, XCircle, CheckCircle } from "lucide-react";
import Particles from "../components/Particles.jsx";
import Input1 from "../components/inputlogin.jsx";
import api from "../services/api";
import "./Login.css";
import { FaGoogle, FaPlaystation, FaXbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios"; // ✅ IMPORTAÇÃO NECESSÁRIA
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // 🔹 Login tradicional
async function handleLogin(e) {
  e.preventDefault();
  try {
    const res = await api.post("/usuarios/login", { email, senha });

    const token = res.data.token; // pega token do backend
    const user = res.data.user;

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.nome);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("token", token);

    // redireciona conforme adm
    if (user.adm === 1) {
      navigate("/dev"); // se for admin/dev
    } else {
      navigate("/profile"); // se não
    }

    setMensagem(`Login ok! Bem-vindo, ${user.nome}`);
  } catch (err) {
    setMensagem(err.response?.data?.erro || "Erro no servidor");
  }
}

  // 🔹 Login com Google
  async function handleGoogleLoginSuccess(credentialResponse) {
    try {
      const res = await axios.post(
        "http://localhost:3000/usuarios/login/google",
        { credential: credentialResponse.credential }
      );

      // salva usuário retornado no localStorage
      localStorage.setItem("userName", res.data.user.nome);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userId", res.data.user.id);

      navigate("/profile");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMensagem("Erro no login com Google");
    }
  }



  

  return (
    <div className="login-container">
      <Particles
        className="particles-background"
        particleColors={['#ffffff', '#ffffff']}
        particleCount={1200}
        particleSpread={35}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="formulariologin">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <input
              className="stylish"
              placeholder="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="stylish"
              placeholder="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </div>
          <button className="botaum3d">Entrar</button>
          {mensagem && <div className="aviso">{mensagem}</div>}
        </form>

        <div className="separator">
          <span>ou</span>
        </div>

      <div className="social-medias-session">
        <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => console.log("deu ruim chefe")}
      type="standart"
      shape="circle"
      theme="filled_black"
      logo_alignment="center"
      width={145}
    />
    </div>

        <div>
          <p>Não tem conta? <a href="/register">Registra-se</a></p>
        </div>
      </div>
    </div>
  );
}

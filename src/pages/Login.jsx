import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Particles from "../components/Particles.jsx";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // LOGIN NORMAL
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/usuarios/login", { email, senha });
      const { user, redirect, message } = res.data;

      // Armazena info no localStorage
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.nome);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userAdm", user.adm);

      // Navega conforme adm
      const verifyRes = await axios.get("/api/usuarios/verify", { params: { email } });
      const { adm: isAdm } = verifyRes.data;

      if (isAdm == 1) {
        navigate("/dev");
      } else {
        navigate("/profile");
      }

      setMensagem(message || `Bem-vindo, ${user.nome}!`);
    } catch (err) {
      console.error("Erro no login:", err);
      setMensagem(err.response?.data?.erro || "Erro no servidor");
    }
  }

  // LOGIN GOOGLE
  async function handleGoogleLoginSuccess(credentialResponse) {
    try {
      const res = await axios.post("/api/usuarios/login/google", {
        credential: credentialResponse.credential,
      });

      const user = res.data.user;

      localStorage.setItem("userName", user.nome);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user.id);

      // Verifica adm
      const verifyRes = await axios.get("/api/usuarios/verify", { params: { email: user.email } });
      const { adm: isAdm } = verifyRes.data;

      if (isAdm == 1) {
        navigate("/dev");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMensagem("Erro no login com Google");
    }
  }

  return (
    <div className="login-container">
      <Particles
        className="particles-background"
        particleColors={["#ffffff", "#ffffff"]}
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
          <div className="input-group">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label htmlFor="senha">Senha</label>
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
            onError={() => console.log("Erro no login Google")}
            type="standart"
            shape="circle"
            theme="filled_black"
            logo_alignment="center"
            width={145}
          />
        </div>

        <div>
          <p>
            Não tem conta? <a href="/register">Registra-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

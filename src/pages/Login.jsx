import React, { useState } from "react";
import { FaGoogle, FaPlaystation, FaXbox } from "react-icons/fa";
import Particles from '../components/Particles.jsx';
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // ⚠ usar useGoogleLogin
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  // Login tradicional
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/usuarios/login", { email, senha });

      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.nome);
      localStorage.setItem("userEmail", res.data.user.email);

      setMensagem(`Login ok! Bem-vindo, ${res.data.user.nome}`);
      navigate("/profile");
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro no servidor");
    }
  }

  // Login Google usando botão customizado
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:3000/usuarios/login/google", {
          credential: tokenResponse.credential
        });

        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userName", res.data.user.nome);
        localStorage.setItem("userEmail", res.data.user.email);

        navigate("/profile");
      } catch (err) {
        console.error(err.response?.data || err.message);
        setMensagem("Erro no login com Google");
      }
    },
    onError: () => {
      console.log("Erro no login Google");
      setMensagem("Erro no login com Google");
    },
  });

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

        <div className="social-mediasslk">
          <button className="social-buttons" onClick={() => loginGoogle()}>
            <FaGoogle className="teste1"  />
          </button>

          <FaPlaystation style={{ marginLeft: "10px" }} />
          <FaXbox style={{ marginLeft: "10px" }} />
        </div>

        <div>
          <p>Não tem conta? <a href="/register">Registra-se</a></p>
        </div>
      </div>
    </div>
  );
}

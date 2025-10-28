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
import axios from "axios"; 
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [adm] = useState("");

  const navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();
  
    try {
      const res = await api.post("https://backend-animosity.vercel.app/usuarios/login", {params: email, senha });
      const res1 = await api.post("https://backend-animosity.vercel.app/usuarios/verify");
      const { user, redirect, message } = res.data;
  
      
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.nome);
      localStorage.setItem("userEmail", user.email);
      localStorage;setItem("userAdm", user.adm)

      
  
      
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/profile");
      }
  
      setMensagem(message || `Bem-vindo, ${user.nome}!`);
    } catch (err) {
      console.error("Erro no login:", err);
      setMensagem(err.response?.data?.erro || "Erro no servidor");
    }
    try{
      const res = await api.get("https://backend-animosity.vercel.app/usuarios/verify", {params: { email, adm}});
      const{adm} = res.data
      if(adm == 1){
        navigate("/dev")
      } else{
        navigate("/profile")
      }

    }catch (err) {
      console.error("Erro no login:", err);
      setMensagem(err.response?.data?.erro || "Erro no servidor");
  }
  
  }
  async function handleGoogleLoginSuccess(credentialResponse) {
    try {
      const res = await axios.post(
        "https://backend-animosity.vercel.app/usuarios/login/google",
        { credential: credentialResponse.credential }
      );
  
      const { nome, email, id, adm } = res.data.user;
  
  
      localStorage.setItem("userName", nome);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", id);
      localStorage.setItem("userAdm", adm);
  
 
      if (adm === 1) {
        window.location.href = '/dev';
        // navigate("/dev"); 
      } else {
        window.location.href = '/profile';
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

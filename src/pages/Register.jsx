import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, XCircle, CheckCircle } from "lucide-react";
import Particles from '../components/Particles.jsx';
import Input1 from '../components/inputlogin.jsx';
import api from "../services/api";
import "./Login.css";
import { FaGoogle , FaPlaystation, FaXbox} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [nome, setNome] = useState ("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();



 async function handleRegister(e) {
  e.preventDefault(); // evita reload da página
  try {
    const res = await api.post("/usuarios", { nome, email, senha });

    // salvar dados no localStorage
    localStorage.setItem("userId", res.data.user.insertId); // ou id retornado pelo backend
    localStorage.setItem("userName", nome);
    localStorage.setItem("userEmail", email);
    // Dentro do handleLogin após salvar no localStorage
navigate("/login"); // leva o usuário para a página de perfil

    setMensagem(`✅ Usuário ${nome} registrado com sucesso!`);
  } catch (err) {
    setMensagem(`❌ ${err.response?.data?.erro || "Erro no servidor"}`);
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
      <h2>Registra-se</h2>
      <form onSubmit={handleRegister}>
<div className="inputs">
  <div className="input-group">
    <input
      type="text"
      id="nome"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      required
    />
    <label htmlFor="nome">Nome</label>
  </div>

  <div className="input-group">
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <label htmlFor="email">Email</label>
  </div>

  <div className="input-group">
    <input
      type="password"
      id="senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required
    />
    <label htmlFor="senha">Senha</label>
  </div>
</div>

       <button className="botaum3d" type="submit">Registrar</button>
       </form>
         {mensagem && (
    <div className="aviso">
      {mensagem}
    </div>
  )}
       <div className="separator">
  <span>ou</span>
</div>
 <div>
  <p>Já tem conta? <a href="/login">Entrar</a></p>
</div>

       </div>
    </div>

);
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, XCircle, CheckCircle } from "lucide-react";
import Particles from '../components/Particles.jsx';
import Input1 from '../components/inputlogin.jsx';
import api from "../services/api";
import "./Login.css";
import { FaGoogle , FaPlaystation, FaXbox} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  

  const navigate = useNavigate();



  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios/login", { email, senha });

      // 1️⃣ Salvar dados no localStorage
    localStorage.setItem("userId", res.data.user.id);
    localStorage.setItem("userName", res.data.user.nome);
    localStorage.setItem("userEmail", res.data.user.email);
    // Dentro do handleLogin após salvar no localStorage
navigate("/profile"); // leva o usuário para a página de perfil

      setMensagem(`Login ok! Bem-vindo, ${res.data.user.nome}`);
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro no servidor");
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
       <input className="stylish" placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
       <input className="stylish" placeholder="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
           
    
      
       </div>
       <button className="botaum3d">Entrar</button>
       {mensagem && (
  <div className="aviso">
    {mensagem}
  </div>
)}
       </form>
       <div className="separator">
        
  <span>ou</span>
</div>
  <div className="social-mediasslk">
    <GoogleLogin 
    onSuccess={(credentialresponse) => {
      console.log(credentialresponse)
      console.log(jwtDecode(credentialresponse.credential))
    }} 
    onError={() => console.log("deu ruim chefe ")} />
    <FaGoogle />
    <FaPlaystation />
    <FaXbox />
  </div>
 <div>
  <p>Não tem conta? <a href="/register">Registra-se</a></p>
</div>

       </div>
    </div>

);
}
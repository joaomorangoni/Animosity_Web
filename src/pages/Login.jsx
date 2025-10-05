// src/components/Login.jsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react"; // Ícones Lucide
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal.jsx"; // Seu componente Modal
import "./Login.css";

export default function Login({ setUser }) {
  const [erroEmail, setErroEmail] = useState("");
const [isFocused, setIsFocused] = useState(false);
const [mostrarModal, setMostrarModal] = useState(false);
const [modalErro, setModalErro] = useState("");

  const navigate = useNavigate();
  const canvasRef = useRef(null);
   const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
 const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin disparado", { email, senha }); // <- importante
    setErro("");

    try {
      // Envia os dados para o backend
      const response = await api.post("/usuarios", { email, senha });

      // Supondo que o backend retorne um token JWT
      const { token, user } = response.data;

      // Armazena no localStorage ou sessionStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redireciona para página privada (perfil)
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || "Erro ao logar");
    }
  };





  // // Validação de email
  // const validarEmail = (valor) => {
  //   if (!valor.includes("@")) setErroEmail("O email deve conter @");
  //   else setErroEmail("");
  // };



  // // Regras de senha
  // const requisitos = [
  //   { id: 1, label: "Mínimo 8 caracteres", valido: senha.length >= 8 },
  //   { id: 2, label: "Pelo menos 1 número", valido: /\d/.test(senha) },
  //   { id: 3, label: "Pelo menos 1 letra maiúscula", valido: /[A-Z]/.test(senha) },
  // ];




  return (
    <div className="login-container">
      {/* Canvas decorativo */}
      <canvas ref={canvasRef} className="stars-canvas" />

      {/* Modal de erro */}
      <Modal
        mostrar={mostrarModal}
        mensagem={modalErro}
        onClose={() => setMostrarModal(false)}
      />

      {/* Caixa do formulário */}
      <div className="login-box">
        <h1>Entra aí!</h1>
            
              <form onSubmit={handleLogin}>
              <input 
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button type="submit">Entrar</button>
              </form>
              <p className={`erro-email ${erroEmail && isFocused ? "show" : ""}`}>
                {erroEmail}
              </p>

              </div>
              </div>
          
           
  )
}       

// src/components/Login.jsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react"; // Ícones Lucide
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal.jsx"; // Seu componente Modal
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Estados principais do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados de validação
  const [erroEmail, setErroEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);

  // Alterna entre Login e Registro
  const [isLogin, setIsLogin] = useState(true);

  // Modal de erro
  const [modalErro, setModalErro] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const exibirModalErro = (mensagem) => {
    setModalErro(mensagem);
    setMostrarModal(true);

    // Fecha automaticamente após 3 segundos (opcional)
    setTimeout(() => setMostrarModal(false), 3000);
  };

  // Validação de email
  const validarEmail = (valor) => {
    if (!valor.includes("@")) {
      setErroEmail("O email deve conter @");
    } else {
      setErroEmail("");
    }
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setEmail(valor);
    validarEmail(valor);
  };

  // Regras de senha
  const requisitos = [
    { id: 1, label: "Mínimo 8 caracteres", valido: senha.length >= 8 },
    { id: 2, label: "Pelo menos 1 número", valido: /\d/.test(senha) },
    { id: 3, label: "Pelo menos 1 letra maiúscula", valido: /[A-Z]/.test(senha) },
  ];

  // ==============================
  // Função de Registro
  // ==============================
  const handleRegister = async () => {
    if (!email.includes("@")) {
      exibirModalErro("O email deve conter @");
      return;
    }

    try {
      const response = await api.post("/usuarios", { nome, email, senha });
      console.log("✅ Usuário cadastrado:", response.data);

      // Após registrar, alterna para Login
      setIsLogin(true);
    } catch (error) {
      console.error("❌ Erro ao cadastrar usuário:", error);
      exibirModalErro(error.response?.data?.erro || "Erro ao cadastrar usuário");
    }
  };

  // ==============================
  // Função de Login
  // ==============================
  const handleLogin = async () => {
    if (!email.includes("@")) {
      exibirModalErro("O email deve conter @");
      return;
    }

    try {
      const response = await api.post("/usuarios/login", { email, senha });

      // Salva usuário no localStorage
      localStorage.setItem("usuario", JSON.stringify(response.data.user));

      // Redireciona para /contact
      navigate("/contact");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      exibirModalErro(error.response?.data?.erro || "Erro ao fazer login");
    }
  };

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
        <h1>Bem-vindo!</h1>

        <AnimatePresence mode="wait">
          {isLogin ? (
            // ==================== FORMULÁRIO DE LOGIN ====================
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <p className={`erro-email ${erroEmail && isFocused ? "show" : ""}`}>
                {erroEmail}
              </p>

              <button onClick={handleLogin}>Entrar</button>
              <button onClick={() => setIsLogin(false)}>Registrar</button>
            </motion.div>
          ) : (
            // ==================== FORMULÁRIO DE REGISTRO ====================
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                className="login-input"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={() => setIsSenhaFocused(true)}
                onBlur={() => setIsSenhaFocused(false)}
              />

              {/* Requisitos da senha */}
              <div className="requisitos-senha">
                <AnimatePresence>
                  {isSenhaFocused &&
                    requisitos.map((req) => (
                      <motion.p
                        key={req.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="requisito"
                      >
                        {!req.valido ? (
                          <XCircle size={16} color="red" />
                        ) : (
                          <CheckCircle size={16} color="green" />
                        )}
                        {" "}{req.label}
                      </motion.p>
                    ))}
                </AnimatePresence>
              </div>

              <p className={`erro-email ${erroEmail && isFocused ? "show" : ""}`}>
                {erroEmail}
              </p>

              <button onClick={handleRegister}>Registrar</button>
              <button onClick={() => setIsLogin(true)}>Entrar</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

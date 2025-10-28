import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedDev({ children }) {
  // Garante que o valor seja sempre uma string
  const adm = localStorage.getItem("userAdm");

  // Se não houver login → redireciona para login
  if (!adm) {
    return <Navigate to="/login" replace />;
  }

  // Se for admin → renderiza o conteúdo normalmente
  if (adm === "1") {
    return children;
  }

  // Se for usuário comum → redireciona para o perfil
  if (adm === "0") {
    return <Navigate to="/profile" replace />;
  }

  // Fallback (qualquer outro valor inesperado)
  return <Navigate to="/login" replace />;
}

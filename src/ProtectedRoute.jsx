// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // verifica se o usuário está logado

  if (!token) {
    return <Navigate to="/login" />; // redireciona para login se não estiver logado
  }

  return children; // se estiver logado, mostra o conteúdo
}

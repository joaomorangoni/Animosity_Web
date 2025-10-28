import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedDev({ children }) {
  // Pega o valor de admin (exemplo: salvo no login)
  const adm = localStorage.getItem("userAdm"); // "1" = dev, "0" = user

  // Se não tiver login → manda pro login
  if (adm === null) {
    return <Navigate to="/login" replace />;
  }

  // Se for dev (adm = "1") → libera a página
  if (adm === "1") {
    return children;
  }

  // Se não for dev → redireciona pro perfil comum
  return <Navigate to="/profile" replace />;
}

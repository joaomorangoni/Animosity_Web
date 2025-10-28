import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedDev({ children }) {

  const adm = localStorage.getItem("userAdm");


  if (!adm) {
    return <Navigate to="/login" replace />;
  }


  if (adm === "1") {
    return children;
  }


  if (adm === "0") {
    return <Navigate to="/profile" replace />;
  }

  return <Navigate to="/login" replace />;
}

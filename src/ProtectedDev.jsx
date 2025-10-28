import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedDev({ children }) {

  const adm = localStorage.getItem("userAdm"); 

  if (adm === null) {
    return <Navigate to="/login" replace />;
  }


  if (adm === "1") {
    return children;
  }


  return <Navigate to="/profile" replace />;
}

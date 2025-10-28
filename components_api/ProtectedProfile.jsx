import { Navigate } from "react-router-dom";

export default function ProtectedProfile({ children }) {

  const adm = localStorage.getItem("userAdm"); 

  // Se não tiver nada salvo → manda pro login
  if (adm === null) {
    return <Navigate to="/login" replace />;
  }

  if (adm === "0") {
    return children;
  }

  return <Navigate to="/dev" replace />;
}

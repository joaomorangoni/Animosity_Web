import { Navigate } from "react-router-dom";

export default function ProtectedProfile({ children }) {
  const adm = localStorage.getItem("userAdm");


  if (!adm) {
    return <Navigate to="/login" replace />;
  }


  if (adm === "0") {
    return children;
  }

  if (adm === "1") {
    return <Navigate to="/dev" replace />;
  }


  return <Navigate to="/login" replace />;
}

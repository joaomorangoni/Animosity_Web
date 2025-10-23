// src/components_api/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children, role }) {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null; // evita piscar tela

  // se não estiver logado
  if (!isAuth) return <Navigate to="/login" />;

  // se estiver logado mas for admin e tentar acessar profile
  if (user.adm === 1 && role === "user") return <Navigate to="/dev" />;

  // se for usuário comum e tentar acessar dev
  if (user.adm === 0 && role === "admin") return <Navigate to="/profile" />;

  return children;
}

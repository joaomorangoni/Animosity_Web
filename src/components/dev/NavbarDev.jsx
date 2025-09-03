import React from "react";
import { Menu, Home, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import "./NavbarDev.css";

/**
 * NavbarDev: navbar fixa inferior.
 * onMenuClick é passado de PageDev para abrir o sidebar.
 */
export default function NavbarDev({ onMenuClick }) {
  return (
    <motion.nav className="navbar-dev" initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
      <button className="nav-icon" onClick={onMenuClick} aria-label="abrir menu">
        <Menu className="icon" />
      </button>

      <button
        className="nav-icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="home"
        title="Ir para o topo"
      >
        <Home className="icon" />
      </button>

      <button className="nav-icon" onClick={() => (window.location.href = "/login")} aria-label="logout" title="Logout">
        <LogOut className="icon" />
      </button>
    </motion.nav>
  );
}

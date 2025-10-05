import React, { useState } from "react";
import {FaRegBell, FaEnvelope, FaHome, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("/");

  const menuItems = [
    { name: "Início", icon: <FaHome />, link: "/" },
    { name: "Pesquisar", icon: <FaSearch />, link: "/Comunidade" },
    { name: "Notificações", icon: <FaRegBell />, link: "/Comunidade" },
    { name: "Mensagens", icon: <FaEnvelope />, link: "/Comunidade" },
    { name: "Perfil", icon: <FaUser/>, link: "/Login" },
    { name: "Sair", icon: <FaSignOutAlt />, link: "/Contato" },
  ];

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`sidebar-item ${active === item.link ? "active" : ""}`}
            onClick={() => setActive(item.link)}
          >
            <a href={item.link}>
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { Menu, Home, LogOut } from "lucide-react";
import "./NavbarDev.css";

export default function NavbarDev() {
  return (
    <nav className="navbar-dev">
      <button className="menu-btn-dev">
        <Menu size={28} />
      </button>
      <div className="navbar-icons-dev">
        <Home size={28} />
        <LogOut size={28} />
      </div>
    </nav>
  );
}
import React from "react";
import { Menu, Home, LogOut } from "lucide-react";
import "../../styles/NavbarDev.css";

export default function NavbarDev() {
  return (
    <nav className="navbar-dev">
      <button className="menu-btn-dev">
        <Menu size={28} />
      </button>
      <div className="navbar-icons-dev">
        <Home size={28} />
        <LogOut size={28} />
      </div>
    </nav>
  );
}

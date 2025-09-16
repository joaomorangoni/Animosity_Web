import React from "react";
import Particles from "../acessorios/BackgroundParticles";
import "./Banner.css";
import { motion } from "framer-motion";

const Banner = () => {
  const scrollToSobre = () => {
    const section = document.getElementById("sobre");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="banner">
      {/* Fundo de partículas */}
      <Particles className="particles-background" />

      {/* Conteúdo centralizado */}
      <div className="banner-center">
        {/* Logo central com fade in */}
        <motion.img
          src="../../public/img/logoimg.png"
          alt="Logo"
          className="banner-logo"
          initial={{ opacity: 0 }}      // começa invisível
          animate={{ opacity: 1 }}      // termina totalmente visível
          transition={{ duration: 1 }}  // duração da animação
        />

        {/* Botão */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
          className="btn-3d"
          onClick={scrollToSobre}
        >
          Saiba mais
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;

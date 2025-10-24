import React from "react";
import Particles from "../acessorios/BackgroundParticles";
import "./banner.css";
import { motion } from "framer-motion";

const Banner = () => {

  return (
    <div className="banner">
      {/* Fundo de partículas */}
      <Particles className="particles-background" />

      {/* Conteúdo centralizado */}
      <div className="banner-center">
        {/* Logo central com fade in */}
        <motion.img
          src="/logoimg.png"
          alt="Logo"
          className="banner-logo"
          initial={{ opacity: 0 }}      // começa invisível
          animate={{ opacity: 1 }}      // termina totalmente visível
          transition={{ duration: 1 }}  // duração da animação
        />

        
      </div>
    </div>
  );
};

export default Banner;

import React from "react";
import { motion } from "framer-motion";
import "./splittxt.css";

const splitText = (text) => {
  return text.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="split-letter"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
};

const SplitTitle = () => {
  const titulo = "ANIMOSITY";
  const subtitulo = "Explorando emoções.";

  return (
    <div className="split-title-container">
      <h1 className="titulo">{splitText(titulo)}</h1>
      <motion.h3
        className="subtitulo"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: titulo.length * 0.04 + 0.3, duration: 0.6 }}
      >
        {subtitulo}
      </motion.h3>
    </div>
  );
};

export default SplitTitle;

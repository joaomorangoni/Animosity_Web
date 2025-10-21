import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Carousel.css";

export default function Carousel() {
  const imagens = [
    "../../public/img/screenshot1.jpeg",
    "../../public/img/screenshot3.jpeg",
    "../../public/img/screenshot4.jpeg"
  ];

  const [index, setIndex] = useState(0);

  const anterior = () => {
    setIndex(prev => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const proximo = () => {
    setIndex(prev => (prev + 1) % imagens.length);
  };

  return (
    <div className="carousel-container">
      {/* Transição usando Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={imagens[index]}
          alt={`Imagem ${index + 1}`}
          className="carousel-imagem"
          initial={{ opacity: 0,}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Setas */}
      <button onClick={anterior} className="carousel-seta esquerda">
        <ChevronLeft size={30} />
      </button>
      <button onClick={proximo} className="carousel-seta direita">
        <ChevronRight size={30} />
      </button>

      {/* Indicadores */}
      <div className="carousel-indicadores">
        {imagens.map((_, i) => (
          <span
            key={i}
            className={`carousel-ponto ${i === index ? "ativo" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

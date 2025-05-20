import React from "react";
import Particles from "./BackgroundParticles";
import "./Banner.css";
import BlurText from "./Blurtxt";
import SplitText from "./SplitTxt";
import { motion } from 'framer-motion';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};



const Banner = () => {
  return (
    <div className="banner">
      <Particles className="particles-background" />
      <div className="banner-content">
        <img
          src="./public/img/ProtagonistGif.gif"
          alt="Imagem à esquerda"
          className="banner-image pixel-fade"
        />

         <div className="banner-text">
    <SplitText
      text="Animosity"
      className="txt"
      delay={150}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
      onLetterAnimationComplete={handleAnimationComplete}
    />

   
        <motion.button
          initial={{ opacity: 0, y: 20 }}                  // começa invisível e abaixo
          animate={{ opacity: 1, y: 0 }}                   // aparece suavemente
          transition={{ duration: 0.8, ease: "easeInOut" }} // tempo da animação
          className="btn-3d"
        >
          Saiba mais
        </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

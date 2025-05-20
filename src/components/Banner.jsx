import React from "react";
import Particles from "./BackgroundParticles";
import "./Banner.css";
import BlurText from "./Blurtxt";
import SplitText from "./SplitTxt";

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
          className="banner-image"
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

    <BlurText
      text="Explorando emoções"
      delay={150}
      animateBy="words"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="text-2xl mb-8"
    />
          <button class="ui-btn">
          <span>
            Saiba Mais
          </span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

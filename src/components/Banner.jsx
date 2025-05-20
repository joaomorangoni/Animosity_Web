import React from "react";
import Particles from "./BackgroundParticles";
import "./Banner.css";

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
          <h1>Animosity</h1>
          <p>Explorando emoções</p>
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

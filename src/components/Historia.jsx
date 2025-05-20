import React from "react";
import "./Historia.css"; // Estilo separado
import PixelTransition from './Pixel.jsx';

const Historia = () => {
  return (
    <section className="historia-container">
      <div className="historia-texto esquerda">
        <h2>Nossa Origem</h2>
        <p>
          O projeto Animosity nasceu da paixão por animação e expressão artística. Nossa jornada começou com um pequeno grupo de criadores que queriam romper padrões e explorar novas formas de narrativa visual.
        </p>
      </div>
      <div className="historia-texto direita">
        <PixelTransition
  firstContent={
    <img
      src="./public/img/ProtagonistPNG.png"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>O Herói.</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>
      </div>
    </section>
  );
};

export default Historia;

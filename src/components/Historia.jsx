import "./Historia.css";
import PixelTransition from './Pixel.jsx';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Variantes para o texto vindo da esquerda
const leftSideVariant = {
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
  hidden: { opacity: 0, x: -50, transition: { duration: 1, ease: "easeIn" } },
};

// Variantes para a imagem vindo da direita
const rightSideVariant = {
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
  hidden: { opacity: 0, x: 50, transition: { duration: 1, ease: "easeIn" } },
};

const Historia = () => {
  const esquerdaRef = useRef(null);
  const direitaRef = useRef(null);

  const esquerdaInView = useInView(esquerdaRef, { amount: 0.2, once: false });
  const direitaInView = useInView(direitaRef, { amount: 0.2, once: false });

  return (
    <section className="historia-container">
      <motion.div
        className="historia-texto esquerda"
        ref={esquerdaRef}
        variants={leftSideVariant}
        initial="hidden"
        animate={esquerdaInView ? "visible" : "hidden"}
      >
        <h2>Nossa Origem</h2>
        <p>
          O projeto Animosity nasceu da paixão por animação e expressão artística. Nossa jornada começou com um pequeno grupo de criadores que queriam romper padrões e explorar novas formas de narrativa visual.
        </p>
      </motion.div>

      <motion.div
        className="historia-texto direita"
        ref={direitaRef}
        variants={rightSideVariant}
        initial="hidden"
        animate={direitaInView ? "visible" : "hidden"}
      >
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
              <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>
                O Herói.
              </p>
            </div>
          }
          gridSize={12}
          pixelColor='#ffffff'
          animationStepDuration={0.4}
          className="custom-pixel-card"
        />
      </motion.div>
    </section>
  );
};

export default Historia;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./gallery.css";

export default function AlternatingLayout() {
  // Inicializa o AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // anima de novo ao voltar no scroll
      offset: 120,
    });
  }, []);

  // Conteúdo de exemplo a
  const sections = [
    {
      title: "Entre em um mundo onde a mente é o maior campo de batalha",
      text: "Gehirn é uma terra fragmentada, onde a mente é tanto uma arma quanto um campo de guerra. Explore regiões distorcidas por forças que desafiam a realidade, enfrente seus próprios limites e descubra segredos que moldarão o destino de todos.",
      image: "/img/img1.png",
    },
    {
      title: "Onde a escuridão se mistura com a esperança",
      text: "Entre ruínas esquecidas, cada passo é uma escolha entre luz e trevas. As Calamidades esperam nas sombras, observando cada decisão sua — e a sobrevivência dependerá da coragem de encarar o impossível.",
      image: "/img/img2.png",
    },
    {
      title: "O tempo é seu maior aliado... ou seu pior inimigo",
      text: "O mundo muda a cada tentativa. Caminhos se reconfiguram, inimigos evoluem e o tempo castiga os que hesitam. Cada jornada é única — e o tempo não perdoa os indecisos.",
      image: "/img/img3.png",
    },
  ];

  return (
    <section className="alt-layout">
      {sections.map((item, index) => {
        const reversed = index % 2 !== 0; // alterna layout

        return (
          <div
            className={`alt-section ${reversed ? "reverse" : ""}`}
            key={index}
          >
            {/* Texto */}
            <div
              className="alt-text"
              data-aos={reversed ? "fade-left" : "fade-right"}
            >
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>

            {/* Imagem */}
            <div
              className="alt-image"
              data-aos={reversed ? "fade-right" : "fade-left"}
            >
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

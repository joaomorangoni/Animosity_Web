import Navbar from '../components/navbar/Navbar.jsx';
import Banner from "../components/banner/Banner.jsx";
import Objetivos from "../components/objetivos/Objetivos.jsx";
import NossaEquipe from '../components/nossaequipe/NossaEquipe.jsx';
import Footer from '../components/footer/Footer.jsx';
import Carousel from '../components/carrousel.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import "./home.css";
import { motion } from 'framer-motion';
import '../App.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <Banner />

      {/* ===== GALERIA 1 ===== */}
      <section className="gallery-section">
        <motion.div
          className="gallery-image"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src="/img2.png" alt="Imagem 1" />
        </motion.div>

        <motion.div
          className="gallery-text"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1>Entre em um mundo onde a mente é o maior campo de batalha</h1>
          <p>
            Gehirn é uma terra fragmentada, onde a mente é tanto uma arma quanto
            um campo de guerra. Explore regiões distorcidas por forças que
            desafiam a realidade, enfrente seus próprios limites e descubra
            segredos que moldarão o destino de todos.
          </p>
        </motion.div>
      </section>

      {/* ===== GALERIA 2 ===== */}
      <section className="gallery-section reverse">
        <motion.div
          className="gallery-image"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src="/img1.png" alt="Imagem 2" />
        </motion.div>

        <motion.div
          className="gallery-text"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1>O tempo é seu maior aliado... ou seu pior inimigo</h1>
          <p>
            O mundo muda a cada tentativa. Caminhos se reconfiguram, inimigos
            evoluem e o tempo castiga os que hesitam. Cada jornada é única — e o
            tempo não perdoa os indecisos.
          </p>
        </motion.div>
      </section>

      {/* ===== GALERIA 3 ===== */}
      <section className="gallery-section">
        <motion.div
          className="gallery-image"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src="/img3.png" alt="Imagem 3" />
        </motion.div>

        <motion.div
          className="gallery-text"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1>Onde a escuridão se mistura com a esperança</h1>
          <p>
            Entre ruínas esquecidas, cada passo é uma escolha entre luz e
            trevas. As Calamidades esperam nas sombras — a sobrevivência
            dependerá da coragem de encarar o impossível.
          </p>
        </motion.div>
      </section>

      <Objetivos />

      {/* ===== EXTRAS ===== */}
      <div className="extra-title-section">
        <motion.h3
          className="extra-title"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Como faremos isso?
        </motion.h3>
        <p className="extra-subtitle">
          Nossas estratégias baseadas em estudos e pesquisas.
        </p>
      </div>

      {/* ===== INFO ===== */}
      <div className="extra-info">
        <motion.div
          className="text-section"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p>
            O uso moderado de jogos eletrônicos demonstra benefícios para a
            saúde mental, agindo como ferramentas eficazes de estímulo cognitivo
            e alívio de estresse...
          </p>
        </motion.div>

        <motion.div
          className="image-content"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/gato.png" alt="gato" />
        </motion.div>
      </div>

      {/* ===== CARROSSEL ===== */}
      <div className="carrosselfodastico">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="extra-title">Screenshots do jogo</h1>
          <p className="extra-subtitle">Algumas screenshots do jogo (pré beta)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Carousel />
        </motion.div>
      </div>

      {/* ===== SOBRE ===== */}
      <section className="about-section">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/protagonista.png" alt="Protagonista" />
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p>
            Somos um grupo de estudantes entusiastas por videogames da ETEC
            Maria Cristina Medeiros...
          </p>
        </motion.div>
      </section>

      {/* ===== EQUIPE ===== */}
      <div className="team-section">
        <h1 className="extra-title">Nossa Equipe</h1>
        <p className="extra-subtitle">Conheça os mágicos por trás do truque</p>
        <NossaEquipe />
      </div>

      <Footer />
    </>
  );
}

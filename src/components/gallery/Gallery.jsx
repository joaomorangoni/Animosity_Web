import React from 'react';
import { motion } from 'framer-motion';
import './gallery.css';

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const imageVariants = {
  left: {
    hidden: { opacity: 0, scale: 0.8, x: -100 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  },
  right: {
    hidden: { opacity: 0, scale: 0.8, x: 100 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  },
};

const AlternatingLayout = () => {
  const sections = [
    {
      title: 'Entre em um mundo onde a mente é o maior campo de batalha',
      text: 'Prepare-se para explorar Gehirn, uma terra fragmentada por forças sombrias que distorceram a realidade e mergulharam o mundo no caos. Em um universo onde a magia nasce do próprio limite do corpo, cada escolha e cada batalha são moldadas pela adrenalina do momento. Embarque em uma jornada de ação e suspense, onde você, como protagonista, terá o desafio de libertar este mundo das garras de forças colossais conhecidas apenas como As Calamidades.',
      image: '../public/img/img1.png',
    },
    {
       title: 'Entre em um mundo onde a mente é o maior campo de batalha',
    text: 'Prepare-se para explorar Gehirn, uma terra fragmentada por forças sombrias que distorceram a realidade e mergulharam o mundo no caos. Em um universo onde a magia nasce do próprio limite do corpo, cada escolha e cada batalha são moldadas pela adrenalina do momento. Embarque em uma jornada de ação e suspense, onde você, como protagonista, terá o desafio de libertar este mundo das garras de forças colossais conhecidas apenas como As Calamidades.',
      image: '../public/img/img2.png',
    },
    {
          title: 'Uma jornada onde o tempo é seu maior aliado... ou seu pior inimigo',
    text: 'Cada passo dado em Gehirn revela novos mistérios e desafios que colocam à prova sua estratégia e coragem. As terras por onde você passará mudam a cada tentativa, tornando cada partida única. Os perigos se intensificam à medida que você avança, e o próprio tempo pode se tornar um obstáculo inesperado. Resta ao jogador decidir: acelerar o ritmo ou explorar com cautela?',
      image: '../public/img/img3.png',
    },
  ];

  return (
    <div className="container">
      {sections.map((section, index) => {
        const imageAnim = index === 1 ? 'right' : 'left';
        return (
          <div
            key={index}
            className={`section ${index % 2 === 0 ? 'image-right' : 'image-left'}`}
          >
            <motion.div
              className="text"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </motion.div>

            <motion.div
              className="image"
              variants={imageVariants[imageAnim]}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              viewport={{ once: false, amount: 0.3 }}
            >
              <img src={section.image} alt={section.title} />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default AlternatingLayout;

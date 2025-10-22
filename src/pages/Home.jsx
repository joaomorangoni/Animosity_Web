

// Importe os componentes que eram usados no App.jsx
import Navbar from '../components/navbar/Navbar.jsx';
import Banner from "../components/banner/Banner.jsx";
import Objetivos from "../components/objetivos/Objetivos.jsx";
import NossaEquipe from '../components/nossaequipe/NossaEquipe.jsx';
import Gallery from '../components/gallery/Gallery.jsx';
import Footer from '../components/footer/Footer.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import React, { useEffect } from 'react';
import "./home.css"
import { motion } from 'framer-motion';
import Carousel from '../components/carrousel.jsx'





// Estilo global se necessário
import '../App.css';

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration in milliseconds
      once: true,      // Whether animation should only happen once
    });
  }, []); // Empty dependency array ensures it runs only once on mount


 


  return (
    <>
      <Navbar />
      <Banner />
      
      <div className='gallery'>
        <div className='text-gallery'>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}

        
        >
        <h1 className='title-gallery'>Entre em um mundo onde a mente é o maior campo de batalha</h1>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 2, delay: 0, ease: "easeOut" }}
        
        >
        <p className='paragrafos'>Gehirn é uma terra fragmentada, onde a mente é tanto uma arma quanto um campo de guerra. Explore regiões distorcidas por forças que desafiam a realidade, enfrente seus próprios limites e descubra segredos que moldarão o destino de todos.</p>
        </motion.div>
        </div>
        

        
          <motion.div
           initial={{ opacity: 0, x:100 }} // Estado inicial
           whileInView={{ opacity: 1, x: 0}} // Estado final
           transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          
          >
          <div className='img-container'>
          <img src="../../public/img/img1.png" alt="" />
          </div>
          </motion.div>
   
       

      </div>
      <div className='gallery'>
      <motion.div
         initial={{ opacity: 0, x:-100 }} // Estado inicial
         whileInView={{ opacity: 1, x: 0}} // Estado final
         transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      
      >
          <div className='img-container'>
          <img src="../../public/img/img1.png" alt="" />
          </div>
          </motion.div>
        <div className='gallery'>
        <div className='text-gallery'>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}

        
        >
        <h1 className='title-gallery'>O tempo é seu maior aliado... ou seu pior inimigo</h1>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 2, delay: 0, ease: "easeOut" }}
        
        >
        <p className='paragrafos'>O mundo muda a cada tentativa. Caminhos se reconfiguram, inimigos evoluem e o tempo castiga os que hesitam. Cada jornada é única — e o tempo não perdoa os indecisos.</p>
        </motion.div>
        </div>
        </div>
        
          
       

      </div>


 <div className='gallery'>
        <div className='text-gallery'>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}

        
        >
        <h1 className='title-gallery'>Onde a escuridão se mistura com a esperança</h1>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 2, delay: 0, ease: "easeOut" }}
        
        >
        <p className='paragrafos'>Entre ruínas esquecidas, cada passo é uma escolha entre luz e trevas. As Calamidades esperam nas sombras, observando cada decisão sua — e a sobrevivência dependerá da coragem de encarar o impossível.</p>
        </motion.div>
        </div>
        

        
          <motion.div
           initial={{ opacity: 0, x:100 }} // Estado inicial
           whileInView={{ opacity: 1, x: 0}} // Estado final
           transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          
          >
          <div className='img-container'>
          <img src="../../public/img/img1.png" alt="" />
          </div>
          </motion.div>
   
       

      </div>
      <Objetivos />
      <motion.div
     initial={{ opacity: 0, y:100 }} // Estado inicial
     whileInView={{ opacity: 1, y: 0}} // Estado final
     transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >

        <div className='extra-title-section' >
          <h3 className="extra-title">Como faremos isso?</h3>
          <p className='extra-subtitle'>Nossas etratégia baseadas em estudos e pesquisas.</p>
        </div>
      </motion.div>
      
      <div className="extra-info" >
      <motion.div 
      initial={{ opacity: 0, x:-100 }} // Estado inicial
      whileInView={{ opacity: 1, x: 0}} // Estado final
      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      
      
      
      >
        <div className='text-section' data-aos="fade-right">
          <p className="section-text">
            O uso moderado de jogos eletrônicos demonstra benefícios para a saúde mental, agindo como ferramentas eficazes de estímulo cognitivo e alívio de estresse. Pesquisas, como um estudo da Johns Hopkins Medicine, indicam que jogos especialmente desenvolvidos para intervenções em saúde mental podem oferecer uma modesta redução nos sintomas de TDAH e depressão em crianças e adolescentes. Além disso, a comunidade de jogos (fóruns, grupos e redes sociais) desempenha um papel importante, proporcionando um senso de pertencimento e apoio social que pode ser crucial para o bem-estar mental, especialmente para indivíduos que lutam contra o isolamento. Outros estudos apontam que o ato de jogar, de forma geral, pode estimular o raciocínio estratégico, a resolução de problemas e a coordenação motora, contribuindo para um melhor funcionamento executivo do cérebro. Contudo, é fundamental que o uso seja equilibrado, pois o excesso é reconhecido pela OMS como um risco de desenvolvimento do "Transtorno do Jogo".
          </p>
        </div>
      </motion.div>
      <motion.div
      initial={{ opacity: 0, x:100 }} // Estado inicial
      whileInView={{ opacity: 1, x: 0}} // Estado final
      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      
      
      >
        <div className='image-content' data-aos="zoom-in-left">
          <img src=".././public/img/gato.png" alt="" />
        </div>
        </motion.div>
      </div>

        
        <div className='carrosselfodastico'>
       
          <div className='extra-title-section'>
          <motion.div
        initial={{ opacity: 0, y:100 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
       
        >
            <h1 className='extra-title'>Screenshots do jogo</h1>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y:150 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0}} // Estado final
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
       
        >
            <p className='extra-subtitle'>Algumas screenshots do jogo (pré beta)</p>
        </motion.div>

          </div>
       <motion.div
       initial={{opacity: 0}}
       whileInView={{opacity:1}}
       transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}

       
       >
        <Carousel/>
      </motion.div>
        </div>
        
          <h1 className='extra-title'>Sobre o projeto</h1>
          <p className='extra-subtitle'>Nossa história e como chegamos aqui.</p>
          <div className='about-section'>
          <div className='about-section-text'>
            <p>Surgimos como um grupo de entusiastas em videogames estudantes da ETEC Maria Cristina Medeiros em Ribeirão Pires (SP). Em 2025, no nosso 3° Ano do ensino médio, tivemos que desenvolver um TCC, e tivemos a ideia de desenvolver um jogo.</p>
            <p>No início, nosso projeto tem como objetivo enriquecer a indústria brasileira de jogos, com um etretenimento de qualidade e pautar sobre assuntos importantes seguindo a agenda da ONU 2030.</p>

          </div>

        </div>
        



      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#9DB2BF' }}>Nossa Equipe</h1>
        <p style={{ textAlign: 'center', color: '#9DB2BF' }}>
          Conheça os mágicos por trás do truque
        </p>


        <NossaEquipe />
      </div>
      <div>
      </div>
      <Footer />
    </>
  );
}

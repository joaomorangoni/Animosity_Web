

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



// Estilo global se necessário
import '../App.css';

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,      // Whether animation should only happen once
    });
  }, []); // Empty dependency array ensures it runs only once on mount




  return (
    <>
      <Navbar />
      <Banner />
      <Gallery />
      <Objetivos />
      <div className='personagens'>
        <div className='descricao-personagens'>
          <h1 data-aos="fade-up">Hello, AOS!</h1>
          <p data-aos="fade-up">This text will animate from the left.</p>
          </div>
          <div className='hero'>
          <img className='hero-photo' data-aos="fade-left" src="../../public/img/braia.jpeg" alt="" />
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

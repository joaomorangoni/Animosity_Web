import * as React from 'react';

// Importe os componentes que eram usados no App.jsx
import Navbar from '../components/navbar/Navbar.jsx';
import Banner from "../components/banner/Banner.jsx";
import Objetivos from "../components/objetivos/Objetivos.jsx";
import NossaEquipe from '../components/nossaequipe/NossaEquipe.jsx';
import Gallery from '../components/gallery/Gallery.jsx';
import Footer from '../components/footer/Footer.jsx';

// Estilo global se necessário
import '../App.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Gallery />
      <Objetivos />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: '#9DB2BF' }}>Nossa Equipe</h1>
        <p style={{ textAlign: 'center', color: '#9DB2BF' }}>
          Conheça os mágicos por trás do truque
        </p>
        <NossaEquipe />
      </div>
      <Footer />
    </>
  );
}

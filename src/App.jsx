import * as React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Banner from "./components/banner/Banner.jsx";

import Objetivos from "./components/objetivos/Objetivos.jsx";
;
import NossaEquipe from './components/nossaequipe/NossaEquipe';
import Gallery from './components/gallery/Gallery.jsx';
import Footer from './components/footer/Footer.jsx';


function App() {
  return (
    <>
      <Navbar/>
      <Banner />
 
      <Gallery />
      <Objetivos/>
       <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color:'#9DB2BF' }} >Nossa Equipe</h1>
      <p style={{ textAlign: 'center', color:'#9DB2BF' }}>Conheça os magicos por traz do truque</p>
      <NossaEquipe />
    </div>
    <Footer/>
      
    </>


  );

}

 


export default App;
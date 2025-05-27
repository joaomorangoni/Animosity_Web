import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Banner from "./components/Banner.jsx";
import Historia from "./components/Historia.jsx";
import Objetivos from "./components/Objetivos.jsx";
import SplitTitle from "./components/SplitTxt.jsx";
import NossaEquipe from './components/NossaEquipe';
import Gallery from './components/Gallery.jsx';


function App() {
  return (
    <>
      <Navbar/>
      <Banner />
      <Historia/>
      <Gallery />
      <Objetivos/>
       <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color:'#9DB2BF' }} >Nossa Equipe</h1>
      <p style={{ textAlign: 'center', color:'#9DB2BF' }}>Conheça os magicos por traz do truque</p>
      <NossaEquipe />
    </div>
      
    </>


  );

}

 


export default App;
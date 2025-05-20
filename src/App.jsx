import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Banner from "./components/Banner.jsx";
import Historia from "./components/Historia.jsx";
import Objetivos from "./components/Objetivos.jsx";

function App() {
  return (
    <>
      <Navbar/>
      <Banner />
      <Historia/>
      <Objetivos/>
      
    </>


  );

}

 


export default App;
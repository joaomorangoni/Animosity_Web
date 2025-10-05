import React, { useState, useEffect  } from 'react';
import Particles from '../components/Particles.jsx';
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { CgProfile } from "react-icons/cg";
import SplitText from "../components/acessorios/SplitTxt.jsx";
import '../App.css';
import { CircleUserRound } from "lucide-react";
import  CustomInput  from "../components/input";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal.jsx";






export default function Contact() {


  //navbar do krl
//    const [show, setShow] = useState(false);

// useEffect(() => {
//   const handleMouseMove = (e) => {
//     if (e.clientY < 80) {
//       setShow(true);
//     } else {
//       setShow(false);
//     }
//   };

//   window.addEventListener("mousemove", handleMouseMove);
//   return () => window.removeEventListener("mousemove", handleMouseMove);
// }, []);

     // porra de feedback 
  const [feed, setFeed] = useState("");

  // caralho do estado de modal
  const [modal, setModal] = useState({ show: false, message: "" });

  // Função principal para enviar feedback pro meu
  const handlesubmit = () => {
    const trimmedFeedback = feed.trim();

    if (trimmedFeedback === "") {
      setModal({ show: true, message: "Por favor, escreva seu feedback!" });
      return;
    }

    if (trimmedFeedback.length < 10) {
      setModal({ show: true, message: "O feedback deve ter pelo menos 10 caracteres!" });
      return;
    }

    console.log("Feedback enviado:", feed);

    setFeed(""); // limpa o textarea
    setModal({ show: true, message: "Feedback enviado com sucesso!" });
  };

  // Função para fechar o modal
  const closeModal = () => setModal({ ...modal, show: false });

 
  
  
  return(

  <div className="conteudo">
      {/* <nav className={`navbar ${show ? "show" : ""}`}>
      <a href="#">Perfil</a>
      <a href="/community">Comunidade</a>
      <a href="#">Sair</a>
    </nav> */}
        <div className="banner-profile">  <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={1200}
                particleSpread={35}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                                  />


          <div className='profile-container' >
          <CircleUserRound className='profile-photo' size={90} />
          </div>
          </div>

          <div className='box1'>
            <h1 className='titulo'>Feedback!</h1>
            <div class="radio">
  <input id="rating-5" type="radio" name="rating" value="5" />
  <label for="rating-5" title="5 stars">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>

  <input id="rating-4" type="radio" name="rating" value="4" />
  <label for="rating-4" title="4 stars">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>

  <input id="rating-3" type="radio" name="rating" value="3" />
  <label for="rating-3" title="3 stars">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>

  <input id="rating-2" type="radio" name="rating" value="2" />
  <label for="rating-2" title="2 stars">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>

  <input id="rating-1" type="radio" name="rating" value="1" />
  <label for="rating-1" title="1 star">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
</div>
            <textarea
          className="input1"
          placeholder="Escreva seu feedback..."
          value={feed}                  // valor controlado
          onChange={(e) => setFeed(e.target.value)} // atualiza estado
        /> 
              
              <div class="menu">
  <div class="item">
    <a href="#" class="link">
      <span> Versão do jogo </span>
      <svg viewBox="0 0 360 360" xml:space="preserve">
        <g id="SVGRepo_iconCarrier">
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          ></path>
        </g>
      </svg>
    </a>
    <div class="submenu">
      <div class="submenu-item">
        <a href="#" class="submenu-link"> 1.1  </a>
      </div>
      <div class="submenu-item">
        <a href="#" class="submenu-link"> 1.1.1 </a>
      </div>
      <div class="submenu-item">
        <a href="#" class="submenu-link"> 1.2 </a>
      </div>
      <div class="submenu-item">
        <a href="#" class="submenu-link"> 1.3 </a>
      </div>
    </div>
  </div>
</div>
            <div className="button-container">
              <button className="button" onClick={handlesubmit}>Enviar</button>
              <button className="button1">Ver Feedbacks</button>
        {/* Modal Reutilizável */}
      <Modal
        show={modal.show}
        message={modal.message}
        onClose={closeModal}
      />
          </div>
        </div>
            </div>
  )

}



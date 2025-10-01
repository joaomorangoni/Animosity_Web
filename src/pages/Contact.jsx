import React, { useState } from 'react';
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

     // Estado do textarea
  const [feed, setFeed] = useState("");

  // Estado do modal
  const [modal, setModal] = useState({ show: false, message: "" });

  // Função principal para enviar feedback
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
            <textarea
          className="input1"
          placeholder="Escreva seu feedback..."
          value={feed}                  // valor controlado
          onChange={(e) => setFeed(e.target.value)} // atualiza estado
        /> 
              
              
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



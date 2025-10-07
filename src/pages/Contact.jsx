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
import StarRating from "../components/StarRating.jsx";
import Footer from '../components/footer/Footer.jsx';







export default function Contact() {


    const user = {
  id: localStorage.getItem("userId"),
  nome: localStorage.getItem("userName"),
  email: localStorage.getItem("userEmail")
};
console.log("Usuário carregado do localStorage:", user);


  //navbar do krl
   const [show, setShow] = useState(false);

   const [ratings, setRatings] = useState({
  "1.0": 5,
  "1.1": 5,
  "1.1.1": 5,
  "1.2": 5,
  "1.3": 5
});

const [feedback, setFeedback] = useState({
  mensagem: "",    // textarea
  estrelas: 5,     // default 5 estrelas
  versao: "1.1"    // versão inicial
});




useEffect(() => {
  const handleMouseMove = (e) => {
    if (e.clientY < 80) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);



  // caralho do estado de modal
  const [modal, setModal] = useState({ show: false, message: "" });

  // Função principal para enviar feedback pro meu
const handlesubmit = () => {
  const trimmedMensagem = feedback.mensagem.trim();
  if (!trimmedMensagem) {
    setModal({ show: true, message: "Por favor, escreva seu feedback!" });
    return;
  }
  if (trimmedMensagem.length < 10) {
    setModal({ show: true, message: "O feedback deve ter pelo menos 10 caracteres!" });
    return;
  }

  // Corrigido para pegar o user.id
  const payload = { ...feedback, id_usuario: user.id };

  fetch("http://localhost:3000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Resposta do servidor:", data);
      setModal({ show: true, message: "Feedback enviado com sucesso!" });
      setFeedback({ mensagem: "", estrelas: 5, versao: "1.1" });
    })
    .catch(err => {
      console.error("Erro no envio:", err);
      setModal({ show: true, message: "Erro ao enviar feedback!" });
    });
};






  // Função para fechar o modal
  const closeModal = () => setModal({ ...modal, show: false });

 
  
  
  return(

  <div className="conteudo">
      <nav className={`navbar ${show ? "show" : ""}`}>
      <a href="#">Perfil</a>
      <a href="/community">Comunidade</a>
      <a href="#">Sair</a>
    </nav>
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
<StarRating
  rating={feedback.estrelas}
  setRating={(newRating) => setFeedback({ ...feedback, estrelas: newRating })}
/>

 <textarea
  className="input1"
  placeholder="Escreva seu feedback..."
  value={feedback.mensagem}                  
  onChange={(e) => setFeedback({ ...feedback, mensagem: e.target.value })} 
/>
              
              <div class="menu">
 <div className="version-dropdown">
  <label htmlFor="versao" className="version-label">
    Versão do jogo
  </label>
<select
  value={feedback.versao}
  onChange={(e) => setFeedback({ ...feedback, versao: e.target.value })}
>
  <option value="1.1">1.1</option>
  <option value="1.1.1">1.1.1</option>
  <option value="1.2">1.2</option>
  <option value="1.3">1.3</option>
</select>
</div>
</div>

            <div className="button-container">
              <button className="button1" onClick={handlesubmit}>Enviar</button>
              <button className="button1">Ver Feedbacks</button>
        {/* Modal Reutilizável */}
      <Modal
        show={modal.show}
        message={modal.message}
        onClose={closeModal}
      />
          </div>
        </div>
        <Footer/>
            </div>
  )

}



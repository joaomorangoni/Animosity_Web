import React, { useState, useEffect  } from 'react';
import Particles from '../components/Particles.jsx';
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import { CgProfile } from "react-icons/cg";
import SplitText from "../components/acessorios/SplitTxt.jsx";
import '../App.css';
import { CircleUserRound } from "lucide-react";
import  CustomInput  from "../components/input";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal.jsx";
import TextType from '../components/TextType';
import Sidebar from '../components/Sidebar.jsx';







export default function Profile() {
    const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      // Redireciona para login se não estiver logado
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

  if (!user) return null;


  
  
  return(


<div className="conteudo">
      
      {/* Banner do topo */}
      <div className="banner-profile">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={1200}
          particleSpread={35}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        {/* Container do avatar e texto */}
        <div className="profile-container">
          <CircleUserRound className="profile-photo" size={90} />
          <TextType 
           text={["Olá ", user.nome]}
            className="splittxt"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
        <div className='conteudo_baixo'>

  <div className='feedbackdouser'>
    <h2>Meus Feedbacks</h2> 
    <div className='responsive-table'>
         <table> 
            <tr> <th>ESTRELAS</th> 
            <th>FEEDBACK</th> 
            <th>VERSÃO</th>
             </tr>
              <tr> <td>Alfreds Futterkiste</td>
               <td>Maria Anders</td> 
               <td>Germany</td> </tr>
                <tr> <td>Centro comercial Moctezuma</td> 
                <td>Francisco Chang</td>
                 <td>Mexico</td> </tr> </table> </div>
  </div>
  
  <div className='feedbackdouser'>
    <h2>Jogue Agora!</h2>
    <p>Clique em instalar para começar sua aventura única e incível</p>
    <p>Ao clicar, seu download iniciará em 5 segundos.</p>
    <button className="button">
  <svg
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    height="40"
    width="40"
    class="button__icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
    <path d="M7 11l5 5l5 -5"></path>
    <path d="M12 4l0 12"></path>
  </svg>
  <span class="button__text">Download</span>
</button>
  </div>
  
  <div className='feedbackdouser'>
    <h2>Selos</h2>
    <p>Sem selos</p>
    <p>Ao jogar você adiquire selos para compartilhar na comunidade.</p>
  </div>
  </div>

      </div>
      </div>
    
  


    
  )

}



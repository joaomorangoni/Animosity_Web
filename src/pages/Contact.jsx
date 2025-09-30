import React from 'react';
import Particles from '../components/Particles.jsx';
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { CgProfile } from "react-icons/cg";
import SplitText from "../components/acessorios/SplitTxt.jsx";
import '../App.css';
import { CircleUserRound } from "lucide-react";
import  CustomInput  from "../components/input";





export default function Contact() {

  
  
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


          <div >
          <CircleUserRound className='profile-photo' size={90} />


          <SplitText
            text="Olá user!"
            className="text-2xl font-semibold text-center splittxt"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"

          />
          </div>
          </div>

        <div className='feedback'>
          <div className='box1'>
            <h1 className='titulo'>Feedback!</h1>
              <textarea class="input1" placeholder="Escreva seu feedback..."></textarea>
          </div>
          <div className='box2'></div>
          <div className='box3'></div>
        </div>

        </div>


          
    

  )



}
import Particles from '../components/Particles.jsx';
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { CgProfile } from "react-icons/cg";
import SplitText from "../components/acessorios/SplitTxt.jsx";
import { Input }  from '@mui/base/Input';





export default function Contact() {

  
  
  return(
    
    <div className="container">
        <div className="banner">  <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={1200}
                particleSpread={35}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                                  />

          </div>
        <div className="div2">
          <div>
            <CgProfile size={120} strokeWidth={0.1} className='profilephoto' />

<SplitText
  text="Olá Usuarios"
  className="text-2xl font-semibold text-center splittxt"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>
          </div>



              </div>
        <div className="div3">3</div>
        <div className="div4">4</div>
    </div>
    
  )


}
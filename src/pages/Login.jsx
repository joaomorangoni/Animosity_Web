import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import SteamIcon from "../../public/img/steam.svg";
import PS4Icon from "../../public/img/PS4.svg";
import XboxIcon from "../../public/img/Xbox.svg";
import NintendoIcon from "../../public/img/Nintendo.svg";

import "./Login.css";

export default function Login() {
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w, h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 2 + 1,
      }));
    };

    const animate = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#9DB2BF";
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.z;
        if (s.y > h) s.y = 0;
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="stars-canvas" />

      <div className="logo-left">
        <img src="/logo.png" alt="Logo" className="logo-image" />
        <h2 className="logo-text">Animosidade</h2>
      </div>

      <motion.div className="login-box">
        <h1 className="login-title">Instale já!</h1>
        <p className="login-subtitle">Inscreva-se hoje</p>

        <div className="login-buttons">
          <button className="btn-google"><FcGoogle /> Google</button>
          <button className="btn-steam"><img src={SteamIcon} className="icon-img" /> Steam</button>
          <button className="btn-ps4"><img src={PS4Icon} className="icon-img" /> PSN</button>
          <button className="btn-xbox"><img src={XboxIcon} className="icon-img" /> Xbox</button>
          <button className="btn-nintendo"><img src={NintendoIcon} className="icon-img" /> Nintendo</button>
        </div>

        <div className="divider"><span>OU</span></div>

        <button className="btn-create" onClick={() => setModalOpen(true)}>Entrar</button>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="modal-title">Login</h2>

              <div className="modal-buttons">
                <button className="btn-google"><FcGoogle /> Google</button>
                <button className="btn-steam"><img src={SteamIcon} className="icon-img" /> Steam</button>
                <button className="btn-ps4"><img src={PS4Icon} className="icon-img" /> PS4</button>
                <button className="btn-xbox"><img src={XboxIcon} className="icon-img" /> Xbox</button>
                <button className="btn-nintendo"><img src={NintendoIcon} className="icon-img" /> Nintendo</button>
              </div>

              <div className="modal-divider"><span>OU</span></div>

              <input type="email" placeholder="Email" className="input-field" />
              <input type="password" placeholder="Senha" className="input-field" />
              <button className="btn-create">Entrar</button>

              <p className="login-footer">
                <span className="login-link" onClick={() => setModalOpen(false)}>Fechar ✖</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

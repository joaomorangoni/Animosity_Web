import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "#12121E" }
          },
          fpsLimit: 60,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" } },
            modes: { push: { quantity: 4 }, repulse: { distance: 100, duration: 0.4 } }
          },
          particles: {
            color: { value: "#7ec8e3" },
            links: { color: "#7ec8e3", distance: 150, enable: true, opacity: 0.3, width: 1 },
            collisions: { enable: true },
            move: { enable: true, speed: 2, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } }
          },
          detectRetina: true
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="login-form"
      >
        <Typography variant="h4" sx={{ mb: 3, color: "#fff", letterSpacing: 2 }}>
          LOGIN
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Usuário"
          InputProps={{ className: "input-line" }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Senha"
          InputProps={{ className: "input-line" }}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="outlined"
          className="login-btn"
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

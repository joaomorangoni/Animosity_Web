import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: { color: { value: "#121212" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { enable: true, color: "#ffffff", distance: 150, opacity: 0.2, width: 1 },
      collisions: { enable: false },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const handleGoogleLogin = () => {
    alert("Login com Google clicado! Implemente a autenticação real aqui.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login com email e senha clicado! Implemente a lógica aqui.");
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          zIndex: 1,
          bgcolor: "transparent",
          border: "2px solid #fff",
          borderRadius: 2,
          p: 4,
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          color: "#fff",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography variant="h5" align="center" mb={2}>
          Login
        </Typography>

        <TextField
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          required
          InputProps={{
            style: { color: "#fff", borderColor: "#fff" },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#bbb" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <TextField
          variant="outlined"
          label="Senha"
          name="password"
          type="password"
          required
          InputProps={{
            style: { color: "#fff" },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#bbb" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        <Button
          type="submit"
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          Entrar
        </Button>

        <Divider
          sx={{
            color: "#fff",
            "&::before, &::after": { borderColor: "#fff" },
          }}
        >
          Ou
        </Divider>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          Entrar com Google
        </Button>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginRegister() {
  const [showRegister, setShowRegister] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Variantes para o container branco (área do formulário)
  const containerVariants = {
    login: {
      width: isMobile ? "90vw" : "40vw",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    register: {
      width: isMobile ? "90vw" : "55vw",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // Variantes para os formulários (opacidade + escala)
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a192f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        p: 0,
      }}
    >
      {/* Fundo azul escuro do lado direito (metade da tela) */}
      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            right: 0,
            top: 0,
            height: "100vh",
            width: "50vw",
            bgcolor: "#112240",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#64ffda",
            fontWeight: "700",
            fontSize: "2rem",
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowRegister(!showRegister)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if(e.key === 'Enter') setShowRegister(!showRegister) }}
        >
          {showRegister ? "← Voltar ao Login" : "Registrar →"}
        </Box>
      )}

      {/* Container branco do formulário */}
      <motion.div
        variants={containerVariants}
        animate={showRegister ? "register" : "login"}
        initial={false}
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 10,
          width: isMobile ? "90vw" : "40vw",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          padding: "3rem 2.5rem",
          overflow: "hidden",
        }}
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          {!showRegister ? (
            <motion.form
              key="login"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Login enviado!");
              }}
              style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <Typography variant="h4" sx={{ mb: 4, color: "#0a192f", fontWeight: 700 }}>
                Login
              </Typography>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 4 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  py: 1.8,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  backgroundColor: "#0a192f",
                  "&:hover": { backgroundColor: "#112240" },
                  borderRadius: "8px",
                }}
              >
                Entrar
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Registro enviado!");
              }}
              style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <Typography variant="h4" sx={{ mb: 4, color: "#0a192f", fontWeight: 700 }}>
                Registrar
              </Typography>
              <TextField
                label="Nome Completo"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                required
                fullWidth
                sx={{ mb: 4 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  py: 1.8,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                }}
              >
                Registrar
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
}

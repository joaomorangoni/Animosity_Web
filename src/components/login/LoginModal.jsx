import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const LoginModal = ({ open, onClose }) => {
  const [tela, setTela] = useState("login");

  const alternarTela = () => {
    setTela((prev) => (prev === "login" ? "cadastro" : "login"));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
          onClick={onClose} // Para fechar ao clicar no fundo
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()} // Impede que clique no fundo feche
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "1rem",
              boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)",
              padding: "2rem",
              width: "90%",
              maxWidth: "400px",
              position: "relative",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#fff",
                "&:hover": {
                  transform: "rotate(90deg)",
                  transition: "0.3s ease",
                },
              }}
            >
              <X />
            </IconButton>

            <motion.div
              key={tela}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <Typography
                variant="h5"
                align="center"
                mb={2}
                sx={{ color: "#fff", letterSpacing: 1 }}
              >
                {tela === "login" ? "Login" : "Cadastro"}
              </Typography>

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
              />
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#ccc" },
                }}
              />

              {tela === "cadastro" && (
                <TextField
                  label="Confirmar Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                  InputLabelProps={{
                    style: { color: "#ccc" },
                  }}
                />
              )}

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#7ec8e3",
                  color: "#7ec8e3",
                  "&:hover": {
                    borderColor: "#fff",
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {tela === "login" ? "Entrar" : "Cadastrar"}
              </Button>

              <Button
                fullWidth
                onClick={alternarTela}
                sx={{
                  mt: 1,
                  color: "#7ec8e3",
                  textTransform: "none",
                }}
              >
                {tela === "login"
                  ? "Não tem conta? Cadastre-se"
                  : "Já tem conta? Faça login"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

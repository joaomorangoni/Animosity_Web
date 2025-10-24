import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Typography,
  Avatar,
  Modal,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";
import { X, Github, Linkedin, ArrowLeft, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

const membros = [
  {
    nome: "João Pedro Morangoni",
    funcao: "Game Dev",
    imagem: "/moranguinho.jpg",
    descricao: "Oi, sou o João, tenho 18 anos e programei o jogo!.",
    github: "https://github.com/joaomorangoni",
    linkedin: "https://linkedin.com/in/morangoni",
  },
  {
    nome: "Kauan Venancio",
    funcao: "Dev Full stack",
    imagem: "/kauan.jpeg",
    descricao: "Oi! Sou o Kauan, e fiquei responsável pelo visual artístico, animações e funcionalidades do site.",
    github: "https://github.com/vrodrigueskauan",
    linkedin: "https://linkedin.com/in/kauanvenancio",
  },
  {
    nome: "Bryan Almeida",
    funcao: "Artista e animador de pixel-art",
    imagem: "/braia.jpeg",
    descricao: "Eai! Sou o Bryan e fiz as pixel-arts do jogo, desde cenários até o maior vilão!.",
    github: "https://github.com/bryanalmeida",
    linkedin: "https://linkedin.com/in/bryanalmeida",
  },
  {
    nome: "Daniel Benatti",
    funcao: "Financeiro.",
    imagem: "/daniel.jpeg",
    descricao: "Sou o Daniel e fiz o financeiro do projeto!",
    github: "https://github.com/danielbenatti",
    linkedin: "https://linkedin.com/in/danielbenatti",
  },
  {
    nome: "Bruno Sorrilha",
    funcao: "Gestor de Projeto",
    imagem: "/bruno.jpeg",
    descricao: "Organiza as demandas e garante que tudo funcione bem.",
    github: "https://github.com/brunosorrisos",
    linkedin: "https://linkedin.com/in/brunosorrisos",
  },
];

const NossaEquipe = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [indexAtual, setIndexAtual] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const isMobile = useMediaQuery("(max-width:768px)");

  const abrirModal = (membro) => {
    setMembroSelecionado(membro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const proximo = () => {
    setIndexAtual((prev) => (prev + 1) % membros.length);
  };

  const anterior = () => {
    setIndexAtual((prev) => (prev - 1 + membros.length) % membros.length);
  };

  return (
    <Box ref={ref} sx={{ color: "#fff", textAlign: "center", mt: 4 }}>
      {isMobile ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={anterior} sx={{ color: "#fff" }}>
            <ArrowLeft />
          </IconButton>
          <AnimatePresence mode="wait">
            {inView && (
              <motion.div
                key={indexAtual}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                onClick={() => abrirModal(membros[indexAtual])}
                whileHover={{
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                  backgroundColor: "#5c7b9b",
                }}
                style={{
                  background: "#526d8258",
                  backdropFilter: "blur(10px)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  maxWidth: "80vw",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div style={{ position: "relative" }}>
                  <motion.div
                    whileHover={{ rotate: [0, 5, -5, 5, -5, 0] }}
                    transition={{ duration: 0.8 }}
                  >
                    <Avatar
                      src={membros[indexAtual].imagem}
                      alt={membros[indexAtual].nome}
                      sx={{
                        width: 100,
                        height: 100,
                        margin: "0 auto",
                        mb: 2,
                        border: "2px solid #fff",
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      pointerEvents: "none",
                    }}
                  >
                    Clique aqui
                  </motion.div>
                </motion.div>
                <Typography variant="h6">{membros[indexAtual].nome}</Typography>
                <Typography variant="body2" color="#9DB2BF">
                  {membros[indexAtual].funcao}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
          <IconButton onClick={proximo} sx={{ color: "#fff" }}>
            <ArrowRight />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
          {membros.map((membro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => abrirModal(membro)}
              whileHover={{
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                backgroundColor: "#5c7b9b",
              }}
              style={{
                 background: "#526d8258",
                  backdropFilter: "blur(10px)",
                padding: "2rem",
                borderRadius: "1rem",
                cursor: "pointer",
                maxWidth: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div style={{ position: "relative" }}>
                <motion.div
                  whileHover={{ rotate: [0, 5, -5, 5, -5, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  <Avatar
                    src={membro.imagem}
                    alt={membro.nome}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "0 auto",
                      mb: 2,
                      border: "2px solid #fff",
                    }}
                  />
                </motion.div>
                <motion.div
                
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    pointerEvents: "none",
                  }}
                >
                  Clique aqui
                </motion.div>
              </motion.div>
              <Typography variant="h6">{membro.nome}</Typography>
              <Typography variant="body2" color="#9DB2BF">
                {membro.funcao}
              </Typography>
            </motion.div>
          ))}
        </Box>
      )}

      <Modal open={modalAberto} onClose={fecharModal}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <AnimatePresence>
            {membroSelecionado && (
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scaleY: 0.02 }}
                transition={{ duration: 0.6 }}
                style={{
                 background: "#526d8258",
                  backdropFilter: "blur(10px)",
                  color: "#5274a4ff",
                  padding: "2rem",
                  borderRadius: "1rem",
                  maxWidth: "500px",
                  width: "90%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={fecharModal}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "#9DB2BF",
                  }}
                >
                  <X />
                </IconButton>

                <motion.div
                  initial={{ y: -200, opacity: 0 }}
                  animate={{ y: [ -200, 20, -10, 0 ], opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Avatar
                    src={membroSelecionado.imagem}
                    alt={membroSelecionado.nome}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      mb: 2,
                      border: "2px solid #425673ff",
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography variant="h6" align="center">
                    {membroSelecionado.nome}
                  </Typography>
                  <Typography variant="subtitle2" align="center" color="#9DB2BF">
                    {membroSelecionado.funcao}
                  </Typography>
                  <Typography mt={2} align="center">
                    {membroSelecionado.descricao}
                  </Typography>

                  <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    <Link href={membroSelecionado.github} target="_blank" underline="none" color="#9DB2BF">
                      <Github />
                    </Link>
                    <Link href={membroSelecionado.linkedin} target="_blank" underline="none" color="#9DB2BF">
                      <Linkedin />
                    </Link>
                  </Box>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </Box>
  );
};

export default NossaEquipe;

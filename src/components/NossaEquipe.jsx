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
    imagem: "./public/img/",
    descricao: "Oi, sou o João, tenho 17 anos e programei o jogo!.",
    github: "https://github.com/morangoni",
    linkedin: "https://linkedin.com/in/morangoni",
  },
  {
    nome: "Kauan Venancio",
    funcao: "Dev Front-end",
    imagem: "./public/img/kauan.jpeg",
    descricao: "Oi! Sou o Kauan, e fiquei responsável pelo visual artístico e animações do site.",
    github: "https://github.com/vrodrigueskauan",
    linkedin: "https://linkedin.com/in/kauanvenancio",
  },
  {
    nome: "Bryan Almeida",
    funcao: "Artista e animador de pixel-art",
    imagem: "/assets/bryan.jpg",
    descricao: "Eai! Sou o Bryan e fiz as pixel-arts do jogo, desde cenários até o maior vilão!.",
    github: "https://github.com/bryanalmeida",
    linkedin: "https://linkedin.com/in/bryanalmeida",
  },
  {
    nome: "Daniel Benatti",
    funcao: "Dev Back-end.",
    imagem: "./public/img/daniel.jpeg",
    descricao: "Sou o Daniel e fiz o back-end desse site!",
    github: "https://github.com/danielbenatti",
    linkedin: "https://linkedin.com/in/danielbenatti",
  },
  {
    nome: "Bruno Sorrisos",
    funcao: "Gestor de Projeto",
    imagem: "./public/img/bruno.jpeg",
    descricao: "Organiza as demandas e garante que tudo funcione bem.",
    github: "https://github.com/brunosorrisos",
    linkedin: "https://linkedin.com/in/brunosorrisos",
  },
];

const NossaEquipe = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [fechandoModal, setFechandoModal] = useState(false);
  const [indexAtual, setIndexAtual] = useState(0);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const abrirModal = (membro) => {
    setMembroSelecionado(membro);
    setModalAberto(true);
    setFechandoModal(false);
  };

  const fecharModal = () => {
    setFechandoModal(true);
    setTimeout(() => {
      setModalAberto(false);
      setMembroSelecionado(null);
      setFechandoModal(false);
    }, 700); // Duração da animação de saída
  };

  const proximo = () => {
    setIndexAtual((prev) => (prev + 1) % membros.length);
  };

  const anterior = () => {
    setIndexAtual((prev) => (prev - 1 + membros.length) % membros.length);
  };

  return (
    <Box ref={ref} sx={{ color: "#fff", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" mb={4}>
        Nossa Equipe
      </Typography>

      {isMobile ? (
        <Box position="relative" display="flex" alignItems="center" justifyContent="center">
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
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => abrirModal(membros[indexAtual])}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                }}
                style={{
                  background: "#526D82",
                  padding: "2rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  maxWidth: "90vw",
                  margin: "0 1rem",
                }}
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
            <AnimatePresence key={index}>
              {inView && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                  onClick={() => abrirModal(membro)}
                  style={{
                    background: "#526D82",
                    padding: "2rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    maxWidth: "300px",
                  }}
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
                  <Typography variant="h6">{membro.nome}</Typography>
                  <Typography variant="body2" color="#9DB2BF">
                    {membro.funcao}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </Box>
      )}

      <Modal open={modalAberto} onClose={fecharModal}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <AnimatePresence>
            {membroSelecionado && (
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.3, rotate: 60 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                  background: "#526D82",
                  color: "#27374D",
                  padding: "2rem",
                  borderRadius: "1rem",
                  maxWidth: "500px",
                  width: "90%",
                  position: "relative",
                  boxShadow: "0 0 40px rgba(0,0,0,0.4)",
                }}
              >
                <IconButton
                  onClick={fecharModal}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "#27374D",
                  }}
                >
                  <X />
                </IconButton>

                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Avatar
                    src={membroSelecionado.imagem}
                    alt={membroSelecionado.nome}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      mb: 2,
                      border: "2px solid #27374D",
                    }}
                  />
                </motion.div>

                <Typography variant="h6" align="center">
                  {membroSelecionado.nome}
                </Typography>
                <Typography variant="subtitle2" align="center" color="#526D82">
                  {membroSelecionado.funcao}
                </Typography>
                <Typography mt={2} align="center">
                  {membroSelecionado.descricao}
                </Typography>

                <Box
                  mt={3}
                  display="flex"
                  justifyContent="center"
                  gap={2}
                  sx={{ color: "#9DB2BF" }}
                >
                  <Link href={membroSelecionado.github} target="_blank" underline="none">
                    <Github />
                  </Link>
                  <Link href={membroSelecionado.linkedin} target="_blank" underline="none">
                    <Linkedin />
                  </Link>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </Box>
  );
};

export default NossaEquipe;

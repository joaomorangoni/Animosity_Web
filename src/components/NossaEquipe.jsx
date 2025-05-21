import React, { useState } from "react";
  import { AnimatePresence} from "framer-motion";

import {
  Box,
  Grid,
  Typography,
  Avatar,
  Modal,
  IconButton,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { Heart, X, Github, Linkedin } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Dados dos membros da equipe
const membros = [
  {
    nome: "João Pedro Morangoni",
    funcao: "Dev Back-end",
    imagem: "/assets/morangoni.jpg",
    descricao: "Oi, sou o João, tenho 17 anos e fiz o back-end desse site, e programei o jogo!.",
    github: "https://github.com/morangoni",
    linkedin: "https://linkedin.com/in/morangoni",
  },
  {
    nome: "Kauan Venancio",
    funcao: "Dev Front-end",
    imagem: "/assets/kauan.jpg",
    descricao: "Oii! Sou o Kauan, e fiquei responsável pelo visual artístico e animações do site, fiz toda a programação de estilo do site usando react.",
    github: "https://github.com/kauanvenancio",
    linkedin: "https://linkedin.com/in/kauanvenancio",
  },
  {
    nome: "Bryan Almeida",
    funcao: "Artista e animador de pixel-art",
    imagem: "/assets/bryan.jpg",
    descricao: "Eai! Sou o bryan e fiz as pixel-arts do jogo, desde cenários até o maior vilão!.",
    github: "https://github.com/bryanalmeida",
    linkedin: "https://linkedin.com/in/bryanalmeida",
  },
  {
    nome: "Daniel Benatti",
    funcao: "É bom de boca.",
    imagem: "/assets/daniel.jpg",
    descricao: "eu sou o daniel e sou bom de boca",
    github: "https://github.com/danielbenatti",
    linkedin: "https://linkedin.com/in/danielbenatti",
  },
  {
    nome: "Bruno Sorrisos",
    funcao: "Gestor de Projeto",
    imagem: "/assets/bruno.jpg",
    descricao: "Organiza as demandas e garante que tudo funcione bem.",
    github: "https://github.com/brunosorrisos",
    linkedin: "https://linkedin.com/in/brunosorrisos",
  },
];

const NossaEquipe = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const abrirModal = (membro) => {
    setMembroSelecionado(membro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMembroSelecionado(null);
  };

  return (
    <>
      <Box sx={{ color: "#fff", textAlign: "center", mt: 4 }}>
        <Typography variant="h4" mb={4}>

        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {membros.map((membro, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            return (
              <Grid item xs={12} sm={6} md={4} key={index} ref={ref}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                  onClick={() => abrirModal(membro)}
                  style={{
                    background: "#526D82",
                    color: "#fff",
                    padding: "2rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                                    whileHover={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                whileHover={{ rotate: [0, 5, -5, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
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

                  </motion.div>
                  <Typography variant="h6">{membro.nome}</Typography>
                  <Typography variant="body2" color="#9DB2BF">
                    {membro.funcao}
                  </Typography>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Modal glamouroso */}
    


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
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: "#526D82",
            color: "#27374D",
            padding: "2rem",
            borderRadius: "1rem",
            maxWidth: "500px",
            width: "90%",
            position: "relative",
            boxShadow: "0 0 30px rgba(0,0,0,0.2)",
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
            whileHover={{
              rotate: [0, 2, -2, 2, -2, 0],
              transition: { duration: 0.4 },
            }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
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
              <Link
                href={membroSelecionado.github}
                target="_blank"
                rel="noopener"
                underline="none"
                color="#9DB2BF"
              >
                <Github />
              </Link>
              <Link
                href={membroSelecionado.linkedin}
                target="_blank"
                rel="noopener"
                underline="none"
                color="#9DB2BF"
              >
                <Linkedin />
              </Link>
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
              <motion.div
                whileTap={{ scale: 1.4 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </Box>
</Modal>

    </>
  );
};

export default NossaEquipe;

import React, { useState, useEffect } from "react";
import { Box, IconButton, Link, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "/contact" },
];

const Navbar = () => {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [gifAcabou, setGifAcabou] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleSidebar = () => setSidebarAberta(!sidebarAberta);

  useEffect(() => {
    // Duração do GIF em ms (ajuste conforme necessário)
    const timer = setTimeout(() => setGifAcabou(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
      {/* Barra principal */}
      <Box
        component={motion.div}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(18, 18, 30, 0.5)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* LOGO (GIF → IMAGEM) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            {!gifAcabou ? (
              <motion.img
                key="gif"
                src="../../public/img/logo.gif"
                alt="Logo animado"
                style={{
                  width: "120px",
                  height: "50px",
                  objectFit: "contain",
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              />
            ) : (
              <motion.img
                key="static"
                src="../../public/img/logoimg.png"
                alt="Logo estático"
                style={{
                  width: "120px",
                  height: "50px",
                  objectFit: "contain",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
              />
            )}
          </AnimatePresence>
        </Box>

        {/* Links Desktop */}
        {!isMobile && (
          <Box display="flex" gap={3}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                underline="none"
                sx={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7ec8e3",
                    textShadow: "0 0 8px rgba(126,200,227,0.6)",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* Botão Login */}
            <Link
              href="/login"
              underline="none"
              sx={{
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "bold",
                px: 2,
                py: 0.5,
                border: "1px solid #7ec8e3",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#7ec8e3",
                  color: "#12121e",
                  boxShadow: "0 0 12px rgba(126,200,227,0.8)",
                },
              }}
            >
              Login
            </Link>
          </Box>
        )}

        {/* Botão Menu Mobile */}
        {isMobile && (
          <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
            <Menu />
          </IconButton>
        )}
      </Box>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarAberta && isMobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "70vw",
              maxWidth: "300px",
              backdropFilter: "blur(20px)",
              background: "rgba(18, 18, 30, 0.7)",
              boxShadow: "-5px 0 20px rgba(0,0,0,0.4)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
            }}
          >
            {/* Botão fechar */}
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
                <X size={32} />
              </IconButton>
            </motion.div>

            {/* Links Mobile */}
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    mb: 2,
                    transition: "0.3s",
                    "&:hover": { color: "#7ec8e3" },
                  }}
                  onClick={toggleSidebar}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Botão Login Mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.1 * links.length }}
            >
              <Link
                href="/login"
                underline="none"
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  px: 2,
                  py: 0.5,
                  border: "1px solid #7ec8e3",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "#7ec8e3",
                    color: "#12121e",
                    boxShadow: "0 0 12px rgba(126,200,227,0.8)",
                  },
                }}
                onClick={toggleSidebar}
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Box, Link, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Login", href: "/login" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = window.innerHeight;
      setScrolled(window.scrollY > bannerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <Box
      component={motion.div}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        position: "fixed",
        top: 5,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        background: scrolled ? "rgba(30, 20, 50, 0.6)" : "rgba(18,18,30,0.3)",
        borderRadius: "30px",
        padding: "12px 32px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        transition: "all 0.4s ease",
      }}
    >
      {isMobile ? (
        <>
          {/* Hamburger estilizado */}
          <Box
            onClick={toggleMenu}
            sx={{
              width: "40px",
              height: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              zIndex: 150,
            }}
          >
            <motion.span
              animate={menuAberto ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "block",
                height: "4px",
                width: "100%",
                background: "#7ec8e3",
                borderRadius: "2px",
              }}
              whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
            />
            <motion.span
              animate={menuAberto ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "block",
                height: "4px",
                width: "100%",
                background: "#7ec8e3",
                borderRadius: "2px",
              }}
              whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
            />
            <motion.span
              animate={menuAberto ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "block",
                height: "4px",
                width: "100%",
                background: "#7ec8e3",
                borderRadius: "2px",
              }}
              whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
            />
          </Box>

          {/* Menu móvel */}
          <AnimatePresence>
            {menuAberto && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  height: "100vh",
                  width: "70vw",
                  maxWidth: "300px",
                  backdropFilter: "blur(20px)",
                  background: "rgba(30, 20, 50, 0.9)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                  borderRadius: "20px 0 0 20px",
                  zIndex: 100,
                }}
              >
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      underline="none"
                      sx={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        "&:hover": { color: "#7ec8e3" },
                      }}
                      onClick={() => setMenuAberto(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              underline="none"
              sx={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: 500,
                position: "relative",
                padding: "6px 0",
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": { color: "#7ec8e3" },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  height: "2px",
                  width: "0%",
                  background: "#7ec8e3",
                  borderRadius: "2px",
                  transition: "width 0.35s ease",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

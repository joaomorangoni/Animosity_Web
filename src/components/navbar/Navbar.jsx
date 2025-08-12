import React, { useState } from "react";
import { Box, IconButton, Link, Typography, useMediaQuery } from "@mui/material";
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
  const isMobile = useMediaQuery("(max-width:768px)");

  const toggleSidebar = () => setSidebarAberta(!sidebarAberta);

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
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
          <Typography sx={{ color: "#fff", fontWeight: "bold", letterSpacing: 2 }}>
            ANIMOSIDADE
          </Typography>

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
                    transition: "0.3s",
                    "&:hover": { color: "#7ec8e3" },
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                underline="none"
                sx={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  "&:hover": { color: "#7ec8e3" },
                }}
              >
                Login
              </Link>
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
              <Menu />
            </IconButton>
          )}
        </Box>

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
              }}
            >
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
                    mb: 2,
                    cursor: "pointer",
                    "&:hover": { color: "#7ec8e3" },
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
    </>
  );
};

export default Navbar;

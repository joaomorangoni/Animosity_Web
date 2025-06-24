import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Github, Linkedin, Instagram } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Box className="footer-content">
        <Typography variant="h6" className="footer-title">
          Animosidade
        </Typography>
        <Typography variant="body2" className="footer-subtitle">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </Typography>

        <Box className="footer-social">
          <IconButton component={Link} href="https://github.com/vrodrigueskauan" target="_blank" className="footer-icon">
            <Github />
          </IconButton>
          <IconButton component={Link} href="https://linkedin.com/in/kauanvenancio" target="_blank" className="footer-icon">
            <Linkedin />
          </IconButton>
          <IconButton component={Link} href="https://instagram.com" target="_blank" className="footer-icon">
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

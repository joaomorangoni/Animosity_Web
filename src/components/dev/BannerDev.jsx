import React from "react";
import { motion } from "framer-motion";
import "./BannerDev.css";

export default function BannerDev() {
  return (
    <section className="banner-dev">
      <motion.img
        src="/img/animosity-dev-logo.png" // Caminho do logo
        alt="Logo Animosity Dev"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="banner-logo"
      />
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Bem-vindo ao Animosity Dev
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Criando interfaces avançadas com React, Framer Motion e mais.
      </motion.p>
    </section>
  );
}

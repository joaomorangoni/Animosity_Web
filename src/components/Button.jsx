import { motion } from 'framer-motion';
import './botao.css'; // estilos adicionais opcionais

export default function FancyButton({ children, onClick }) {
  return (
    <motion.button
      className="fancy-button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1], // easeInOut
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 16px rgba(255, 255, 255, 0.2)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

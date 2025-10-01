// Modal.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ show, onClose, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{message}</p>
            <button className="button" onClick={onClose}>OK</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

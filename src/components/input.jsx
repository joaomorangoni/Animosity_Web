// src/components/CustomInput.jsx
import React from "react";
import "./CustomInput.css"; // Importa os estilos

export default function CustomInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className="custom-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

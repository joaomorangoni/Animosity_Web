import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensagem enviada!\nNome: ${form.nome}\nEmail: ${form.email}\nMensagem: ${form.mensagem}`);
    // Aqui você poderia enviar os dados para um backend
    setForm({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div style={styles.container}>
      <h1>Contato</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nome:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Mensagem:
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            required
            style={{ ...styles.input, height: '100px' }}
          />
        </label>

        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

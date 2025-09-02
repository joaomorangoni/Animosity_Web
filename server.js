import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const DB_FILE = './usuarios.json';

// Função auxiliar para ler os usuários do JSON
function lerUsuarios() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
}

// Função auxiliar para salvar os usuários no JSON
function salvarUsuarios(usuarios) {
    fs.writeFileSync(DB_FILE, JSON.stringify(usuarios, null, 2));
}

// ---------------- ROTAS ----------------

// Cadastro
app.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha email e senha.' });
    }

    let usuarios = lerUsuarios();

    const existe = usuarios.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ mensagem: 'Usuário já cadastrado!' });
    }

    usuarios.push({ email, senha });
    salvarUsuarios(usuarios);

    return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
});

// Login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha email e senha.' });
    }

    let usuarios = lerUsuarios();

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas!' });
    }

    return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
});

// ---------------- SERVIDOR ----------------
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

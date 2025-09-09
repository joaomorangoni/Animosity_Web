import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const router = express.Router();

// Pega o caminho absoluto do diretório deste arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garante que o JSON fique na mesma pasta que usuarios.js
const DB_FILE = resolve(__dirname, 'usuarios.json');

// Funções auxiliares
function lerArquivo(caminho) {
    if (!fs.existsSync(caminho)) {
        fs.writeFileSync(caminho, JSON.stringify([]));
    }
    const data = fs.readFileSync(caminho);
    return JSON.parse(data);
}

function salvarArquivo(caminho, conteudo) {
    fs.writeFileSync(caminho, JSON.stringify(conteudo, null, 2));
}

// Cadastro
router.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha email e senha.' });
    }

    let usuarios = lerArquivo(DB_FILE);
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ mensagem: 'Usuário já cadastrado!' });
    }

    usuarios.push({ email, senha });
    salvarArquivo(DB_FILE, usuarios);
    return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!' });
});

// Login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha email e senha.' });
    }

    let usuarios = lerArquivo(DB_FILE);
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas!' });
    }

    return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
});

export default router;

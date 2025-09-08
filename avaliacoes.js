import express from 'express';
import fs from 'fs';

const router = express.Router();
const AVAL_FILE = './avaliacoes.json';

// ---------- Funções auxiliares ----------
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

// ---------- Rotas de Avaliações ----------

// Cadastrar avaliação
router.post('/avaliacao', (req, res) => {
    const { nome, estrelas, texto } = req.body;

    if (!nome || !estrelas || !texto) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos: nome, estrelas, texto.' });
    }

    if (estrelas < 1 || estrelas > 5) {
        return res.status(400).json({ mensagem: 'A avaliação deve ser de 1 a 5 estrelas.' });
    }

    let avaliacoes = lerArquivo(AVAL_FILE);

    // Gerar ID automático (se vazio começa em 1)
    const novoId = avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1].id + 1 : 1;

    const novaAvaliacao = { id: novoId, nome, estrelas, texto };
    avaliacoes.push(novaAvaliacao);
    salvarArquivo(AVAL_FILE, avaliacoes);

    return res.status(201).json({ mensagem: 'Avaliação registrada com sucesso!', avaliacao: novaAvaliacao });
});

// Listar todas as avaliações
router.get('/avaliacoes', (req, res) => {
    let avaliacoes = lerArquivo(AVAL_FILE);
    return res.json(avaliacoes);
});

// Calcular média das estrelas
router.get('/avaliacoes/media', (req, res) => {
    let avaliacoes = lerArquivo(AVAL_FILE);

    if (avaliacoes.length === 0) {
        return res.json({ media: 0, total: 0 });
    }

    let soma = avaliacoes.reduce((acc, curr) => acc + curr.estrelas, 0);
    let media = soma / avaliacoes.length;

    return res.json({ media: media.toFixed(2), total: avaliacoes.length });
});

// Editar avaliação por ID
router.put('/avaliacao/:id', (req, res) => {
    const { id } = req.params;
    const { nome, estrelas, texto } = req.body;

    let avaliacoes = lerArquivo(AVAL_FILE);
    const index = avaliacoes.findIndex(av => av.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Avaliação não encontrada.' });
    }

    if (estrelas && (estrelas < 1 || estrelas > 5)) {
        return res.status(400).json({ mensagem: 'A avaliação deve ser de 1 a 5 estrelas.' });
    }

    // Atualiza somente os campos enviados
    if (nome) avaliacoes[index].nome = nome;
    if (estrelas) avaliacoes[index].estrelas = estrelas;
    if (texto) avaliacoes[index].texto = texto;

    salvarArquivo(AVAL_FILE, avaliacoes);

    return res.json({ mensagem: 'Avaliação atualizada com sucesso!', avaliacao: avaliacoes[index] });
});

// Excluir avaliação por ID
router.delete('/avaliacao/:id', (req, res) => {
    const { id } = req.params;
    let avaliacoes = lerArquivo(AVAL_FILE);

    const index = avaliacoes.findIndex(av => av.id == id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Avaliação não encontrada.' });
    }

    const removida = avaliacoes.splice(index, 1);
    salvarArquivo(AVAL_FILE, avaliacoes);

    return res.json({ mensagem: 'Avaliação removida com sucesso!', removida });
});

export default router;

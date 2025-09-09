// avaliacoes.js
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const router = express.Router();

// Resolve caminho absoluto do JSON ao lado deste arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const AVAL_FILE = resolve(__dirname, 'avaliacoes.json');

// ---------- Funções auxiliares ----------
function lerArquivo() {
  if (!fs.existsSync(AVAL_FILE)) {
    fs.writeFileSync(AVAL_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(AVAL_FILE);
  return JSON.parse(data);
}

function salvarArquivo(conteudo) {
  fs.writeFileSync(AVAL_FILE, JSON.stringify(conteudo, null, 2));
}

// ---------- Rotas de Avaliações ----------

// Cadastrar avaliação  -> POST /avaliacoes
router.post('/', (req, res) => {
  const { nome, estrelas, texto } = req.body;

  if (!nome || !Number(estrelas) || !texto) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos: nome, estrelas, texto.' });
  }

  const nEstrelas = Number(estrelas);
  if (nEstrelas < 1 || nEstrelas > 5) {
    return res.status(400).json({ mensagem: 'A avaliação deve ser de 1 a 5 estrelas.' });
  }

  let avaliacoes = lerArquivo();

  const novoId = avaliacoes.length > 0 ? avaliacoes[avaliacoes.length - 1].id + 1 : 1;

  const novaAvaliacao = { id: novoId, nome, estrelas: nEstrelas, texto };
  avaliacoes.push(novaAvaliacao);
  salvarArquivo(avaliacoes);

  console.log('✅ Nova avaliação salva:', novaAvaliacao);
  return res.status(201).json({ mensagem: 'Avaliação registrada com sucesso!', avaliacao: novaAvaliacao });
});

// Listar todas -> GET /avaliacoes
router.get('/', (req, res) => {
  const avaliacoes = lerArquivo();
  return res.json(avaliacoes);
});

// Média -> GET /avaliacoes/media
router.get('/media', (req, res) => {
  const avaliacoes = lerArquivo();

  if (avaliacoes.length === 0) {
    return res.json({ media: 0, total: 0 });
  }

  const soma = avaliacoes.reduce((acc, curr) => acc + Number(curr.estrelas || 0), 0);
  const media = soma / avaliacoes.length;

  return res.json({ media: Number(media.toFixed(2)), total: avaliacoes.length });
});

// Editar -> PUT /avaliacoes/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, estrelas, texto } = req.body;

  let avaliacoes = lerArquivo();
  const index = avaliacoes.findIndex(av => String(av.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Avaliação não encontrada.' });
  }

  if (estrelas !== undefined) {
    const nEstrelas = Number(estrelas);
    if (nEstrelas < 1 || nEstrelas > 5) {
      return res.status(400).json({ mensagem: 'A avaliação deve ser de 1 a 5 estrelas.' });
    }
    avaliacoes[index].estrelas = nEstrelas;
  }

  if (nome)  avaliacoes[index].nome  = nome;
  if (texto) avaliacoes[index].texto = texto;

  salvarArquivo(avaliacoes);

  return res.json({ mensagem: 'Avaliação atualizada com sucesso!', avaliacao: avaliacoes[index] });
});

// Excluir -> DELETE /avaliacoes/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let avaliacoes = lerArquivo();

  const index = avaliacoes.findIndex(av => String(av.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Avaliação não encontrada.' });
  }

  const [removida] = avaliacoes.splice(index, 1);
  salvarArquivo(avaliacoes);

  return res.json({ mensagem: 'Avaliação removida com sucesso!', removida });
});

export default router;

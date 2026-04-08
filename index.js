const express = require('express');
const app = express();
app.use(express.json());

let estoque = [];
let proximoId = 1;

// GET - Listar todos os itens
app.get('/itens', (req, res) => {
  res.json(estoque);
});

// POST - Cadastrar novo item
app.post('/itens', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  const novoItem = { id: proximoId++, nome, quantidade, preco };
  estoque.push(novoItem);
  res.status(201).json(novoItem);
});

// PUT - Atualizar item
app.put('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = estoque.findIndex(item => item.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Item não encontrado' });
  estoque[index] = { id, ...req.body };
  res.json(estoque[index]);
});

// DELETE - Remover item
app.delete('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  estoque = estoque.filter(item => item.id !== id);
  res.json({ mensagem: 'Item removido com sucesso' });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
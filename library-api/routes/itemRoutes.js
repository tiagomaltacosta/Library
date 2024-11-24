const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel'); // Modelo do MongoDB para os itens
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware para autenticação

// Rota para consultar todos os itens
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find(); // Buscar todos os itens no banco de dados
    res.json(items); // Retorna os itens em formato JSON
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar os itens' });
  }
});

// Rota para consultar um item específico por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o item' });
  }
});

// Rota para criar um novo item
router.post('/', authenticateToken, async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar o item' });
  }
});

// Rota para atualizar um item existente
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar o item' });
  }
});

// Rota para deletar um item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json({ message: 'Item deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar o item' });
  }
});

module.exports = router;
const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Criar um novo livro
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Consultar todos os livros
router.get('/', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Consultar livro por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um livro
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deletar livro
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json({ message: 'Livro Deletado com sucesso', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

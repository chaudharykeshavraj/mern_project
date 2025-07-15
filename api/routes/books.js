const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const saved = await book.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

module.exports = router;

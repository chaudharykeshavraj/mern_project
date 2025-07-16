const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

const { auth, roleCheck } = require('../middleware/auth.middleware.js');

// Add book (only admin can add)
/* router.post('/', auth, roleCheck(['admin']), async (req, res) => {
    console.log('📚 POST /books route hit');
    console.log('📦 Received body:', req.body); // Add this

    try {
        const book = new Book(req.body);
        const saved = await book.save();
        res.status(201).json(saved);
    } catch (err) {
        console.log('❌ Error while saving book:', err.message);  // Add this
        res.status(400).json({ error: 'Failed to add book' });
    }
}); */

// Temporary test routes
router.post('/test', async (req, res) => {
    console.log('📥 Test route hit');
    console.log('📦 Body:', req.body);
    res.json({ received: req.body });
});


// Get all books(anyone can access)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const upload = require('../middleware/upload'); // ✅ Must export multer instance
const { auth, roleCheck } = require('../middleware/auth.middleware');

// ✅ Add a new book (Admin only)
router.post('/', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const book = new Book(req.body);
        const saved = await book.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('❌ Failed to add book:', err.message);
        res.status(400).json({ error: 'Failed to add book' });
    }
});

// ✅ Get all books (Open to all)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// ✅ Upload book cover image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const imagePath = `/uploads/books/${req.file.filename}`; // ✅ include folder
    res.status(200).json({ imageUrl: imagePath });
});

// ✅ Issue a book to a student (Admin only)
router.post('/issue', auth, roleCheck(['admin']), async (req, res) => {
    const { studentId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.issuedTo) return res.status(400).json({ error: 'Book already issued' });

    book.issuedTo = studentId;
    await book.save();
    res.json({ message: 'Book issued successfully' });
});

// ✅ Release a book from a student (Admin only)
router.post('/release', auth, roleCheck(['admin']), async (req, res) => {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || !book.issuedTo) return res.status(404).json({ error: 'Book not issued or not found' });

    book.issuedTo = null;
    await book.save();
    res.json({ message: 'Book released successfully' });
});

module.exports = router;

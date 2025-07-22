const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const upload = require('../middleware/upload'); // ✅ Must export multer instance
const { auth, roleCheck } = require('../middleware/auth.middleware');
const Issue = require('../models/Issue');

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

// ✅ Issue a book to a student (Admin only) with debug log
router.post('/issue', auth, roleCheck(['admin']), async (req, res) => {
    console.log('📦 Received issue request with:', req.body);

    const { studentId, bookId, returnDate } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (book.issuedTo) return res.status(400).json({ error: 'Book already issued' });

        // ✅ 1. Update book
        book.issuedTo = studentId;
        await book.save();

        // ✅ 2. Create issue record
        const newIssue = new Issue({
            studentId,
            bookId,
            issueDate: new Date(),
            returnDate: returnDate || null  // optional return date
        });
        await newIssue.save();

        res.json({ message: 'Book issued successfully', issuedBook: book });
    } catch (err) {
        console.error('❌ Issue error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Release a book from a student (Admin only)
router.post('/release', auth, roleCheck(['admin']), async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        // Delete issue record if exists
        // await Issue.deleteOne({ bookId: book._id });

        // Add a log or history instead of delete
        await Issue.updateOne({ bookId: book._id }, { status: 'returned', returnedAt: new Date() });

        // Clear book's issued data
        book.issuedTo = null;
        book.returnDate = null;

        await book.save();

        res.json({ message: `Book "${book.title}" returned.` });
    } catch (err) {
        console.error('❌ Release error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

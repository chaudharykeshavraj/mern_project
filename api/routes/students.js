const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const { auth, roleCheck } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');
const { createStudent } = require('../controllers/studentController');

// ✅ Create student with photo upload (Admin only)
router.post('/', auth, roleCheck(['admin']), upload.single('photo'), createStudent);

// ✅ Get all students (admin only)
router.get('/', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// ✅ Get student detail (with issued books)
router.get('/:id', auth, roleCheck(['admin']), async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password');
        if (!student || student.role !== 'student') {
            return res.status(404).json({ error: 'Student not found' });
        }

        const issuedBooks = await Book.find({ issuedTo: student._id });
        res.json({ student, issuedBooks });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ Issue book to student
router.post('/issue', auth, roleCheck(['admin']), async (req, res) => {
    const { studentId, bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        if (book.issuedTo) return res.status(400).json({ error: 'Book already issued' });

        book.issuedTo = studentId;
        await book.save();
        res.json({ message: 'Book issued successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error issuing book' });
    }
});

// ✅ Release book from student
router.post('/release', auth, roleCheck(['admin']), async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book || !book.issuedTo) return res.status(404).json({ error: 'Book not issued or not found' });

        book.issuedTo = null;
        await book.save();
        res.json({ message: 'Book released successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error releasing book' });
    }
});

module.exports = router;

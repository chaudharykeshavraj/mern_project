const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Get all book issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find()
        .populate('studentId', 'name email')  // get student info
        .populate('bookId', 'title author');  // get book info
        res.json(issues);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch issues' });
    }
});

module.exports = router;

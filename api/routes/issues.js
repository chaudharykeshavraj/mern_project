const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Issue book to student
router.post('/', async (req, res) => {
    try {
        const issue = new Issue(req.body);
        const saved = await issue.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all issued records (with student & book details)
router.get('/', async (req, res) => {
    const issues = await Issue.find().populate('student').populate('book');
    res.json(issues);
});

module.exports = router;

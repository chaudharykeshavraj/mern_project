const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Register student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

module.exports = router;

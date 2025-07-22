const User = require('../models/User');
const bcrypt = require('bcrypt');

const createStudent = async (req, res) => {
    try {
        const { name, email, password, roll, faculty, batch } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new User({
            name,
            email,
            password: hashedPassword,
            role: 'student',
            roll,
            faculty,
            batch,
            mustChangePassword: true,
            photo: req.file ? `/uploads/students/${req.file.filename}` : null // ✅ this line is important
        });

        await newStudent.save();

        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (err) {
        console.error('❌ Error creating student:', err.message);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

module.exports = { createStudent };

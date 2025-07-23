const User = require('../models/User');
const bcrypt = require('bcrypt');

const createStudent = async (req, res) => {
    try {
        const { name, email, roll, faculty, batch, password } = req.body;

        console.log("📥 Received req.body:", req.body);
        console.log("📸 Received req.file:", req.file);

        // Use password from req.body or default to 'student123'
        const tempPassword = password || 'student123';

        // Validate password
        if (!tempPassword || tempPassword === 'undefined') {
        return res.status(400).json({ success: false, message: "Password missing or invalid" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        console.log("🔐 Hashed password:", hashedPassword);

        const newStudent = new User({
        name,
        email,
        password: hashedPassword,
        role: 'student',
        roll,
        faculty,
        batch,
        photo: req.file ? `/uploads/students/${req.file.filename}` : null,
        // Do NOT include mustChangePassword here
        });

        await newStudent.save();

        res.status(201).json({ success: true, message: 'Student created successfully', student: newStudent });
    } catch (err) {
        console.error('❌ Error creating student:', err.message);
        res.status(500).json({ success: false, error: 'Failed to create student' });
    }
};

module.exports = { createStudent };

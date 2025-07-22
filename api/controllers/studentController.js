const User = require('../models/User');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');

const createStudent = async (req, res) => {
    try {
        const { name, email, roll, faculty, batch } = req.body;

        const tempPassword = 'student123'; // you can also auto-generate this
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(tempPassword, salt);

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

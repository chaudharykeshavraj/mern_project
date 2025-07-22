const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const { generateToken } = require('../utils/jwt'); // Optional for JWT

// User registration controller
exports.register = async (req, res) => {
    try {
        // 1. Extract data from request body
        const { name, email, password, role, roll, faculty, batch } = req.body;
        
        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        
        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // 4. Handle photo upload - THIS FIXES THE NULL ISSUE
        let photoPath = null;
        if (req.file) {
        // Save relative path: "uploads/students/filename.jpg"
        photoPath = req.file.path;
        }
        
        // 5. Create new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'student', // Default to student
        roll,
        faculty,
        batch,
        photo: photoPath, // Will be null if no file uploaded
        mustChangePassword: true // Force password change
        });
        
        // 6. Save user to database
        const savedUser = await newUser.save();
        
        // 7. Remove password from response
        savedUser.password = undefined;
        
        // 8. Send response
        res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: savedUser
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
};

// Optional: Add login controller if needed
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 3. Generate token (optional, for session/auth handling)
        const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'yourSecretKey',
        { expiresIn: '1d' }
        );

        // 4. Hide password before sending response
        const { password: _, ...userWithoutPassword } = user.toObject();

        // 5. Send response with optional forceChange flag
        res.status(200).json({
        success: true,
        message: user.mustChangePassword
            ? 'Password must be changed'
            : 'Login successful',
        user: userWithoutPassword,
        token,
        forceChange: user.mustChangePassword,
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

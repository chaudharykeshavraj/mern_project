const bcrypt = require('bcrypt');  // Use bcryptjs for consistency
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User registration controller
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, roll, faculty, batch } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle photo upload
        let photoPath = null;
        if (req.file) {
            photoPath = req.file.path;
            
        }

        // Create new user without mustChangePassword
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            roll,
            faculty,
            batch,
            photo: photoPath,
        });

        // Save user to DB
        const savedUser = await newUser.save();

        // Remove password from response
        savedUser.password = undefined;

        // Send success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: savedUser
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// User login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("📥 Login Attempt");
        console.log("Email entered:", email);
        console.log("Entered password:", password);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found for email:", email);
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        console.log("✅ User found:", user.email);
        console.log("Stored hash:", user.password);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match result:", isMatch);

        if (!isMatch) {
            console.log("❌ Password does not match.");
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '1d' }
        );

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Send success response (no forceChange flag)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error('❌ Login error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

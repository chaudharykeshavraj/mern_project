const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');     // js is added after bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, roleCheck } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');  // Import upload middleware
const { changePassword } = require('../controllers/authController');

// ✅ Register route (Only Admin/Dept can adds new students or admins)
router.post('/register', auth, roleCheck(['admin']), (req, res) => {
  // Wrap in Multer middleware
    upload(req, res, async function (err) {
        try {
        if (err instanceof multer.MulterError) {
            // Multer error (e.g., file too large)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Other errors
            return res.status(500).json({ error: err.message });
        }

        // Now handle registration
        const { name, email, password, role, roll, faculty, batch } = req.body;

        const allowedRoles = ['student', 'admin'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        // ADD PHOTO HANDLING
        let photoPath = null;
        if (req.file) {
            photoPath = req.file.path;
            console.log('File uploaded:', photoPath); // Debug log
        } else {
            console.log('No file uploaded'); // Debug log
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            roll,
            faculty,
            batch,
            photo: photoPath, // THIS SHOULD NOW WORK
            mustChangePassword: role === 'student',
        });

        await newUser.save();
        
        return res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser // Return full user object for debugging
        });

        } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// ... rest of your code remains unchanged ...

// ✅ Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login Attempt");    // temporary for student login
        console.log("Email entered: ", email);    // temporary for student login

        const user = await User.findOne({ email });


        if (!user) {
            console.log("User not found");
            // return res.status(401).json({ error: 'Invalid credentials' });
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        console.log('✅ User found:', user.email);   // Temporary
        console.log('Entered password:', password);     //Temporary
        console.log('Stored hash:', user.password); // Safe in case user is null   Temporary


        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result: ", isMatch);

        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mustChangePassword: user.mustChangePassword || false
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login error' });
    }
});

// ✅ Change Password route (student after first login)
router.post('/change-password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Both current and new passwords are required' });
    }

    try {
        const user = await User.findById(req.user.userId); // userId from auth middleware
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Current password is incorrect' });

        // 🔐 Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        if (user.role === 'student') {
            user.mustChangePassword = false;
        }

        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

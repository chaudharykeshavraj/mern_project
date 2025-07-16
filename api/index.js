require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/books');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

// Connect Routes
app.use('/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
    
// Sample model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});
// const User = mongoose.model('User', UserSchema);

// Test routes
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/', (req, res) => {
    res.send('📚 Library Management API is running!');
});


// Routes
// const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const issueRoutes = require('./routes/issues');

app.use('/api/students', studentRoutes);
app.use('/api/issues', issueRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
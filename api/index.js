const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Connnect Routes
app.use('/auth', authRoutes);

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
const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const issueRoutes = require('./routes/issues');

app.use('/api/books', bookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/issues', issueRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
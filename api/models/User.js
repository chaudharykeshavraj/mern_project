const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, // optional: ensures consistent format
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['student', 'admin'],
        required: true
    },

    // Optional student-specific fields (only used when role is 'student')
    roll: {
        type: String,
        unique: true,
        sparse: true // allows null values for admins
    },

    faculty: { type: String },
    batch: { type: String },
    photo: { type: String },
}, {
    timestamps: true
});

// ✅ Automatically hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

// ✅ Export the model safely (prevents overwrite in dev)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);

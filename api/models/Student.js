const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    roll: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    photo: {
        type: String, // Will store the path like `/uploads/students/xyz.jpg`
        default: ''
    }
    }, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);

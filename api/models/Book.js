const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    // isbn: String,
    publishedYear: {type: Number, required: true},
    issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    returnDate: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    // isbn: String,
    publishedYear: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 1}
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);

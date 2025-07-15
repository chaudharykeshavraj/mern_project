const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    copies: Number
});

module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, default: 'issued' } // optional
});

module.exports = mongoose.model('Issue', issueSchema);

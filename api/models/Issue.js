const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    issueDate: { type: Date, default: Date.now },
    returnDate: Date
});

module.exports = mongoose.model('Issue', IssueSchema);

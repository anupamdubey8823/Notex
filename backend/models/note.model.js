const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema ({
    Title: String,
    Content: String,
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;


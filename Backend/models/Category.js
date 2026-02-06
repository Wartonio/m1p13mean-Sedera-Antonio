const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    ref: { type: String, required: true, unique: true },
    designation: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
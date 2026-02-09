const mongoose = require('mongoose');

const categoryproductSchema = mongoose.Schema({
    ref: { type: String, required: true, unique: true },
    designation: { type: String, required: true }
});

module.exports = mongoose.model('Categoryproduct', categoryproductSchema);
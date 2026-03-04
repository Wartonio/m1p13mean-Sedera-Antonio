const mongoose = require('mongoose');

const categoryproductSchema = mongoose.Schema({
    ref: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
          required: true
    }
});

module.exports = mongoose.model('Categoryproduct', categoryproductSchema);
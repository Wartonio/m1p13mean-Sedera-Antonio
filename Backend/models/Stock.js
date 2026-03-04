const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  stockMin: {
    type: Number,
    default: 5
  },
  shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);

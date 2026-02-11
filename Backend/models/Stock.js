const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true // 1 produit = 1 stock+
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
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);

const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  referencecommande:{
    type: String,
    required: true
  },
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
  pricetotal: {
    type: Number
  },
  shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', commandeSchema);

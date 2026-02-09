const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  designation: { type: String, required: true },
  reference:{type:String , required: true,unique: true},
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
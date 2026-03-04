const mongoose = require('mongoose');
const Shop = require('./Shop');

const productSchema = mongoose.Schema({
  designation: { type: String, required: true },
  reference:{type:String , required: true,unique: true},
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'inactive' 
  },
  image:{
    type:String,
    required:true
  },
  price: {
    type:Number,
    required:true
  },
  shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
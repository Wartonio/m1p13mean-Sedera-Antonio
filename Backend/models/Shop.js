const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['acheteur', 'boutique', 'admin'], 
    default: 'acheteur' 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'inactive' 
  },
  boutiqueId : { type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
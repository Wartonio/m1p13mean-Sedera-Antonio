const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  nom: { type: String, required: true },
  category: { type: String, required: true },
  localisation: { type: String, required: true },
  heureOuveture : { type: String, required: true },
  heureFermeture : { type: String, required: true },
  journal: { type: String, required: true },
  remarque: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'inactive' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
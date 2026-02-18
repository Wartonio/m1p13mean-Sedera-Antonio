const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Commande = require('../models/Commande');
const mongoose = require('mongoose');


router.get('/all', async (req, res) => {
  try {
      const commandes = await Commande.find().sort({ createdAt: -1 });    
      res.status(200).json(commandes);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
  }
});


router.get('/:shopId', async (req, res) => {
  const { shopId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  try {
    const commande = await Commande
      .find({ shop: shopId })
      .populate('product', 'designation reference price').populate('user', 'nom')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(commande);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de la récupération des commandes du shop"
    });
  }
});

module.exports = router;
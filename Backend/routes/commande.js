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


router.post('/insertcommande', async (req, res) => {
  try {

    const { product, typelivraison, quantity, pricetotal, shop, user } = req.body;

    // 📅 Date actuelle
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    // 📅 Début du mois
    const startOfMonth = new Date(year, now.getMonth(), 1);
    const endOfMonth = new Date(year, now.getMonth() + 1, 1);

    // 🔢 Compter les commandes du mois
    const count = await Commande.countDocuments({
      createdAt: { $gte: startOfMonth, $lt: endOfMonth }
    });

    const sequence = String(count + 1).padStart(5, '0');

    const referencecommande = `C-${year}-${month}-${sequence}`;

    const commande = new Commande({
      referencecommande,
      product,
      typelivraison,
      quantity,
      pricetotal,
      shop,
      user
    });

    await commande.save();

    res.status(200).json({
      message: 'nouvelle commande créée',
      reference: referencecommande
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
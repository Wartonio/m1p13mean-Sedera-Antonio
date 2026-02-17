const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Commande = require('../models/Commande');


router.get('/all', async (req, res) => {
  try {
      const commandes = await Commande.find().sort({ createdAt: -1 });    
      res.status(200).json(commandes);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
  }
});



module.exports = router;
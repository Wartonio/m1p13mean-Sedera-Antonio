const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product= require('../models/Product');

router.get('/all', async (req, res) => {
  try {
      const products = await Product.find().sort({ createdAt: -1 });    
      res.status(200).json(products);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

module.exports = router;
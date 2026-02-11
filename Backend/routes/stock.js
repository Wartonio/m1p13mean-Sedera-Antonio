const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stock = require('../models/Stock');

router.get('/all',  async (req, res) => {
  try {
      const stock = await Stock.find()
      .populate('product', 'designation')
      .sort({ createdAt: -1 });    
      res.status(200).json(stock);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des stocks" });
  }
});

// CREATE stock
router.post('/insertstock', async (req, res) => {
  try {
    const { product, quantity, stockMin } = req.body;

    const stock = new Stock({
      product,
      quantity,
      stockMin
    });

    const savedStock = await stock.save();
    res.status(201).json(savedStock);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
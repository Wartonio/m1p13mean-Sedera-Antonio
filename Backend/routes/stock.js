const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stock = require('../models/Stock');
const mongoose = require('mongoose');
router.get('/all',  async (req, res) => {
  try {
      const stock = await Stock.find()
      .populate('product', 'designation reference')
      .sort({ createdAt: -1 });    
      res.status(200).json(stock);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des stocks" });
  }
});

// router.get('/stock/:shopId', async (req, res) => {
//   const { shopId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(shopId)) {
//     return res.status(400).json({ error: 'Invalid shopId format' });
//   }

//   try {
//     const stock = await Stock.find({ shop: new mongoose.Types.ObjectId(shopId) })
//                                   .sort({ createdAt: -1 });
//     res.status(200).json(stock);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erreur lors de la récupération des stocks produits du shop" });
//   }
// });

router.get('/:shopId', async (req, res) => {
  const { shopId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  try {
    const stock = await Stock
      .find({ shop: shopId })
      .populate('product', 'designation reference')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(stock);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors de la récupération des stocks produits du shop"
    });
  }
});



// CREATE stock
router.post('/insertstock', async (req, res) => {
  try {
    const { product, quantity, stockMin,shop } = req.body;

    const stock = new Stock({
      product,
      quantity,
      stockMin,
      shop
    });

    const savedStock = await stock.save();
    res.status(201).json(savedStock);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
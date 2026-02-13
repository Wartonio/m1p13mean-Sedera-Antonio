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

const mongoose = require('mongoose');

router.get('/shop/:shopId', async (req, res) => {
  const { shopId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  try {
    const products = await Product.find({ shop: new mongoose.Types.ObjectId(shopId) })
                                  .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des produits du shop" });
  }
});




// router.post('/insertproduct',async (req,res)=>{
//     try {
//         const { designation,reference,category,description,image } =req.body;
//         const product =new Product({
//             designation,
//             reference,
//             category,
//             description,
//             image
//         });
//         await product.save();
//         res.status(200).json({message: 'nouvaue produit cree'});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json()
//     }
// // }
router.post('/insertproduct', async (req, res) => {
    try {
        const { designation, reference, category, description,price, image,shop } = req.body;

        const product = new Product({
            designation,
            reference,
            category,
            description,
            price,
            image,
            shop
        });

        await product.save();

        res.status(200).json({ message: 'nouveau produit créé' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product= require('../models/Product');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


router.get('/all', async (req, res) => {
  try {
      const products = await Product.find()
        .populate('shopId', 'nom')
        .sort({ createdAt: -1 });    
      res.status(200).json(products);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

router.get('/One/:id', async (req,res) => {
  try {
    const productid=req.params.id;
    const product = await Product.findOne({_id:productid})
    .populate('shopId', 'nom');
    res.status(200).json(product);
  } catch (error) {
    console.error("Erreur MongoDB:", error);
    res.status(500).json({error: "Erreur lors de la recuperation du product"});
  }
} );

router.get('/productshop/:id', async (req,res) => {
  try {
    const shopid=req.params.id;
    const product = await Product.find({shopId:shopid})
    .populate('shopId', 'nom');
    res.status(200).json(product);
  } catch (error) {
    console.error("Erreur MongoDB:", error);
    res.status(500).json({error: "Erreur lors de la recuperation du product"});
  }
} );


// find product by shop
router.get('/shops/:shopId', async (req, res) => {
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

router.get('/shop/:shopId', async (req, res) => {
  const { shopId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  // Paramètres pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Product.countDocuments({ 
      shop: new mongoose.Types.ObjectId(shopId) 
    });

    const products = await Product.find({ 
        shop: new mongoose.Types.ObjectId(shopId) 
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Erreur lors de la récupération des produits du shop" 
    });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/products');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});






const upload =multer({
    storage,
    limits:{ fileSize: 2* 1024 * 1024},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);
        }
        else{
            cb(new Error('Image seulement'));
        }
    }
});


router.post('/insertproduct', upload.single('image'), async (req, res) => {
    try {

           console.log(req.file);
    console.log(req.body);
        const { designation, reference, category, description, price, shop,shopId } = req.body;

        const product = new Product({
            designation,
            reference,
            category,
            description,
            price,
            shop,
            shopId,
            image: req.file ? req.file.filename : null
        });

        await product.save();

        res.status(200).json({ message: 'nouveau produit créé' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;
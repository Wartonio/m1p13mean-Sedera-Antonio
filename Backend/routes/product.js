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
const multer = require('multer');

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

//configutation du multer
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb:(null,'upload/products/');
//     },
//     filename:(req,file,cb) => {
//         cb(null,Date.now() + '-' + file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'upload/products/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now());
//     }
// });

const path = require('path');

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

// router.post('/insertproduct',upload.single('image'),async (req, res) => {
//     try {
//         const { designation, reference, category, description,price,shop } = req.body;

//         const product = new Product({
//             designation,
//             reference,
//             category,
//             description,
//             price,
//             shop,
//             image:req.file.filename
//         });

//         await product.save();

//         res.status(200).json({ message: 'nouveau produit créé' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

router.post('/insertproduct', upload.single('image'), async (req, res) => {
    try {

           console.log(req.file); // vérifier le fichier
    console.log(req.body);
        const { designation, reference, category, description, price, shop } = req.body;

        const product = new Product({
            designation,
            reference,
            category,
            description,
            price,
            shop,
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
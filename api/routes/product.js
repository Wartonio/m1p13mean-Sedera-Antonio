const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const multer = require('multer');

// --- CONFIGURATION CLOUDINARY ---
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images', // Dossier spécifique pour les produits
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }] 
  },
});

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Image seulement'));
    }
  }
});

// --- ROUTES DE RÉCUPÉRATION (GET) ---

router.get('/all', async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .populate('shopId', 'nom')
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

router.get('/One/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('shopId', 'nom');
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du produit" });
  }
});

router.get('/productshop/:id', async (req, res) => {
  try {
    const product = await Product.find({ shopId: req.params.id, status: "active" })
      .populate('shopId', 'nom');
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// --- ROUTE CRÉATION (INSERT) ---

router.post('/insertproduct', auth, upload.single('image'), async (req, res) => {
  try {
    const { designation, reference, category, description, price, shop, shopId } = req.body;

    const images = req.file || null;
    let imagePath = null;

    if(images){
      const result = await new Promise( (resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
                folder: "images",
            },
            (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            ).end(images.buffer);
        } );

      imagePath = result.secure_url;
    }

    const product = new Product({
      designation,
      reference,
      category,
      description,
      price,
      shop,
      shopId,
      // On stocke l'URL Cloudinary reçue
      image: imagePath 
    });

    await product.save();
    res.status(200).json({ message: 'Nouveau produit créé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// --- ROUTE MISE À JOUR (UPDATE) ---

router.patch('/update', auth, upload.single('image'), async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Si une nouvelle image est téléchargée, on met à jour le champ image avec l'URL Cloudinary
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.body._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Produit non trouvé' });

    res.status(200).json({ message: 'Produit mis à jour !', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// --- AUTRES ROUTES (SHOPS / PAGINATION) ---

router.get('/shop/:shopId', async (req, res) => {
  const { shopId } = req.params.shopId;
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Product.countDocuments({ shopId: new mongoose.Types.ObjectId(shopId) });
    const products = await Product.find({ shopId: new mongoose.Types.ObjectId(shopId) })
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
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

module.exports = router;

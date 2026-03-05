const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Shop = require('../models/Shop');
const multer = require('multer');
const path = require('path');

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
    folder: 'images', // Nom du dossier dans ton interface Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Image seulement'));
    }
  }
});

// --- ROUTES GET ---

router.get('/all', auth, async (req, res) => {
  try {
    const users = await Shop.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

router.get('/pagination', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = {
      $or: [
        { nom: { $regex: search, $options: 'i' } },
        { localisation: { $regex: search, $options: 'i' } }
      ]
    };
    const [shops, total] = await Promise.all([
      Shop.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit),
      Shop.countDocuments(query)
    ]);

    res.status(200).json({
      shops,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des boutiques" });
  }
});

router.get('/one/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Shop.findOne({ _id: userId }).sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// --- ROUTE POST (INSERT) ---

router.post('/insert', auth, upload.single('image'), async (req, res) => {
  try {
    const { nom, category, localisation, status, heureOuveture, heureFermeture, journal, remarque } = req.body;

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

    const newShop = new Shop({
      nom,
      category,
      localisation,
      status,
      heureOuveture,
      heureFermeture,
      journal,
      remarque,
      // Avec multer-storage-cloudinary, req.file.path contient l'URL sécurisée Cloudinary
      image: imagePath, 
      createdAt: new Date()
    });

    await newShop.save();
    res.status(201).json({ message: 'Boutique créée avec succès !' });
  } catch (error) {
    // JSON.stringify permet de transformer le [object Object] en vrai texte
    console.error("ERREUR DETAILLEE :", JSON.stringify(error, null, 2));
    console.error("MESSAGE :", error.message);
    
    res.status(500).json({ 
      error: "Erreur serveur", 
      details: error.message,
      fullError: error // Vercel affichera peut-être plus de détails dans la réponse HTTP
    });
  }
});

// --- ROUTES PATCH (UPDATE & DISABLE) ---

router.patch('/update', auth, async (req, res) => {
  try {
    let updateData = { ...req.body };

    const updatedUser = await Shop.findByIdAndUpdate(
      req.body._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'Boutique non trouvée' });

    res.status(200).json({ message: 'Boutique mise à jour !', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erreur lors de la mise à jour' });
  }
});

router.patch('/disable/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const newStatus = req.query.status;

    if (req.auth.role !== 'admin') {
      return res.status(403).json({ error: 'Seul un administrateur peut modifier le statut' });
    }

    if (!['active', 'inactive'].includes(newStatus)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const user = await Shop.findByIdAndUpdate(
      userId,
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'Boutique non trouvée' });

    res.status(200).json({
      message: `Boutique passée en statut : ${newStatus}`,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du changement de statut' });
  }
});

module.exports = router;

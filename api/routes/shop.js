const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Shop = require('../models/Shop');
const multer = require('multer');
const path = require('path');

router.get('/all', auth, async (req, res) => {
  try {
      const users = await Shop.find().sort({ createdAt: -1 });    
      res.status(200).json(users);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
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
      const user = await Shop.findOne({_id: userId}).sort({ createdAt: -1 });    
      res.status(200).json(user);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
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


router.post('/insert',auth,upload.single('image'),  async (req, res) => {
    try {
      const { nom, category, localisation,status, heureOuveture,heureFermeture,journal,remarque} = req.body;
  
      const user = new Shop({
            nom,
            category,
            localisation,
            status,
            heureOuveture,
            heureFermeture,
            journal,
            remarque,
            image: req.file ? req.file.filename : null,
            createdAt: new Date()
        });
  
      await user.save();
      res.status(201).json({ message: 'Boutique créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

router.patch('/update', auth, async (req, res) => {
    try {
      let updateData = { ...req.body };
  
      const updatedUser = await Shop.findByIdAndUpdate(
        req.body._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'Boutique non trouvé' });
  
      res.status(200).json({ message: 'Boutique mis à jour !', user: updatedUser });
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

        if (!user) return res.status(404).json({ error: 'Boutique non trouvé' });

        res.status(200).json({ 
            message: `Boutique passé en statut : ${newStatus}`, 
            user 
        });
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: 'Erreur lors du changement de statut' });
    }
});

module.exports = router;
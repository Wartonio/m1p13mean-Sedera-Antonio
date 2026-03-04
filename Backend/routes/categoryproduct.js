const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Categoryproduct = require('../models/Categoryproduct');
const mongoose = require('mongoose');


router.get('/all', async (req, res) => {
  try {
      const categoryproduct = await Categoryproduct.find().sort({ createdAt: -1 });    
      res.status(200).json(categoryproduct);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération categoryproduct" });
  }
});

// router.get('/categorieproduct/:id', async (req, res) => {
//   try {
//       const categoryId = req.params.id;
//       const category = await Category.findOne({_id:categoryId});    
//       res.status(200).json(category);
//   } catch (error) {
//       res.status(500).json({ error: "Erreur lors de la récupération du Category" });
//   }
// });

router.post('/insertcategoryproduct',  async (req, res) => {
    try {
      const { ref,designation,shop } = req.body;
  
      const categoryproduct = new Categoryproduct({
            ref,
            designation,
            shop
        });
  
      await categoryproduct.save();
      res.status(201).json({ message: 'categoryproduct créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

router.patch('/update', async (req, res) => {
    try {
      let updateData = { ...req.body };
  
      const updatedUser = await Categoryproduct.findByIdAndUpdate(
        req.body._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'Categorie non trouvé' });
  
      res.status(200).json({ message: 'Categorie mis à jour !', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
});


router.get('/One/:id', async (req, res) => {
  try {
      const categoryId = req.params.id;
      const category = await Categoryproduct.findOne({_id:categoryId});    
      res.status(200).json(category);
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération duCategory" });
  }
});

router.get('/shop/:shopId', async (req, res) => {
  const { shopId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    return res.status(400).json({ error: 'Invalid shopId format' });
  }

  try {
    const categoryproduct = await Categoryproduct.find({ shop: new mongoose.Types.ObjectId(shopId) })
                                  .sort({ createdAt: -1 });
    res.status(200).json(categoryproduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération category product" });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Category = require('../models/Category');

router.get('/all', auth, async (req, res) => {
  try {
      const categorys = await Category.find().sort({ createdAt: -1 });    
      res.status(200).json(categorys);
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération desCategorys" });
  }
});

router.get('/One/:id', auth, async (req, res) => {
  try {
      const categoryId = req.params.id;
      const category = await Category.findOne({_id:categoryId});    
      res.status(200).json(category);
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération duCategory" });
  }
});

router.post('/insert', auth, async (req, res) => {
    try {
      const { ref,designation } = req.body;
  
      const category = new Category({
            ref,
            designation
        });
  
      await category.save();
      res.status(201).json({ message: 'CaCategory créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

router.patch('/update', auth, async (req, res) => {
    try {
      let updateData = { ...req.body };
  
      const updatedUser = await Category.findByIdAndUpdate(
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

module.exports = router;
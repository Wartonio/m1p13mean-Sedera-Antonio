const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Categoryproduct = require('../models/Categoryproduct');


router.get('/all', async (req, res) => {
  try {
      const categoryproduct = await Categoryproduct.find().sort({ createdAt: -1 });    
      res.status(200).json(categoryproduct);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération categoryproduct" });
  }
});

router.post('/insertcategoryproduct',  async (req, res) => {
    try {
      const { ref,designation } = req.body;
  
      const categoryproduct = new Categoryproduct({
            ref,
            designation
        });
  
      await categoryproduct.save();
      res.status(201).json({ message: 'categoryproduct créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

module.exports = router;
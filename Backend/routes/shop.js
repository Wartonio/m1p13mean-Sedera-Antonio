const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Shop = require('../models/Shop');

router.get('/all', auth, async (req, res) => {
  try {
      const users = await Shop.find().sort({ createdAt: -1 });    
      res.status(200).json(users);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
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

router.post('/insert', auth, async (req, res) => {
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
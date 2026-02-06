const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/all', auth, async (req, res) => {
  try {
      const users = await User.find().select('-password').sort({ createdAt: -1 });    
      res.status(200).json(users);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

router.get('/one/:id', auth, async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findOne({_id: userId}).select('-password').sort({ createdAt: -1 });    
      res.status(200).json(user);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
      const user = await User.findById(req.auth.userId).select('-password');
      
      if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      
      res.status(200).json(user);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/insert', auth, async (req, res) => {
    try {
      const { nom, email, password, role,status, boutiqueId } = req.body;
        
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
            nom,
            email,
            password: hashedPassword,
            role: role || 'acheteur', 
            status: status || 'inactive',
            boutiqueId: role === 'boutique' ? boutiqueId : null,
            createdAt: new Date()
        });
  
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

router.patch('/update', auth, async (req, res) => {
    try {
      let updateData = { ...req.body };
  
      if (req.auth.role !== 'admin') {
        return res.status(403).json({ error: 'Accès non autorisé' });
      }
  
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      } else {
        delete updateData.password;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.body.id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  
      res.status(200).json({ message: 'Utilisateur mis à jour !', user: updatedUser });
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

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { status: newStatus } },
            { new: true }
        ).select('-password');

        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        res.status(200).json({ 
            message: `Utilisateur passé en statut : ${newStatus}`, 
            user 
        });
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: 'Erreur lors du changement de statut' });
    }
});

module.exports = router;
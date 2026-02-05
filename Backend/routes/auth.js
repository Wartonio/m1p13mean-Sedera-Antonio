const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// INSCRIPTION
router.post('/signup', async (req, res) => {
    try {
      const { nom, email, password, role,status, boutiqueId } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        nom,
        email,
        password: hashedPassword,
        role: role || 'ACHETEUR', 
        status: status || 'inactive', 
        boutiqueId: role === 'BOUTIQUE' ? boutiqueId : null,
        createdAt: new Date()
      });
  
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

// CONNEXION
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
  
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });
  
      if (user.status !== "active") {
        return res.status(403).json({ 
            error: "Votre compte est inactif. Veuillez contacter l'administrateur." 
        });
      }
      
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      
      res.status(200).json({
        token: token,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
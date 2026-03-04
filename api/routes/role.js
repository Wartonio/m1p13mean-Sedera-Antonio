const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Role = require('../models/Role');

router.get('/all', auth, async (req, res) => {
  try {
      const roles = await Role.find().sort({ createdAt: -1 });    
      res.status(200).json(roles);
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des roles" });
  }
});

router.get('/One/:id', auth, async (req, res) => {
  try {
      const roleId = req.params.id;
      const role = await Role.findOne({_id: roleId});    
      res.status(200).json(role);
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du role" });
  }
});

router.post('/insert', auth, async (req, res) => {
    try {
      const { ref,designation } = req.body;
  
      const role = new Role({
            ref,
            designation
        });
  
      await role.save();
      res.status(201).json({ message: 'Role créé avec succès !' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
});

module.exports = router;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Le header ressemble à "Bearer TOKEN_ICI"
    const token = req.headers.authorization.split(' ')[1];
    
    // On décode le token avec la clé secrète du .env
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // On ajoute les infos du user dans l'objet "req" pour les prochaines fonctions
    req.auth = {
      userId: decodedToken.userId,
      role: decodedToken.role
    };
    
    next(); // On passe à la suite (la route)
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée !' });
  }
};
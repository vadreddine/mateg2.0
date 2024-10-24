// middlewares/authJwt.js

const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Aucun token fourni!' });
  }

  if (token.startsWith('Bearer ')) {
    // Supprimer 'Bearer ' du token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Non autorisé!' });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next();
        return;
      }
    }

    res.status(403).send({ message: 'Rôle administrateur requis!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;

// middlewares/verifySignUp.js

const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Vérifier le nom d'utilisateur
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({ message: 'Échec! Le nom d\'utilisateur est déjà utilisé!' });
    }

    // Vérifier l'email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({ message: 'Échec! L\'email est déjà utilisé!' });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Échec! Le rôle n\'existe pas = ' + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

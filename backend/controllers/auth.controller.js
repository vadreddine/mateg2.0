// controllers/auth.controller.js

const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    // Création d'un nouvel utilisateur
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Attribution des rôles
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
    } else {
      // Par défaut, rôle "user"
      await user.setRoles([1]);
    }

    res.send({ message: 'Utilisateur enregistré avec succès!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Mot de passe incorrect!',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration, // Durée du token
    });

    const roles = await user.getRoles();
    const authorities = [];
    for (let i = 0; i < roles.length; i++) {
      authorities.push('ROLE_' + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

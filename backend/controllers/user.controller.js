// controllers/user.controller.js

exports.allAccess = (req, res) => {
    res.status(200).send('Contenu public.');
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send('Contenu pour les utilisateurs.');
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send('Contenu pour les administrateurs.');
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send('Contenu pour les modérateurs.');
  };
  
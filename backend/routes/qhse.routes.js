// routes/qhse.routes.js

const authJwt = require('../middlewares/authJwt');
const controller = require('../controllers/qhse.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Créer une nouvelle checklist
  app.post(
    '/api/qhse/checklists',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createChecklist
  );

  // Récupérer toutes les checklists
  app.get(
    '/api/qhse/checklists',
    [authJwt.verifyToken],
    controller.findAllChecklists
  );

  // Récupérer une checklist par ID
  app.get(
    '/api/qhse/checklists/:id',
    [authJwt.verifyToken],
    controller.findOneChecklist
  );

  // Mettre à jour une checklist par ID
  app.put(
    '/api/qhse/checklists/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateChecklist
  );

  // Supprimer une checklist par ID
  app.delete(
    '/api/qhse/checklists/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteChecklist
  );


 // Remplir une checklist par ID
 app.post(
  '/api/qhse/checklists/:id/fill',
  [authJwt.verifyToken],
  controller.fillChecklist
);
};
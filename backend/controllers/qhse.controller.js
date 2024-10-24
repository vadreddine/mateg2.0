// controllers/qhse.controller.js

const db = require('../models');
const Checklist = db.checklist;
const Item = db.item;

// Créer une nouvelle checklist
exports.createChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.create({
      name: req.body.name,
      frequency: req.body.frequency,
    });

    if (req.body.items && req.body.items.length > 0) {
      const items = req.body.items.map((item) => ({
        number: item.number,
        description: item.description,
        checklistId: checklist.id,
      }));
      await Item.bulkCreate(items);
    }

    res.send({ message: 'Checklist créée avec succès.' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Récupérer toutes les checklists
exports.findAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({
      include: ['items'],
    });
    res.send(checklists);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Récupérer une checklist par ID
exports.findOneChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findByPk(req.params.id, {
      include: ['items'],
    });
    if (!checklist) {
      return res.status(404).send({ message: 'Checklist non trouvée.' });
    }
    res.send(checklist);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Mettre à jour une checklist par ID
exports.updateChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findByPk(req.params.id);
    if (!checklist) {
      return res.status(404).send({ message: 'Checklist non trouvée.' });
    }
    await checklist.update({
      name: req.body.name,
      frequency: req.body.frequency,
    });
    // Mettre à jour les items si fournis
    if (req.body.items && req.body.items.length > 0) {
      // Supprimer les items existants
      await Item.destroy({ where: { checklistId: checklist.id } });
      // Créer de nouveaux items
      const items = req.body.items.map((item) => ({
        number: item.number,
        description: item.description,
        checklistId: checklist.id,
      }));
      await Item.bulkCreate(items);
    }
    res.send({ message: 'Checklist mise à jour avec succès.' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Supprimer une checklist par ID
exports.deleteChecklist = async (req, res) => {
  try {
    const num = await Checklist.destroy({
      where: { id: req.params.id },
    });
    if (num === 1) {
      res.send({ message: 'Checklist supprimée avec succès!' });
    } else {
      res.send({ message: `Impossible de supprimer la checklist avec id=${req.params.id}. Peut-être qu'elle n'existe pas!` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
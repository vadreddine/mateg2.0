// models/index.js

const config = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: config.pool,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.checklist = require('./checklist.model')(sequelize, Sequelize);
db.item = require('./item.model')(sequelize, Sequelize);
db.response = require('./response.model')(sequelize, Sequelize);

// Définition des relations
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.checklist.hasMany(db.item, { as: 'items' });
db.item.belongsTo(db.checklist, {
  foreignKey: 'checklistId',
  as: 'checklist',
});

db.user.hasMany(db.response, { as: 'responses' });
db.response.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user',
});

db.item.hasMany(db.response, { as: 'responses' });
db.response.belongsTo(db.item, {
  foreignKey: 'itemId',
  as: 'item',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;

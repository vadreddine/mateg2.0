// models/response.model.js

module.exports = (sequelize, Sequelize) => {
  const Response = sequelize.define('responses', {
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    status: {
      type: Sequelize.STRING, // 'C' ou 'NC'
    },
    observation: {
      type: Sequelize.TEXT,
    },
  });

  Response.associate = (models) => {
    Response.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Response.belongsTo(models.Checklist, {
      foreignKey: 'checklistId',
      as: 'checklist',
    });
    Response.hasMany(models.ResponseItem, {
      foreignKey: 'responseId',
      as: 'items',
    });
  };

  return Response;
};

// models/filledChecklist.model.js

module.exports = (sequelize, Sequelize) => {
    const FilledChecklist = sequelize.define('filledChecklists', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      checklistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    FilledChecklist.associate = (models) => {
      FilledChecklist.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      FilledChecklist.belongsTo(models.Checklist, {
        foreignKey: 'checklistId',
        as: 'checklist',
      });
      FilledChecklist.hasMany(models.Response, {
        foreignKey: 'filledChecklistId',
        as: 'responses',
      });
    };
  
    return FilledChecklist;
  };
  
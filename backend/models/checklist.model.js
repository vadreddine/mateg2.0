// models/checklist.model.js

module.exports = (sequelize, Sequelize) => {
    const Checklist = sequelize.define('checklists', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frequency: {
        type: Sequelize.STRING,
      },
    });
  
    return Checklist;
  };
  
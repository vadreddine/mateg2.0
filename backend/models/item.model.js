// models/item.model.js

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define('items', {
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  
    return Item;
  };
  
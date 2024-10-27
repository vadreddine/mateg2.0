// models/item.model.js

module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('items', {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('boolean', 'checkbox', 'text'),
      allowNull: false,
      defaultValue: 'boolean',
    },
    checklistId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'checklists',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  Item.associate = (models) => {
    Item.belongsTo(models.Checklist, {
      foreignKey: 'checklistId',
      as: 'checklist',
    });
  };

  return Item;
};

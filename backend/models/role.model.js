// models/role.model.js

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'roles',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Assurez-vous que l'auto-incrémentation est activée si vous utilisez des IDs numériques
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ajoutez une contrainte d'unicité si nécessaire
      },
    },
    {
      timestamps: false, // Désactive les timestamps pour ce modèle
      tableName: 'roles', // Assure que le nom de la table est correct
    }
  );

  return Role;
};

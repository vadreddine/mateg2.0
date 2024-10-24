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
  
    return Response;
  };
  
// models/user.model.js

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return User;
  };
  
// config/db.config.js

module.exports = {
    HOST: 'localhost',
    USER: 'your_database_username',
    PASSWORD: 'your_database_password',
    DB: 'your_database_name',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,      // Ajustado de DB_USERNAME para DB_USER
    password: process.env.DB_PASS,      // Ajustado de DB_PASSWORD para DB_PASS
    database: process.env.DB_NAME,      // Ajustado de DB_DATABASE para DB_NAME
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3308,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

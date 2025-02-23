// config/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database details
const sequelize = new Sequelize('clothing_db', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

module.exports = sequelize;

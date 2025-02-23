const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this is your Sequelize setup

const Image = sequelize.define('Image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }
});

module.exports = Image;

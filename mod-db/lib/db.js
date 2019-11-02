'use strict';

const Sequelize = require('sequelize');
const config = require;
let sequelize = null;

module.exports = function setupDatabase(config) {
  if (!sequelize) {
    sequelize = new Sequelize(config);
  }
  return sequelize;
};

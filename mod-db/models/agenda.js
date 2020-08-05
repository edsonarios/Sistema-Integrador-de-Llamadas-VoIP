"use strict";

const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = function setupAgendaModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("agenda", {
    numero: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};

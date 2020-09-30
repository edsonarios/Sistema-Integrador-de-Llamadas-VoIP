"use strict";

const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = function setupPrivilegiosModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define("privilegios", {
    context: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    numerofun: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    switch: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};

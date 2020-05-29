"use strict";

const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = function setupCdrModel(config) {
  const sequelize = setupDatabase(config);

  return sequelize.define(
    "cdr",
    {
      uniqueid: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      src: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      dst: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      dcontext: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      clid: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      channel: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      dstchannel: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      lastapp: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      lastdata: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      answer: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      billsec: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      disposition: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      amaflags: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      userfield: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedid: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      peeraccount: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      sequence: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};

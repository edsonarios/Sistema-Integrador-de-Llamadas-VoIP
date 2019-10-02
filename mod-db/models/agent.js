'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agent', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hostname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pid: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    connected: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  })
}

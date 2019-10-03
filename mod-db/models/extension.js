'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupExtensionsModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('extensions', {
    context: {
      type: Sequelize.STRING,
      allowNull: true
    },
    exten: {
      type: Sequelize.STRING,
      allowNull: true
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    app: {
      type: Sequelize.STRING,
      allowNull: true
    },
    appdata: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}

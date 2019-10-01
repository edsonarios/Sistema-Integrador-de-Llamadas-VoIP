'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupExtensionsModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('extensions', {
    context: {
      type: Sequelize.STRING,
      allowNull: false
    },
    exten: {
      type: Sequelize.STRING,
      allowNull: false
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    app: {
      type: Sequelize.STRING,
      allowNull: false
    },
    appdata: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}

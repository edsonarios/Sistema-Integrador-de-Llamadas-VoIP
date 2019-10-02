'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSalaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agent', {
    nombreQueue: {
      type: Sequelize.STRING,
      allowNull: false
    }
    
  })
}
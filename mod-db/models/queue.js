'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupQueueModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('queue', {
    nombreQueue: {
      type: Sequelize.STRING,
      allowNull: true
    }
    
  })
}
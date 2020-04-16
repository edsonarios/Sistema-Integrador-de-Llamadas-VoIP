'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupQueueModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('queue', {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    musicclass: {
      type: Sequelize.STRING,
      allowNull: true
    },
    strategy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    timeout: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    context: {
      type: Sequelize.STRING,
      allowNull: true
    }
    
  })
}
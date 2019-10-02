'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSalaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agent', {
    nombreSala: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
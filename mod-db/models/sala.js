'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSalaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sala', {
    nombreSala: {
      type: Sequelize.STRING,
      allowNull: true
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
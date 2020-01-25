'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAgendaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('agenda', {
    nombreAgenda: {
      type: Sequelize.STRING,
      allowNull: true
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}
'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupContactoModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('contacto', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    numero: {
      type: Sequelize.STRING,
      allowNull: true
    },
    descripcion: {
      type: Sequelize.INTEGER,
      allowNull: true
    }

  })
}
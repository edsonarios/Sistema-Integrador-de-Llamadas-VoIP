'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUsuarioModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('usuario', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apPaterno: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apMaterno: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: true
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    conectado: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}

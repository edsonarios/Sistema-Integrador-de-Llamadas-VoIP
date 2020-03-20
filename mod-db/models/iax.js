'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupIaxModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('iax', {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    secret: {
      type: Sequelize.STRING,
      allowNull: true
    },
    callerid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    context: {
      type: Sequelize.STRING,
      allowNull: true
    },
    host: {
      type: Sequelize.STRING,
      allowNull: true
    },
    disallow:{
      type: Sequelize.STRING,
      allowNull: true
    },
    allow: {
      type: Sequelize.STRING,
      allowNull: true
    },
    switchiaxs: {
      type: Sequelize.STRING,
      allowNull: true
    }
    
  })
}

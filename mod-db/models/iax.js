'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupIaxModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sip', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    secret: {
      type: Sequelize.STRING,
      allowNull: false
    },
    callerid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    context: {
      type: Sequelize.STRING,
      allowNull: false
    },
    host: {
      type: Sequelize.STRING,
      allowNull: false
    },
    disallow:{
      type: Sequelize.STRING,
      allowNull: false
    },
    allow: {
      type: Sequelize.STRING,
      allowNull: false
    }
    
  })
}

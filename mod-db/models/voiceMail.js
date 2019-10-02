'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupVoiceMailModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sip', {
    id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fechamensaje: {
      type: Sequelize.STRING,
      allowNull: false
    }
    
  })
}

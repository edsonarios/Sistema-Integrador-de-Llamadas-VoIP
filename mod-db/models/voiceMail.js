'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupVoiceMailModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('voiceMail', {
    uniqueid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    code: {
      type: Sequelize.STRING,
      allowNull: true
    },
    fechamensaje: {
      type: Sequelize.STRING,
      allowNull: true
    }
    
  })
}

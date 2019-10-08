'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupVoiceMailModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('voicemail', {
    uniqueid: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    customer_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    context: {
      type: Sequelize.STRING,
      allowNull: true
    },
    mailbox: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pager: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tz: {
      type: Sequelize.STRING,
      allowNull: true
    },
    attach: {
      type: Sequelize.STRING,
      allowNull: true
    },
    saycid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dialout: {
      type: Sequelize.STRING,
      allowNull: true
    },
    callback: {
      type: Sequelize.STRING,
      allowNull: true
    },
    review: {
      type: Sequelize.STRING,
      allowNull: true
    },
    operator: {
      type: Sequelize.STRING,
      allowNull: true
    },
    envelope: {
      type: Sequelize.STRING,
      allowNull: true
    },
    sayduration: {
      type: Sequelize.STRING,
      allowNull: true
    },
    saydurationm: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    sendvoicemail: {
      type: Sequelize.STRING,
      allowNull: true
    },
    delete: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nextaftercmd: {
      type: Sequelize.STRING,
      allowNull: true
    },
    forcename: {
      type: Sequelize.STRING,
      allowNull: true
    },
    forcegreetings: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hidefromdir: {
      type: Sequelize.STRING,
      allowNull: true
    },
    stamp: {
      type: Sequelize.DATE,
      allowNull: true
    }
  })
}

'use strict'

const setupDatabase = require('./lib/db')

const setupExtensions = require('./lib/extensions')
const setupSip = require('./lib/sip')

const defaults = require('defaults')

const setupExtensionsModel = require('./models/extensions')
const setupSipModel = require('./models/sip')


module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)

  const ExtensionsModel = setupExtensionsModel(config)
  const SipModel = setupSipModel(config)
  
  //ExtensionsModel.hasMany(SipModel)
  //SipModel.belongsTo(ExtensionsModel, {onDelete: 'CASCADE'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Extensions = setupExtensions(ExtensionsModel)
  const Sip = setupSip(SipModel, ExtensionsModel)
  
  
  return {
    Extensions,
    Sip
  }
}

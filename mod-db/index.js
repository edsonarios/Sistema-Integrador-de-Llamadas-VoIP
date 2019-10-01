'use strict'

const setupDatabase = require('./lib/db')

const setupExtensions = require('./lib/extensions')
const setupSip = require('./lib/sip')
const setupCdr = require('./lib/cdr')

const defaults = require('defaults')

const setupExtensionsModel = require('./models/extensions')
const setupSipModel = require('./models/sip')
const setupCdrModel = require('./models/cdr')


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
  const CdrModel = setupCdrModel(config)
  
  //ExtensionsModel.hasMany(SipModel)
  //SipModel.belongsTo(ExtensionsModel, {onDelete: 'CASCADE'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Extensions = setupExtensions(ExtensionsModel)
  const Sip = setupSip(SipModel, ExtensionsModel)
  const Cdr = setupCdr(CdrModel, ExtensionsModel)
  
  
  return {
    Extensions,
    Sip,
    Cdr
  }
}

'use strict'

const setupDatabase = require('./lib/db')

const setupExtesions = require('./lib/extesions')
const setupSip = require('./lib/sip')

const defaults = require('defaults')

const setupExtesionsModel = require('./models/extesions')
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

  const ExtesionsModel = setupExtesionsModel(config)
  const SipModel = setupSipModel(config)
  
  //ExtesionsModel.hasMany(SipModel)
  //SipModel.belongsTo(ExtesionsModel, {onDelete: 'CASCADE'})

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Extesions = setupExtesions(ExtesionsModel)
  const Sip = setupSip(SipModel, ExtesionsModel)
  
  
  return {
    Extesions,
    Sip
  }
}

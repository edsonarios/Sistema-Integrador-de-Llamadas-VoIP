'use strict'

const setupDatabase = require('./lib/db')

const setupExtensions = require('./lib/extensions')
const setupSip = require('./lib/sip')
const setupCdr = require('./lib/cdr')
const setupUsuario = require('./lib/usuario')
const setupIax = require('./lib/iax')
const setupQueue = require('./lib/queue')
const setupSala = require('./lib/sala')
const setupVoiceMail = require('./lib/voiceMail')


const defaults = require('defaults')

const setupExtensionsModel = require('./models/extensions')
const setupSipModel = require('./models/sip')
const setupCdrModel = require('./models/cdr')
const setupUsuarioModel = require('./models/usuario')
const setupIaxModel = require('./models/iax')
const setupQueueModel = require('./models/queue')
const setupSalaModel = require('./models/sala')
const setupVoiceMailModel = require('./models/voiceMail')

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
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  const ExtensionsModel = setupExtensionsModel(config)
  const SipModel = setupSipModel(config)
  const CdrModel = setupCdrModel(config)
  const UsuarioModel = setupUsuarioModel(config)
  const IaxModel = setupIaxModel(config)
  const QueueModel = setupQueueModel(config)
  const VoiceMailModel = setupVoiceMailModel(config)
  const SalaModel = setupSalaModel(config)
  

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel, {onDelete: 'CASCADE'})

  UsuarioModel.hasMany(VoiceMailModel)
  VoiceMailModel.belongsTo(UsuarioModel, {onDelete: 'CASCADE'})

  UsuarioModel.hasMany(SipModel)
  SipModel.belongsTo(UsuarioModel, {onDelete: 'CASCADE'})

  UsuarioModel.hasMany(IaxModel)
  IaxModel.belongsTo(UsuarioModel, {onDelete: 'CASCADE'})

  UsuarioModel.hasMany(CdrModel)
  CdrModel.belongsTo(UsuarioModel, {onDelete: 'CASCADE'})

  SalaModel.hasMany(UsuarioModel)
  UsuarioModel.belongsTo(SalaModel, {onDelete: 'CASCADE'})

  SalaModel.hasMany(ExtensionsModel)
  ExtensionsModel.belongsTo(SalaModel, {onDelete: 'CASCADE'})

  SalaModel.hasMany(QueueModel)
  QueueModel.belongsTo(SalaModel, {onDelete: 'CASCADE'})





  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = setupAgent(AgentModel)
  const Metric = setupMetric(MetricModel, AgentModel)

  const Extensions = setupExtensions(ExtensionsModel)
  const Sip = setupSip(SipModel, ExtensionsModel)
  const Cdr = setupCdr(CdrModel, ExtensionsModel)
  const Usuario = setupUsuario(UsuarioModel)
  const Iax = setupIax(IaxModel, ExtensionsModel)
  const Queue = setupQueue(QueueModel, SalaModel)
  const VoiceMail = setupVoiceMail(VoiceMailModel, UsuarioModel)
  const Sala = setupSala(SalaModel, UsuarioModel)
  
  
  
  return {
    Agent,
    Metric,
    Extensions,
    Sip,
    Cdr,
    Queue,
    Iax,
    Usuario,
    VoiceMail,
    Sala
  }
}

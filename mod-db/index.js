"use strict";

const setupDatabase = require("./lib/db");

const setupExtension = require("./lib/extension");
const setupSip = require("./lib/sip");
const setupCdr = require("./lib/cdr");
const setupUsuario = require("./lib/usuario");
const setupAgenda = require("./lib/agenda");
const setupIax = require("./lib/iax");
const setupQueue = require("./lib/queue");
const setupSala = require("./lib/sala");
const setupVoicemail = require("./lib/voicemail");
const setupPrivilegios = require("./lib/privilegios");

const defaults = require("defaults");

const setupExtensionModel = require("./models/extension");
const setupSipModel = require("./models/sip");
const setupCdrModel = require("./models/cdr");
const setupUsuarioModel = require("./models/usuario");
const setupAgendaModel = require("./models/agenda");
const setupIaxModel = require("./models/iax");
const setupQueueModel = require("./models/queue");
const setupSalaModel = require("./models/sala");
const setupVoicemailModel = require("./models/voicemail");
const setupPrivilegiosModel = require("./models/privilegios");

module.exports = async function (config) {
  config = defaults(config, {
    dialect: "sqlite",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    query: {
      raw: true,
    },
  });

  const sequelize = setupDatabase(config);

  const ExtensionModel = setupExtensionModel(config);
  const SipModel = setupSipModel(config);
  const CdrModel = setupCdrModel(config);
  const UsuarioModel = setupUsuarioModel(config);
  const AgendaModel = setupAgendaModel(config);
  const IaxModel = setupIaxModel(config);
  const QueueModel = setupQueueModel(config);
  const VoicemailModel = setupVoicemailModel(config);
  const SalaModel = setupSalaModel(config);
  const PrivilegiosModel = setupPrivilegiosModel(config);

  UsuarioModel.hasMany(VoicemailModel);
  VoicemailModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  UsuarioModel.hasMany(SipModel);
  SipModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  UsuarioModel.hasMany(IaxModel);
  IaxModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  UsuarioModel.hasMany(AgendaModel);
  AgendaModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  UsuarioModel.hasMany(CdrModel);
  CdrModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  SalaModel.hasMany(UsuarioModel);
  UsuarioModel.belongsTo(SalaModel, { onDelete: "CASCADE" });

  SalaModel.hasMany(ExtensionModel);
  ExtensionModel.belongsTo(SalaModel, { onDelete: "CASCADE" });

  SalaModel.hasMany(QueueModel);
  QueueModel.belongsTo(SalaModel, { onDelete: "CASCADE" });

  UsuarioModel.hasMany(PrivilegiosModel);
  PrivilegiosModel.belongsTo(UsuarioModel, { onDelete: "CASCADE" });

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  const Extension = setupExtension(ExtensionModel, SalaModel);
  const Sip = setupSip(SipModel, UsuarioModel);
  const Cdr = setupCdr(CdrModel, UsuarioModel);
  const Agenda = setupAgenda(AgendaModel, UsuarioModel);
  const Usuario = setupUsuario(UsuarioModel, SalaModel);
  const Iax = setupIax(IaxModel, UsuarioModel);
  const Queue = setupQueue(QueueModel, SalaModel);
  const Voicemail = setupVoicemail(VoicemailModel, UsuarioModel);
  const Sala = setupSala(SalaModel);
  const Privilegios = setupPrivilegios(PrivilegiosModel);

  return {
    Extension,
    Sip,
    Cdr,
    Agenda,
    Queue,
    Iax,
    Usuario,
    Voicemail,
    Privilegios,
    Sala,
  };
};

'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSipModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('sip', {
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
    allow:{
      type: Sequelize.STRING,
      allowNull: true
    },
    qualify: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nat: {
      type: Sequelize.STRING,
      allowNull: true
    },
    switchsip: {
      type: Sequelize.STRING,
      allowNull: true
    },
    //Nuevos
    qualifyfreq: {
      type: Sequelize.STRING,
      allowNull: true
    },
    deny: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtnfnode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    canreinvite: {
      type: Sequelize.STRING,
      allowNull: true
    },
    trustrpid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    sendrpid: {
      type: Sequelize.STRING,
      allowNull: true
    },
    transport: {
      type: Sequelize.STRING,
      allowNull: true
    },
    avpf: {
      type: Sequelize.STRING,
      allowNull: true
    },
    force_avp: {
      type: Sequelize.STRING,
      allowNull: true
    },
    icesupport: {
      type: Sequelize.STRING,
      allowNull: true
    },
    encryption: {
      type: Sequelize.STRING,
      allowNull: true
    },
    callgroup: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pickupgroup: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dial: {
      type: Sequelize.STRING,
      allowNull: true
    },
    permit: {
      type: Sequelize.STRING,
      allowNull: true
    },
    callcounter: {
      type: Sequelize.STRING,
      allowNull: true
    },
    faxdetect: {
      type: Sequelize.STRING,
      allowNull: true
    },
    directmedia: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtlsenable: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtlsverify: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtlscertfile: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtlscafile: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dtlssetup: {
      type: Sequelize.STRING,
      allowNull: true
    },
    rtcp_mux: {
      type: Sequelize.STRING,
      allowNull: true
    }
    
    
  })
}

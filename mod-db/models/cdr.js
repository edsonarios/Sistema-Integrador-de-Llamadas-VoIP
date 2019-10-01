'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupCdrModel(config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('cdr', {
        uniqueid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        userfield: {
            type: Sequelize.STRING,
            allowNull: true
        },
        accountcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        src: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dst: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dcontext: {
            type: Sequelize.STRING,
            allowNull: true
        },
        clid: {
            type: Sequelize.STRING,
            allowNull: true
        },
        channel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dstchannel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastapp: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastdata: {
            type: Sequelize.STRING,
            allowNull: true
        },
        calldate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        billsec: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        disposition: {
            type: Sequelize.STRING,
            allowNull: true
        },
        amaflags: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: true
        }
    })
}

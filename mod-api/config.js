'use strict'

const debug = require('debug')('mod:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'asterisk',
    username: process.env.DB_USER || 'asterisk',
    password: process.env.DB_PASS || 'asterisk',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || 'secret'
  }
}

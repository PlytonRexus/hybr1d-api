const mongoose = require('mongoose')
const debug = require('debug')('app:config:db')

const { env } = require('../../src/utils/helpers')

const dbHost = 'mongodb://127.0.0.1:27017/'
const dbName = 'ecom'
const dbUrlDev = dbHost + dbName

debug('Waiting for database...')

mongoose
  .connect(env('MONGODB_URL', dbUrlDev), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((_res) => debug('Connected to mongodb'))
  .catch((err) => debug(err.message || err))

module.exports = mongoose

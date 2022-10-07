const MongooseStore = require('express-brute-mongoose')
const BaseExceptionHandler = require('../../core/BaseExceptionHandler')

const bruteforceInstance = function (store, retries) {
  const ExpressBrute = require('express-brute')
  if (store instanceof MongooseStore) {
    const opts = {
      freeRetries: retries || 6,
      handleStoreError: BaseExceptionHandler
    }
    return (new ExpressBrute(store, opts))
  }
}

const bruteforce = function () {
  const Bruteforce = require('../models/Bruteforce')
  const store = new MongooseStore(Bruteforce)
  return bruteforceInstance(store)
}

module.exports = bruteforce

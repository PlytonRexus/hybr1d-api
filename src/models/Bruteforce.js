const mongoose = require('mongoose')
const bruteforceSchemaDesign = require('express-brute-mongoose/dist/schema')

const bruteforceSchema = new mongoose.Schema(bruteforceSchemaDesign, {
  timestamps: true
})

module.exports = mongoose.model('bruteforce', bruteforceSchema)

const mongoose = require('mongoose')
const safeDelete = require('mongoose-delete')

const BaseModelOptions = require('../core/BaseModelOptions')
const opts = new BaseModelOptions()

const schema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true,
    immutable: true
  }
}, opts.schemaOptions)

schema.plugin(safeDelete, opts.safeDeleteOptions)

schema.methods.toJSON = function () {
  const order = this
  const orderJson = order.toObject({ virtuals: true })
  return orderJson
}

const Order = mongoose.model('Order', schema)
module.exports = Order

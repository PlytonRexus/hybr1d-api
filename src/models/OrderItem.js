const mongoose = require('mongoose')
const safeDelete = require('mongoose-delete')

const BaseModelOptions = require('../core/BaseModelOptions')
const opts = new BaseModelOptions()

const schema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    immutable: true
  }
}, opts.schemaOptions)

schema.plugin(safeDelete, opts.safeDeleteOptions)

schema.methods.toJSON = function () {
  return this.toObject({ virtuals: true })
}

const OrderItem = mongoose.model('OrderItem', schema, 'order_items')
module.exports = OrderItem

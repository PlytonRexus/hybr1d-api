const mongoose = require('mongoose')
const safeDelete = require('mongoose-delete')

const BaseModelOptions = require('../core/BaseModelOptions')
const opts = new BaseModelOptions()

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  catalogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  }
}, opts.schemaOptions)

schema.plugin(safeDelete, opts.safeDeleteOptions)

schema.methods.toJSON = function () {
  const productItem = this
  const productJson = productItem.toObject({ virtuals: true })
  return productJson
}

const Product = mongoose.model('Product', schema)
module.exports = Product

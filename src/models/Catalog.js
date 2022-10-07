// Seems redundant, but adding for scalability
const mongoose = require('mongoose')
const safeDelete = require('mongoose-delete')

const BaseModelOptions = require('../core/BaseModelOptions')
const opts = new BaseModelOptions()

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true
    }
  },
  opts.schemaOptions
)

schema.plugin(safeDelete, opts.safeDeleteOptions)

schema.methods.toJSON = function () {
  const catalogItem = this
  const catalogJson = catalogItem.toObject({ virtuals: true })
  return catalogJson
}

const Catalog = mongoose.model('Catalog', schema)
module.exports = Catalog

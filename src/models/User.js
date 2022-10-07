const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const safeDelete = require('mongoose-delete')

const BaseModelOptions = require('../core/BaseModelOptions')
const { isMimeType, isEmail, isURI } = require('../utils/validation/validator')
const roles = require('../../config/constants/roles')
const { env } = require('../utils/helpers')

const opts = new BaseModelOptions()

const AddressSchema = new mongoose.Schema({
  primary: {
    type: String,
    trim: true
  },
  secondary: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  }
})

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      // validate: isEmail,
      trim: true,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      trim: true
      // validate: isPhoneNumber
    },
    role: {
      type: String,
      enum: Object.keys(roles),
      trim: true,
      required: true
    },
    photo: {
      type: Buffer
    },
    photoFormat: {
      type: String
      // validate: isMimeType
    },
    address: {
      type: AddressSchema
    },
    newUser: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
      required: true
    }
  },
  opts.schemaOptions
)

schema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject({ virtuals: true });
	delete userObject.password;
	delete userObject["__v"];
  delete userObject.photoFormat;
	return userObject;
}

schema.pre('save', function (next) {
  const user = this
  user.newUser = user.isNew
  if (user.newUser) {
    user.password = bcrypt.hashSync(user.password, env('BCRYPT_SALT_ROUNDS', 4))
  }
  next()
})

schema.plugin(safeDelete, opts.safeDeleteOptions)

const User = mongoose.model('User', schema)
module.exports = User

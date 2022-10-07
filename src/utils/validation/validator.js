const validator = require('validator')

const ValidationException = require('../../exceptions/ValidationException')
const { admissionNumberRegex } = require('../../../config/constants/regularExpressions')
const profanity = require('./profanity')

const isAdmissionNumber = function (v) {
  if (!admissionNumberRegex.test(v)) {
    throw new ValidationException({
      message: 'Not a valid admission number'
    })
  }
  return true
}

const isEmail = function (v) {
  if (!validator.isEmail(v)) {
    throw new ValidationException({
      message: 'Not a valid email address'
    })
  }
}

const isPhoneNumber = validator.isMobilePhone

const isHouse = function (v) {
  if (v < 1 || v > 8) {
    throw new ValidationException({
      message: 'Not a valid house number'
    })
  }
}

const isURI = validator.isURL

const isMimeType = validator.isMimeType

const isClean = profanity.isClean

module.exports = {
  isAdmissionNumber,
  isPhoneNumber,
  isEmail,
  isURI,
  isHouse,
  isMimeType,
  isClean,
  ...validator
}

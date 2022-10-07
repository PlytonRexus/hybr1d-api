const {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError
} = require('jsonwebtoken')
const { MulterError } = require('multer')

const InternalServerException = require('../exceptions/InternalServerException')
const BadRequestException = require('../exceptions/BadRequestException')
const UnauthorisedException = require('../exceptions/UnauthorisedException')
const BaseException = require('./BaseException')
const ValidationException = require('../exceptions/ValidationException')
const { Error } = require('mongoose')
const { BAD_REQUEST, UNAUTHORIZED } = require('../../config/constants/httpCodes')

const BaseExceptionHandler = function (E) {
  if (!E) {
    throw new InternalServerException({
      message: 'No error supplied',
      critical: true
    })
  }

  if (E instanceof BaseException) {
    return E
  }

  if (E instanceof JsonWebTokenError) {
    if (E instanceof TokenExpiredError) {
      return new UnauthorisedException({
        message: E.message,
        name: 'JWT Error',
        thrownBy: 'jsonwebtoken',
        critical: true,
        errors: [],
        code: UNAUTHORIZED
      })
    } else if (E instanceof NotBeforeError) {
      return new BadRequestException({
        message: E.message,
        name: 'JWT Error',
        thrownBy: 'jsonwebtoken',
        critical: true,
        errors: []
      })
    }
  } else if (E instanceof MulterError) {
    return new BadRequestException({
      name: E.name,
      message: E.message + ' with field: ' + E.field + '.',
      thrownBy: 'multer',
      critical: false,
      errors: [E],
      code: E.code
    })
  } else if (E instanceof Error.ValidationError) {
    return new ValidationException({
      message: E.message,
      thrownBy: 'database',
      critical: false,
      errors: E.errors,
      code: BAD_REQUEST
    })
  } else if (E.code && E.code === 11000) {
    return new ValidationException({
      message: 'Duplicate keys error',
      thrownBy: 'database',
      critical: false,
      errors: E.keyValue,
      code: BAD_REQUEST
    })
  } else if (E instanceof Error) {
    return new BaseException({
      name: E.name,
      message: E.message,
      errors: [E],
      critical: true,
      thrownBy: E.stack
    })
  }

  if (!(E instanceof Error)) {
    throw new InternalServerException({
      message: 'No error supplied',
      critical: true
    })
  }
}

module.exports = BaseExceptionHandler

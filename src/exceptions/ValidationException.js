const BaseException = require('../core/BaseException')
const { BAD_REQUEST } = require('../../config/constants/httpCodes')

class ValidationException extends BaseException {
  /**
   * Creates an instance of ValidationException.
   * @param {object} { message, name }
   * @memberof ValidationException
   */
  constructor({
    message = 'Some sort of validation error occurred, check your request',
    name = 'Validation Failed',
    errors = [],
    critical = false
  }) {
    super({
      message,
      name,
      code: BAD_REQUEST,
      errors,
      critical
    })
  }
}

module.exports = ValidationException

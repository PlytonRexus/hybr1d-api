const BaseException = require('../core/BaseException')
const { BAD_REQUEST } = require('../../config/constants/httpCodes')

class BadRequestException extends BaseException {
  /**
   * Creates an instance of BadRequestException.
   * @param {object} { errors, message, name, critical }
   * @memberof BadRequestException
   */
  constructor ({ errors, message, name, critical, code = BAD_REQUEST }) {
    super({
      message: message || 'Bad request exception',
      errors: errors || [],
      name: name || 'Bad request',
      critical: critical || true,
      code: code
    })
  }
}

module.exports = BadRequestException

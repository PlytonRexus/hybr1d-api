const BaseException = require('../core/BaseException')

class InternalServerException extends BaseException {
  /**
   * Creates an instance of InternalServerException.
   * @param {object} { errors, message, name, critical }
   * @memberof InternalServerException
   */
  constructor ({ errors = [],
    message = 'This is probably an error on the server' +
    ' and has nothing to do with your request.',
    name = 'Internal Server Error',
    critical = false }) {
    super({
      message,
      name,
      critical,
      errors,
      code: 500
    })
  }
}

module.exports = InternalServerException

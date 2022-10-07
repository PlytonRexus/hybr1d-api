const { INTERNAL_SERVER_ERROR } = require('../../config/constants/httpCodes')
const { env } = require('../utils/helpers')

/**
 *
 * @class BaseException
 * @extends {Error}
 */
class BaseException extends Error {
  /**
   * Creates an instance of BaseException.
   *
   * @param {object} { name: string, errors: array<object>, thrownBy: string,
   * critical: boolean, message: string, code: number }
   * @memberof BaseException
   */
  constructor (opts = {
    name: 'Error',
    errors: [],
    thrownBy: env('APP_NAME', ' Server'),
    critical: false,
    message: 'No message provided',
    code: INTERNAL_SERVER_ERROR }) {
    super(opts.name)
    this.critical = opts.critical
    this.thrownBy = opts.thrownBy
    this.errors = opts.errors
    this.name = opts.name
    this.message = opts.message
    this.code = opts.code
  }
}

module.exports = BaseException

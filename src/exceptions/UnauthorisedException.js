const BaseException = require('../core/BaseException')
const { UNAUTHORIZED } = require('../../config/constants/httpCodes')

class UnauthorisedException extends BaseException {
  /**
   * Creates an instance of UnauthorizedException.
   * @param {object} { message, name, thrownBy, critical }
   * @memberof UnauthorizedException
   */
  constructor ({
    message = 'This user is unauthorised to access this route',
    name = 'Authentication error',
    thrownBy = 'Authentication handler',
    critical = true,
    errors }) {
    super()
    Object.assign(this, {
      message: message,
      code: UNAUTHORIZED,
      thrownBy: thrownBy,
      critical: critical,
      name: name,
      errors: errors || super.errors
    })
  }
}

module.exports = UnauthorisedException

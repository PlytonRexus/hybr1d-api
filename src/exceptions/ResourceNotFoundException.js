const BaseException = require('../core/BaseException')
const { NOT_FOUND } = require('../../config/constants/httpCodes')

class ResourceNotFoundException extends BaseException {
  /**
   * Creates an instance of ResourceNotFoundException.
   * @param {string} resourceName
   * @memberof ResourceNotFoundException
   */
  constructor (resourceName) {
    super({
      message: 'The requested resource ' + resourceName + ' was not found.',
      code: NOT_FOUND,
      name: 'Resource not found',
      critical: false
    })
  }
}

module.exports = ResourceNotFoundException

const morgan = require('morgan')
const { env } = require('../helpers')
const logger = require('../logger')

logger.stream = {
  write: (message) =>
    logger.info(message.substring(0, message.lastIndexOf('\n')))
}

module.exports = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream: logger.stream, skip: () => env('NODE_ENV') === 'test' }
)

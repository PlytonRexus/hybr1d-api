const { env } = require('../helpers')
const { filterParams, includeParams } = require('../validation/queryParser')

/**
 * Sets the request timeout in express for local environments
 * Won't be useful on platforms with fixed timeouts like Heroku,
 * but the route will keep working
 *
 * Middleware
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const setRequestTimeout = function (req, res, next) {
  req.setTimeout(
    parseInt(
      env('REQUEST_TIMEOUT', 30),
      10) * 60 * 1000)
  next()
}

const parseRequest = function (req, res, next) {
  const params = req.query
  if (params.filter) req.filterQuery = filterParams(params.filter)
  if (params.include) req.includeQuery = includeParams(params.include)
  next()
}

module.exports = { setRequestTimeout, parseRequest }

const jwt = require('jsonwebtoken')
const { env } = require('../utils/helpers')

/**
 * Synchronously sign the given payload into a JSON Web Token string payload
 *
 * @static
 * @param {object} payload - Payload to sign
 * @param {object} opts - Options for signature
 * @returns {string} A JSON Web Token string
 * @memberof JWTService
 */
const sign = function (payload) {
  const secret = env('JWT_SECRET', 'secret')
  const options = {
    issuer: env('APP_NAME', ''),
    audience: env('BASE_URL', ''),
    expiresIn: '12h'
  }

  return jwt.sign({ user: payload }, secret, options)
}

/**
 * Synchronously verify a given token and return a decoded token
 *
 * @static
 * @param {string} token - JWT string to verify
 * @returns {object|boolean} Decoded token payload or false for invalid token
 * @memberof JWTService
 */
const verify = function (token) {
  const secret = env('JWT_SECRET', 'secret')
  const options = {
    issuer: env('APP_NAME', ''),
    audience: env('BASE_URL', ''),
    expiresIn: '12h'
  }

  try {
    return jwt.verify(token, secret, options)
  } catch (err) {
    return false
  }
}

const jwtService = { sign, verify }

module.exports = jwtService

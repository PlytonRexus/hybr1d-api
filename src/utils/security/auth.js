const BaseResponse = require("../../core/BaseResponse")
const BadRequestException = require("../../exceptions/BadRequestException")
const UnauthorisedException = require("../../exceptions/UnauthorisedException")
const { verify } = require("../../services/jwt")
const usersService = require("../../services/users")

// Authentication middleware
const authenticate = (opts = {}) => async function (req, res, next) {
  try {
    let token = req.get('Authorization') || req.get('Authorisation')
    if (!token || (typeof token === 'string' && token.length <= 0)) {
      throw new UnauthorisedException({
        message: 'Authorization/Authorisation header missing.'
      })
    }

    token = token.replace(/Bearer /, '')

    let decoded, user
    try {
      decoded = verify(token)
    } catch (e) {
      throw new BadRequestException({ message: 'Invalid JWT supplied' })
    }

    if (!decoded) throw new UnauthorisedException({ message: 'Invalid token' })

    user = await usersService.getOne(decoded.user._id)

    if (!user) {
      throw new UnauthorisedException({
        message: 'No such user found. Have you signed up?'
      })
    }

    req.user = user
    req.role = user.role

    if (!!opts.allowOnlyRoles
        && opts.allowOnlyRoles instanceof Array
        && !opts.allowOnlyRoles.includes(user.role))
      throw new UnauthorisedException({
        message: 'You need to have a specific role to view this page. Sign up using /auth/register' })

    if (req.user && req.role) next()
    else throw new UnauthorizedException({
      message: 'Unauthorized because of credential error or server error' })
  } catch (err) {
    BaseResponse.sendError(err, res)
  }
}

module.exports = { authenticate }

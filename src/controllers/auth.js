const { CREATED, OK } = require('../../config/constants/httpCodes')
const BaseResponse = require('../core/BaseResponse')
const authService = require('../services/auth')

async function register(req, res) {
  try {
    let payload = await authService.register(req.body)
    payload = new BaseResponse(payload, CREATED).postResponse
    res.status(payload.status).json(payload)
  } catch (err) {
    BaseResponse.sendError(err, res)
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const payload = await authService.login(email, password)
    const response = new BaseResponse(payload, OK, {})
    response.sendResponse(res, response.postResponse)
  } catch (err) {
    BaseResponse.sendError(err, res)
  }
}

module.exports = { register, login }

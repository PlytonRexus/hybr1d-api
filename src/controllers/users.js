const BaseController = require('../core/BaseController')
const User = require('../models/User')

class UsersController extends BaseController {
}

const usersController = new UsersController(User)

module.exports = usersController

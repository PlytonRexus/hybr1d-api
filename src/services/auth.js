const bcrypt = require('bcrypt')

const BaseExceptionHandler = require('../core/BaseExceptionHandler')
const BadRequestException = require('../exceptions/BadRequestException')
const jwtService = require('./jwt')
const usersService = require('./users')

async function register(user) {
  try {
    let newUser = await usersService.addOne(user)

    // generate jwt token from user payload
    const token = jwtService.sign(newUser)
    newUser = newUser._doc
    return { ...newUser, token }
  } catch (err) {
    throw BaseExceptionHandler(err)
  }
}

async function login(email, password) {
  try {
    // fetch user data
    let user = await usersService.getByEmail(email)

    // compare password
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException({
        code: 403,
        message: 'Invalid credentials'
      })
    }

    user = user._doc

    // generate jwt token from user payload
    delete user.password
    const token = jwtService.sign(user)
    return { ...user, token }
  } catch (err) {
    err = BaseExceptionHandler(err)
    throw err
  }
}

module.exports = { register, login }

const debug = require('debug')('app:services:users')

const BaseService = require('../core/BaseService')
const User = require('../models/User')

class UsersService extends BaseService {
  getPhoto = async (id) => {
    try {
      const resource = await this.Entity.findById(id)
      if (resource) {
        return { format: resource.photoFormat, photo: resource.photo }
      } else throw new InternalServerException({
        message: 'Not found', name: 'Resource not found'
      })
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  getByEmail = async (email) => {
    try {
      return await this.Entity.findOne({ email })
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }
}

const usersService = new UsersService(User)

module.exports = usersService

const debug = require('debug')('app:core:BaseService')

const { handlePaging } = require('./BaseRequest')
const { compressImageBuffer } = require('../utils/content')
const BaseExceptionHandler = require('./BaseExceptionHandler')

class BaseService {
  constructor (Entity) {
    this.Entity = Entity
  }

  getAll = async (query, includeQuery, filterQuery = {}) => {
    const opts = handlePaging(query.skip, query.limit)
    try {
      const start = Date.now()
      const records = await this.Entity.find(
        filterQuery || {}, includeQuery, opts) || []
      const queryTime = Date.now() - start

      return { records, queryTime }
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  getOne = async (id) => {
    try {
      return await this.Entity.findById(id)
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  addOne = async (body, file) => {
    try {
      Object.keys(body).forEach(k => {
        if (typeof k === 'string'
          && k.includes('Id')
          && typeof body[k] === 'string') { body[k] = body[k].replace(/"/g, '') }
      })
      const doc = new this.Entity(body)
      if (file) {
        doc.photo = await compressImageBuffer(file.buffer, file.mimetype)
        doc.photoFormat = file.mimetype
      }

      if (doc.newUser) doc.newUser = true

      return await doc.save()
    } catch (err) {
      debug(err)
      err = BaseExceptionHandler(err)
      throw err
    }
  }

  updateOne = async (id, body) => {
    try {
      return await this.Entity.findOneAndUpdate({
        _id: id
      }, body, { new: true })
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  deleteOne = async (id, body) => {
    try {
      return await this.Entity.findOneAndDelete({
        _id: id
      }, body)
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

}

module.exports = BaseService

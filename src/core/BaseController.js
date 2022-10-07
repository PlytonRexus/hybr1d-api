const debug = require('debug')('app:core:BaseController')

const { handlePaging } = require('./BaseRequest')
const { OK, CREATED } = require('../../config/constants/httpCodes')
const { compressImageBuffer } = require('../utils/content')
const BaseResponse = require('./BaseResponse')
const BadRequestException = require('../exceptions/BadRequestException')

const asyncWrapper = fn => (req, res, next) => fn(req, res, next).catch(next)

class BaseController {
  constructor (Entity) {
    this.Entity = Entity
    this.asyncWrapper = asyncWrapper
  }

  getAll = async (req, res) => {
    const opts = handlePaging(req.query.skip, req.query.limit)
    try {
      const start = Date.now()
      const records = await this.Entity.find(
        req.filterQuery || {}, req.includeQuery, opts) || []
      const queryTime = Date.now() - start

      const rp =
        new BaseResponse(records, OK, { queryTime })
      res.status(rp.status).json(rp.getAllResponse)
    } catch (err) {
      debug(err)
      BaseResponse.sendError(err, res)
    }
  }

  getOne = async (req, res) => {
    try {
      const resource = await this.Entity.findById(req.params.id)
      const rp = new BaseResponse(resource, OK, {})
      res.status(rp.status).json(rp.getOneResponse)
    } catch (err) {
      debug(err)
      BaseResponse.sendError(err, res)
    }
  }

  addOne = async (req, res) => {
    try {
      const doc = new this.Entity(req.body)
      Object.keys(req.body).forEach(k => {
        if (typeof k === 'string' && k.includes('Id')) { req.body[k] = req.body.replace(/"/g, '') }
      })
      if (req.file) {
        doc.photo = await compressImageBuffer(req.file.buffer, req.file.mimetype)
        doc.photoFormat = req.file.mimetype
      }

      if (doc.newUser) doc.newUser = true

      const resource = await doc.save()
      const rp = new BaseResponse(resource, CREATED, {})
      res.status(rp.status).json(rp.postResponse)
    } catch (err) {
      debug(err)
      BaseResponse.sendError(err, res)
    }
  }

  updateOne = async (req, res) => {
    try {
      const resource = await this.Entity.findOneAndUpdate({
        _id: req.params.id
      }, req.body, { new: true })
      const rp = new BaseResponse(resource, OK, {})
      res.status(rp.status).json(rp.patchResponse)
    } catch (err) {
      BaseResponse.sendError(err, res)
      debug(err)
    }
  }

  deleteOne = async (req, res) => {
    try {
      const resource = await this.Entity.findOneAndDelete({
        _id: req.params.id
      }, req.body)
      const rp = new BaseResponse(resource, OK, {})
      res.status(rp.status).json(rp.patchResponse)
    } catch (err) {
      debug(err)
      BaseResponse.sendError(err, res)
    }
  }

  getPhoto = async (req, res) => {
    try {
      const resource = await this.Entity.findById(req.params.id)
      if (resource && resource.photoURI) { res.redirect(resource.photoURI) } else if (resource) {
        res.type(resource.photoFormat)
        res.status(OK).send(resource.photo)
      } else throw new BadRequestException({ message: 'Not found', name: 'Resource not found' })
    } catch (err) {
      debug(err)
      BaseResponse.sendError(err, res)
    }
  }
}

module.exports = BaseController

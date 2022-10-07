const debug = require('debug')('app:services:buyers')

const BaseService = require('../core/BaseService')
const catalogsService = require('./catalogs')
const sellersService = require('./sellers')
const User = require('../models/User')

class BuyersService extends BaseService {
  getSellersCatalog = async sellerId => {
    try {
      return await catalogsService.getBySellerId(sellerId)
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  getSellersList = async () => {
    try {
      return await sellersService.getAll()
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }
}

const buyersService = new BuyersService(User)

module.exports = buyersService

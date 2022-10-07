const debug = require('debug')('app:services:products')

const BaseService = require('../core/BaseService')
const Product = require('../models/Product')

class ProductsService extends BaseService {

  getByCatalogId = async (catalogId) => {
    try {
      return await this.Entity.find({ catalogId })
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

}

const productsService = new ProductsService(Product)

module.exports = productsService

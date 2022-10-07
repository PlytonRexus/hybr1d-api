const debug = require('debug')('app:services:catalogs')

const BaseService = require('../core/BaseService')
const ResourceNotFoundException = require('../exceptions/ResourceNotFoundException')
const productsService = require('./products')
const Catalog = require('../models/Catalog')

class CatalogsService extends BaseService {
  getById = async (id, populate = true) => {
    try {
      const catalog = await this.Entity.findById(id)
      if (populate) {
        catalog = JSON.parse(JSON.stringify(catalog))
        catalog.products = await productsService.find({ catalogId: id })
      }
      return catalog
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  getBySellerId = async (sellerId, populate = true) => {
    try {
      let catalogs = await this.Entity.find({ sellerId })
      if (!catalogs || !catalogs.length)
        throw new ResourceNotFoundException({ resourceName: 'Seller ID ' + sellerId })

      let catalogProductPromises = []

      if (populate) {
        catalogProductPromises = catalogs.map(
          catalog => productsService.getByCatalogId(catalog._id))
        catalogProductPromises = await Promise.allSettled(catalogProductPromises)
      }

      catalogs = catalogProductPromises.map((productList, idx) => {
        catalogs[idx] = JSON.parse(JSON.stringify(catalogs[idx]))
        catalogs[idx].products = productList.value
        return catalogs[idx]
      })

      return catalogs
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

}

const catalogsService = new CatalogsService(Catalog)

module.exports = catalogsService

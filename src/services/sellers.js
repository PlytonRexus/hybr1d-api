const debug = require('debug')('app:services:sellers')

const { SELLER } = require('../../config/constants/roles')
const BaseService = require('../core/BaseService')
const { handlePaging } = require('../core/BaseRequest')
const User = require('../models/User')

class SellersService extends BaseService {
  getAll = async (
    query = { skip: 0, limit: 20 },
    includeQuery = null,
    filterQuery = {}) => {
    const opts = handlePaging(query.skip, query.limit)
    try {
      const start = Date.now()
      filterQuery.role = SELLER
      const records = await this.Entity.find(
        filterQuery, includeQuery, opts) || []
      const queryTime = Date.now() - start

      return { records, queryTime }
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }
}

const sellersService = new SellersService(User)

module.exports = sellersService

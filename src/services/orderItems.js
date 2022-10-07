const debug = require('debug')('app:services:orders')

const BaseService = require('../core/BaseService')
const OrderItem = require('../models/OrderItem')

class OrderItemsService extends BaseService {
  getByOrderId = async orderId => {
    try {
      return await this.Entity.find({ orderId })
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }

  addMany = async orderItems => {
    orderItems = orderItems.map(item => new OrderItem(item))
    return await this.Entity.insertMany(orderItems)
  }
}

const orderItemsService = new OrderItemsService(OrderItem)

module.exports = orderItemsService

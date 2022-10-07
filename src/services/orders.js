const debug = require('debug')('app:services:orders')

const BaseService = require('../core/BaseService')
const ResourceNotFoundException = require('../exceptions/ResourceNotFoundException')
const productsService = require('./products')
const Order = require('../models/Order')
const orderItemsService = require('./orderItems')

class OrdersService extends BaseService {
  createOrder = async (body, sellerId, buyerId) => {
    let orderItems = body.orderItems
    body.sellerId = sellerId
    body.buyerId = buyerId
    delete body.orderItems
    let order = await this.addOne(body)

    orderItems = orderItems.map(item => {
      item.orderId = order._id
      return item
    })

    orderItems = await orderItemsService.addMany(orderItems)
    order = JSON.parse(JSON.stringify(order))
    order.orderItems = orderItems
    return order
  }

  getBySellerId = async (sellerId, populate = true) => {
    try {
      let orders = await this.Entity.find({ sellerId })
      if (!orders || !orders.length)
        throw new ResourceNotFoundException({ resourceName: 'Orders for Seller ID ' + sellerId })

      let orderItemPromises = []

      if (populate) {
        orderItemPromises = orders.map(
          order => orderItemsService.getByOrderId(order._id))
        orderItemPromises = await Promise.allSettled(orderItemPromises)
      }

      orders = orderItemPromises.map((orderItemList, idx) => {
        orders[idx] = JSON.parse(JSON.stringify(orders[idx]))
        orders[idx].orderItems = orderItemList.value
        return orders[idx]
      })

      return orders
    } catch (err) {
      debug(err)
      throw BaseExceptionHandler(err)
    }
  }


}

const ordersService = new OrdersService(Order)

module.exports = ordersService

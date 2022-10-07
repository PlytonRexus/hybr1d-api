const BaseController = require('../core/BaseController')
const BaseResponse = require('../core/BaseResponse')

const buyersService = require('../services/buyers')
const catalogsService = require('../services/catalogs')
const ordersService = require('../services/orders')

const { OK, CREATED } = require('../../config/constants/httpCodes')
const User = require('../models/User')

class BuyersController extends BaseController {
  createCatalog = async (req, res) => {
    try {
      const catalogFields = { ...req.body, sellerId: req.user._id }
      const catalog = await catalogsService.addOne(catalogFields)
      const response = new BaseResponse(catalog, CREATED)
      response.sendResponse(res, response.postResponse)
    } catch (error) {
      BaseResponse.sendError(error, res)
    }
  }

  getSellersOrders = async (req, res) => {
    try {
      const orders = await ordersService.getBySellerId(req.user._id)
      const response = new BaseResponse(orders, OK)
      response.sendResponse(res, response.getAllResponse)
    } catch (error) {
      BaseResponse.sendError(error)
    }
  }

  getSellersCatalog = async (req, res) => {
    try {
      const sellers = await buyersService.getSellersCatalog(req.params.sellerId)
      const response  = new BaseResponse(sellers, OK)
      response.sendResponse(res, response.getAllResponse)
    } catch (error) {
      BaseResponse.sendError(error, res)
    }
  }

  getSellersList = async (_req, res) => {
    try {
      const sellers = await buyersService.getSellersList()
      const response  = new BaseResponse(sellers, OK)
      response.sendResponse(res, response.getAllResponse)
    } catch (error) {
      BaseResponse.sendError(error, res)
    }
  }

  createOrder = async (req, res) => {
    try {
      const { sellerId } = req.params, buyerId = req.user._id
      const order = await ordersService.createOrder(req.body, sellerId, buyerId)
      const response  = new BaseResponse(order, OK)
      response.sendResponse(res, response.postResponse)
    } catch (error) {
      BaseResponse.sendError(error, res)
    }
  }
}

const buyersController = new BuyersController(User)

module.exports = buyersController

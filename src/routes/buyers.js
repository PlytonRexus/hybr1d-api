const BaseRoute = require('../core/BaseRoute')
const buyersController = require('../controllers/buyers')
const { authenticate } = require('../utils/security/auth')
const { BUYER } = require('../../config/constants/roles')

class BuyersRoutes extends BaseRoute {
  additionalControllers(router) {
    router.get('/list-of-sellers', buyersController.getSellersList)
    router.get('/seller-catalog/:sellerId', buyersController.getSellersCatalog)
    router.post('/create-order/:sellerId',
      authenticate({ allowOnlyRoles: [ BUYER ] }),
      buyersController.createOrder)
  }
}

const buyersRoutes = new BuyersRoutes('/buyers', buyersController)

module.exports = buyersRoutes.generateControllers()

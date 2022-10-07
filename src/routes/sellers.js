const BaseRoute = require('../core/BaseRoute')
const buyersController = require('../controllers/buyers')
const { authenticate } = require('../utils/security/auth')
const { SELLER } = require('../../config/constants/roles')

class BuyersRoutes extends BaseRoute {
  additionalControllers(router) {
    router.post('/create-catalog',
      authenticate({ allowOnlyRoles: [ SELLER ] }),
      buyersController.createCatalog)
    router.get('/orders',
      authenticate({ allowOnlyRoles: [ SELLER ] }),
      buyersController.getSellersOrders)
  }
}

const buyersRoutes = new BuyersRoutes('/buyers', buyersController)

module.exports = buyersRoutes.generateControllers()

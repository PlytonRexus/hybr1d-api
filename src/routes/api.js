const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/buyer', require('./buyers'))
router.use('/seller', require('./sellers'))

module.exports = router

const { register, login } = require('../controllers/auth')

const router = require('express').Router()

/* POST create user account. */
router.post('/register', register)

/* POST login user. */
router.post('/login', login)

module.exports = router

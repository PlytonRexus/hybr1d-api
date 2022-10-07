const router = require('express').Router()

const { API_URL } = require('../../config/constants/url')

router.use(`/${API_URL}`, require('./api'))

router.use(require('./404'))

module.exports = router

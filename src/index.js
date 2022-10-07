const express = require('express')
const cors = require('cors')

const httpLogger = require('./utils/middleware/httpLogger')
const routes = require('./routes')

const app = express()

app.use(httpLogger)

require('../config/database/mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(require('./utils/middleware/securityHeaders')())

// register modules
app.use(routes)

module.exports = app

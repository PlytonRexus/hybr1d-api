const { env } = require("../../src/utils/helpers")

const API_URL = env('API_V1_URL', 'api')
const BASE_URL = env('BASE_URL', 'http://localhost:8080')
const COMPLETE_API_URL = BASE_URL + '/' + API_URL

module.exports = {
  API_URL, BASE_URL, COMPLETE_API_URL
}

const setSecurityHeaders = function (opts) {
  return (require('helmet')(opts || { contentSecurityPolicy: false }))
}

module.exports = setSecurityHeaders

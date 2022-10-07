const BaseExceptionHandler = require("./BaseExceptionHandler")

class BaseResponse {
  constructor (resource, status = 200, options = { queryTime: undefined }) {
    this.resource = resource
    this.queryTime = options.queryTime
    this.status = status
  }

  get postResponse () {
    return {
      entity: this.resource,
      status: this.status
    }
  }

  get getAllResponse () {
    return {
      _total: this.resource.length,
      _queryTime: this.queryTime,
      records: this.resource
    }
  }

  get getOneResponse () {
    return {
      entity: this.resource,
      status: this.status
    }
  }

  get patchResponse () {
    return {
      entity: this.resource,
      status: this.status
    }
  }

  get deleteResponse () {
    return {
      success: true,
      deleted: this.resource
    }
  }

  static sendError(err, res) {
    err = BaseExceptionHandler(err)
    res.status(err.code).json(err)
  }

  sendResponse(res, payload) {
    res = res || this.res
    res.status(this.status).json(payload)
  }
}

module.exports = BaseResponse

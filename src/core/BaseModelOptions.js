class BaseModelOptions {
  constructor () {
    this.schemaOptions = {
      id: false,
      timestamps: true
    }

    this.safeDeleteOptions = {
      overrideMethods: true,
      deletedBy: true,
      deletedAt: true
    }
  }
}

module.exports = BaseModelOptions

const debug = require('debug')('app:utils:content')

module.exports = {

  timeToTime: (num, a, b) => {
    num = parseInt(num, 10)
    switch (a) {
      case 'hours':
        num *= 3600
        break
      case 'minutes':
        num *= 60
        break
      case 'days':
        num *= 3600 * 24
        break
      case 'weeks':
        num *= 3600 * 24 * 7
        break
    }
    switch (b) {
      case 'hours':
        num /= 3600
        break
      case 'minutes':
        num /= 60
        break
      case 'days':
        num /= 3600 * 24
        break
      case 'weeks':
        num /= 3600 * 24 * 7
        break
    }

    return num
  },

  // date and time manipulation, this will take maybe 3-4 functions
  // - getMonthYearDateDay

  /**
   * For generating delays using promises
   *
   * @param {number} ms time in milliseconds
   * @returns {Promise<void>}
   */
  delay: function (ms) {
    debug('Waiting ' + ms / 1000 + ' seconds.')
    return new Promise((resolve) => setTimeout(resolve, ms))
  },

  /**
   * Converts a binary string to base64 string
   * Equivalent to btoa()
   *
   * @param {string} binaryString
   * @returns {string} Base64 string
   */
  toBase64: function (binaryString) {
    const buff = Buffer.from(binaryString)
    return buff.toString('base64')
  },

  /**
   * Converts a base64 string to binary string
   * Equivalent to atob()
   *
   * @param {string} base64String
   * @returns {string} Binary string
   */
  toBinary: function (base64String) {
    const buff = Buffer.from(base64String, 'base64')
    return buff.toString('ascii')
  },

  /**
   * Validates supplied imaged buffer by resizing image to
   * 500px * 500px. This function uses Sharp Module for validation.
   *
   * @param {Buffer} original Image buffer
   * @param {string} mimetype "image/png", "image/jpg", "image/tiff", "image/bmp"
   * @returns {Buffer} Compressed buffer of supplied image buffer.
   */
  compressImageBuffer: async (original, mimetype) => {
    const sharp = require('sharp')
    let buffer = original
    const allowed = ['image/png', 'image/jpg', 'image/tiff']
    const idx = allowed.findIndex(v => v === mimetype)

    if (idx !== -1) {
      buffer = await sharp(original)
        .resize({
          width: 500,
          height: 500
        })[allowed[idx].split('/')[1]]()
        .toBuffer()
    }

    return buffer
  }

  // URL encoding

  // XSS safety tools

  // trimming and stuff
}

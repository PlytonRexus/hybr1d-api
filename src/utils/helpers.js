/**
 * Gets the value of an environment variable.
 *
 * @param {string} key - Environment variable key
 * @param {string|number|boolean} defaultValue - Value will be used if no environment
 * variable exists for the given key
 * @returns {string|number|boolean} The environment variable value
 */
exports.env = (key, defaultValue = null) => {
  const value = process.env[key]

  if (value === 'true') return true
  if (value === 'false') return false
  if (value === '(empty)') return ''
  if ( !!parseInt(value) ) return parseInt(value)
  if ( !!parseFloat(value) ) return parseFloat(value)
  return value || defaultValue
}

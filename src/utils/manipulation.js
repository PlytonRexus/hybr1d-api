const propsMissingIn = function (object, requiredProps = []) {
  let cnt = 0
  requiredProps.forEach(p => {
    if (propExists(p, object)) { cnt++ }
  })
  return cnt === requiredProps.length
}

const propExists = function (key, object) {
  return object && (object[key] !== null && object[key] !== undefined && !isNaN(object[key]))
}

const isValidValue = function (val, valid = []) {
  return valid.includes(val)
}

module.exports = {
  propsMissingIn,
  propExists,
  isValidValue
}

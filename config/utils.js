const path = require('path')

const resolve = relativePath => {
  return path.join(__dirname, '../', relativePath)
}

module.exports = {
  resolve
}

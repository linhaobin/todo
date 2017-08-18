const path = require('path')

const resolve = relativePath => path.join(__dirname, '../', relativePath)

module.exports = {
  resolve
}

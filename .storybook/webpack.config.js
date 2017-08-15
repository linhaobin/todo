const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}

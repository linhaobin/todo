const path = require('path')

// const webpackConfig = require('../config/webpack/webpack.config.dev')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
}

const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('../config/webpack/base')

const myBaseConfig = Object.assign({}, baseConfig)
delete myBaseConfig.resolve

module.exports = merge({}, myBaseConfig, {
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  }
})

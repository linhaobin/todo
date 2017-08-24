const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./base')
const paths = require('../paths')

const nodeModules = {}
fs
  .readdirSync('node_modules')
  .filter(x => {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(mod => {
    nodeModules[mod] = 'commonjs ' + mod
  })

const config = merge({}, baseConfig, {
  name: 'server',
  externals: nodeModules,
  target: 'node',

  entry: {
    server: ['./src/server/index.tsx']
  },

  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.dist,
    filename: '[name].js',
    publicPath: paths.publicPath,
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'awesome-typescript-loader' }],
        exclude: /node_modules/,
      }
    ]
  },

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(false),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})

module.exports = config

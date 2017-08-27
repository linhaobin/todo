const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./base')
const paths = require('../paths')

module.exports = merge(
  baseConfig.getConfig({
    isClient: false,
    isDev: true
  }),
  {
    name: 'server',

    target: 'node',

    externals: [
      './assets.json',
      nodeExternals({
        whitelist: [baseConfig.styleTest, baseConfig.imageTest],
      }),
    ],

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

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
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
      new webpack.NamedModulesPlugin()
    ]
  }
)

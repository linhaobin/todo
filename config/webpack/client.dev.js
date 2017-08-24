const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

const baseConfig = require('./base')
const paths = require('../paths')
const utils = require('../utils')

const publicPath = '/'

module.exports = merge({}, baseConfig, {
  name: 'client',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      paths.appJs
    ]
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.dist,
    filename: '[name].js',
    publicPath: paths.publicPath,
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'awesome-typescript-loader' }
        ]
      }
    ]
  },
  plugins: [
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),

    // new ManifestPlugin({
    //   fileName: '../manifest.json'
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

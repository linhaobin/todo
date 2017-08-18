const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

const baseConfig = require('./base')
const paths = require('../paths')
const utils = require('../utils')

const publicPath = '/'

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      baseConfig.entry.app
    ]
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.dist,
    filename: '[name].js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // { loader: 'react-hot-loader/webpack' },
          { loader: 'awesome-typescript-loader' }
        ]
      }
    ]
  },
  plugins: [
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),

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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FriendlyErrorsPlugin()
  ]
})

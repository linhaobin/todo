const path = require('path')
const webpack = require('webpack')
// const ManifestPlugin = require('webpack-manifest-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const paths = require('../paths')
const utils = require('../utils')

const publicPath = '/'

module.exports = {
  entry: {
    app: paths.appJs
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [utils.resolve('src'), utils.resolve('node_modules')]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
      },
      // TODO
      // {
      //   test: /\.tsx?$/,
      //   loader: 'awesome-typescript-loader'
      // },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
}

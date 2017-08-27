const path = require('path')
const webpack = require('webpack')
// const ManifestPlugin = require('webpack-manifest-plugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const resolve = require('../utils/resolve')

const styleTest = /\.css$/
const imageTest = /\.(png|jpe?g|gif|svg)(\?.*)?$/

function getConfig(options) {
  options = Object.assign({}, options)

  const { isClient, isDev } = options

  return {
    context: resolve('.'),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [resolve('src'), resolve('node_modules')]
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'tslint-loader'
        },
        (() => {
          const loaders = []

          // 浏览器端，dev模式下
          if (isClient && isDev) {
            loaders.push({ loader: 'react-hot-loader/webpack' })
          }
          loaders.push({ loader: 'awesome-typescript-loader' })

          return {
            test: /\.tsx?$/,
            use: loaders
          }
        })(),
        {
          test: styleTest,
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
          test: imageTest,
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
      new CheckerPlugin(),
      // new ManifestPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
}

module.exports = {
  styleTest,
  imageTest,
  getConfig
}

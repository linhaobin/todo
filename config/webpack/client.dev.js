const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

const baseConfig = require('./base')
const paths = require('../paths')
const resolve = require('../utils/resolve')

module.exports = merge(
  baseConfig.getConfig({
    isClient: true,
    isDev: true
  }),
  {
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

      // Emit a file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new AssetsPlugin({
        path: resolve('dist'),
        filename: 'assets.json',
        prettyPrint: true
      }),

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsPlugin()
    ]
  }
)

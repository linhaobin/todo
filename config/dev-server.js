
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack/client.dev')
const paths = require('./paths')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || 3000

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {})
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/public', express.static(paths.public))

const uri = 'http://localhost:' + port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

const server = app.listen(port)

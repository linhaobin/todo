import * as path from 'path'
import * as express from 'express'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as favicon from 'serve-favicon'
import * as React from 'react'
import * as webpack from 'webpack'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-dev-middleware'

import * as webpackConfig from '../../config/webpack/client.dev'
import Html from './Html'
import App from '../app/containers/App'

const app = express()

// export default function(parameters: {}) {
// console.log(parameters)
// Using helmet to secure Express with various HTTP headers
app.use(helmet())
// Compress all requests
app.use(compression())

app.use(favicon(path.join(process.cwd(), './public/favicon.ico')))
app.use(express.static(path.join(process.cwd(), './build/public')))

// Run express as webpack dev server
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
  // noInfo: true,
  // stats: 'errors-only'
})

const hotMiddleware = webpackHotMiddleware(compiler)

app.use(devMiddleware)
app.use(hotMiddleware)

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const renderHtml = (htmlContent: string = '') => {
    const html = renderToStaticMarkup(
      <Html htmlContent={htmlContent} manifest={[]} />
    )

    return `<!doctype html>${html}`
  }

  // Send response after all the action(s) are dispathed
  try {
    // Setup React-Router server-side rendering
    const routerContext: { url?: string; status?: string } = {}
    const htmlContent = renderToString(
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    )

    // Check if the render result contains a redirect, if so we need to set
    // the specific status and redirect header and end the response
    if (routerContext.url) {
      res.status(301).setHeader('Location', routerContext.url)
      res.end()

      return
    }

    // Checking is page is 404
    const status = routerContext.status === '404' ? 404 : 200

    // Pass the route and initial state into html template
    res.status(status).send(renderHtml(htmlContent))
  } catch (err) {
    res.status(404).send('Not Found :(')

    console.error(`==> 😭  Rendering routes error: ${err}`)
  }
})

app.listen(3000)
// }

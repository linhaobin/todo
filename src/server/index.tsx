import * as express from 'express'
import * as helmet from 'helmet'
import * as React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Route, StaticRouter } from 'react-router-dom'

import Html from './Html'
import App from '../app/containers/App'

interface MyApp extends express.Express {
  hot?: __WebpackModuleApi.Hot
}

const app: MyApp = express()

// Using helmet to secure Express with various HTTP headers
app.use(helmet())

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
        <Route path="/" component={App} />
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

app.use(
  ((err: { status: number }, req, res, next) => {
    console.error(err)

    const status = err.status || 500
    res.status(status)
    res.send(`<!doctype html>${status}`)
  }) as express.ErrorRequestHandler
)

// 不清楚什么用的
// Launch the server
// -----------------------------------------------------------------------------
// const promise = models.sync().catch(err => console.error(err.stack))
// if (!module.hot) {
//   promise.then(() => {
//     app.listen(3000, () => {
//       console.info(`The server is running at http://localhost:${3000}/`)
//     })
//   })
// }

//
// Hot Module Replacement
// -----------------------------------------------------------------------------

if (module.hot) {
  app.hot = module.hot
  // module.hot.accept('../app/containers/App')
}

export default app

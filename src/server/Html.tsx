import * as React from 'react'
import Helmet from 'react-helmet'

type Props = {
  htmlContent: string
  manifest: string[]
}

export default class Html extends React.Component<Props, {}> {
  render() {
    const { htmlContent } = this.props
    // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
    const head = Helmet.renderStatic()
    const attrs = head.htmlAttributes.toComponent()
    const { lang = 'en', ...rest } = attrs || {}
    return (
      <html {...rest} lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          {head.title.toComponent()}
          {head.base.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div
            id="root"
            // Rendering the route, which passed from server-side
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <script
            // Store the initial state into window
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__=${JSON.stringify('')};`
            }}
          />
          {head.script.toComponent()}

          {['/app.js'].map((src: string, i: number) =>
            <script src={src} key={i} />
          )}
        </body>
      </html>
    )
  }

  // private resolve(files: string[]) {
  //   return files
  //     .map(src => {
  //       if (!this.props.manifest[src]) {
  //         return
  //       }
  //       return '/public/' + this.props.manifest[src]
  //     })
  //     .filter(file => file !== undefined)
  // }
}

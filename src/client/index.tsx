import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
// import './index.css'

import App from '../app/containers/App'

const rootNode = document.getElementById('root')

const renderApp = () => {
  // TODO
  // const App = (require('../app/containers/App') as {default: React.Component}).default

  render(
    <AppContainer>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </AppContainer>,
    rootNode
  )
}

renderApp()

// Enable hot reload by react-hot-loader
if (module.hot) {
  module.hot.accept('../app/containers/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      // unmountComponentAtNode(mountNode)
      renderApp()
    })
  })
}

registerServiceWorker()

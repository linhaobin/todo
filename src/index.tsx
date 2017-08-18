import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// const rootEl = document.getElementById('root')
// ReactDOM.render(
//   <AppContainer>
//     <App />
//   </AppContainer>,
//   rootEl
// )

registerServiceWorker()

const render = (Component: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

module.hot.accept('./App', () => {
  const NextApp = require<{ default: typeof App }>('./App').default
  render(NextApp)
})

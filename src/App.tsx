import * as React from 'react'
import './App.css'
import { Helmet } from 'react-helmet'

const logo = require('./logo.svg')

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>使用 reafct-helmet 修改 title</title>
        </Helmet>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App

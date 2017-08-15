import * as React from 'react'
// style
import './App.css'
// components
import { Helmet } from 'react-helmet'
import Hello from './components/hello/Hello'
import Time from './components/time/Time'

const logo = require('./logo.svg')

class App extends React.PureComponent {
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
        <Hello name="HBin" />
        <Hello
          name="HBin"
          enthusiasmLevel={Math.floor(Math.random() * 10) + 1}
        />

        <Time />

        {Array.from({ length: 10 }).map((_, i) =>
          <Time key={i} time={Math.floor(Math.random() * 100) + 1} />
        )}
      </div>
    )
  }
}

export default App

import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// style
import './App.css'
// components
import { Helmet } from 'react-helmet'
import Home from './containers/home/Home'
import About from './containers/about/About'

const logo = require('./logo.svg')

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Helmet>
            <title>TODO</title>
          </Helmet>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App

import * as React from 'react'
import { Helmet } from 'react-helmet'

export default class About extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>About</title>
        </Helmet>

        <h1>About</h1>
      </div>
    )
  }
}

import * as React from 'react'
import { Helmet } from 'react-helmet'

import Hello from '../../components/hello/Hello'
import Time from '../../components/time/Time'

export default class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <h1>Home</h1>

        <Hello name="HBin" />
        <Hello name="HBin" enthusiasmLevel={Math.floor(10) + 1} />

        <Time />

        {Array.from({ length: 10 }).map((_, i) =>
          <Time key={i} time={Math.floor(i) + 1} />
        )}
      </div>
    )
  }
}

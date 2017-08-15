import * as React from 'react'

export interface Props {
  time?: number
}

export interface State {
  time: number
}

export default class Time extends React.Component<Props, State> {
  intervalId: number

  constructor(props: Props) {
    super(props)

    this.state = {
      time: props.time || 0
    }
  }

  render() {
    const { time } = this.state
    return (
      <h1>
        time: {time}
      </h1>
    )
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
}

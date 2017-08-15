import * as React from 'react'

export interface Props {
  time?: number
  onChange?: (time: number) => void
}

export interface State {
  time: number
}

export default class Time extends React.Component<Props, State> {
  static defaultProps = {
    time: 0
  }

  intervalId: number

  constructor(props: Props) {
    super(props)

    this.state = {
      time: props.time || Time.defaultProps.time
    }

    this.reset = this.reset.bind(this)
  }

  start() {
    this.intervalId = window.setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      }))
    }, 1000)
  }

  stop() {
    this.intervalId && clearInterval(this.intervalId)
  }

  reset() {
    this.stop()
    this.setState(() => ({
      time: 0
    }))
    this.start()
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.time !== this.state.time) {
      this.props.onChange && this.props.onChange(this.state.time)
    }
  }

  render() {
    const { time } = this.state

    return (
      <h1 onClick={this.reset}>
        time: {time}
      </h1>
    )
  }
}

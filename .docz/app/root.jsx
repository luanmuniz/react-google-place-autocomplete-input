import React from 'react'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'

const socket = new WebSocket(`ws://0.0.0.0:8089`)

class Root extends React.Component {
  state = {
    config: {},
    entries: {},
  }

  async componentDidMount() {
    socket.onmessage = ev => {
      const message = JSON.parse(ev.data)

      if (message.type === 'docz.entries') {
        this.setState({ entries: message.data })
      }

      if (message.type === 'docz.config') {
        this.setState({ config: message.data })
      }
    }
  }

  render() {
    const { imports } = this.props
    return <Theme {...this.state} imports={imports} />
  }
}

export default hot(module)(Root)

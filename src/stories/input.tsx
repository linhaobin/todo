import * as React from 'react'
import * as reactMixin from 'react-mixin'
import * as LinkedStateMixin from 'react-addons-linked-state-mixin'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

storiesOf('Input', module)
  .add('普通', () => {
    class InputTest extends React.PureComponent<{}, { msg: string }> {
      state = { msg: '' }

      onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          msg: e.target.value
        })
      }

      render() {
        const { msg } = this.state
        return (
          <div>
            <div>
              <input value={msg} onChange={this.onChange} />
            </div>
            msg: {msg}
          </div>
        )
      }
    }
    return <InputTest />
  })
  .add('linkedState', () => {
    @reactMixin.decorate(LinkedStateMixin)
    class TestLinkedState extends React.PureComponent<{}, { msg: string }>
      implements LinkedStateMixin {
      linkState: <T>(key: string) => LinkedStateMixin.ReactLink<T>

      state = { msg: '' }

      render() {
        const { msg } = this.state
        return (
          <div>
            <div>
              <input valueLink={this.linkState('msg')} />
            </div>
            msg: {msg}
          </div>
        )
      }
    }
    return <TestLinkedState />
  })

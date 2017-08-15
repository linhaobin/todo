import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Time from './Time'

storiesOf('Time', module)
  .add('默认', () => <Time />)
  .add('设置time = 10', () => <Time time={10} />)
  .add('onChange事件', () => {
    return <Time time={8} onChange={action('onChange')} />
  })

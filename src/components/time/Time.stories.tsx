import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Time from './Time'

interface ConosleTs {
  (): void
  ts: number
}
const conosleTs: ConosleTs = (() => {
  const prevTs = conosleTs.ts || +new Date()
  conosleTs.ts = +new Date()
  action(`ms`)(conosleTs.ts - prevTs)
}) as ConosleTs

storiesOf('Time', module)
  .add('默认', () => <Time />)
  .add('设置time = 10', () => <Time time={10} />)
  .add('onChange事件', () => {
    return <Time time={8} onChange={action('onChange')} />
  })
  .add('循环输出1000个', () => {
    const count = 1000
    return (
      <div>
        <Time onChange={conosleTs} />
        {Array.from({ length: count }).map((_, index) =>
          <Time key={index} time={count - index} />
        )}
      </div>
    )
  })

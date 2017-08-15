import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Hello from './Hello'

storiesOf('Hello', module)
  .add('name', () => <Hello name="HBin" />)
  .add('enthusiasmLevel = 8', () => <Hello name="HBin" enthusiasmLevel={8} />)

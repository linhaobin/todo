import { configure } from '@storybook/react'

const req = require.context('../src/components', true, /\.stories\.tsx?$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
  
  require('../src/stories/button.tsx')
}

configure(loadStories, module)

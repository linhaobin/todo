import { configure } from '@storybook/react'

const componentsReq = require.context('../src/components', true, /\.stories\.tsx?$/)
const storiesReq = require.context('../src/stories', true, /\.tsx?$/)

function loadStories() {
  componentsReq.keys().forEach((filename) => componentsReq(filename))
  
  storiesReq.keys().forEach((filename) => storiesReq(filename))
}

configure(loadStories, module)

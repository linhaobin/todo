process.env.NODE_ENV = 'development'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')

const clientWebpackConfig = require('../config/webpack/client.dev')
const paths = require('../config/paths.js')

async function start() {
  const spinner = ora('building for dev...')
  spinner.start()

  const rmErr = await new Promise(r => rm(paths.dist, r))
  if (rmErr) throw rmErr

  const { err, stats } = await new Promise(r =>
    webpack(clientWebpackConfig, (err, stats) => r({ err, stats }))
  )

  spinner.stop()
  if (err) throw err

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )

  // console.log(chalk.cyan('  Build complete.\n'))
  console.log(2)

  await new Promise(r => {
    setTimeout(r, 50000)
  })

  console.log(1)
}

start()

const path = require('path')
const fs = require('fs')
// const url = require('url')
const utils = require('./utils')

module.exports = {
  dist: utils.resolve('dist'),
  appJs: utils.resolve('src/client/index.tsx'),
  appHtml: utils.resolve('public/index.html'),
  // public: './public',
  publicPath: '/',
  // appBuild: resolveApp('build'),
  // appPublic: resolveApp('public'),
  // appIndexJs: resolveApp('src/index.tsx'),
  // appPackageJson: resolveApp('package.json'),
  // appSrc: resolveApp('src'),
  // yarnLockFile: resolveApp('yarn.lock'),
  // testsSetup: resolveApp('src/setupTests.ts'),
  // appNodeModules: resolveApp('node_modules'),
  // appTsConfig: resolveApp('tsconfig.json'),
  // publicUrl: getPublicUrl(resolveApp('package.json')),
  // servedPath: getServedPath(resolveApp('package.json'))
}

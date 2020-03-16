const tsconfig = require('./tsconfig')
const pkg = require('./package')
const baseConfig = require('@qdev/utils-ts/jest.config.base')

module.exports = {
  ...baseConfig(tsconfig, pkg),
}

const tsconfig = require('./../tsconfig')
const baseConfig = require('@qdev/utils-ts/jest.config.base')

module.exports = {
  ...baseConfig(tsconfig),
  testRegex: 'test/e2e/.*.spec.ts$'
}

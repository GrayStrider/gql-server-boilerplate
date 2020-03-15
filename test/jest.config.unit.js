const tsconfig = require('./../tsconfig')
const baseConfig = require('@qdev/utils-ts/jest.config.base')

module.exports = {
	...baseConfig(tsconfig),
	testRegex: 'test/unit/.*.spec.ts$'
}

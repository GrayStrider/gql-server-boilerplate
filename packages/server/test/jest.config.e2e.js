const tsconfig = require('./../tsconfig')
const baseConfig = require('./../../../jest.config.base')

module.exports = {
	...baseConfig(tsconfig),
	testRegex: 'test/e2e/.*.spec.ts$'
}

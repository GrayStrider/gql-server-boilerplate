const tsconfig = require('./tsconfig')
const baseConfig = require('./../../jest.config.base')

module.exports = {
	...baseConfig(tsconfig)
}

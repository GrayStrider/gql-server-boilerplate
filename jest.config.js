const tsconfig = require('./tsconfig')
const {name} = require('./package')
const baseConfig = require('./../../jest.config.base')

module.exports = {
	...baseConfig(tsconfig),
	displayName: name
}

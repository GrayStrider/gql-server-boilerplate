const base = require('packages/server/jest.config')

module.exports = {
	...base,
	testRegex: 'test/unit/.*.spec.ts$'
}

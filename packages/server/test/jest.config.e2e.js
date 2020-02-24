const base = require('packages/server/jest.config')

module.exports = {
	...base,
	testRegex: 'test/e2e/.*.spec.ts$'
}

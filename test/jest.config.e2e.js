const base = require('jest.config')

module.exports = {
	...base,
	testRegex: 'test/e2e/.*.spec.ts$'
}

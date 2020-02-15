const base = require('./jest.config.js')

module.exports = {
	...base,
	testRegex: 'test/e2e/.*.spec.ts$'
}

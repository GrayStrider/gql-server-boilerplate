const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig')
const baseConfig = require('/jest.config.base')

module.exports = {
	...baseConfig,
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths, {prefix: '<rootDir>/'}),
	collectCoverageFrom: [
		'src/**/*.ts'
	],

	coveragePathIgnorePatterns: [
		'src/.*/entity',
		'src/graphql/generated'
	],
	coverageDirectory: '<rootDir>/test/coverage/'
}

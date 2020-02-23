const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
	preset: 'ts-jest',

	globals: {
		'ts-jest': {
			diagnostics: false
		}
	},

	testEnvironment: 'node',
	moduleDirectories: [
		'node_modules',
		'src'
	],
	moduleFileExtensions: [
		'ts', 'tsx', 'js', 'jsx'
	],
	setupFilesAfterEnv: [
		'jest-expect-message',
		'<rootDir>/src/utils/testing/customMatchers.ts'
	],
	testRegex: 'test/.*.spec.ts$',
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

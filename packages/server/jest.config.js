const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig')

module.exports = {
	// preset: 'ts-jest',
	"transform": {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	globals: {
		'ts-jest': {
			diagnostics: false,
			tsConfig: "tsconfig.json"
		}
	},

	testEnvironment: 'node',
	moduleDirectories: [
		'node_modules',
		'src'
	],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx'
	],
	setupFilesAfterEnv: [
		'jest-expect-message',
		// '<rootDir>/shared-TS/utils/testing/customMatchers.ts'
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

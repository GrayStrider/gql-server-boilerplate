const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
	'preset': 'ts-jest',

	'globals': {
		'ts-jest': {
			'diagnostics': false
		}
	},

	'testEnvironment': 'node',
	'moduleDirectories': [
		'node_modules',
		'src'
	],
	'moduleFileExtensions': [
		'ts',
		'tsx',
		'js',
		'jsx'
	],
	'snapshotResolver': '<rootDir>/config/snapshotResolver.js',
	'testRegex': '.spec.ts$',
	'moduleNameMapper': pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}  ),
	'collectCoverageFrom': [
		'src/**/*.{ts,js}',
		'!**/node_modules/**',
		'test/**/*.{ts,js}'
	],

	'coveragePathIgnorePatterns': [
		'src/.*/entity',
		'src/index.ts',
		'src/graphql/generated'
	],
	'coverageDirectory': '<rootDir>/test/coverage/'
}

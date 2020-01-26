const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

module.exports = {
	'preset': 'ts-jest',
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
	'testRegex': '.spec.ts$',
	'moduleNameMapper': pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}  ),
	'collectCoverageFrom': [
		'src/**/*.{ts,js}',
		'!**/node_modules/**',
		'test/**/*.{ts,js}'
	],

	'coveragePathIgnorePatterns': [
		'src/.*/entity',
		'src/index.ts'
	],
	'coverageDirectory': '<rootDir>/test/coverage/'
}

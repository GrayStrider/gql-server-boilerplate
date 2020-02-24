const {pathsToModuleNameMapper} = require('ts-jest/utils')

module.exports = ({compierOptions: {paths}}) => ({
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			diagnostics: false,
			tsConfig: "packages/server/tsconfig.json"
		}
	},
	moduleNameMapper: pathsToModuleNameMapper(
		paths, {prefix: '<rootDir>/'}),
	testEnvironment: 'node',
	moduleDirectories: [
		'node_modules',
		'src'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: [
		'jest-expect-message',
		// '<rootDir>/shared-TS/utils/testing/customMatchers.ts'
	],
	testRegex: 'test/.*.spec.ts$',
	collectCoverageFrom: [
		'src/**/*.ts'
	],

	coveragePathIgnorePatterns: [
		'src/.*/entity',
		'src/graphql/generated'
	],
	coverageDirectory: '<rootDir>/test/coverage/'
})

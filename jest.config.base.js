module.exports = () => ({
	// preset: 'ts-jest',

	"transform": {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	globals: {
		'ts-jest': {
			diagnostics: false,
			tsConfig: "packages/server/tsconfig.json"
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
	collectCoverageFrom: [
		'src/**/*.ts'
	],

	coveragePathIgnorePatterns: [
		'src/.*/entity',
		'src/graphql/generated'
	],
	coverageDirectory: '<rootDir>/test/coverage/'
})

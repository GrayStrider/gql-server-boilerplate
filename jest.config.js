module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',

  "moduleDirectories": ["node_modules", "<rootDir>"],

  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],

  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },

  // roots: [
  //   'src',
  // ],

  "moduleNameMapper": {
    "src/(.*)": "<rootDir>/src/$1",
    "config/(.*)": "<rootDir>/config/$1"
  }

  // collectCoverageFrom: [
  //   '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
  // ]

};

module.exports = {
  testEnvironment: 'node',

  "moduleDirectories": ["node_modules", "src"],

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

  "moduleNameMapper": {
    "^src/(.*)": "<rootDir>/src/$1",
    "^config/(.*)": "<rootDir>/config/$1",
    "^@/(.*)": "<rootDir>/src/$1",

  }

};

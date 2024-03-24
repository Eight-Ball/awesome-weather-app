module.exports = {
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  roots: ['<rootDir>/src/ts/'],
  moduleFileExtensions: ['js', 'ts', 'mjs', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/*.test.ts'
  ],
  collectCoverageFrom: ['**/*.{ts,vue}', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/tmp/tests/jest/',
  coverageReporters: ['text', 'lcovonly'],
}

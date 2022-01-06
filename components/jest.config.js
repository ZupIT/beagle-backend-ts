module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec).ts',
  ],
  moduleNameMapper: {
    '^@zup-it/beagle-backend-core$': '<rootDir>../core/src',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/__tests__/$1',
  },
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      tsconfig: '__tests__/tsconfig.json',
    },
  },
  coverageDirectory: './test-reports/coverage',
  coverageReporters: ['lcov', 'text-summary'],
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './test-reports/result', filename: 'index.html' }],
  ],
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec).ts',
  ],
  moduleNameMapper: {
    '^@zup-it/beagle-backend-core$': '<rootDir>../core/src',
    '^@zup-it/beagle-backend-core/(.*)$': '<rootDir>../core/src/$1',
    '^@zup-it/beagle-backend-components$': '<rootDir>../components/src',
    '^@zup-it/beagle-backend-components/(.*)$': '<rootDir>../components/src/$1',
    '^@zup-it/beagle-backend-express$': '<rootDir>../express-client/src',
    '^@zup-it/beagle-backend-express/(.*)$': '<rootDir>../express-client/src/$1',
  },
}

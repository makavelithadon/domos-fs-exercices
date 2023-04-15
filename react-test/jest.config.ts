/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock',
    '\\.(scss|css)$': '<rootDir>/__mocks__/styleMock',
    '@assets/?(.*)': '<rootDir>/assets/$1',
    '@components/?(.*)': '<rootDir>/src/components/$1',
    '@hooks/?(.*)': '<rootDir>/src/hooks/$1',
    '@mocks/?(.*)': '<rootDir>/src/mocks/$1',
    '@helpers/?(.*)': '<rootDir>/src/helpers/$1',
  },
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*', '!<rootDir>/src/vite-env.d.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/src/main.tsx', '<rootDir>/src/mocks/*'],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // Le timeout par défaut est 5000, on l'a changé pour avoir de la marge
  testTimeout: 20000,
};

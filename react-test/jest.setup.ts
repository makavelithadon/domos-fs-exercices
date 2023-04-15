import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock the global.fetch method
fetchMock.enableMocks();

// !!! WARN !!! -> ne pas deplacer cette ligne car les setting des process plus haut
// doivent passer avant
// eslint-disable-next-line import/first
import { server } from './src/mocks/server';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// // Clean up after the tests are finished.
afterAll(() => {
  server.close();
});

// Increase default timeout before test fails to avoid recurrent fails on CI
jest.setTimeout(60000);

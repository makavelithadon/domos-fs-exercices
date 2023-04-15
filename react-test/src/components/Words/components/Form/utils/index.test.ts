import { formatInput, isApiError } from '.';

describe('formatInput', () => {
  test('should return well formatted array of words from whole sentence of words', () => {
    expect(formatInput('Labore et magna elit reprehenderit')).toStrictEqual([
      'Labore',
      'et',
      'magna',
      'elit',
      'reprehenderit',
    ]);
    expect(formatInput('')).toStrictEqual([]);
    expect(formatInput('          ')).toStrictEqual([]);
    expect(formatInput('     0 Hello World     ')).toStrictEqual(['0', 'Hello', 'World']);
  });
});

describe('isApiError', () => {
  test('should return if the provided value is of type ApiError', () => {
    expect(isApiError({ status: 400 })).toBe(true);
    expect(isApiError({ status: 500 })).toBe(true);
    expect(isApiError({ status: 200 })).toBe(false);
    expect(isApiError({ status: 300 })).toBe(false);
  });
});

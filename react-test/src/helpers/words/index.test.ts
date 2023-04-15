import { isValidWord } from '.';

describe('isValidWord', () => {
  test(`should validate passed word
      - when input is defined and be a truthy value
      - and input only contains alphanumeric characters`, () => {
    expect(isValidWord('lorem')).toBe(true);
    expect(isValidWord('ipsum')).toBe(true);
    expect(isValidWord('hello85')).toBe(true);
    expect(isValidWord('')).toBe(false);
    expect(isValidWord('lorem#')).toBe(false);
  });
});

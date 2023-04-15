/**
 *
 * @see https://prettier.io/docs/en/options.html
 * @see https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4
 */

const config = {
  endOfLine: 'lf',
  semi: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  proseWrap: 'preserve',
  // See https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4#strings--quotes
  singleQuote: true,
  // See https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4#whitespace--max-len
  printWidth: 100,
  tabWidth: 2,
};

module.exports = config;

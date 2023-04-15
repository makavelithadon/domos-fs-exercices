module.exports = {
  extends: [
    // /!\ Order matters
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'react', 'react-hooks'],

  ignorePatterns: ['dist', 'build', 'node_modules/'],

  env: {
    browser: true,
    jest: true,
    es6: true,
  },

  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // In strict mode, (almost?) all return types are automatically infered.
    '@typescript-eslint/no-var-requires': 'off', // We need require in order to import image with the Metro bundler. See https://facebook.github.io/react-native/docs/images

    'import/extensions': 'off', // We don't want to specify `.ts` on all imports.
    'import/no-default-export': 'error', // We try to avoid default exports, to improve searchability and refactoring.
    'import/no-extraneous-dependencies': 'off', // Force us to move react-testing-library into the `dependencies` section ?!
    'import/no-unresolved': 'off', // Bug? tsc check it anyway.
    'import/prefer-default-export': 'off', // We like named export as well.

    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off', // Typescript allow to do spreading safely.
    'react/state-in-constructor': 'off', // Can't make this works. "Definition for rule 'react/state-in-constructor' was not found"
    'react/static-property-placement': 'off', // Can't make this works. "Definition for rule 'react/static-property-placement' was not found"
    curly: ['error', 'all'],
    'newline-before-return': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'warn',
      },
    },
  ],
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 'off', // Since we do not use prop-types in ts
    'react/require-default-props': 'off', // Since we do not use prop-types in ts
    'prettier/prettier': 'off',
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

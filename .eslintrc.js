module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['prettier', 'eslint:recommended'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['prettier'],
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'max-len': ['error', 110],
    'no-unused-expressions': 'error',
    'object-curly-spacing': ['error', 'never'],
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    'keyword-spacing': ['error', { before: true }],
    'space-in-parens': ['error', 'never'],
    semi: ['error', 'always'],
    'space-unary-ops': ['error', { nonwords: false }],
  },
};

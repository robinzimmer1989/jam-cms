module.exports = {
  requireConfigFile: false,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb'],
  globals: {
    GATSBY_FIELDS: false,
    GATSBY_TEMPLATE_PATH: false,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/prop-types': 1,
  },
};

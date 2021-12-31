module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    // "eslint:recommended", 개발환경에서 잠시 끕니다.
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react', 'prettier'],
  rules: {
    prettier: 'error',
    // "quotes": ["error", "single"],
    // "indent": ["error", 2],
    indent: 'off',
    // "semi": ["error", "never"],
    'react/prop-types': 'off',
  },
}

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin-react-hook/recomended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import'],
  rules: {
    'react/jsx-runtime': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
        tabWidth: 2,
        semi: true,
        arrowParens: 'always',
        trailingComma: 'all',
      },
    ],
    'import/order': ['warn', { 'newlines-between': 'always' }],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        respectOrder: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blanckLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
  },
};

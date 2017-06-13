module.exports = {
  env: {
    node: true,
    es6: true,
  },
  globals: {
    describe: true,
    it: true
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};

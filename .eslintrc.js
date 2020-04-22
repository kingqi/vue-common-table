module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-prototype-builtins': 'off',
    semi: [2, 'never'],
    'max-len': [
      1,
      {
        code: 120
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  // ćšć±ćé
  globals: {
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    uni: true,
    getApp: true,
    getCurrentPages: true,
  },
}

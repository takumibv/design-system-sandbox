import smarthr from 'eslint-config-smarthr'

export default [
  ...smarthr,
  {
    ignores: ['dist', 'node_modules', 'screenshots'],
  },
]

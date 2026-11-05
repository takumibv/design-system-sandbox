// eslint-plugin-primer-react の recommended は eslintrc 形式（extends と eslint-plugin-github 前提）のため、
// ESLint 9 の flat config では plugin を直接読み込み、recommended のルールを写して使う。
// recommended に入っていないルールのうち、このアプリに関係するものも追加で有効にした。
import tseslint from 'typescript-eslint'
import primerReact from 'eslint-plugin-primer-react'

const recommended = primerReact.configs.recommended.rules

export default [
  { ignores: ['dist', 'node_modules', 'harness', 'screenshots'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    plugins: { 'primer-react': primerReact },
    rules: {
      ...recommended,
      'primer-react/a11y-link-in-text-block': 'error',
      'primer-react/enforce-button-for-link-with-no-href': 'error',
      'primer-react/enforce-css-module-default-import': 'error',
      'primer-react/enforce-css-module-identifier-casing': 'error',
      'primer-react/no-deprecated-entrypoints': 'error',
      'primer-react/no-deprecated-flash': 'error',
      'primer-react/no-wildcard-imports': 'error',
      'primer-react/spread-props-first': 'error',
      'primer-react/use-deprecated-from-deprecated': 'error',
      'primer-react/no-deprecated-octicon': 'error',
    },
  },
]

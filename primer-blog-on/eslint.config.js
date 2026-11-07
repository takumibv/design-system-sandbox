// 公式 lint：eslint-plugin-primer-react の recommended（eslintrc 形式）を ESLint 9 の flat config に移して使う。
// recommended は plugins に 'github' も挙げるが、rules は primer-react/* のみなので primer-react プラグインだけを登録する。
import primerReact from 'eslint-plugin-primer-react'
import tseslint from 'typescript-eslint'

const recommended = primerReact.configs.recommended

export default tseslint.config(
  {ignores: ['dist', 'node_modules', 'harness-logs', 'screenshots']},
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {ecmaFeatures: {jsx: true}, sourceType: 'module'},
    },
    plugins: {'primer-react': primerReact},
    rules: recommended.rules,
    settings: recommended.settings,
  },
)

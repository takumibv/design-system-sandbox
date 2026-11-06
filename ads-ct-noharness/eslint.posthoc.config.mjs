// 事後計測専用の ESLint 設定（docs/post-hoc-lint.md）。実装中は使っていない。
import tseslint from 'typescript-eslint';
import designSystem from '@atlaskit/eslint-plugin-design-system';

export default [
	{ ignores: ['dist/**', 'node_modules/**', 'scripts/**', '*.config.*'] },
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
		},
	},
	designSystem.configs['recommended/flat'],
	{ files: ['src/**/*.{ts,tsx}'] },
];

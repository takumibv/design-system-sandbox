// 事後計測専用の ESLint 設定：eslint-plugin-primer-react の recommended だけ。
// recommended は eslintrc 形式のため FlatCompat で読み込む。TS/TSX の構文解析だけに typescript-eslint のパーサーを使う。
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: here });

export default [
	...compat.extends("plugin:primer-react/recommended"),
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
	},
];

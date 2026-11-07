// 公式 lint：@atlaskit/eslint-plugin-design-system の recommended（flat config）
import tseslint from "typescript-eslint";
import designSystem from "@atlaskit/eslint-plugin-design-system";

export default [
	{ ignores: ["dist", "node_modules", "harness-logs", "screenshots"] },
	{
		files: ["src/**/*.{ts,tsx}"],
		languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
	},
	{ files: ["src/**/*.{ts,tsx}"], ...designSystem.configs["recommended/flat"] },
];

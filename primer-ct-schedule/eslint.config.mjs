// Primer 公式 ESLint プラグイン（eslint-plugin-primer-react）の全ルールで「Primer 準拠度」を計測する
import primerReact from "eslint-plugin-primer-react";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["src/**/*.tsx"],
		languageOptions: { parser: tseslint.parser },
		plugins: { "primer-react": primerReact },
		rules: Object.fromEntries(
			Object.keys(primerReact.rules)
				.filter((name) => !primerReact.rules[name].meta?.deprecated)
				.map((name) => [`primer-react/${name}`, "warn"]),
		),
	},
];

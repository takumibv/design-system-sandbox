// ADS 公式 ESLint プラグインで「ADS 準拠度」を計測する
import designSystem from "@atlaskit/eslint-plugin-design-system";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["src/**/*.tsx"],
		languageOptions: { parser: tseslint.parser },
		plugins: { "@atlaskit/design-system": designSystem },
		rules: Object.fromEntries(
			Object.keys(designSystem.rules)
				.filter((name) => !designSystem.rules[name].meta?.deprecated)
				.map((name) => [`@atlaskit/design-system/${name}`, "warn"]),
		),
	},
];

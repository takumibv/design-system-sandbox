// ADS 公式の lint（llms.txt「Linters and Scanners」の推奨設定）。
// ADS_LINT=all で両プラグインの「全ルール」設定に切り替える（調査用。harness-logs/lint/ に結果を保存）。
import designSystem from "@atlaskit/eslint-plugin-design-system";
import uiStyling from "@atlaskit/eslint-plugin-ui-styling-standard";
import tseslint from "typescript-eslint";

const all = process.env.ADS_LINT === "all";
const ds = all ? designSystem.configs["all/flat"] : designSystem.configs["recommended/flat"];
const us = all ? uiStyling.configs["flat/all"] : uiStyling.configs["flat/recommended"];

export default [
	{ ignores: ["dist", "node_modules", "tools", "scripts", "harness-logs", "screenshots"] },
	{
		files: ["src/**/*.{ts,tsx}"],
		languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
	},
	// 2 つの公式 flat 設定をそのまま並べると「Cannot redefine plugin "@atlaskit/design-system"」になる
	// （ui-styling-standard の設定が design-system プラグインも別オブジェクトとして登録するため）。1 つにまとめる。
	{
		files: ["src/**/*.{ts,tsx}"],
		plugins: { ...ds.plugins, ...us.plugins, "@atlaskit/design-system": designSystem },
		// all/flat に含まれる "@atlaskit/design-system/ensure-design-token-usage/preview" は、名前に "/" が多く
		// flat config ではプラグイン名と解釈されて起動できない（公式設定の不具合）。preview 版だけ外す。
		rules: Object.fromEntries(Object.entries({ ...ds.rules, ...us.rules }).filter(([name]) => name.split("/").length <= 3)),
	},
	// react-hooks プラグインは入れていないため、そのルール名を含む disable コメントを無視させる
	{ linterOptions: { reportUnusedDisableDirectives: "off" } },
];

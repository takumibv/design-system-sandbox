// SmartHR 公式の共有設定 eslint-config-smarthr（eslint-plugin-smarthr の推奨ルールを含む）で
// 「SmartHR Design System 準拠度」を計測する。
// 注: eslint-plugin-smarthr 単体の "recommended" は全ルールを off にするだけの設定なので使わない。
// LINT_ALL=1 のときは、eslint-plugin-smarthr の全ルールを warn にした補助計測を行う。
import smarthr from "eslint-config-smarthr";
import smarthrPlugin from "eslint-plugin-smarthr";

const all = process.env.LINT_ALL === "1";

export default [
	{ ignores: ["dist", "node_modules", "scripts", "*.config.*"] },
	...smarthr,
	{
		settings: { react: { version: "19" } },
	},
	...(all
		? [
				{
					files: ["src/**/*.tsx", "src/**/*.ts"],
					rules: Object.fromEntries(
						Object.keys(smarthrPlugin.rules)
							// format-translate-component はプロジェクト固有の options（componentPath）が必須で、指定しないと起動しない
							.filter((name) => name !== "format-translate-component")
							.map((name) => [`smarthr/${name}`, "warn"]),
					),
				},
			]
		: []),
];

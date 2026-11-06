import babel from "@rolldown/plugin-babel";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// @atlaskit/css の cssMap()/xcss は Compiled のビルド時変換が必要（llms-styling.txt）。
// plugin-react v6 は babel オプションを持たないため @rolldown/plugin-babel 経由で @compiled/babel-plugin を通す。
// @atlaskit/icon/core/* は CJS のみ（__esModule つき）。Vite 8 の新しい CJS 相互運用では
// "type": "module" のパッケージから default import すると module.exports 全体が返り、アイコンが描画できない。
// Vite の移行用オプションで従来の挙動（exports.default を返す）に戻す。
export default defineConfig({
	legacy: { inconsistentCjsInterop: true },
	plugins: [
		babel({
			include: /src\/.*\.tsx?$/,
			plugins: ["@atlaskit/tokens/babel-plugin", ["@compiled/babel-plugin", { importReact: false }]],
		}),
		react(),
	],
});

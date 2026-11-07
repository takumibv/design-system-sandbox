import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compiled } from "@compiled/vite-plugin";

// @atlaskit/css の cssMap を Compiled でビルド時に変換する（ADS の primitives/compiled 用）。
// token() は @atlaskit/tokens の babel プラグインで CSS 変数に置き換えてから Compiled に渡す。
export default defineConfig({
	plugins: [
		compiled({
			importSources: ["@atlaskit/css"],
			importReact: false,
			extract: true,
			transformerBabelPlugins: ["@atlaskit/tokens/babel-plugin"],
		}),
		react(),
	],
	define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development") },
});

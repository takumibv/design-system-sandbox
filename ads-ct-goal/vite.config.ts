import babel from "@rolldown/plugin-babel";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// @atlaskit/css の cssMap()/xcss は Compiled のビルド時変換が必要（llms-styling.txt）。
// plugin-react v6 は babel オプションを持たないため @rolldown/plugin-babel 経由で @compiled/babel-plugin を通す。
export default defineConfig({
	plugins: [
		babel({
			include: /src\/.*\.tsx?$/,
			plugins: ["@atlaskit/tokens/babel-plugin", ["@compiled/babel-plugin", { importReact: false }]],
		}),
		react(),
	],
});

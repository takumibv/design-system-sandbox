import "@atlaskit/css-reset";
import { setGlobalTheme } from "@atlaskit/tokens/set-global-theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// ADS のトークン（CSS 変数）を読み込む。ライトテーマ固定（ダークモードは対象外）
setGlobalTheme({ colorMode: "light" });

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

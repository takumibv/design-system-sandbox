import "@atlaskit/css-reset";
import { setGlobalTheme } from "@atlaskit/tokens/set-global-theme";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// ADS のトークン（CSS 変数）を読み込む。ライトテーマ固定（ダークモードは対象外）
setGlobalTheme({ colorMode: "light" });

// StrictMode は使わない：開発時の effect 二重実行で、初回描画時から開いている ModalDialog と Flag の
// ポータルが空のまま残り表示されなかった（S10・S13・S14 を URL で直接開けない）。本番ビルドには影響しない挙動だが、
// 撮影は開発サーバーで行うため外した。
createRoot(document.getElementById("root")!).render(<App />);

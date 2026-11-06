import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as AntApp, ConfigProvider } from "antd";
import jaJP from "antd/locale/ja_JP";
// antd 同梱のリセット CSS（body の既定余白などを消す）。自前の CSS ではない
import "antd/dist/reset.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={jaJP}
      theme={{
        // 既定の色のままだと WCAG 2.1 AA のコントラスト比（4.5:1）を満たさない箇所が axe で見つかったため、
        // シード色をプリセットパレットの一段濃い色に替える（docs/design-decisions.md §4）
        token: {
          colorPrimary: "#0958d9", // blue-7（既定 #1677ff は白地で 4.1:1）
          colorError: "#cf1322", // red-7（既定 #ff4d4f は白地で 3.3:1）
          colorSuccess: "#237804", // green-8（既定 #52c41a はタグ地で 2.2:1）
          colorWarning: "#874d00", // gold-9（既定 #faad14 はタグ地で 1.8:1、gold-8 でも 4.2:1）
          // 濃いシード色から派生する背景・枠は暗くなりすぎるので、既定パレットの淡い段に戻す
          colorSuccessBg: "#f6ffed", // green-1
          colorSuccessBorder: "#b7eb8f", // green-3
          colorWarningBg: "#fffbe6", // gold-1
          colorWarningBorder: "#ffe58f", // gold-3
          colorErrorBg: "#fff2f0",
          colorErrorBorder: "#ffccc7",
          colorLink: "#0958d9", // リンクも主色にそろえる（既定は白地で 4.1:1）
          colorTextDescription: "rgba(0, 0, 0, 0.65)", // 補足文（既定 0.45 は灰色の地で 3.3:1）
          colorTextTertiary: "rgba(0, 0, 0, 0.65)", // 項目名など（既定 0.45 は白地で 3.4:1）
          colorTextPlaceholder: "rgba(0, 0, 0, 0.55)", // Select の未選択表示（既定 0.25 は 1.8:1）
        },
        components: {
          // 既定のヘッダーは濃紺。ロゴ（濃い色の SVG）を見せるため、明るいヘッダーにする
          Layout: { headerBg: "#ffffff", headerPadding: "0 16px", footerPadding: "0" },
        },
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
);

import "antd/dist/reset.css";
import { App as AntApp, ConfigProvider, Grid, theme } from "antd";
import jaJP from "antd/locale/ja_JP";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { StoreProvider } from "./store";

const base = theme.getDesignToken();

function Themed() {
	const screens = Grid.useBreakpoint();
	return (
		<ConfigProvider
			locale={jaJP}
			theme={{
				// WCAG 2.1 AA（4.5:1）を満たすため、既定パレットの濃い段に寄せる（design.md「colorPrimary を ConfigProvider で濃くする」）
				token: {
					colorPrimary: "#0958d9", // blue-7
					colorError: "#cf1322", // red-7
					colorSuccess: "#237804", // green-8
					colorInfo: "#0958d9", // リンク色（colorLink）はここから派生する
					colorTextDescription: "rgba(0, 0, 0, 0.65)", // = colorTextSecondary
					colorTextTertiary: "rgba(0, 0, 0, 0.65)",
					colorTextPlaceholder: "rgba(0, 0, 0, 0.55)",
				},
				components: {
					// ヘッダーは明るい面（surface）にしてロゴを読みやすく。390px では左右の余白を 16px に
					Layout: { headerBg: base.colorBgContainer, headerPadding: screens.md ? `0 ${base.paddingLG}px` : `0 ${base.padding}px` },
					// 見出しの大きさは Typography の中だけで調整（h1=ページ名、h2=カード名、h3=週・小見出し）。余白は Flex の gap で取る
					Typography: { fontSizeHeading1: 24, fontSizeHeading2: 16, fontSizeHeading3: 14, titleMarginBottom: 0, titleMarginTop: 0 },
				},
			}}
		>
			<AntApp>
				<StoreProvider>
					<App />
				</StoreProvider>
			</AntApp>
		</ConfigProvider>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Themed />
	</StrictMode>,
);

// antd 公式の reset（body の既定余白などを消す）。antd v6 は既定でグローバルリセットを入れないため。
import "antd/dist/reset.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/600.css";
import { App, ConfigProvider, theme } from "antd";
import jaJP from "antd/locale/ja_JP";
import { createRoot } from "react-dom/client";
import { CTApp, type Screen, type State } from "./CTApp";

// テーマの上書きは DESIGN.md の Customization に従い「最小限のシード／エイリアストークン」だけにする。
// 値はすべて Ant Design 自身のスケール・パレットにある値で、独自の色や数値は作らない。
const base = theme.getDesignToken();
const antdTheme = {
	token: {
		// DESIGN.md「白文字 × #1677FF は小さい文字で WCAG AA 未満。厳密に満たすなら colorPrimary を暗くする」に従い、
		// 同じ青のパレットの 7 段目（#0958D9）を主色にする。
		colorPrimary: base.blue7,
		// 同じ理由で、状態色の文字（Tag の status 色・エラー文）が AA を満たすよう、各パレットの濃い段に寄せる。
		// 初回の axe で Tag processing 3.66:1、Tag warning 1.82:1、エラー文 3.26:1 が出たため。
		colorInfo: base.blue7,
		colorWarning: base.gold9,
		// 濃い seed から派生する背景（#EDE8D5）が暗く 3.59:1 になったため、背景は同じパレットの 1 段目に戻す。
		colorWarningBg: base.gold1,
		colorError: base.red7,
		// 補足文の灰色（0.45 の透過黒）は #F5F5F5 上で 3.29:1 となり AA 未満。0.65 の段（colorTextSecondary）にそろえる。
		colorTextTertiary: base.colorTextSecondary,
		colorTextDescription: base.colorTextSecondary,
		// 和文フォントを先頭に足す。原本と同じ Noto Sans JP をローカル配信（DESIGN.md の欧文スタックは残す）。
		fontFamily: `'Noto Sans JP', ${base.fontFamily}`,
	},
	components: {
		// 見出しのレベル（h1〜h3）と大きさを分けるため、既存スケールの段に割り当て直す（30/20/16px）。
		// 最初はグローバルの token に書いたが、Statistic・Result・Modal・Alert なども同じトークンを使っていて
		// 数字が 16px に縮んだ。DESIGN.md の「部品単位で、その部品が使うエイリアストークンを上書きできる」に従い Typography だけに限定した。
		Typography: {
			fontSizeHeading1: base.fontSizeHeading2,
			fontSizeHeading2: base.fontSizeHeading4,
			fontSizeHeading3: base.fontSizeHeading5,
			fontSizeHeading4: base.fontSizeHeading5,
		},
	},
};

// ?screen=members&state=loading&signedIn=0&dialog=1 で各状態を表示する（原本の Story と同じ組み合わせ）
const q = new URLSearchParams(location.search);
createRoot(document.getElementById("root") as HTMLElement).render(
	<ConfigProvider locale={jaJP} theme={antdTheme}>
		<App>
			<CTApp
				initialScreen={(q.get("screen") as Screen) ?? "schedule"}
				initialState={(q.get("state") as State) ?? "ready"}
				signedIn={q.get("signedIn") !== "0"}
				initialDialog={q.get("dialog") === "1"}
			/>
		</App>
	</ConfigProvider>,
);

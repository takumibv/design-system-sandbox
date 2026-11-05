// primer_coding_guidelines / init の指示どおり、テーマ CSS と ThemeProvider + BaseStyles をルートに置く。
// primitives.css はサイズ・余白・文字・z-index などテーマ以外のトークン（init には書かれていないが必要だった）。
import "@primer/primitives/dist/css/primitives.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import { BaseStyles, ThemeProvider } from "@primer/react";
import { createRoot } from "react-dom/client";
import { CTApp, type Screen, type State } from "./CTApp";

// ?screen=members&state=loading&signedIn=0&dialog=1 で各状態を表示する（原本の Story と同じ組み合わせ）
const q = new URLSearchParams(location.search);
createRoot(document.getElementById("root") as HTMLElement).render(
	<ThemeProvider colorMode="day">
		<BaseStyles>
			<CTApp
				initialScreen={(q.get("screen") as Screen) ?? "schedule"}
				initialState={(q.get("state") as State) ?? "ready"}
				signedIn={q.get("signedIn") !== "0"}
				initialDialog={q.get("dialog") === "1"}
			/>
		</BaseStyles>
	</ThemeProvider>,
);

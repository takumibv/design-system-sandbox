import "@atlaskit/css-reset";
import { setGlobalTheme } from "@atlaskit/tokens/set-global-theme";
import { createRoot } from "react-dom/client";
import { CTApp, type Screen, type State } from "./CTApp";

// ?screen=members&state=loading&signedIn=0&dialog=1 で各状態を表示する（原本の Story と同じ組み合わせ）
const q = new URLSearchParams(location.search);
setGlobalTheme({ colorMode: "light" }).then(() => {
	createRoot(document.getElementById("root") as HTMLElement).render(
		<CTApp
			initialScreen={(q.get("screen") as Screen) ?? "schedule"}
			initialState={(q.get("state") as State) ?? "ready"}
			signedIn={q.get("signedIn") !== "0"}
			initialDialog={q.get("dialog") === "1"}
		/>,
	);
});

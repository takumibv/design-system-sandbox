import "smarthr-ui/smarthr-ui.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	EnvironmentProvider,
	IntlProvider,
	ThemeProvider,
	createTheme,
} from "smarthr-ui";

import { CTApp, type Screen, type State } from "./CTApp";

// ?screen=members&state=loading&signedIn=0&dialog=1 で各状態を表示する（原本の Story と同じ組み合わせ）
const q = new URLSearchParams(location.search);
const theme = createTheme();

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<IntlProvider locale="ja">
			<ThemeProvider theme={theme}>
				<EnvironmentProvider>
				<CTApp
					initialScreen={(q.get("screen") as Screen) ?? "schedule"}
					initialState={(q.get("state") as State) ?? "ready"}
					signedIn={q.get("signedIn") !== "0"}
					initialDialog={q.get("dialog") === "1"}
				/>
				</EnvironmentProvider>
			</ThemeProvider>
		</IntlProvider>
	</StrictMode>,
);

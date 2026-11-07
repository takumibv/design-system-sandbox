import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "@atlaskit/app-provider";
import "@atlaskit/css-reset";
import { App } from "./App";
import { RouterLink } from "./components/RouterLink";
import { StoreProvider } from "./store";

// React の StrictMode は使わない：開発時の二重マウントで、URL から直接開いた ADS の Modal が空になる（harness-report 参照）
createRoot(document.getElementById("root")!).render(
	<>
		<BrowserRouter>
			<AppProvider routerLinkComponent={RouterLink} defaultColorMode="light">
				<StoreProvider>
					<App />
				</StoreProvider>
			</AppProvider>
		</BrowserRouter>
	</>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "@atlaskit/app-provider";
import "@atlaskit/css-reset";
import { App } from "./App";
import { RouterLink } from "./components/RouterLink";
import { StoreProvider } from "./store";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AppProvider routerLinkComponent={RouterLink} defaultColorMode="light">
				<StoreProvider>
					<App />
				</StoreProvider>
			</AppProvider>
		</BrowserRouter>
	</StrictMode>,
);

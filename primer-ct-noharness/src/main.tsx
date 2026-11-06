import "@primer/primitives/dist/css/base/size/size.css";
import "@primer/primitives/dist/css/base/typography/typography.css";
import "@primer/primitives/dist/css/base/motion/motion.css";
import "@primer/primitives/dist/css/functional/size/border.css";
import "@primer/primitives/dist/css/functional/size/radius.css";
import "@primer/primitives/dist/css/functional/size/breakpoints.css";
import "@primer/primitives/dist/css/functional/size/size.css";
import "@primer/primitives/dist/css/functional/size/viewport.css";
import "@primer/primitives/dist/css/functional/typography/typography.css";
import "@primer/primitives/dist/css/functional/spacing/space.css";
import "@primer/primitives/dist/css/functional/motion/motion.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "./styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BaseStyles } from "@primer/react";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BaseStyles>
			<App />
		</BaseStyles>
	</StrictMode>,
);

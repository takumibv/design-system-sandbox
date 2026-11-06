import { useEffect, useState } from "react";

// 依存を増やさないための最小のルーター（pushState + popstate）。
export type Route = "home" | "members" | "settings" | "notFound";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const routeFromPath = (pathname: string): Route => {
	const p = pathname.slice(BASE.length).replace(/\/$/, "") || "/";
	if (p === "/") return "home";
	if (p === "/members") return "members";
	if (p === "/settings") return "settings";
	return "notFound";
};

export const hrefOf = (route: Exclude<Route, "notFound">) => `${BASE}${route === "home" ? "/" : `/${route}`}`;

export function navigate(route: Exclude<Route, "notFound">) {
	window.history.pushState({}, "", hrefOf(route));
	window.dispatchEvent(new PopStateEvent("popstate"));
	window.scrollTo(0, 0);
}

export function useRoute(): Route {
	const [route, setRoute] = useState(() => routeFromPath(window.location.pathname));
	useEffect(() => {
		const onPop = () => setRoute(routeFromPath(window.location.pathname));
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);
	return route;
}

/** SPA 内リンクのクリックを横取りする（修飾キー付きクリックは通常のリンクとして扱う） */
export const linkTo = (route: Exclude<Route, "notFound">) => ({
	href: hrefOf(route),
	onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
		e.preventDefault();
		navigate(route);
	},
});

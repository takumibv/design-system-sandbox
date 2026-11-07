// 最小のクライアントルーター（react-router を入れずに History API だけで動かす）。
import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
window.addEventListener("popstate", notify);

const subscribe = (l: () => void) => {
	listeners.add(l);
	return () => listeners.delete(l);
};
const getHref = () => window.location.pathname + window.location.search;

export const useLocation = () => {
	const href = useSyncExternalStore(subscribe, getHref);
	const url = new URL(href, window.location.origin);
	return { pathname: url.pathname, params: url.searchParams };
};

export const navigate = (to: string, opts: { replace?: boolean } = {}) => {
	if (opts.replace) window.history.replaceState(null, "", to);
	else window.history.pushState(null, "", to);
	window.scrollTo(0, 0);
	notify();
};

/** 今のパスのまま、クエリの一部だけ変える（null で消す） */
export const setParams = (updates: Record<string, string | null>, opts: { replace?: boolean } = {}) => {
	const url = new URL(window.location.href);
	for (const [k, v] of Object.entries(updates)) {
		if (v === null || v === "") url.searchParams.delete(k);
		else url.searchParams.set(k, v);
	}
	const to = url.pathname + url.search;
	if (opts.replace) window.history.replaceState(null, "", to);
	else window.history.pushState(null, "", to);
	notify();
};

/** a 要素の href と onClick をまとめて返す（新しいタブで開く操作は妨げない） */
export const linkProps = (to: string) => ({
	href: to,
	onClick: (e: React.MouseEvent) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
		e.preventDefault();
		navigate(to);
	},
});

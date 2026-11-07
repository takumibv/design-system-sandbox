import { App } from "antd";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { members, posts as fixturePosts, type Post } from "./data/fixtures";
import type { Viewer } from "./lib/domain";

export type ViewerKind = "guest" | "member" | "editor";
export type LoadStatus = "loading" | "error" | "ready";

const initialParams = new URLSearchParams(window.location.search);
const initialKind: ViewerKind = (["guest", "member", "editor"] as const).find((k) => k === initialParams.get("as")) ?? "member";
const initialState = initialParams.get("state");

type Store = {
	posts: Post[];
	viewerKind: ViewerKind;
	viewer: Viewer;
	setViewerKind: (k: ViewerKind) => void;
	login: () => void;
	logout: () => void;
	loadStatus: LoadStatus;
	reload: () => void;
	/** 保存。fail=save のときは失敗を返す */
	savePost: (post: Omit<Post, "id"> & { id?: number }) => Promise<Post>;
	deletePost: (id: number) => Promise<void>;
};

const Ctx = createContext<Store | null>(null);

// デモ用の失敗の再現：?fail=save / ?fail=delete
const shouldFail = (what: "save" | "delete") => new URLSearchParams(window.location.search).get("fail") === what;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function StoreProvider({ children }: { children: ReactNode }) {
	const { message } = App.useApp();
	const [posts, setPosts] = useState<Post[]>(initialState === "empty" ? [] : fixturePosts);
	const [viewerKind, setViewerKind] = useState<ViewerKind>(initialKind);
	const [loadStatus, setLoadStatus] = useState<LoadStatus>(initialState === "loading" ? "loading" : initialState === "error" ? "error" : "ready");

	const viewer: Viewer = useMemo(() => {
		if (viewerKind === "guest") return { kind: "guest" };
		const id = viewerKind === "editor" ? 2 : 1;
		return { kind: "member", member: members.find((m) => m.id === id)! };
	}, [viewerKind]);

	const login = useCallback(() => {
		setViewerKind("member");
		message.success("Slack でログインしました（デモのため、佐藤 美咲としてログインします）");
	}, [message]);
	const logout = useCallback(() => {
		setViewerKind("guest");
		message.info("ログアウトしました。引き続き閲覧できます");
	}, [message]);

	const reload = useCallback(() => {
		setLoadStatus("loading");
		setTimeout(() => setLoadStatus("ready"), 600);
	}, []);

	const savePost = useCallback(async (input: Omit<Post, "id"> & { id?: number }) => {
		await wait(400);
		if (shouldFail("save")) throw new Error("save failed");
		let saved!: Post;
		setPosts((prev) => {
			if (input.id !== undefined) {
				saved = { ...(input as Post) };
				return prev.map((p) => (p.id === input.id ? saved : p));
			}
			saved = { ...input, id: Math.max(0, ...prev.map((p) => p.id)) + 1 };
			return [...prev, saved];
		});
		return saved;
	}, []);

	const deletePost = useCallback(async (id: number) => {
		await wait(400);
		if (shouldFail("delete")) throw new Error("delete failed");
		setPosts((prev) => prev.filter((p) => p.id !== id));
	}, []);

	const value = useMemo(
		() => ({ posts, viewerKind, viewer, setViewerKind, login, logout, loadStatus, reload, savePost, deletePost }),
		[posts, viewerKind, viewer, login, logout, loadStatus, reload, savePost, deletePost],
	);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
	const v = useContext(Ctx);
	if (!v) throw new Error("StoreProvider がありません");
	return v;
};

export { members };

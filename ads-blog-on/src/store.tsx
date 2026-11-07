import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { members as fixtureMembers, posts as fixturePosts, today, type Member, type Post } from "./data/fixtures";

// データの保存はしない（ブリーフ「画面内の状態だけでよい」）。再読み込みで固定データに戻る。

export type Role = "guest" | "member" | "editor";

export type FlagKind = "success" | "error" | "info";
export type FlagItem = {
	id: number;
	kind: FlagKind;
	title: string;
	description?: string;
	actions?: { content: string; onClick?: () => void; href?: string }[];
};

export type PostInput = Omit<Post, "id">;

type Store = {
	today: string;
	members: Member[];
	posts: Post[];
	role: Role;
	user: Member | null;
	setRole: (r: Role) => void;
	flags: FlagItem[];
	showFlag: (f: Omit<FlagItem, "id">) => void;
	dismissFlag: (id: number) => void;
	createPost: (input: PostInput) => Promise<Post>;
	updatePost: (id: number, input: Partial<PostInput>) => Promise<Post>;
	deletePost: (id: number) => Promise<void>;
};

const StoreContext = createContext<Store | null>(null);

const roleFromParam = (v: string | null): Role | null =>
	v === "guest" || v === "member" || v === "editor" ? v : null;

/** 保存・削除の通信を模す。`?fail=save` / `?fail=delete` を付けて開くと、その操作が 1 回失敗する */
const simulate = <T,>(ok: () => T, shouldFail: boolean) =>
	new Promise<T>((resolve, reject) =>
		setTimeout(() => (shouldFail ? reject(new Error("simulated")) : resolve(ok())), 400),
	);

export function StoreProvider({ children }: { children: ReactNode }) {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [role, setRole] = useState<Role>(() => roleFromParam(params.get("as")) ?? "member");
	const [posts, setPosts] = useState<Post[]>(fixturePosts);
	const [flags, setFlags] = useState<FlagItem[]>([]);
	const failNext = useRef<string | null>(params.get("fail"));
	const nextFlagId = useRef(1);

	// URL の ?as= が変わったら役割を切り替える（状態を URL で直接開くため）
	const asParam = params.get("as");
	const failParam = params.get("fail");
	useEffect(() => {
		const r = roleFromParam(asParam);
		if (r) setRole(r);
	}, [asParam]);
	useEffect(() => {
		if (failParam) failNext.current = failParam;
	}, [failParam]);

	const user = role === "guest" ? null : (fixtureMembers.find((m) => m.id === (role === "editor" ? 2 : 1)) ?? null);

	const showFlag = useCallback((f: Omit<FlagItem, "id">) => {
		const id = nextFlagId.current++;
		setFlags((prev) => [{ ...f, id }, ...prev]);
	}, []);
	const dismissFlag = useCallback((id: number) => setFlags((prev) => prev.filter((f) => f.id !== id)), []);

	const consumeFail = (op: "save" | "delete") => {
		if (failNext.current === op) {
			failNext.current = null;
			return true;
		}
		return false;
	};

	const createPost = (input: PostInput) =>
		simulate(() => {
			const post: Post = { ...input, id: Math.max(0, ...posts.map((p) => p.id)) + 1 };
			setPosts((prev) => [...prev, post]);
			return post;
		}, consumeFail("save"));

	const updatePost = (id: number, input: Partial<PostInput>) =>
		simulate(() => {
			const current = posts.find((p) => p.id === id);
			if (!current) throw new Error("not found");
			const next = { ...current, ...input };
			setPosts((prev) => prev.map((p) => (p.id === id ? next : p)));
			return next;
		}, consumeFail("save"));

	const deletePost = (id: number) =>
		simulate(() => {
			setPosts((prev) => prev.filter((p) => p.id !== id));
		}, consumeFail("delete"));

	const value: Store = {
		today,
		members: fixtureMembers,
		posts,
		role,
		user,
		setRole,
		flags,
		showFlag,
		dismissFlag,
		createPost,
		updatePost,
		deletePost,
	};
	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
	const s = useContext(StoreContext);
	if (!s) throw new Error("StoreProvider がありません");
	return s;
}

/** 表示状態を URL のクエリで直接開くためのパラメータ */
export function useViewParams() {
	const { search } = useLocation();
	return useMemo(() => {
		const p = new URLSearchParams(search);
		const state = p.get("state");
		return {
			/** loading | error | empty。指定が無ければ通常表示 */
			state: state === "loading" || state === "error" || state === "empty" ? state : null,
			flag: p.get("flag"),
			dialog: p.get("dialog"),
			from: p.get("from"),
			to: p.get("to"),
			date: p.get("date"),
			validate: p.get("validate") === "1",
		};
	}, [search]);
}

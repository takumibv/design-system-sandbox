import { App as AntApp } from "antd";
import { useEffect, useRef } from "react";
import { AppShell } from "./components/AppShell";
import { PostFormDrawer } from "./components/PostFormDrawer";
import { useLocation } from "./lib/router";
import { NotFound } from "./components/NotFound";
import { MembersPage } from "./pages/MembersPage";
import { PlanPage } from "./pages/PlanPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostsPage } from "./pages/PostsPage";

const TITLES: Record<string, string> = { "/": "計画", "/posts": "投稿一覧", "/members": "書く人" };

/** 撮影・確認用：?flash=… で保存・削除の結果表示を直接出す */
function useFlash() {
	const { message, modal } = AntApp.useApp();
	const done = useRef(false);
	useEffect(() => {
		if (done.current) return;
		done.current = true;
		const flash = new URLSearchParams(window.location.search).get("flash");
		if (flash === "saved") message.success("「アクセシビリティ改善の振り返り」を保存しました", 30);
		if (flash === "created") message.success("「（仮）新しい記事」を登録しました", 30);
		if (flash === "deleted") message.success("「テストの書き方ガイドライン（仮）」を削除しました", 30);
		if (flash === "status") message.success("状態を「執筆中」にしました", 30);
		if (flash === "login") message.success("Slack でログインしました（デモのため、佐藤 美咲としてログインします）", 30);
		if (flash === "delete-failed")
			modal.error({ title: "削除できませんでした", content: "通信に失敗しました。投稿予定は残っています。時間をおいてもう一度削除してください。", okText: "閉じる" });
	}, [message, modal]);
}

export function App() {
	const { pathname } = useLocation();
	useFlash();

	let page;
	let title = "ページが見つかりません";
	const m = pathname.match(/^\/posts\/([^/]+)$/);
	if (pathname === "/") page = <PlanPage />;
	else if (pathname === "/posts") page = <PostsPage />;
	else if (pathname === "/members") page = <MembersPage />;
	else if (m) {
		page = <PostDetailPage id={m[1]} />;
		title = "投稿の詳細";
	} else page = <NotFound />;
	if (TITLES[pathname]) title = TITLES[pathname];

	useEffect(() => {
		document.title = `${title} | ブログ投稿計画 | Gaji-Labo`;
	}, [title]);

	return (
		<AppShell>
			{page}
			<PostFormDrawer />
		</AppShell>
	);
}

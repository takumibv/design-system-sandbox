import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { scenarioFromQuery, type LoadState, type Member, type Scenario, type Week } from "./model";
import { SchedulePage } from "./pages/SchedulePage";
import { MembersPage } from "./pages/MembersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export type Notice = { variant: "info" | "success" | "critical" | "warning"; title: string; description?: string };

type AppState = {
	path: string;
	scenario: Scenario;
	userId: number | null;
	user: Member | undefined;
	members: Member[];
	weeks: Week[];
	thisWeekIndex: number;
	load: LoadState;
	loginError: boolean;
	notice: Notice | null;
	navigate: (path: string) => void;
	login: () => void;
	logout: () => void;
	retryLoad: () => void;
	notify: (notice: Notice | null) => void;
	find: (id: number) => Member | undefined;
	removeMember: (id: number) => void;
	updateMember: (member: Member) => void;
};

const AppContext = createContext<AppState | null>(null);
export const useApp = () => {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error("AppContext がありません");
	return ctx;
};

export function App() {
	const [scenario] = useState(() => scenarioFromQuery(window.location.search));
	const [path, setPath] = useState(window.location.pathname);
	const [userId, setUserId] = useState(scenario.userId);
	const [members, setMembers] = useState(scenario.members);
	const [load, setLoad] = useState<LoadState>(scenario.load);
	const [loginError, setLoginError] = useState(scenario.loginError);
	const [notice, setNotice] = useState<Notice | null>(null);

	useEffect(() => {
		const onPop = () => setPath(window.location.pathname);
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);

	const navigate = useCallback((to: string) => {
		// 状態のクエリ（?state=）は最初の表示にだけ使い、画面を移るときは外す
		window.history.pushState(null, "", to);
		setPath(new URL(to, window.location.origin).pathname);
		setNotice(null);
		window.scrollTo(0, 0);
	}, []);

	const find = useCallback((id: number) => members.find((m) => m.id === id), [members]);

	const value = useMemo<AppState>(
		() => ({
			path,
			scenario,
			userId,
			user: userId == null ? undefined : members.find((m) => m.id === userId),
			members,
			weeks: scenario.weeks,
			thisWeekIndex: scenario.thisWeekIndex,
			load,
			loginError,
			notice,
			navigate,
			login: () => {
				setLoginError(false);
				setUserId(1);
				setNotice({
					variant: "info",
					title: "（デモ）Slack でログインしました",
					description: "実際のサービスでは Slack の画面で許可したあと、この画面に戻ります。デモでは 佐藤 美咲 さんとしてログインします。",
				});
			},
			logout: () => {
				setUserId(null);
				setNotice({ variant: "info", title: "ログアウトしました", description: "組み合わせとメンバーは、ログインしなくても見られます。" });
				navigate("/");
			},
			retryLoad: () => {
				setLoad("loading");
				window.setTimeout(() => setLoad("ready"), 800);
			},
			notify: setNotice,
			find,
			removeMember: (id) => setMembers((list) => list.filter((m) => m.id !== id)),
			updateMember: (member) => setMembers((list) => list.map((m) => (m.id === member.id ? member : m))),
		}),
		[path, scenario, userId, members, load, loginError, notice, navigate, find],
	);

	let page: ReactNode;
	if (path === "/") page = <SchedulePage />;
	else if (path === "/members") page = <MembersPage />;
	else if (path === "/settings") page = <SettingsPage mode="settings" />;
	else if (path === "/setup") page = <SettingsPage mode="setup" />;
	else page = <NotFoundPage />;

	return <AppContext.Provider value={value}>{page}</AppContext.Provider>;
}

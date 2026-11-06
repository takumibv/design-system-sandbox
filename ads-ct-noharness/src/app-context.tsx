import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useFlags } from '@atlaskit/flag';
import { token } from '@atlaskit/tokens';
import StatusSuccessIcon from '@atlaskit/icon/core/status-success';
import StatusErrorIcon from '@atlaskit/icon/core/status-error';
import StatusInformationIcon from '@atlaskit/icon/core/status-information';
import { type AppMember, findMember, initialMembers } from './model';

/**
 * 状態 S01〜S18 は URL のクエリで直接開ける。
 *   ?state=guest | login-error | loading | load-error | few | no-channel | empty
 *         | confirm-delete | delete-error | saved | save-error | invalid
 *   ?as=9   ログイン中の自分を id=9 にする（S03 など）
 *   ?week=2026-10-12  その週へスクロールする（S04）
 */
export type Scenario = { state: string | null; asId: number | null; week: string | null };

export function readScenario(): Scenario {
	const q = new URLSearchParams(window.location.search);
	const as = q.get('as');
	return { state: q.get('state'), asId: as ? Number(as) : null, week: q.get('week') };
}

export type LoadStatus = 'loading' | 'error' | 'ready';

type AppValue = {
	path: string;
	navigate: (to: string) => void;
	scenario: Scenario;
	members: AppMember[];
	setMembers: React.Dispatch<React.SetStateAction<AppMember[]>>;
	me: AppMember | null;
	loginError: boolean;
	logIn: () => void;
	logOut: () => void;
	status: LoadStatus;
	reload: () => void;
	notify: (kind: 'success' | 'error' | 'info', title: string, description?: React.ReactNode) => void;
};

const AppContext = createContext<AppValue | null>(null);

export function useApp() {
	const v = useContext(AppContext);
	if (!v) throw new Error('AppProvider がありません');
	return v;
}

function buildMembers(s: Scenario): AppMember[] {
	let list = initialMembers();
	if (s.state === 'empty') return [];
	if (s.state === 'no-channel') list = list.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m));
	if (s.state === 'few') list = list.map((m) => (m.id === 1 ? m : { ...m, active: false }));
	return list;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
	const scenario = useMemo(readScenario, []);
	const [path, setPath] = useState(window.location.pathname);
	const [members, setMembers] = useState<AppMember[]>(() => buildMembers(scenario));
	const guest = ['guest', 'login-error', 'empty'].includes(scenario.state ?? '');
	const [meId, setMeId] = useState<number | null>(guest ? null : (scenario.asId ?? 1));
	const [loginError, setLoginError] = useState(scenario.state === 'login-error');
	const [status, setStatus] = useState<LoadStatus>(
		scenario.state === 'loading' ? 'loading' : scenario.state === 'load-error' ? 'error' : 'ready',
	);
	const { showFlag } = useFlags();

	useEffect(() => {
		const onPop = () => setPath(window.location.pathname);
		window.addEventListener('popstate', onPop);
		return () => window.removeEventListener('popstate', onPop);
	}, []);

	const navigate = useCallback((to: string) => {
		window.history.pushState(null, '', to);
		setPath(new URL(to, window.location.origin).pathname);
		window.scrollTo(0, 0);
	}, []);

	const notify = useCallback<AppValue['notify']>(
		(kind, title, description) => {
			const icon =
				kind === 'success' ? (
					<StatusSuccessIcon label="成功" color={token('color.icon.success')} />
				) : kind === 'error' ? (
					<StatusErrorIcon label="エラー" color={token('color.icon.danger')} />
				) : (
					<StatusInformationIcon label="お知らせ" color={token('color.icon.information')} />
				);
			showFlag({ title, description, icon, isAutoDismiss: kind !== 'error' });
		},
		[showFlag],
	);

	const me = meId ? (findMember(members, meId) ?? null) : null;

	const logIn = useCallback(() => {
		// デモ：Slack の OAuth の代わりに通知を出してログイン済みにする
		setLoginError(false);
		setMeId(scenario.asId ?? 1);
		notify('info', 'Slack でログインしました（デモ）', '実際には Slack の認可画面を経由します。');
	}, [notify, scenario.asId]);

	const logOut = useCallback(() => {
		setMeId(null);
		notify('info', 'ログアウトしました');
	}, [notify]);

	const reload = useCallback(() => {
		setStatus('loading');
		window.setTimeout(() => setStatus('ready'), 800);
	}, []);

	const value: AppValue = {
		path,
		navigate,
		scenario,
		members,
		setMembers,
		me,
		loginError,
		logIn,
		logOut,
		status,
		reload,
		notify,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

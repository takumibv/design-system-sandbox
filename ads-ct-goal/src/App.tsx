import LinkButton from "@atlaskit/button/link";
import { cssMap } from "@atlaskit/css";
import EmptyState from "@atlaskit/empty-state";
import Flag, { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import StatusErrorIcon from "@atlaskit/icon/core/status-error";
import StatusInformationIcon from "@atlaskit/icon/core/status-information";
import StatusSuccessIcon from "@atlaskit/icon/core/status-success";
import { Box, Stack, Text } from "@atlaskit/primitives/compiled";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import { ErrorIconJa } from "./components/messageIcons";
import Spinner from "@atlaskit/spinner";
import { token } from "@atlaskit/tokens";
import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { type AppFlag, type AppState, isSetupComplete, newFlag, stateFromPreset } from "./model";
import { HomePage } from "./pages/HomePage";
import { MembersPage } from "./pages/MembersPage";
import { type SettingsValues, SettingsPage } from "./pages/SettingsPage";
import { linkTo, navigate, type Route, useRoute } from "./router";

const styles = cssMap({
	main: { maxWidth: "1200px", marginInline: "auto" },
});

const TITLES: Record<Route, string> = { home: "組み合わせ", members: "メンバー", settings: "自分の設定", notFound: "ページが見つかりません" };

// 社員番号は fixtures に無いため、デモ用に id から作る（並び順は fixtures の並び＝社員番号順とみなす）
const employeeNoOf = (id: number, incomplete?: boolean) => (incomplete ? "" : String(1000 + id));

export function App() {
	const route = useRoute();
	const [state, setState] = useState<AppState>(() => stateFromPreset(new URLSearchParams(window.location.search).get("state")));
	const me = state.members.find((m) => m.id === state.userId);
	const needsSetup = !!me && !isSetupComplete(me);
	const effectiveRoute: Route = needsSetup && route === "home" ? "settings" : route;

	useEffect(() => {
		document.title = `${needsSetup && route !== "members" ? "はじめての設定" : TITLES[effectiveRoute]} | CTスケジュール`;
	}, [effectiveRoute, needsSetup, route]);

	const update = (f: (s: AppState) => AppState) => setState(f);
	const pushFlag = (flag: AppFlag) => update((s) => ({ ...s, flags: [flag, ...s.flags] }));
	const dismissFlag = (id: number | string) => update((s) => ({ ...s, flags: s.flags.filter((f) => f.id !== id) }));

	const login = () => update((s) => ({ ...s, userId: 1, loginFailed: false, flags: [newFlag("login-demo"), ...s.flags] }));
	const logout = () => {
		update((s) => ({ ...s, userId: null, flags: [newFlag("logout"), ...s.flags] }));
		if (route === "settings") navigate("home");
	};
	const huddle = (channel: string) => pushFlag(newFlag("huddle-demo", channel));
	const retryLoad = () => {
		update((s) => ({ ...s, load: "loading" }));
		window.setTimeout(() => update((s) => ({ ...s, load: "ready" })), 800);
	};
	const save = async (v: SettingsValues) => {
		await new Promise((r) => window.setTimeout(r, 400));
		update((s) => ({
			...s,
			settingsPreset: "none",
			members: s.members.map((m) => (m.id === s.userId ? { ...m, name: v.name, channel: v.channel, active: v.active, incomplete: false } : m)),
			flags: [newFlag("save-success"), ...s.flags],
		}));
		navigate("home");
		return true;
	};
	const confirmDelete = (id: number) => {
		const target = state.members.find((m) => m.id === id);
		update((s) => ({ ...s, confirmDeleteId: null, members: s.members.filter((m) => m.id !== id), flags: [newFlag("delete-success", target?.name), ...s.flags] }));
	};

	let content: React.ReactNode;
	if (state.load === "loading") {
		content = (
			<Stack space="space.200" alignInline="center">
				<Box paddingBlockStart="space.800">
					<Spinner size="large" label="読み込み中" />
				</Box>
				<Text as="p" color="color.text.subtle">
					組み合わせとメンバーを読み込んでいます…
				</Text>
			</Stack>
		);
	} else if (state.load === "error") {
		content = (
			<SectionMessage headingLevel="h2"
				appearance="error"
				icon={ErrorIconJa}
				title="組み合わせを読み込めませんでした"
				actions={[
					<SectionMessageAction key="retry" onClick={retryLoad}>
						もう一度読み込む
					</SectionMessageAction>,
				]}
			>
				<Text as="p">通信が不安定な可能性があります。もう一度読み込んでください。何度か試しても表示されないときは、Slack の #ct チャンネルに投稿された今週のペアを確認してください。</Text>
			</SectionMessage>
		);
	} else if (effectiveRoute === "home") {
		content = <HomePage weeks={state.weeks} thisWeekIndex={state.thisWeekIndex} members={state.members} me={me} onHuddle={huddle} onLogin={login} />;
	} else if (effectiveRoute === "members") {
		content = (
			<MembersPage
				members={state.members}
				me={me}
				confirmDeleteId={state.confirmDeleteId}
				onAskDelete={(id) => update((s) => ({ ...s, confirmDeleteId: id }))}
				onCancelDelete={() => update((s) => ({ ...s, confirmDeleteId: null }))}
				onConfirmDelete={confirmDelete}
				onLogin={login}
			/>
		);
	} else if (effectiveRoute === "settings") {
		content = me ? (
			<SettingsPage
				key={me.id}
				me={me}
				firstTime={needsSetup}
				channels={channelList(state.members.map((m) => m.channel))}
				employeeNo={employeeNoOf(me.id, me.incomplete)}
				preset={state.settingsPreset}
				onSave={save}
			/>
		) : (
			<EmptyState
				header="ログインが必要です"
				headingLevel={1}
				description="自分の設定を変えるには、Slack でログインしてください。組み合わせとメンバーは、ログインしなくても見られます。"
				primaryAction={
					<LinkButton appearance="primary" {...linkTo("home")}>
						組み合わせを見る
					</LinkButton>
				}
			/>
		);
	} else {
		content = (
			<EmptyState
				header="ページが見つかりません"
				headingLevel={1}
				description="URL が間違っているか、ページが移動した可能性があります。組み合わせの画面から目的の情報を探してください。"
				primaryAction={
					<LinkButton appearance="primary" {...linkTo("home")}>
						組み合わせを見る
					</LinkButton>
				}
			/>
		);
	}

	return (
		<>
			<AppHeader route={effectiveRoute} me={me} onLogin={login} onLogout={logout} />
			<Box as="main" xcss={styles.main} paddingInline="space.200" paddingBlockStart="space.300" paddingBlockEnd="space.800">
				<Stack space="space.300">
					{state.loginFailed && (
						<SectionMessage headingLevel="h2"
							appearance="error"
				icon={ErrorIconJa}
							title="Slack でログインできませんでした"
							actions={[
								<SectionMessageAction key="retry" onClick={login}>
									もう一度ログインする
								</SectionMessageAction>,
							]}
						>
							<Text as="p">Slack との接続がうまくいきませんでした。もう一度ログインしてください。組み合わせとメンバーは、ログインしなくても下で確認できます。</Text>
						</SectionMessage>
					)}
					{content}
				</Stack>
			</Box>
			<AppFlags flags={state.flags} onDismiss={dismissFlag} onRetryDelete={() => navigate("members")} />
		</>
	);
}

const channelList = (fromMembers: (string | undefined)[]) => Array.from(new Set([...fromMembers.filter((c): c is string => !!c), "u-mao", "u-kenta", "u-takahashi"])).sort();

function AppFlags({ flags, onDismiss, onRetryDelete }: { flags: AppFlag[]; onDismiss: (id: number | string) => void; onRetryDelete: () => void }) {
	return (
		<FlagGroup onDismissed={onDismiss} label="お知らせ">
			{flags.map((f) => {
				switch (f.kind) {
					case "save-success":
						return (
							<AutoDismissFlag
								key={f.id}
								id={f.id}
								icon={<StatusSuccessIcon label="成功" color={token("color.icon.success")} />}
								title="設定を保存しました"
								description="組み合わせに反映しました。参加状況を変えた場合は、今週以降の組み合わせが組み直されています。"
							/>
						);
					case "delete-success":
						return (
							<AutoDismissFlag
								key={f.id}
								id={f.id}
								icon={<StatusSuccessIcon label="成功" color={token("color.icon.success")} />}
								title={`${f.subject}さんを削除しました`}
								description="メンバー一覧と組み合わせから外しました。"
							/>
						);
					case "delete-failed":
						return (
							<Flag
								key={f.id}
								id={f.id}
								icon={<StatusErrorIcon label="エラー" color={token("color.icon.danger")} />}
								title={`${f.subject}さんを削除できませんでした`}
								description="通信がうまくいかなかった可能性があります。メンバーの一覧はそのままです。もう一度削除してください。"
								actions={[{ content: "もう一度削除する", onClick: () => { onDismiss(f.id); onRetryDelete(); } }]}
							/>
						);
					case "login-demo":
						return (
							<AutoDismissFlag
								key={f.id}
								id={f.id}
								icon={<StatusInformationIcon label="お知らせ" color={token("color.icon.information")} />}
								title="Slack でログインしました（デモ）"
								description="デモのため、佐藤 美咲さんとしてログインしています。"
							/>
						);
					case "logout":
						return <AutoDismissFlag key={f.id} id={f.id} icon={<StatusInformationIcon label="お知らせ" color={token("color.icon.information")} />} title="ログアウトしました" />;
					case "huddle-demo":
						return (
							<AutoDismissFlag
								key={f.id}
								id={f.id}
								icon={<StatusInformationIcon label="お知らせ" color={token("color.icon.information")} />}
								title={`#${f.subject} でハドルを始めます（デモ）`}
								description="本番では Slack が開き、このチャンネルでハドルが始まります。"
							/>
						);
				}
			})}
		</FlagGroup>
	);
}


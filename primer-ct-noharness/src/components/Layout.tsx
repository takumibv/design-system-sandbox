import { useEffect, useRef, type ReactNode } from "react";
import { ActionList, ActionMenu, Banner, Button, PageLayout, Stack, Text, UnderlineNav, VisuallyHidden } from "@primer/react";
import { CalendarIcon, GearIcon, PeopleIcon, SignInIcon, SignOutIcon } from "@primer/octicons-react";
import { useApp } from "../App";
import { PersonAvatar } from "./PersonAvatar";
import logoUrl from "../gaji-labo-logo.svg";

type LayoutProps = {
	/** ブラウザのタブに出す画面名 */
	title: string;
	children: ReactNode;
	/** 右の欄（1440px では右、390px では本文の下） */
	pane?: ReactNode;
	contentWidth?: "full" | "medium" | "large" | "xlarge";
};

export function Layout({ title, children, pane, contentWidth = "full" }: LayoutProps) {
	const { notice, notify, loginError, login, user, path, navigate } = useApp();
	const noticeRef = useRef<HTMLElement>(null);

	useEffect(() => {
		document.title = `${title} | CTスケジュール`;
	}, [title]);

	// 通知が出たら、そこへフォーカスを移して読み上げさせる
	useEffect(() => {
		if (notice) noticeRef.current?.focus();
	}, [notice]);

	const needsSetup = user?.incomplete && path !== "/setup";

	return (
		<PageLayout containerWidth="xlarge" padding="normal" rowGap="normal" columnGap="normal">
			<PageLayout.Header divider="none" padding="none">
				<AppHeader />
			</PageLayout.Header>
			<PageLayout.Content width={contentWidth} padding="none">
				<Stack gap="normal">
					{loginError && (
						<Banner
							variant="critical"
							title="Slack でログインできませんでした"
							description="Slack の画面で許可されなかったか、通信が途中で切れた可能性があります。もう一度お試しください。ログインしなくても、組み合わせとメンバーは見られます。"
							primaryAction={<Banner.PrimaryAction onClick={login}>もう一度ログインする</Banner.PrimaryAction>}
						/>
					)}
					{needsSetup && (
						<Banner
							variant="warning"
							title="初回設定が終わっていません"
							description="社員番号と uチャンネルを設定すると、組み合わせに入ります。"
							primaryAction={<Banner.PrimaryAction onClick={() => navigate("/setup")}>初回設定をする</Banner.PrimaryAction>}
						/>
					)}
					{notice && (
						<Banner
							ref={noticeRef}
							tabIndex={-1}
							variant={notice.variant}
							title={notice.title}
							description={notice.description}
							onDismiss={() => notify(null)}
						/>
					)}
					{children}
				</Stack>
			</PageLayout.Content>
			{pane && (
				<PageLayout.Pane position="end" width="large" padding="none" divider="none" aria-label="これからの予定">
					{pane}
				</PageLayout.Pane>
			)}
		</PageLayout>
	);
}

function AppHeader() {
	const { user, path, navigate, login, logout, members } = useApp();

	const go = (to: string) => (event: React.MouseEvent | React.KeyboardEvent) => {
		event.preventDefault();
		navigate(to);
	};
	const settingsPath = user?.incomplete ? "/setup" : "/settings";

	return (
		<Stack gap="condensed">
			<Stack direction="horizontal" justify="space-between" align="center" wrap="wrap" gap="condensed">
				<Stack direction="horizontal" align="center" gap="condensed">
					<a href="https://www.gaji.jp/" target="_blank" rel="noopener noreferrer">
						<img src={logoUrl} alt="Gaji-Labo（新しいタブで開きます）" className="logo" />
					</a>
					<Text as="p" size="large" weight="semibold">
						CTスケジュール
					</Text>
				</Stack>
				{user ? (
					<ActionMenu>
						<ActionMenu.Button leadingVisual={<PersonAvatar member={user} size={20} />}>
							<VisuallyHidden>ログイン中：</VisuallyHidden>
							{user.name}
						</ActionMenu.Button>
						<ActionMenu.Overlay width="small">
							<ActionList>
								<ActionList.Item onSelect={() => navigate(settingsPath)}>
									<ActionList.LeadingVisual>
										<GearIcon />
									</ActionList.LeadingVisual>
									自分の設定
								</ActionList.Item>
								<ActionList.Divider />
								<ActionList.Item onSelect={logout}>
									<ActionList.LeadingVisual>
										<SignOutIcon />
									</ActionList.LeadingVisual>
									ログアウト
								</ActionList.Item>
							</ActionList>
						</ActionMenu.Overlay>
					</ActionMenu>
				) : (
					<Button leadingVisual={SignInIcon} onClick={login}>
						Slack でログイン
					</Button>
				)}
			</Stack>
			<UnderlineNav aria-label="画面の切り替え" variant="flush">
				<UnderlineNav.Item href="/" icon={CalendarIcon} aria-current={path === "/" ? "page" : undefined} onSelect={go("/")}>
					組み合わせ
				</UnderlineNav.Item>
				<UnderlineNav.Item
					href="/members"
					icon={PeopleIcon}
					counter={members.length}
					aria-current={path === "/members" ? "page" : undefined}
					onSelect={go("/members")}
				>
					メンバー
				</UnderlineNav.Item>
				{user && (
					<UnderlineNav.Item
						href={settingsPath}
						icon={GearIcon}
						aria-current={path === "/settings" || path === "/setup" ? "page" : undefined}
						onSelect={go(settingsPath)}
					>
						自分の設定
					</UnderlineNav.Item>
				)}
			</UnderlineNav>
		</Stack>
	);
}

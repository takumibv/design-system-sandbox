import { DownOutlined, LoginOutlined, LogoutOutlined, SwapOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Grid, Layout, Menu, Tag, theme, Typography } from "antd";
import type { ReactNode } from "react";
import logo from "../assets/gaji-labo-logo.svg";
import { linkProps, navigate, useLocation } from "../lib/router";
import { useStore, type ViewerKind } from "../store";

const NAV = [
	{ key: "/", label: "計画" },
	{ key: "/posts", label: "投稿一覧" },
	{ key: "/members", label: "書く人" },
];

const currentNav = (pathname: string) => {
	if (pathname === "/") return "/";
	if (pathname.startsWith("/posts")) return "/posts";
	if (pathname.startsWith("/members")) return "/members";
	return "";
};

function UserArea() {
	const { viewer, viewerKind, login, logout, setViewerKind } = useStore();
	const screens = Grid.useBreakpoint();
	if (viewer.kind === "guest")
		return (
			<Button icon={<LoginOutlined />} onClick={login}>
				Slack でログイン
			</Button>
		);
	const switchTo: ViewerKind = viewerKind === "editor" ? "member" : "editor";
	return (
		<Dropdown
			trigger={["click"]}
			menu={{
				items: [
					{ key: "switch", icon: <SwapOutlined />, label: switchTo === "editor" ? "編集担当（高橋 健太）として見る（デモ）" : "一般メンバー（佐藤 美咲）として見る（デモ）" },
					{ type: "divider" },
					{ key: "logout", icon: <LogoutOutlined />, label: "ログアウト" },
				],
				onClick: ({ key }) => (key === "logout" ? logout() : setViewerKind(switchTo)),
			}}
		>
			<Button type="text" aria-label={`${viewer.member.name}（${viewer.member.role === "editor" ? "編集担当" : "メンバー"}）のメニュー`}>
				<Flex gap="small" align="center">
					<UserOutlined />
					{screens.sm && <span>{viewer.member.name}</span>}
					{viewer.member.role === "editor" && <Tag>編集担当</Tag>}
					<DownOutlined />
				</Flex>
			</Button>
		</Dropdown>
	);
}

export function AppShell({ children }: { children: ReactNode }) {
	const { pathname } = useLocation();
	const screens = Grid.useBreakpoint();
	const { token } = theme.useToken();
	const wide = !!screens.md;

	const menu = (
		<Menu
			mode="horizontal"
			selectedKeys={[currentNav(pathname)]}
			items={NAV.map((n) => ({ key: n.key, label: <a {...linkProps(n.key)}>{n.label}</a> }))}
			onClick={({ key, domEvent }) => {
				if ((domEvent.target as HTMLElement).closest("a")) return;
				navigate(key);
			}}
			// 横幅いっぱいに広げて 3 項目が「…」に畳まれないようにする
			style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
		/>
	);

	return (
		<Layout>
			<Layout.Header>
				<Flex align="center" gap="middle" style={{ height: "100%" }}>
					<a href="https://www.gaji.jp/" target="_blank" rel="noopener noreferrer" aria-label="Gaji-Labo のサイトを新しいタブで開く">
						<Flex align="center">
							<img src={logo} alt="Gaji-Labo" height={wide ? 24 : 18} />
						</Flex>
					</a>
					<Typography.Link {...linkProps("/")} strong>
						ブログ投稿計画
					</Typography.Link>
					{wide && (
						<Flex component="nav" aria-label="メインメニュー" flex={1}>
							{menu}
						</Flex>
					)}
					<Flex flex={wide ? "none" : 1} justify="flex-end">
						<UserArea />
					</Flex>
				</Flex>
			</Layout.Header>
			{!wide && <nav aria-label="メインメニュー">{menu}</nav>}
			<Layout.Content style={{ padding: wide ? token.paddingLG : token.padding }}>
				<main>{children}</main>
			</Layout.Content>
			<Layout.Footer>
				<Typography.Text type="secondary">Gaji-Labo 社内ブログ投稿計画（デモ。データは画面を開いている間だけ保持されます）</Typography.Text>
			</Layout.Footer>
		</Layout>
	);
}

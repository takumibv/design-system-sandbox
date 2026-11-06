import Button from "@atlaskit/button/default/button";
import LinkButton from "@atlaskit/button/link";
import { cssMap } from "@atlaskit/css";
import Image from "@atlaskit/image/image";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import LogInIcon from "@atlaskit/icon/core/log-in";
import { Anchor, Box, Inline, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import logoUrl from "../../../brief/gaji-labo-logo.svg";
import type { Member } from "../model";
import { linkTo, type Route } from "../router";
import { PersonAvatar } from "./PersonAvatar";

const styles = cssMap({
	header: {
		borderBlockEndWidth: token("border.width"),
		borderBlockEndStyle: "solid",
		borderBlockEndColor: token("color.border"),
	},
	inner: { maxWidth: "1200px", marginInline: "auto" },
	logoLink: { display: "inline-flex", alignItems: "center", gap: token("space.050"), color: token("color.text.subtle") },
	// 390px 幅ではナビを 2 段目に回す（ヘッダーの高さを抑えて G1 のカードをファーストビューに入れるため）
	nav: { order: 3, width: "100%", "@media (min-width: 48rem)": { order: 0, width: "auto" } },
	list: { listStyle: "none", margin: token("space.0"), padding: token("space.0") },
	userName: { display: "none", "@media (min-width: 30rem)": { display: "inline" } },
});

const NAV: { route: Exclude<Route, "notFound">; label: string; needsLogin?: boolean }[] = [
	{ route: "home", label: "組み合わせ" },
	{ route: "members", label: "メンバー" },
	{ route: "settings", label: "自分の設定", needsLogin: true },
];

export function AppHeader({ route, me, onLogin, onLogout }: { route: Route; me: Member | undefined; onLogin: () => void; onLogout: () => void }) {
	return (
		<Box as="header" backgroundColor="elevation.surface" xcss={styles.header}>
			<Box xcss={styles.inner} paddingInline="space.200" paddingBlock="space.100">
				<Inline space="space.200" alignBlock="center" spread="space-between" shouldWrap rowSpace="space.050">
					<Inline space="space.150" alignBlock="center">
						{/* ロゴは別タブで開く。ADS: 新しいウィンドウで開くリンクは事前に知らせる（Link）→ LinkExternalIcon（"Reserved for links that open up a new tab"） */}
						<Anchor href="https://www.gaji.jp/" target="_blank" newWindowLabel="（新しいタブで開きます）" xcss={styles.logoLink}>
							<Image src={logoUrl} alt="Gaji-Labo" height={20} />
							<LinkExternalIcon label="" size="small" color={token("color.icon.subtle")} />
						</Anchor>
						<Text as="span" weight="bold" size="large">
							CTスケジュール
						</Text>
					</Inline>
					<Box as="nav" aria-label="メインメニュー" xcss={styles.nav}>
						<Inline space="space.050" as="ul" xcss={styles.list}>
							{NAV.filter((n) => !n.needsLogin || me).map((n) => (
								<Box as="li" key={n.route}>
									<LinkButton {...linkTo(n.route)} appearance="subtle" isSelected={route === n.route} aria-current={route === n.route ? "page" : undefined}>
										{n.label}
									</LinkButton>
								</Box>
							))}
						</Inline>
					</Box>
					{me ? (
						<Inline space="space.100" alignBlock="center">
							<PersonAvatar member={me} size="small" decorative />
							<Text as="span">
								<span>{me.name}</span>
								<Box as="span" xcss={styles.userName}>
									 でログイン中
								</Box>
							</Text>
							<Button appearance="subtle" onClick={onLogout}>
								ログアウト
							</Button>
						</Inline>
					) : (
						<Button appearance="default" iconBefore={LogInIcon} onClick={onLogin}>
							Slack でログイン
						</Button>
					)}
				</Inline>
			</Box>
		</Box>
	);
}

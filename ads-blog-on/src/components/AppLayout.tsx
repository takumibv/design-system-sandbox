import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cssMap } from "@atlaskit/css";
import { Root } from "@atlaskit/navigation-system/layout/root";
import { TopNav, TopNavEnd, TopNavStart } from "@atlaskit/navigation-system/layout/top-nav";
import { SideNav, SideNavBody, SideNavToggleButton } from "@atlaskit/navigation-system/layout/side-nav";
import { Main } from "@atlaskit/navigation-system/layout/main";
import { LogIn } from "@atlaskit/navigation-system/top-nav-items/log-in";
import { LinkMenuItem } from "@atlaskit/side-nav-items/link-menu-item";
import { MenuList } from "@atlaskit/side-nav-items/menu-list";
import DropdownMenu, { DropdownItem, DropdownItemGroup, DropdownItemRadio, DropdownItemRadioGroup } from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button/new";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import PersonIcon from "@atlaskit/icon/core/person";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import { Anchor, Box } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import Image from "@atlaskit/image/image";
import { useStore, type Role } from "../store";
import { PRESET_FLAGS } from "./Flags";

const styles = cssMap({
	logoLink: {
		display: "flex",
		alignItems: "center",
		paddingInline: token("space.100"),
		paddingBlock: token("space.050"),
		borderRadius: token("radius.small"),
	},
	main: {
		paddingInline: token("space.300"),
		paddingBlockStart: token("space.300"),
		paddingBlockEnd: token("space.800"),
		maxWidth: "1296px",
		marginInline: "auto",
	},
});

const NAV = [
	{ href: "/", label: "投稿計画", icon: CalendarIcon, match: (p: string) => p === "/" },
	{ href: "/me", label: "自分の担当", icon: PersonIcon, match: (p: string) => p.startsWith("/me") },
	{ href: "/members", label: "書く人ごと", icon: PeopleGroupIcon, match: (p: string) => p.startsWith("/members") },
];

const ROLE_LABEL: Record<Role, string> = { guest: "未ログイン", member: "一般メンバー", editor: "編集担当" };

function AccountMenu() {
	const { user, role, setRole, showFlag } = useStore();
	const navigate = useNavigate();
	const location = useLocation();

	const switchRole = (r: Role) => {
		setRole(r);
		// URL の ?as= も合わせて、共有したリンクで同じ表示になるようにする
		const p = new URLSearchParams(location.search);
		p.set("as", r);
		navigate({ pathname: location.pathname, search: p.toString() }, { replace: true });
	};

	if (!user) {
		return (
			<LogIn
				label="Slack でログイン"
				href="#"
				onClick={(e) => {
					e.preventDefault();
					switchRole("member");
					showFlag(PRESET_FLAGS.login);
				}}
			/>
		);
	}
	return (
		<DropdownMenu
			shouldRenderToParent
			placement="bottom-end"
			trigger={({ triggerRef, ...props }) => (
				<Button
					{...props}
					ref={triggerRef}
					appearance="subtle"
					iconAfter={ChevronDownIcon}
					aria-label={`${user.name}（${ROLE_LABEL[role]}）のメニュー`}
				>
					<Box as="span" aria-hidden>
						{user.name}
					</Box>
				</Button>
			)}
		>
			<DropdownItemRadioGroup id="role" title="表示する役割（デモ用）">
				{(["member", "editor"] as Role[]).map((r) => (
					<DropdownItemRadio key={r} id={r} isSelected={role === r} onClick={() => switchRole(r)}>
						{r === "member" ? "佐藤 美咲（一般メンバー）" : "高橋 健太（編集担当）"}
					</DropdownItemRadio>
				))}
			</DropdownItemRadioGroup>
			<DropdownItemGroup hasSeparator>
				<DropdownItem
					onClick={() => {
						switchRole("guest");
						showFlag(PRESET_FLAGS.logout);
					}}
				>
					ログアウト
				</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	);
}

export function AppLayout({ children }: { children: ReactNode }) {
	const location = useLocation();
	return (
		<Root>
			<TopNav>
				<TopNavStart
					sideNavToggleButton={<SideNavToggleButton collapseLabel="メニューを閉じる" expandLabel="メニューを開く" />}
				>
					<Anchor href="https://www.gaji.jp/" target="_blank" xcss={styles.logoLink} aria-label="Gaji-Labo（新しいタブで開きます）">
						<Image src="/gaji-labo-logo.svg" alt="" height={20} width={108} />
					</Anchor>
				</TopNavStart>
				<TopNavEnd>
					<AccountMenu />
				</TopNavEnd>
			</TopNav>
			<SideNav label="社内ブログ投稿計画">
				<SideNavBody>
					<MenuList>
						{NAV.map((n) => (
							<LinkMenuItem
								key={n.href}
								href={n.href}
								isSelected={n.match(location.pathname)}
								elemBefore={<n.icon label="" color="currentColor" />}
							>
								{n.label}
							</LinkMenuItem>
						))}
					</MenuList>
				</SideNavBody>
			</SideNav>
			<Main>
				<Box xcss={styles.main}>{children}</Box>
			</Main>
		</Root>
	);
}

import Button from '@atlaskit/button/default/button';
import LinkButton from '@atlaskit/button/link';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/core/chevron-down';
import { Anchor, Box, Inline, Stack, Text, xcss } from '@atlaskit/primitives';
import { useApp } from '../app-context';
import { PersonAvatar } from './PersonAvatar';

const GAJI_URL = 'https://www.gaji.jp/';

// 注：最初は @atlaskit/navigation-system（Root / TopNav / SideNav / Main）で組んだが、
// この環境ではレイアウトのグリッドが崩れた（docs/design-decisions.md「実装後の追記」）。
// 型定義と README だけでは原因を特定できなかったため、primitives とボタンで上部の帯を組む。

const header = xcss({
	backgroundColor: 'elevation.surface',
	borderBlockEndWidth: 'border.width',
	borderBlockEndStyle: 'solid',
	borderBlockEndColor: 'color.border',
	paddingBlock: 'space.150',
	paddingInline: 'space.200',
});

const headerInner = xcss({ maxWidth: '960px', marginInline: 'auto' });

const noWrap = xcss({ whiteSpace: 'nowrap' });
const logoLink = xcss({ display: 'flex', alignItems: 'center' });

const main = xcss({
	maxWidth: '960px',
	marginInline: 'auto',
	paddingBlock: 'space.400',
	paddingInline: 'space.200',
});

const page = xcss({ backgroundColor: 'elevation.surface.sunken', minHeight: '100vh' });

export function Shell({ children }: { children: React.ReactNode }) {
	const { path, navigate, me, logIn, logOut } = useApp();

	const items = [
		{ to: '/', label: '組み合わせ' },
		{ to: '/members', label: 'メンバー' },
		...(me ? [{ to: '/settings', label: '自分の設定' }] : []),
	];
	const current = (to: string) => path === to || (to === '/settings' && path === '/setup');

	return (
		<Box xcss={page}>
			<Box as="header" xcss={header}>
				<Box xcss={headerInner}>
					<Stack space="space.150">
						<Inline space="space.100" alignBlock="center" spread="space-between" shouldWrap>
							<Inline space="space.150" alignBlock="center">
								<Anchor href={GAJI_URL} target="_blank" xcss={logoLink} newWindowLabel="（新しいタブで開く）">
									<img src="/gaji-labo-logo.svg" alt="Gaji-Labo" height={24} />
								</Anchor>
								<Box xcss={noWrap}>
									<Text weight="bold" color="color.text.subtle">
										CTスケジュール
									</Text>
								</Box>
							</Inline>
							{me ? (
								<DropdownMenu
									placement="bottom-end"
									trigger={({ triggerRef, ...props }) => (
										<Button
											{...props}
											ref={triggerRef}
											appearance="subtle"
											iconAfter={ChevronDownIcon}
											aria-label={`${me.name}（ログイン中）のメニュー`}
										>
											<Inline space="space.075" alignBlock="center" as="span">
												<PersonAvatar member={me} size="small" />
												<span>{me.name}</span>
											</Inline>
										</Button>
									)}
								>
									<DropdownItemGroup title={`${me.name} としてログイン中`}>
										<DropdownItem onClick={() => navigate('/settings')}>自分の設定</DropdownItem>
										<DropdownItem onClick={logOut}>ログアウト</DropdownItem>
									</DropdownItemGroup>
								</DropdownMenu>
							) : (
								<Button onClick={logIn}>Slack でログイン</Button>
							)}
						</Inline>
						<Box as="nav" aria-label="画面の切り替え">
							<Inline space="space.050" shouldWrap>
								{items.map((item) => (
									<LinkButton
										key={item.to}
										href={item.to}
										appearance="subtle"
										isSelected={current(item.to)}
										aria-current={current(item.to) ? 'page' : undefined}
										onClick={(e) => {
											e.preventDefault();
											navigate(item.to);
										}}
									>
										{item.label}
									</LinkButton>
								))}
							</Inline>
						</Box>
					</Stack>
				</Box>
			</Box>
			<Box as="main" xcss={main}>
				{children}
			</Box>
		</Box>
	);
}

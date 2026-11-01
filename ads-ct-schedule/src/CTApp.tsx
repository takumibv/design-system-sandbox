/**
 * CTスケジュール UI を Atlassian Design System (ADS) で再現した版。
 *
 * 原本: takumibv/digital-go-design-system@codex/ct-schedule-ui の src/pages/CTApp.tsx
 * 状態・props・固定データ (fixtures.ts) は原本と同一にし、見た目だけを ADS の
 * コンポーネント / primitives / tokens に置き換えている。
 * 自前の CSS ファイルは持たず、レイアウトはすべて xcss（ADS トークン制約付き）で書く。
 */
import Avatar from "@atlaskit/avatar";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { IconButton } from "@atlaskit/button/new";
import Checkbox from "@atlaskit/checkbox";
import DynamicTable from "@atlaskit/dynamic-table";
import EmptyState from "@atlaskit/empty-state";
import Flag, { FlagGroup } from "@atlaskit/flag";
import { ErrorMessage, HelperMessage, Label, Legend } from "@atlaskit/form";
import Heading from "@atlaskit/heading";
import CalendarIcon from "@atlaskit/icon/core/calendar";
import ChevronLeftIcon from "@atlaskit/icon/core/chevron-left";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import CommentIcon from "@atlaskit/icon/core/comment";
import LinkExternalIcon from "@atlaskit/icon/core/link-external";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import StatusSuccessIcon from "@atlaskit/icon/core/status-success";
import Link from "@atlaskit/link";
import Lozenge from "@atlaskit/lozenge";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import {
	Box,
	Grid,
	Inline,
	Pressable,
	Stack,
	Text,
	media,
	xcss,
} from "@atlaskit/primitives";
import SectionMessage, {
	SectionMessageAction,
} from "@atlaskit/section-message";
import Select from "@atlaskit/select";
import Spinner from "@atlaskit/spinner";
import Textfield from "@atlaskit/textfield";
import { token } from "@atlaskit/tokens";
import { useRef, useState, type ReactNode } from "react";
import { type Member, members, person, weeks } from "./fixtures";

export type Screen =
	| "schedule"
	| "members"
	| "settings"
	| "onboarding"
	| "notFound";
export type State =
	| "ready"
	| "loading"
	| "error"
	| "empty"
	| "insufficient"
	| "rest"
	| "holiday"
	| "loginError"
	| "saveError"
	| "saveSuccess"
	| "deleteError"
	| "deleteSuccess"
	| "missingChannel"
	| "validation";
export type CTAppProps = {
	initialScreen?: Screen;
	initialState?: State;
	signedIn?: boolean;
	initialDialog?: boolean;
};

/* ---------- layout styles (xcss = ADS トークンのみ受け付ける CSS-in-JS) ---------- */
const s = {
	shell: xcss({ minHeight: "100vh", backgroundColor: "elevation.surface" }),
	brandBar: xcss({
		backgroundColor: "color.background.neutral.bold",
		paddingBlock: "space.100",
	}),
	serviceBar: xcss({
		borderBlockEndWidth: "border.width",
		borderBlockEndStyle: "solid",
		borderColor: "color.border",
		paddingBlock: "space.150",
	}),
	inner: xcss({
		maxWidth: "1280px",
		marginInline: "auto",
		paddingInline: "space.200",
		[media.above.md]: { paddingInline: "space.400" },
	}),
	main: xcss({
		maxWidth: "1280px",
		marginInline: "auto",
		paddingInline: "space.200",
		paddingBlock: "space.400",
		[media.above.md]: { paddingInline: "space.400" },
	}),
	scheduleGrid: xcss({
		display: "grid",
		gap: "space.400",
		gridTemplateColumns: "minmax(0, 1fr)",
		[media.above.lg]: { gridTemplateColumns: "minmax(0, 1fr) 320px" },
	}),
	card: xcss({
		borderRadius: "radius.large",
		borderWidth: "border.width",
		borderStyle: "solid",
		borderColor: "color.border",
		padding: "space.300",
	}),
	featured: xcss({
		borderRadius: "radius.large",
		backgroundColor: "color.background.accent.blue.subtlest",
		padding: "space.300",
		[media.above.md]: { padding: "space.400" },
	}),
	pairRow: xcss({
		display: "grid",
		gap: "space.150",
		alignItems: "center",
		paddingBlock: "space.150",
		paddingInline: "space.200",
		borderBlockEndWidth: "border.width",
		borderBlockEndStyle: "solid",
		borderColor: "color.border",
		gridTemplateColumns: "minmax(0, 1fr)",
		[media.above.md]: { gridTemplateColumns: "minmax(0, 1fr) auto" },
	}),
	pairRowMine: xcss({ backgroundColor: "color.background.selected" }),
	pairMembers: xcss({
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
		alignItems: "center",
		gap: "space.100",
	}),
	list: xcss({
		listStyle: "none",
		margin: "space.0",
		padding: "space.0",
		borderWidth: "border.width",
		borderStyle: "solid",
		borderColor: "color.border",
		borderRadius: "radius.large",
		overflow: "hidden",
	}),
	upcomingItem: xcss({
		width: "100%",
		paddingBlock: "space.150",
		paddingInline: "space.200",
		backgroundColor: "color.background.neutral.subtle",
		borderBlockEndWidth: "border.width",
		borderBlockEndStyle: "solid",
		borderColor: "color.border",
		textAlign: "start",
		":hover": { backgroundColor: "color.background.neutral.subtle.hovered" },
	}),
	summary: xcss({
		display: "grid",
		gap: "space.200",
		gridTemplateColumns: "1fr 1fr",
		[media.above.md]: { gridTemplateColumns: "160px 160px 1fr" },
		alignItems: "center",
	}),
	summaryNote: xcss({
		gridColumn: "1 / -1",
		[media.above.md]: { gridColumn: "auto" },
	}),
	settingsGrid: xcss({
		display: "grid",
		gap: "space.500",
		gridTemplateColumns: "minmax(0, 1fr)",
		[media.above.lg]: { gridTemplateColumns: "minmax(0, 640px) 320px" },
	}),
	footer: xcss({
		marginBlockStart: "space.800",
		backgroundColor: "color.background.neutral",
		paddingBlock: "space.300",
	}),
	headerLink: xcss({
		backgroundColor: "color.background.neutral.subtle",
		borderRadius: "radius.small",
		padding: "space.050",
		":hover": { backgroundColor: "color.background.neutral.subtle.hovered" },
	}),
	logo: xcss({ height: "24px", display: "block" }),
	inverseText: xcss({ color: "color.text.inverse" }),
	minW0: xcss({ minWidth: "0" }),
};

/* ---------- small building blocks ---------- */
function SkipLink() {
	const [focused, setFocused] = useState(false);
	return (
		<a
			href="#main"
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			style={
				focused
					? {
							position: "absolute",
							top: token("space.100"),
							left: token("space.100"),
							zIndex: 1,
							padding: token("space.100"),
							background: token("elevation.surface.raised"),
							boxShadow: token("elevation.shadow.raised"),
						}
					: {
							position: "absolute",
							width: 1,
							height: 1,
							overflow: "hidden",
							clipPath: "inset(50%)",
						}
			}
		>
			本文へ移動
		</a>
	);
}

function Person({ member, self = false }: { member: Member; self?: boolean }) {
	return (
		<Inline space="space.100" alignBlock="center" xcss={s.minW0}>
			<Avatar name={member.name} size="medium" />
			<Stack space="space.025" xcss={s.minW0}>
				<Inline space="space.075" alignBlock="center" shouldWrap>
					<Text weight="medium">{member.name}</Text>
					{self && <Lozenge appearance="information">あなた</Lozenge>}
				</Inline>
				<Text size="small" color="color.text.subtle">
					{member.channel ? `# ${member.channel}` : "uチャンネル未設定"}
				</Text>
			</Stack>
		</Inline>
	);
}

function LoadingOrError({
	state,
	onRetry,
}: {
	state: "loading" | "error";
	onRetry: () => void;
}) {
	return state === "loading" ? (
		<Stack space="space.200" alignInline="center" role="status">
			<Spinner size="large" label="読み込んでいます" />
			<Heading size="small" as="h2">
				読み込んでいます
			</Heading>
			<Text color="color.text.subtle">しばらくお待ちください。</Text>
		</Stack>
	) : (
		<EmptyState
			header="データを読み込めませんでした"
			headingLevel={2}
			description="通信状況を確認して、もう一度お試しください。"
			primaryAction={<Button onClick={onRetry}>再読み込み</Button>}
		/>
	);
}

export function CTApp({
	initialScreen = "schedule",
	initialState = "ready",
	signedIn = true,
	initialDialog = false,
}: CTAppProps) {
	const [screen, setScreen] = useState<Screen>(initialScreen);
	const [state, setState] = useState<State>(initialState);
	const [loggedIn, setLoggedIn] = useState(signedIn);
	const [weekIndex, setWeekIndex] = useState(
		initialState === "holiday" ? 1 : 0,
	);
	const [dialog, setDialog] = useState<Member | null>(
		initialDialog || initialState === "deleteError" ? members[9] : null,
	);
	const [deleted, setDeleted] = useState<number[]>(
		initialState === "deleteSuccess" ? [10] : [],
	);
	const [flags, setFlags] = useState<{ id: number; text: string }[]>(
		initialState === "saveSuccess"
			? [{ id: 1, text: "設定を保存しました。" }]
			: initialState === "deleteSuccess"
				? [{ id: 1, text: "加藤 大輔を削除しました。" }]
				: [],
	);
	const notify = (text: string) =>
		setFlags((f) => [{ id: Date.now(), text }, ...f]);
	const [name, setName] = useState(person(1).name);
	const [employee, setEmployee] = useState(
		initialScreen === "onboarding" ? "" : "001",
	);
	const [channel, setChannel] = useState(
		initialScreen === "onboarding" ? "" : "u-misaki",
	);
	const [participating, setParticipating] = useState(true);
	const [savedProfile, setSavedProfile] = useState({
		name: person(1).name,
		employee: "001",
		channel: "u-misaki",
		participating: true,
	});
	const [invalid, setInvalid] = useState(initialState === "validation");
	const mainRef = useRef<HTMLElement>(null);

	const navigate = (next: Screen) => {
		setName(savedProfile.name);
		setEmployee(savedProfile.employee);
		setChannel(savedProfile.channel);
		setParticipating(savedProfile.participating);
		setScreen(next);
		setState("ready");
		setInvalid(false);
		requestAnimationFrame(() => {
			mainRef.current?.focus();
			window.scrollTo(0, 0);
		});
	};

	const currentId = state === "rest" ? 9 : 1;
	const me = {
		...person(currentId),
		...(currentId === 1
			? { name: savedProfile.name, channel: savedProfile.channel }
			: {}),
	};
	const visibleMembers =
		state === "empty"
			? []
			: members
					.filter((m) => !deleted.includes(m.id))
					.map((m) =>
						m.id === 1
							? {
									...m,
									name: savedProfile.name,
									channel: savedProfile.channel,
									active: savedProfile.participating,
								}
							: m,
					);
	const activeCount =
		state === "insufficient"
			? 1
			: visibleMembers.filter((m) => m.active).length;
	const week = weeks[weekIndex];
	const personalPair = week.pairs.find((pair) => pair.includes(currentId));
	const partnerId = personalPair?.find((id) => id !== currentId);
	const displayPerson = (id: number) => ({
		...person(id),
		...(id === 1
			? { name: savedProfile.name, channel: savedProfile.channel }
			: {}),
		...(state === "missingChannel" && id === 2 ? { channel: undefined } : {}),
	});
	const partner = partnerId ? displayPerson(partnerId) : null;
	const hasPairs = activeCount >= 2 && !week.holiday;
	const updateWeek = (index: number) => {
		setWeekIndex(index);
		if (state === "holiday") setState("ready");
	};

	const huddle = (target: Member, prominent = false) =>
		!target.channel ? (
			<Text color="color.text.subtlest">uチャンネル未設定</Text>
		) : (
			<Button
				appearance={prominent ? "primary" : "default"}
				iconBefore={CommentIcon}
				iconAfter={LinkExternalIcon}
				onClick={() =>
					notify(
						`${target.channel} でハドルを開始するデモです。実際の Slack には接続しません。`,
					)
				}
			>
				{prominent ? "Slack でハドルを始める" : "ハドルを始める"}
			</Button>
		);

	const loadingOrError = state === "loading" || state === "error";
	const title =
		screen === "schedule"
			? "CT組み合わせ表"
			: screen === "members"
				? "メンバー一覧"
				: screen === "onboarding"
					? "CTをはじめましょう"
					: screen === "notFound"
						? "ページが見つかりません"
						: "自分の設定";
	const lead =
		screen === "schedule"
			? "毎週月曜、いつもと違うふたりで話す時間。"
			: screen === "members"
				? "CTに参加するメンバーと、参加状況を確認できます。"
				: screen === "onboarding"
					? "組み合わせに必要な情報を入力してください。あとから変更できます。"
					: screen === "settings"
						? "表示名や、CTへの参加状況を変更できます。"
						: "URLが変更されたか、ページが削除された可能性があります。";

	/* ---------- schedule ---------- */
	const renderPersonalArea = (): ReactNode => {
		if (week.holiday)
			return (
				<Box xcss={s.card}>
					<EmptyState
						header="今週のCTはお休みです"
						headingLevel={3}
						headingSize="xsmall"
						description={`${week.holiday}のため、CTはありません。組み合わせは次の開催週へ繰り越します。`}
						primaryAction={
							<Button onClick={() => updateWeek(2)}>次の開催週を見る</Button>
						}
					/>
				</Box>
			);
		if (activeCount < 2)
			return (
				<Box xcss={s.card}>
					<EmptyState
						header="もうひとりの参加を待っています"
						headingLevel={3}
						headingSize="xsmall"
						description="CTには2人以上の参加者が必要です。Slack でログインし、自分の設定から参加できます。"
						primaryAction={
							<Button
								appearance="primary"
								onClick={() =>
									loggedIn
										? navigate("settings")
										: notify("Slack ログインのデモです。")
								}
							>
								{loggedIn ? "自分の設定を開く" : "Slack でログイン"}
							</Button>
						}
					/>
				</Box>
			);
		if (loggedIn && savedProfile.participating)
			return (
				<Box as="section" xcss={s.featured} aria-labelledby="your-pair-title">
					<Stack space="space.300">
						<Inline space="space.100" alignBlock="center">
							<Heading size="xsmall" as="h3" id="your-pair-title">
								{weekIndex === 0 ? "今週" : "この週"}のあなたのCT
							</Heading>
							<Lozenge>14:00 開始</Lozenge>
						</Inline>
						{week.rest === currentId ? (
							<Stack space="space.100">
								<Heading size="large" as="h4">
									今週は、ひと休み。
								</Heading>
								<Text>
									参加者が奇数のため、今週はお休みです。お休みのメンバーは週ごとに入れ替わります。
								</Text>
							</Stack>
						) : (
							partner && (
								<Stack space="space.300">
									<Inline
										space="space.500"
										alignBlock="center"
										alignInline="center"
										shouldWrap
									>
										<Stack space="space.050" alignInline="center">
											<Avatar name={me.name} size="xlarge" />
											<Text weight="medium">{me.name}</Text>
											<Text size="small" color="color.text.subtle">
												あなた
											</Text>
										</Stack>
										<CommentIcon label="" color={token("color.icon.subtle")} />
										<Stack space="space.050" alignInline="center">
											<Avatar name={partner.name} size="xlarge" />
											<Text weight="bold">{partner.name}</Text>
											<Text size="small" color="color.text.subtle">
												今週の話し相手
											</Text>
										</Stack>
									</Inline>
									<Stack space="space.100" alignInline="center">
										{huddle(partner, true)}
										<Text color="color.text.subtle">
											{state === "missingChannel"
												? "相手にチャンネルの設定をお願いしてください。"
												: `# ${partner.channel} で話しましょう`}
										</Text>
									</Stack>
								</Stack>
							)
						)}
					</Stack>
				</Box>
			);
		if (!loggedIn)
			return (
				<SectionMessage
					headingLevel="h3"
					appearance="discovery"
					title="あなたの今週の相手を、すぐに。"
					actions={
						<SectionMessageAction
							onClick={() => notify("Slack ログインのデモです。")}
						>
							Slack でログイン
						</SectionMessageAction>
					}
				>
					<Text>
						Slack でログインすると、自分のペアの確認や参加の切り替えができます。
					</Text>
				</SectionMessage>
			);
		return (
			<SectionMessage
				appearance="information"
				actions={
					<SectionMessageAction onClick={() => navigate("settings")}>
						参加設定を変更する
					</SectionMessageAction>
				}
			>
				<Text>現在、CTには参加していません。</Text>
			</SectionMessage>
		);
	};

	const schedule = (
		<Box xcss={s.scheduleGrid}>
			<Stack space="space.500" xcss={s.minW0}>
				<section aria-labelledby="week-title">
					<Stack space="space.200">
						<Inline
							spread="space-between"
							alignBlock="center"
							shouldWrap
							space="space.200"
						>
							<Inline space="space.150" alignBlock="center">
								<Lozenge
									appearance={weekIndex === 0 ? "inprogress" : "default"}
									isBold
								>
									{week.label}
								</Lozenge>
								<Heading size="large" as="h2" id="week-title">
									{week.date}（月）
								</Heading>
							</Inline>
							<Inline space="space.050">
								<IconButton
									icon={ChevronLeftIcon}
									label="前の週"
									isDisabled={weekIndex === 0}
									onClick={() => updateWeek(weekIndex - 1)}
								/>
								<Button
									isDisabled={weekIndex === 0}
									onClick={() => updateWeek(0)}
								>
									今週
								</Button>
								<IconButton
									icon={ChevronRightIcon}
									label="次の週"
									isDisabled={weekIndex === weeks.length - 1}
									onClick={() => updateWeek(weekIndex + 1)}
								/>
							</Inline>
						</Inline>
						{weekIndex > 0 && (
							<Text size="small" color="color.text.subtle">
								先の週の組み合わせは予定です。参加者の変更により組み替わります。
							</Text>
						)}
						{renderPersonalArea()}
					</Stack>
				</section>

				{hasPairs && (
					<section aria-labelledby="all-pairs-title">
						<Stack space="space.200">
							<Inline spread="space-between" alignBlock="baseline">
								<Heading size="medium" as="h2" id="all-pairs-title">
									みんなの組み合わせ
								</Heading>
								<Text color="color.text.subtle">
									{week.pairs.length}組・お休み1人
								</Text>
							</Inline>
							<Box as="ul" xcss={s.list}>
								{week.pairs.map(([first, second]) => {
									const isMine =
										loggedIn &&
										savedProfile.participating &&
										[first, second].includes(currentId);
									const target = displayPerson(
										first === currentId
											? second
											: second === currentId
												? first
												: second,
									);
									return (
										<Box
											as="li"
											key={first}
											xcss={[s.pairRow, isMine && s.pairRowMine]}
										>
											<Box xcss={s.pairMembers}>
												<Person
													member={displayPerson(first)}
													self={isMine && first === currentId}
												/>
												<Text color="color.text.subtlest" aria-hidden>
													×
												</Text>
												<Person
													member={displayPerson(second)}
													self={isMine && second === currentId}
												/>
											</Box>
											<Inline space="space.100" alignBlock="center">
												{huddle(target)}
											</Inline>
										</Box>
									);
								})}
							</Box>
							<Inline space="space.150" alignBlock="center" shouldWrap>
								<Lozenge>今週のお休み</Lozenge>
								<Person
									member={person(week.rest)}
									self={loggedIn && week.rest === currentId}
								/>
								<Text color="color.text.subtle">また次のCTで。</Text>
							</Inline>
						</Stack>
					</section>
				)}

				<Stack space="space.200">
					<Heading size="medium" as="h2">
						この先のCT
					</Heading>
					<Box xcss={s.list}>
						{weeks.slice(1, 4).map((item, index) => (
							<Pressable
								key={item.date}
								xcss={s.upcomingItem}
								onClick={() => updateWeek(index + 1)}
								aria-label={`${item.short}の組み合わせを見る`}
							>
								<Inline spread="space-between" alignBlock="center">
									<Inline space="space.200" alignBlock="center">
										<Text weight="bold">{item.short}（月）</Text>
										{item.holiday ? (
											<Lozenge appearance="warning">祝日のためお休み</Lozenge>
										) : (
											<Text color="color.text.subtle">14:00〜・予定</Text>
										)}
									</Inline>
									<ChevronRightIcon
										label=""
										color={token("color.icon.subtle")}
									/>
								</Inline>
							</Pressable>
						))}
					</Box>
				</Stack>
			</Stack>

			<aside>
				<Stack space="space.300">
					<Box xcss={s.card}>
						<Stack space="space.200">
							<Inline space="space.100" alignBlock="center">
								<PeopleGroupIcon label="" color={token("color.icon")} />
								<Heading size="xsmall" as="h2">
									CTに参加する人
								</Heading>
							</Inline>
							<Inline space="space.100" alignBlock="baseline">
								<Heading size="xxlarge" as="div">
									{String(activeCount)}
								</Heading>
								<Text>人</Text>
							</Inline>
							<Text color="color.text.subtle">
								参加者が奇数の週は、ひとりずつ順番にお休みします。
							</Text>
							<Link
								href="#members"
								onClick={(e) => {
									e.preventDefault();
									navigate("members");
								}}
							>
								メンバー一覧を見る
							</Link>
						</Stack>
					</Box>
					<Box xcss={s.card}>
						<Stack space="space.150">
							<Heading size="xsmall" as="h2">
								CTの過ごし方
							</Heading>
							<Text as="p">
								仕事の話も、週末の話も。まずは「こんにちは」から。
							</Text>
							<Text as="p">
								時間になったら、相手の uチャンネルでハドルを始めましょう。
							</Text>
							<Text size="small" color="color.text.subtlest">
								毎週月曜 11:00 に Slack でも今週の組み合わせをお知らせします。
							</Text>
						</Stack>
					</Box>
					{loggedIn && (
						<Button appearance="subtle" onClick={() => navigate("settings")}>
							自分の参加設定を変更する
						</Button>
					)}
				</Stack>
			</aside>
		</Box>
	);

	/* ---------- members ---------- */
	const membersView = (
		<Stack space="space.400">
			<Box xcss={s.summary}>
				<Box xcss={s.card}>
					<Text color="color.text.subtle">参加する</Text>
					<Heading size="xlarge" as="div">
						{`${visibleMembers.filter((m) => m.active).length}人`}
					</Heading>
				</Box>
				<Box xcss={s.card}>
					<Text color="color.text.subtle">参加しない</Text>
					<Heading size="xlarge" as="div">
						{`${visibleMembers.filter((m) => !m.active).length}人`}
					</Heading>
				</Box>
				<Box xcss={s.summaryNote}>
					<Text color="color.text.subtle">
						参加者が奇数の週は、ひとりずつ順番にお休みします。参加状況が変わると、今後の組み合わせも変わります。
					</Text>
				</Box>
			</Box>
			{visibleMembers.length === 0 ? (
				<EmptyState
					header="まだメンバーがいません"
					headingLevel={2}
					description="Slack で初めてログインすると、メンバーに登録されます。"
					primaryAction={
						<Button
							appearance="primary"
							onClick={() => notify("Slack ログインのデモです。")}
						>
							Slack でログイン
						</Button>
					}
				/>
			) : (
				<Stack space="space.200">
					<Inline spread="space-between" alignBlock="baseline">
						<Heading size="medium" as="h2">
							すべてのメンバー {visibleMembers.length}人
						</Heading>
						<Text color="color.text.subtle">社員番号順</Text>
					</Inline>
					<DynamicTable
						label="すべてのメンバー"
						head={{
							cells: [
								{ key: "no", content: "社員番号", width: 12 },
								{ key: "member", content: "メンバー" },
								{ key: "status", content: "参加状況", width: 16 },
								{ key: "actions", content: "操作", width: 16 },
							],
						}}
						rows={visibleMembers.map((member) => ({
							key: String(member.id),
							cells: [
								{
									key: "no",
									content: member.incomplete ? (
										<Text color="color.text.subtlest">未設定</Text>
									) : (
										String(member.id).padStart(3, "0")
									),
								},
								{
									key: "member",
									content: (
										<Stack space="space.050">
											<Person
												member={member}
												self={loggedIn && member.id === 1}
											/>
											{member.incomplete && (
												<Box>
													<Lozenge appearance="warning">
														初回設定が未完了
													</Lozenge>
												</Box>
											)}
										</Stack>
									),
								},
								{
									key: "status",
									content: (
										<Lozenge appearance={member.active ? "success" : "default"}>
											{member.active ? "参加する" : "参加しない"}
										</Lozenge>
									),
								},
								{
									key: "actions",
									content: (
										<Inline space="space.050">
											{loggedIn && member.id === 1 && (
												<Button
													appearance="subtle"
													spacing="compact"
													onClick={() => navigate("settings")}
												>
													設定
												</Button>
											)}
											{loggedIn && (
												<Button
													appearance="subtle"
													spacing="compact"
													aria-label={`${member.name}を削除`}
													onClick={() => setDialog(member)}
												>
													削除
												</Button>
											)}
										</Inline>
									),
								},
							],
						}))}
					/>
					{!loggedIn && (
						<Text size="small" color="color.text.subtle">
							メンバーの削除や自分の設定変更には、Slack ログインが必要です。
						</Text>
					)}
				</Stack>
			)}
		</Stack>
	);

	/* ---------- settings / onboarding ---------- */
	const channelOptions = members
		.filter((m) => m.channel)
		.map((m) => ({ label: `# ${m.channel}`, value: m.channel as string }));
	const employeeInvalid = invalid && !/^\d+$/.test(employee);
	const settingsView = (
		<Box xcss={s.settingsGrid}>
			<form
				noValidate
				onSubmit={(event) => {
					event.preventDefault();
					if (
						!name.trim() ||
						!employee.trim() ||
						!channel ||
						!/^\d+$/.test(employee)
					) {
						setInvalid(true);
						requestAnimationFrame(() =>
							document.getElementById("form-errors")?.focus(),
						);
						return;
					}
					if (state === "saveError") return;
					setInvalid(false);
					setSavedProfile({ name, employee, channel, participating });
					setScreen("schedule");
					setState("ready");
					notify(
						"設定を保存しました。表示への反映はデモです。組み合わせの再計算は行いません。",
					);
				}}
			>
				<Stack space="space.300">
					<Inline space="space.150" alignBlock="center">
						<Avatar name={me.name} size="large" />
						<Stack space="space.025">
							<Text weight="bold">Slack アカウント</Text>
							<Text color="color.text.subtle">{person(1).name}</Text>
						</Stack>
					</Inline>
					{invalid && (
						<Box id="form-errors" tabIndex={-1}>
							<SectionMessage
								headingLevel="h2"
								appearance="error"
								title="入力内容を確認してください"
							>
								<Text>
									名前・社員番号・uチャンネルは必須です。社員番号は半角数字で入力してください。
								</Text>
							</SectionMessage>
						</Box>
					)}
					{state === "saveError" && (
						<SectionMessage
							headingLevel="h2"
							appearance="error"
							title="設定を保存できませんでした"
						>
							<Text>
								入力内容は保持されています。時間をおいて再度保存してください。
							</Text>
						</SectionMessage>
					)}
					<Stack space="space.050">
						<Label htmlFor="display-name">名前（必須）</Label>
						<Textfield
							id="display-name"
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
							isRequired
							isInvalid={invalid && !name.trim()}
							aria-describedby="name-help"
						/>
						{invalid && !name.trim() ? (
							<ErrorMessage>名前を入力してください。</ErrorMessage>
						) : (
							<HelperMessage>
								<Text id="name-help" size="small" color="color.text.subtle">
									組み合わせ表とメンバー一覧に表示されます。
								</Text>
							</HelperMessage>
						)}
					</Stack>
					<Stack space="space.050">
						<Label htmlFor="employee-id">社員番号（必須）</Label>
						<Textfield
							id="employee-id"
							value={employee}
							inputMode="numeric"
							onChange={(e) => setEmployee(e.currentTarget.value)}
							isRequired
							isInvalid={employeeInvalid}
							aria-describedby="employee-help"
						/>
						{employeeInvalid ? (
							<ErrorMessage>
								社員番号を半角数字で入力してください。
							</ErrorMessage>
						) : (
							<HelperMessage>
								<Text id="employee-help" size="small" color="color.text.subtle">
									組み合わせを決める並び順に使います。
								</Text>
							</HelperMessage>
						)}
					</Stack>
					<Stack space="space.050">
						<Label htmlFor="channel">uチャンネル（必須）</Label>
						<Select
							inputId="channel"
							options={channelOptions}
							value={channelOptions.find((o) => o.value === channel) ?? null}
							onChange={(o) => setChannel(o?.value ?? "")}
							placeholder="チャンネルを選択してください"
							isInvalid={invalid && !channel}
							aria-describedby="channel-help"
						/>
						{invalid && !channel ? (
							<ErrorMessage>uチャンネルを選択してください。</ErrorMessage>
						) : (
							<HelperMessage>
								<Text id="channel-help" size="small" color="color.text.subtle">
									相手がハドルを始める、あなたの個人用チャンネルです。
								</Text>
							</HelperMessage>
						)}
					</Stack>
					<fieldset style={{ border: 0, padding: 0, margin: 0 }}>
						<Legend>CTへの参加</Legend>
						<Checkbox
							label="CTに参加する"
							isChecked={participating}
							onChange={(e) => setParticipating(e.currentTarget.checked)}
						/>
						<HelperMessage>
							参加状況を変更すると、全員の今後の組み合わせが変わります。休職中などはチェックを外し、復帰したら再度チェックしてください。
						</HelperMessage>
					</fieldset>
					<Inline space="space.100">
						<Button type="submit" appearance="primary">
							{screen === "onboarding"
								? "設定を保存してはじめる"
								: "変更を保存する"}
						</Button>
						{screen !== "onboarding" && (
							<Button appearance="subtle" onClick={() => navigate("schedule")}>
								キャンセル
							</Button>
						)}
					</Inline>
				</Stack>
			</form>
			<aside>
				<Stack space="space.200">
					<Heading size="xsmall" as="h2">
						あなたらしい名前で。
					</Heading>
					<Text as="p">
						Slack
						のプロフィールから取り込んだ名前を、CTで使う表示名に変更できます。
					</Text>
					<Heading size="xsmall" as="h2">
						参加はいつでも変更できます
					</Heading>
					<Text as="p">
						忙しい時期は、無理せずお休みを。再開するときも、この画面から変更できます。
					</Text>
					<Text size="small" color="color.text.subtlest">
						変更できるのは、自分の設定だけです。
					</Text>
				</Stack>
			</aside>
		</Box>
	);

	return (
		<Box xcss={s.shell}>
			<SkipLink />
			<Box as="header" xcss={s.brandBar}>
				<Inline xcss={s.inner} spread="space-between" alignBlock="center">
					{/* @atlaskit/link は target=_blank で外部リンクアイコンを付与し、@atlaskit/image は
					    幅指定なしの SVG が 0px で潰れたため、ロゴのみ素の a/img を使う（lint 警告 2件） */}
					<a href="https://www.gaji.jp/" target="_blank" rel="noreferrer">
						<img
							src="/gaji-labo-logo.svg"
							alt="Gaji-Labo（新しいタブで開く）"
							style={{ height: 24, display: "block" }}
						/>
					</a>
					<Box xcss={s.inverseText}>
						<Text size="small" color="color.text.inverse">
							Communication Time
						</Text>
					</Box>
				</Inline>
			</Box>
			<Box xcss={s.serviceBar}>
				<Inline
					xcss={s.inner}
					spread="space-between"
					alignBlock="center"
					space="space.200"
				>
					<Button
						appearance="subtle"
						iconBefore={CommentIcon}
						onClick={() => navigate("schedule")}
					>
						CTスケジュール
					</Button>
					{loggedIn ? (
						<Inline space="space.100" alignBlock="center">
							<Pressable
								xcss={s.headerLink}
								onClick={() => navigate("settings")}
								aria-label={`${me.name}の設定`}
							>
								<Inline space="space.075" alignBlock="center">
									<Avatar name={me.name} size="small" />
									<Text>{me.name}</Text>
								</Inline>
							</Pressable>
							<Button
								appearance="subtle"
								onClick={() => {
									setLoggedIn(false);
									navigate("schedule");
								}}
							>
								ログアウト
							</Button>
						</Inline>
					) : (
						<Button
							onClick={() =>
								notify(
									"Slack ログインのデモです。認証後の表示は「ログイン中」の状態で確認できます。",
								)
							}
						>
							Slack でログイン
						</Button>
					)}
				</Inline>
			</Box>

			<Box as="main" id="main" ref={mainRef} tabIndex={-1} xcss={s.main}>
				<Stack space="space.400">
					{screen !== "schedule" && (
						<Breadcrumbs label="パンくず">
							<BreadcrumbsItem
								text="CT組み合わせ表"
								href="#"
								onClick={(e) => {
									e.preventDefault();
									navigate("schedule");
								}}
							/>
							<BreadcrumbsItem text={title} />
						</Breadcrumbs>
					)}
					<Inline
						spread="space-between"
						alignBlock="end"
						shouldWrap
						space="space.200"
					>
						<Stack space="space.100">
							<Heading size="xlarge" as="h1">
								{title}
							</Heading>
							<Text color="color.text.subtle">{lead}</Text>
						</Stack>
						{screen === "schedule" && (
							<Inline space="space.075" alignBlock="center">
								<CalendarIcon label="" color={token("color.icon.subtle")} />
								<Text color="color.text.subtle">毎週月曜 14:00〜</Text>
							</Inline>
						)}
					</Inline>

					{state === "loginError" && (
						<SectionMessage
							headingLevel="h2"
							appearance="error"
							title="Slack にログインできませんでした"
							children={<Text>時間をおいて、もう一度お試しください。</Text>}
							actions={
								<SectionMessageAction
									onClick={() => notify("Slack ログインを再試行するデモです。")}
								>
									もう一度ログインする
								</SectionMessageAction>
							}
						/>
					)}

					{loadingOrError ? (
						<LoadingOrError state={state} onRetry={() => setState("ready")} />
					) : (
						<>
							{screen === "schedule" && schedule}
							{screen === "members" && membersView}
							{(screen === "settings" || screen === "onboarding") &&
								settingsView}
							{screen === "notFound" && (
								<EmptyState
									header="404"
									headingLevel={2}
									description="お探しのページは見つかりませんでした。"
									primaryAction={
										<Button
											appearance="primary"
											onClick={() => navigate("schedule")}
										>
											CT組み合わせ表へ戻る
										</Button>
									}
								/>
							)}
						</>
					)}
				</Stack>
			</Box>

			<Box as="footer" xcss={s.footer}>
				<Inline
					xcss={s.inner}
					spread="space-between"
					alignBlock="center"
					shouldWrap
					space="space.200"
				>
					<Stack space="space.050">
						<Text weight="bold">Gaji-Labo</Text>
						<Text size="small" color="color.text.subtle">
							ちょっと話す。それだけで、チームは近くなる。
						</Text>
					</Stack>
					<Text size="small" color="color.text.subtlest">
						UIプレビュー · データ・操作はデモです
					</Text>
				</Inline>
			</Box>

			<ModalTransition>
				{dialog && (
					<Modal onClose={() => setDialog(null)} width="small">
						<ModalHeader hasCloseButton>
							<ModalTitle appearance="danger">
								{dialog.name}さんを削除しますか？
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<Stack space="space.200">
								<Text as="p">
									メンバー一覧と今後の組み合わせから外れます。全員の組み合わせが変わる場合があります。この操作は取り消せません。
								</Text>
								{state === "deleteError" && (
									<SectionMessage appearance="error">
										<Text>
											削除に失敗しました。時間をおいて、もう一度お試しください。
										</Text>
									</SectionMessage>
								)}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								appearance="subtle"
								onClick={() => setDialog(null)}
								autoFocus
							>
								キャンセル
							</Button>
							<Button
								appearance="danger"
								onClick={() => {
									if (state === "deleteError") return;
									setDeleted([...deleted, dialog.id]);
									notify(
										`${dialog.name}を削除しました。デモの一覧のみ変更しています。`,
									);
									setDialog(null);
								}}
							>
								削除する
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>

			<FlagGroup
				onDismissed={(id) => setFlags((f) => f.filter((x) => x.id !== id))}
				label="通知"
			>
				{flags.map((f) => (
					<Flag
						key={f.id}
						id={f.id}
						icon={
							<StatusSuccessIcon
								label="成功"
								color={token("color.icon.success")}
							/>
						}
						title={f.text}
					/>
				))}
			</FlagGroup>
		</Box>
	);
}

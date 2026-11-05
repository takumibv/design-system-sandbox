/**
 * CTスケジュール UI を Primer（GitHub）で再現した版。
 *
 * 原本: takumibv/digital-go-design-system@codex/ct-schedule-ui の src/pages/CTApp.tsx
 * 状態・props・固定データ (fixtures.ts) は原本と同一にし、見た目を @primer/react の
 * コンポーネントと @primer/primitives のトークンに置き換えている。
 *
 * 実装前に @primer/mcp（harness-logs/）で読んだ指針を、判断した箇所にコメントで残す。
 *   [MCP:xxx] = その判断の出典になった MCP ツール
 * primer_coding_guidelines が「sx と Box は使わず CSS Modules で書く」と指示するため、
 * 部品で表せないレイアウトだけを CTApp.module.css（トークンのみ・lint_css 済み）に置く。
 */
import {
	AlertIcon,
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CommentDiscussionIcon,
	LinkExternalIcon,
	PeopleIcon,
} from "@primer/octicons-react";
import {
	ActionList,
	AriaStatus,
	Banner,
	Breadcrumbs,
	Button,
	Checkbox,
	CheckboxGroup,
	ConfirmationDialog,
	FormControl,
	Header,
	Heading,
	IconButton,
	Label,
	Link,
	PageLayout,
	Select,
	Spinner,
	Stack,
	Text,
	TextInput,
} from "@primer/react";
import {
	Blankslate,
	DataTable,
	ScrollableRegion,
} from "@primer/react/experimental";
import { useRef, useState, type ReactNode } from "react";
import styles from "./CTApp.module.css";
import { type Member, members, person, weeks } from "./fixtures";

export type Screen =
	"schedule" | "members" | "settings" | "onboarding" | "notFound";
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

/** ページ上部に 1 つだけ出す通知。[MCP:get_component_usage_guidelines Banner]「1 ページに Banner は 1 つまで」 */
type Notice = {
	variant: "success" | "info" | "critical";
	title: string;
	description?: string;
	action?: { label: string; onClick: () => void };
};

/* ---------- small building blocks ---------- */

/**
 * Primer の Avatar は画像（src）専用でイニシャルを出せない [MCP:get_component Avatar]。
 * 原本の「色付きイニシャルで人を見分ける」意図を残すため、トークンだけで描く小さな部品を自作した。
 * 色は [MCP:get_design_token_specs] の Logic Matrix（muted 背景 + 同じ役割の fg）に従う。
 */
function InitialAvatar({
	member,
	size = "medium",
}: {
	member: Pick<Member, "name" | "color">;
	size?: "small" | "medium" | "large" | "xlarge";
}) {
	return (
		<span
			aria-hidden="true"
			className={styles.Avatar}
			data-color={member.color}
			data-size={size}
		>
			{member.name.slice(0, 1)}
		</span>
	);
}

function Person({ member, self = false }: { member: Member; self?: boolean }) {
	return (
		<Stack
			direction="horizontal"
			gap="condensed"
			align="center"
			className={styles.MinW0}
		>
			<InitialAvatar member={member} />
			<Stack gap="none" className={styles.MinW0}>
				<Stack
					direction="horizontal"
					gap="condensed"
					align="center"
					wrap="wrap"
				>
					<Text weight="semibold">{member.name}</Text>
					{/* 「あなた」は色だけに頼らず文字で示す。accent = 選択・現在 [MCP:get_color_usage Color roles] */}
					{self && <Label variant="accent">あなた</Label>}
				</Stack>
				<Text size="small" className={styles.Muted}>
					{member.channel ? `# ${member.channel}` : "uチャンネル未設定"}
				</Text>
			</Stack>
		</Stack>
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
		// [MCP:get_pattern Loading] 不定の待ち時間は Spinner ＋説明文
		<div className={styles.Box}>
			<Stack align="center" gap="condensed" padding="spacious">
				<Spinner size="medium" srText={null} />
				<AriaStatus>
					<Heading as="h2" variant="small">
						読み込んでいます
					</Heading>
				</AriaStatus>
				<Text className={styles.Muted}>しばらくお待ちください。</Text>
			</Stack>
		</div>
	) : (
		// [MCP:get_pattern Empty States] エラーの空状態は遊びのない alert アイコンを使う
		<Blankslate border>
			<Blankslate.Visual>
				<AlertIcon size="medium" />
			</Blankslate.Visual>
			<Blankslate.Heading as="h2">
				データを読み込めませんでした
			</Blankslate.Heading>
			<Blankslate.Description>
				通信状況を確認して、もう一度お試しください。
			</Blankslate.Description>
			<Blankslate.PrimaryAction onClick={onRetry}>
				再読み込み
			</Blankslate.PrimaryAction>
		</Blankslate>
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
	const [notice, setNotice] = useState<Notice | null>(
		initialState === "saveSuccess"
			? { variant: "success", title: "設定を保存しました。" }
			: null,
	);
	// [MCP:get_pattern Delete] 削除成功は見える Banner を出さず、ライブリージョンで読み上げる
	const [announcement, setAnnouncement] = useState(
		initialState === "deleteSuccess" ? "加藤 大輔を削除しました。" : "",
	);
	const demo = (title: string) => setNotice({ variant: "info", title });
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
	const nameRef = useRef<HTMLInputElement>(null);
	const employeeRef = useRef<HTMLInputElement>(null);
	const channelRef = useRef<HTMLSelectElement>(null);
	const membersHeadingRef = useRef<HTMLHeadingElement>(null);

	const navigate = (next: Screen, nextNotice: Notice | null = null) => {
		setName(savedProfile.name);
		setEmployee(savedProfile.employee);
		setChannel(savedProfile.channel);
		setParticipating(savedProfile.participating);
		setScreen(next);
		setState("ready");
		setInvalid(false);
		setNotice(nextNotice);
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

	/** [MCP:get_component_usage_guidelines Button]「primary は 1 ページに 1 つ」→ 主役のハドルだけ primary */
	const huddle = (target: Member, prominent = false) =>
		!target.channel ? (
			<Text className={styles.Subtle}>uチャンネル未設定</Text>
		) : (
			<Button
				variant={prominent ? "primary" : "default"}
				size={prominent ? "large" : "medium"}
				leadingVisual={CommentDiscussionIcon}
				trailingVisual={LinkExternalIcon}
				onClick={() =>
					demo(
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
				<Blankslate border>
					<Blankslate.Visual>
						<CalendarIcon size="medium" />
					</Blankslate.Visual>
					<Label variant="attention">祝日</Label>
					<Blankslate.Heading as="h3">今週のCTはお休みです</Blankslate.Heading>
					<Blankslate.Description>
						{week.holiday}
						のため、CTはありません。組み合わせは次の開催週へ繰り越します。
					</Blankslate.Description>
					<Blankslate.PrimaryAction onClick={() => updateWeek(2)}>
						次の開催週を見る
					</Blankslate.PrimaryAction>
				</Blankslate>
			);
		if (activeCount < 2)
			return (
				<Blankslate border>
					<Blankslate.Visual>
						<PeopleIcon size="medium" />
					</Blankslate.Visual>
					<Blankslate.Heading as="h3">
						もうひとりの参加を待っています
					</Blankslate.Heading>
					<Blankslate.Description>
						CTには2人以上の参加者が必要です。Slack
						でログインし、自分の設定から参加できます。
					</Blankslate.Description>
					<Blankslate.PrimaryAction
						onClick={() =>
							loggedIn
								? navigate("settings")
								: demo("Slack ログインのデモです。")
						}
					>
						{loggedIn ? "自分の設定を開く" : "Slack でログイン"}
					</Blankslate.PrimaryAction>
				</Blankslate>
			);
		if (loggedIn && savedProfile.participating)
			return (
				<section className={styles.Featured} aria-labelledby="your-pair-title">
					<Stack gap="spacious">
						<Stack
							direction="horizontal"
							justify="space-between"
							align="center"
							wrap="wrap"
						>
							<Heading
								as="h3"
								variant="small"
								id="your-pair-title"
								className={styles.AccentText}
							>
								{weekIndex === 0 ? "今週" : "この週"}のあなたのCT
							</Heading>
							<Text size="small" className={styles.Muted}>
								14:00 開始
							</Text>
						</Stack>
						{week.rest === currentId ? (
							<Stack gap="condensed" align="center">
								<Heading as="h4" variant="large">
									今週は、ひと休み。
								</Heading>
								<Text className={styles.Muted}>
									参加者が奇数のため、今週はお休みです。お休みのメンバーは週ごとに入れ替わります。
								</Text>
							</Stack>
						) : (
							partner && (
								<Stack gap="spacious" align="center">
									<Stack
										direction="horizontal"
										gap="spacious"
										align="center"
										justify="center"
										wrap="wrap"
									>
										<Stack gap="condensed" align="center">
											<InitialAvatar member={me} size="xlarge" />
											<Heading as="h4" variant="medium">
												{me.name}
											</Heading>
											<Text size="small" className={styles.Muted}>
												あなた
											</Text>
										</Stack>
										<CommentDiscussionIcon
											size="medium"
											className={styles.AccentText}
										/>
										<Stack gap="condensed" align="center">
											<InitialAvatar member={partner} size="xlarge" />
											<Heading as="h4" variant="medium">
												{partner.name}
											</Heading>
											<Text size="small" className={styles.Muted}>
												今週の話し相手
											</Text>
										</Stack>
									</Stack>
									<Stack gap="condensed" align="center">
										{huddle(partner, true)}
										<Text size="small" className={styles.Muted}>
											{state === "missingChannel"
												? "相手にチャンネルの設定をお願いしてください。"
												: `# ${partner.channel} で話しましょう`}
										</Text>
									</Stack>
								</Stack>
							)
						)}
					</Stack>
				</section>
			);
		if (!loggedIn)
			// ログイン失敗時は上部に critical Banner が出るため、ここは Banner にしない
			// [MCP:get_component_usage_guidelines Banner]「1 ページに Banner は 1 つまで」
			return (
				<section className={styles.Prompt} aria-labelledby="login-prompt-title">
					<Stack gap="normal" align="start">
						<Heading as="h3" variant="medium" id="login-prompt-title">
							あなたの今週の相手を、すぐに。
						</Heading>
						<Text>
							Slack
							でログインすると、自分のペアの確認や参加の切り替えができます。
						</Text>
						<Button onClick={() => demo("Slack ログインのデモです。")}>
							Slack でログイン
						</Button>
					</Stack>
				</section>
			);
		return (
			<Banner
				variant="info"
				title="CTに参加していません"
				hideTitle
				description="現在、CTには参加していません。"
				primaryAction={
					<Banner.PrimaryAction onClick={() => navigate("settings")}>
						参加設定を変更する
					</Banner.PrimaryAction>
				}
			/>
		);
	};

	const scheduleMain = (
		<Stack gap="spacious">
			<section aria-labelledby="week-title">
				<Stack gap="normal">
					<Stack
						direction="horizontal"
						justify="space-between"
						align="center"
						wrap="wrap"
						gap="normal"
					>
						<Stack direction="horizontal" gap="condensed" align="center">
							<Label
								variant={weekIndex === 0 ? "accent" : "secondary"}
								size="large"
							>
								{week.label}
							</Label>
							<Heading as="h2" variant="medium" id="week-title">
								{week.date}（月）
							</Heading>
						</Stack>
						<Stack direction="horizontal" gap="condensed">
							{/* [MCP:get_component_usage_guidelines IconButton] ツールチップ付きのラベルで意味を補う */}
							<IconButton
								icon={ChevronLeftIcon}
								aria-label="前の週"
								disabled={weekIndex === 0}
								onClick={() => updateWeek(weekIndex - 1)}
							/>
							<Button disabled={weekIndex === 0} onClick={() => updateWeek(0)}>
								今週
							</Button>
							<IconButton
								icon={ChevronRightIcon}
								aria-label="次の週"
								disabled={weekIndex === weeks.length - 1}
								onClick={() => updateWeek(weekIndex + 1)}
							/>
						</Stack>
					</Stack>
					{weekIndex > 0 && (
						<Text size="small" className={styles.Muted}>
							先の週の組み合わせは予定です。参加者の変更により組み替わります。
						</Text>
					)}
					{renderPersonalArea()}
				</Stack>
			</section>

			{hasPairs && (
				<section aria-labelledby="all-pairs-title">
					<Stack gap="normal">
						<Stack
							direction="horizontal"
							justify="space-between"
							align="baseline"
						>
							<Heading as="h2" variant="small" id="all-pairs-title">
								みんなの組み合わせ
							</Heading>
							<Text size="small" className={styles.Muted}>
								{week.pairs.length}組・お休み1人
							</Text>
						</Stack>
						<ul className={styles.PairList}>
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
									<li
										key={first}
										className={styles.PairRow}
										data-mine={isMine || undefined}
									>
										<div className={styles.PairMembers}>
											<Person
												member={displayPerson(first)}
												self={isMine && first === currentId}
											/>
											<Text className={styles.Subtle} aria-hidden="true">
												×
											</Text>
											<Person
												member={displayPerson(second)}
												self={isMine && second === currentId}
											/>
										</div>
										<Stack gap="none" align="center">
											{huddle(target)}
										</Stack>
									</li>
								);
							})}
						</ul>
						<div className={styles.RestRow}>
							<Stack
								direction="horizontal"
								gap="normal"
								align="center"
								wrap="wrap"
								justify="space-between"
							>
								<Stack direction="horizontal" gap="normal" align="center">
									<Label variant="secondary">今週のお休み</Label>
									<Person
										member={person(week.rest)}
										self={loggedIn && week.rest === currentId}
									/>
								</Stack>
								<Text size="small" className={styles.Muted}>
									また次のCTで。
								</Text>
							</Stack>
						</div>
					</Stack>
				</section>
			)}

			<section aria-labelledby="upcoming-title">
				<Stack gap="normal">
					<Heading as="h2" variant="small" id="upcoming-title">
						この先のCT
					</Heading>
					{/* 行全体を押せる一覧。ActionList は「操作できる項目の縦並び」の部品 [MCP:get_component_usage_guidelines ActionList] */}
					<div className={styles.Box}>
						<ActionList
							variant="full"
							aria-labelledby="upcoming-title"
							showDividers
						>
							{weeks.slice(1, 4).map((item, index) => (
								<ActionList.Item
									key={item.date}
									onSelect={() => updateWeek(index + 1)}
								>
									<Text weight="semibold">{item.short}（月）</Text>
									<ActionList.Description variant="block">
										{item.holiday ? "祝日のためお休み" : "14:00〜・予定"}
									</ActionList.Description>
									<ActionList.TrailingVisual>
										{item.holiday ? (
											<Label variant="attention">お休み</Label>
										) : (
											<ChevronRightIcon />
										)}
									</ActionList.TrailingVisual>
								</ActionList.Item>
							))}
						</ActionList>
					</div>
				</Stack>
			</section>
		</Stack>
	);

	const scheduleAside = (
		<Stack gap="spacious">
			<section className={styles.Box} aria-labelledby="active-title">
				<Stack gap="normal" padding="normal">
					<Stack direction="horizontal" gap="condensed" align="center">
						<PeopleIcon />
						<Heading as="h2" variant="small" id="active-title">
							CTに参加する人
						</Heading>
					</Stack>
					<Stack direction="horizontal" gap="condensed" align="baseline">
						<span className={styles.BigNumber}>{activeCount}</span>
						<Text>人</Text>
					</Stack>
					<Text size="small" className={styles.Muted}>
						参加者が奇数の週は、ひとりずつ順番にお休みします。
					</Text>
					{/* 画面遷移はリンク [MCP:get_component_usage_guidelines Link]「操作にリンクを使わない」 */}
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
			</section>
			<section aria-labelledby="howto-title">
				<Stack gap="condensed" padding="normal">
					<Heading as="h2" variant="small" id="howto-title">
						CTの過ごし方
					</Heading>
					<Text as="p" className={styles.Paragraph}>
						仕事の話も、週末の話も。まずは「こんにちは」から。
					</Text>
					<Text as="p" className={styles.Paragraph}>
						時間になったら、相手の uチャンネルでハドルを始めましょう。
					</Text>
					<Text
						as="p"
						size="small"
						className={`${styles.Paragraph} ${styles.Muted}`}
					>
						毎週月曜 11:00 に Slack でも今週の組み合わせをお知らせします。
					</Text>
					{loggedIn && (
						<Link
							href="#settings"
							onClick={(e) => {
								e.preventDefault();
								navigate("settings");
							}}
						>
							自分の参加設定を変更する
						</Link>
					)}
				</Stack>
			</section>
		</Stack>
	);

	/* ---------- members ---------- */
	const membersView = (
		<Stack gap="spacious">
			<div className={styles.Summary}>
				<Stack
					direction={{ narrow: "vertical", regular: "horizontal" }}
					gap="spacious"
					align={{ narrow: "start", regular: "center" }}
				>
					<Stack direction="horizontal" gap="spacious">
						<Stack gap="none">
							<Text size="small" className={styles.Muted}>
								参加する
							</Text>
							<span className={styles.BigNumber}>
								{visibleMembers.filter((m) => m.active).length}
								<Text size="medium"> 人</Text>
							</span>
						</Stack>
						<Stack gap="none">
							<Text size="small" className={styles.Muted}>
								参加しない
							</Text>
							<span className={styles.BigNumber}>
								{visibleMembers.filter((m) => !m.active).length}
								<Text size="medium"> 人</Text>
							</span>
						</Stack>
					</Stack>
					<Text size="small" className={styles.Muted}>
						参加者が奇数の週は、ひとりずつ順番にお休みします。参加状況が変わると、今後の組み合わせも変わります。
					</Text>
				</Stack>
			</div>
			{visibleMembers.length === 0 ? (
				<Blankslate border>
					<Blankslate.Visual>
						<PeopleIcon size="medium" />
					</Blankslate.Visual>
					<Blankslate.Heading as="h2">
						まだメンバーがいません
					</Blankslate.Heading>
					<Blankslate.Description>
						Slack で初めてログインすると、メンバーに登録されます。
					</Blankslate.Description>
					<Blankslate.PrimaryAction
						onClick={() => demo("Slack ログインのデモです。")}
					>
						Slack でログイン
					</Blankslate.PrimaryAction>
				</Blankslate>
			) : (
				<Stack gap="condensed">
					<Stack
						direction="horizontal"
						justify="space-between"
						align="baseline"
					>
						<Heading
							as="h2"
							variant="small"
							id="members-title"
							ref={membersHeadingRef}
							tabIndex={-1}
						>
							すべてのメンバー {visibleMembers.length}人
						</Heading>
						<Text size="small" id="members-subtitle" className={styles.Muted}>
							社員番号順
						</Text>
					</Stack>
					{/* 390px では列が潰れて「操作」列が見えなくなったため、キーボードでも横スクロールできる領域に入れる */}
					<ScrollableRegion aria-labelledby="members-title">
						<div className={styles.TableMinWidth}>
							<DataTable
								aria-labelledby="members-title"
								aria-describedby="members-subtitle"
								data={visibleMembers}
								columns={[
									{
										header: "社員番号",
										field: "id",
										width: "auto",
										renderCell: (member) =>
											member.incomplete ? (
												<Text className={styles.Muted}>未設定</Text>
											) : (
												String(member.id).padStart(3, "0")
											),
									},
									{
										header: "メンバー",
										field: "name",
										rowHeader: true,
										renderCell: (member) => (
											<Stack gap="condensed" align="start">
												<Person
													member={member}
													self={loggedIn && member.id === 1}
												/>
												{member.incomplete && (
													<Label variant="attention">初回設定が未完了</Label>
												)}
											</Stack>
										),
									},
									{
										header: "参加状況",
										field: "active",
										width: "auto",
										renderCell: (member) => (
											<Label variant={member.active ? "success" : "secondary"}>
												{member.active ? "参加する" : "参加しない"}
											</Label>
										),
									},
									{
										header: "操作",
										id: "actions",
										width: "auto",
										align: "end",
										renderCell: (member) =>
											loggedIn ? (
												<Stack
													direction="horizontal"
													gap="condensed"
													justify="end"
												>
													{member.id === 1 && (
														<Link
															href="#settings"
															onClick={(e) => {
																e.preventDefault();
																navigate("settings");
															}}
														>
															設定
														</Link>
													)}
													<Button
														size="small"
														variant="invisible"
														aria-label={`${member.name}を削除`}
														onClick={() => setDialog(member)}
													>
														削除
													</Button>
												</Stack>
											) : null,
									},
								]}
							/>
						</div>
					</ScrollableRegion>
					{!loggedIn && (
						<Text
							as="p"
							size="small"
							className={`${styles.Paragraph} ${styles.Muted}`}
						>
							メンバーの削除や自分の設定変更には、Slack ログインが必要です。
						</Text>
					)}
				</Stack>
			)}
		</Stack>
	);

	/* ---------- settings / onboarding ---------- */
	const nameInvalid = invalid && !name.trim();
	const employeeInvalid = invalid && !/^\d+$/.test(employee);
	const channelInvalid = invalid && !channel;
	const settingsMain = (
		<form
			noValidate
			onSubmit={(event) => {
				event.preventDefault();
				const badName = !name.trim();
				const badEmployee = !/^\d+$/.test(employee);
				const badChannel = !channel;
				if (badName || badEmployee || badChannel) {
					setInvalid(true);
					// [MCP:get_pattern Forms] 要約に操作できる要素がないとき、最初の不正な入力欄へフォーカスを移す
					requestAnimationFrame(() =>
						(badName
							? nameRef
							: badEmployee
								? employeeRef
								: channelRef
						).current?.focus(),
					);
					return;
				}
				if (state === "saveError") return;
				setInvalid(false);
				setSavedProfile({ name, employee, channel, participating });
				// [MCP:get_pattern Notification message] 保存後に別画面へ移り、成功が見た目で分からない → Banner
				navigate("schedule", {
					variant: "success",
					title: "設定を保存しました。",
					description:
						"表示への反映はデモです。組み合わせの再計算は行いません。",
				});
			}}
		>
			<Stack gap="spacious">
				<div className={styles.Account}>
					<Stack direction="horizontal" gap="normal" align="center">
						<InitialAvatar member={me} size="large" />
						<Stack gap="none">
							<Text size="small" className={styles.Muted}>
								Slack アカウント
							</Text>
							<Text>{person(1).name}</Text>
						</Stack>
					</Stack>
				</div>
				{invalid && (
					// [MCP:get_pattern Forms] 複数の誤りはフォーム上部の Banner にまとめ、各項目にも Validation を出す
					<Banner
						variant="critical"
						title="入力内容を確認してください"
						description="名前・社員番号・uチャンネルは必須です。社員番号は半角数字で入力してください。"
					/>
				)}
				{state === "saveError" && (
					// [MCP:get_pattern Saving] 保存に失敗しても入力内容は保持し、失敗を伝える
					<Banner
						variant="critical"
						title="設定を保存できませんでした"
						description="入力内容は保持されています。時間をおいて再度保存してください。"
					/>
				)}
				{/* [MCP:get_pattern Forms] 必須は見た目とコードの両方で示す。誤りの時は Caption を隠して Validation だけ出す */}
				<FormControl required>
					<FormControl.Label>名前</FormControl.Label>
					<TextInput
						ref={nameRef}
						block
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
						validationStatus={nameInvalid ? "error" : undefined}
					/>
					{nameInvalid ? (
						<FormControl.Validation variant="error">
							名前を入力してください。
						</FormControl.Validation>
					) : (
						<FormControl.Caption>
							組み合わせ表とメンバー一覧に表示されます。
						</FormControl.Caption>
					)}
				</FormControl>
				<FormControl required>
					<FormControl.Label>社員番号</FormControl.Label>
					<TextInput
						ref={employeeRef}
						block
						value={employee}
						inputMode="numeric"
						onChange={(e) => setEmployee(e.currentTarget.value)}
						validationStatus={employeeInvalid ? "error" : undefined}
					/>
					{employeeInvalid ? (
						<FormControl.Validation variant="error">
							社員番号を半角数字で入力してください。
						</FormControl.Validation>
					) : (
						<FormControl.Caption>
							組み合わせを決める並び順に使います。
						</FormControl.Caption>
					)}
				</FormControl>
				<FormControl required>
					<FormControl.Label>uチャンネル</FormControl.Label>
					{/* Primer の Select はネイティブの <select>。placeholder は選べない先頭の option になる */}
					<Select
						ref={channelRef}
						block
						value={channel}
						placeholder="チャンネルを選択してください"
						onChange={(e) => setChannel(e.currentTarget.value)}
						validationStatus={channelInvalid ? "error" : undefined}
					>
						{members
							.filter((m) => m.channel)
							.map((m) => (
								<Select.Option key={m.channel} value={m.channel as string}>
									# {m.channel}
								</Select.Option>
							))}
					</Select>
					{channelInvalid ? (
						<FormControl.Validation variant="error">
							uチャンネルを選択してください。
						</FormControl.Validation>
					) : (
						<FormControl.Caption>
							相手がハドルを始める、あなたの個人用チャンネルです。
						</FormControl.Caption>
					)}
				</FormControl>
				{/* [MCP:get_pattern Forms]「単独のチェックボックスは必須にできない・個別の検証メッセージを持たない」 */}
				<CheckboxGroup>
					<CheckboxGroup.Label>CTへの参加</CheckboxGroup.Label>
					<FormControl>
						<Checkbox
							checked={participating}
							onChange={(e) => setParticipating(e.currentTarget.checked)}
						/>
						<FormControl.Label>CTに参加する</FormControl.Label>
					</FormControl>
					<CheckboxGroup.Caption>
						参加状況を変更すると、全員の今後の組み合わせが変わります。休職中などはチェックを外し、復帰したら再び参加できます。
					</CheckboxGroup.Caption>
				</CheckboxGroup>
				{/* [MCP:get_component_usage_guidelines Button]「primary は ButtonGroup の末尾」
				    [MCP:get_pattern Saving]「保存＋キャンセルは primary＋secondary」「保存ボタンを無効化しない」 */}
				<Stack direction="horizontal" gap="condensed">
					{screen !== "onboarding" && (
						<Button onClick={() => navigate("schedule")}>キャンセル</Button>
					)}
					<Button type="submit" variant="primary">
						{screen === "onboarding"
							? "設定を保存してはじめる"
							: "変更を保存する"}
					</Button>
				</Stack>
			</Stack>
		</form>
	);
	const settingsAside = (
		<Stack gap="normal" padding="normal">
			<Heading as="h2" variant="small">
				あなたらしい名前で。
			</Heading>
			<Text as="p" size="small" className={styles.Paragraph}>
				Slack のプロフィールから取り込んだ名前を、CTで使う表示名に変更できます。
			</Text>
			<Heading as="h2" variant="small">
				参加はいつでも変更できます
			</Heading>
			<Text as="p" size="small" className={styles.Paragraph}>
				忙しい時期は、無理せずお休みを。再開するときも、この画面から変更できます。
			</Text>
			<Text
				as="p"
				size="small"
				className={`${styles.Paragraph} ${styles.Muted}`}
			>
				変更できるのは、自分の設定だけです。
			</Text>
		</Stack>
	);

	const notFound = (
		<Blankslate border spacious>
			<Blankslate.Heading as="h2">404</Blankslate.Heading>
			<Blankslate.Description>
				お探しのページは見つかりませんでした。
			</Blankslate.Description>
			<Blankslate.PrimaryAction onClick={() => navigate("schedule")}>
				CT組み合わせ表へ戻る
			</Blankslate.PrimaryAction>
		</Blankslate>
	);

	const hasPane =
		!loadingOrError &&
		(screen === "schedule" || screen === "settings" || screen === "onboarding");
	const topNotice: Notice | null =
		state === "loginError"
			? {
					variant: "critical",
					title: "Slack にログインできませんでした。",
					action: {
						label: "もう一度ログインする",
						onClick: () => demo("Slack ログインを再試行するデモです。"),
					},
				}
			: notice;

	return (
		<div className={styles.Shell}>
			<a href="#main" className={styles.SkipLink}>
				本文へ移動
			</a>
			<header>
				{/* GitHub の暗いグローバルヘッダーと同じ部品をブランドバーに使う */}
				<div className={styles.BrandBar}>
					<div className={styles.Inner}>
						<Header className={styles.Header}>
							<Header.Item full>
								<Header.Link
									href="https://www.gaji.jp/"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/gaji-labo-logo.svg"
										alt="Gaji-Labo（新しいタブで開く）"
										className={styles.Logo}
									/>
								</Header.Link>
							</Header.Item>
							<Header.Item className={styles.NoMargin}>
								<Text size="small">Communication Time</Text>
							</Header.Item>
						</Header>
					</div>
				</div>
				<div className={styles.ServiceBar}>
					<div className={styles.Inner}>
						<Stack
							direction="horizontal"
							justify="space-between"
							align="center"
							wrap="wrap"
							gap="normal"
						>
							<Link
								href="#schedule"
								className={styles.ServiceName}
								onClick={(e) => {
									e.preventDefault();
									navigate("schedule");
								}}
							>
								<CommentDiscussionIcon size="medium" />
								CTスケジュール
							</Link>
							{loggedIn ? (
								<Stack direction="horizontal" gap="normal" align="center">
									<Link
										href="#settings"
										muted
										className={styles.UserLink}
										aria-label={`${me.name}の設定`}
										onClick={(e) => {
											e.preventDefault();
											navigate("settings");
										}}
									>
										<InitialAvatar member={me} size="small" />
										{me.name}
									</Link>
									<Button
										variant="invisible"
										onClick={() => {
											setLoggedIn(false);
											navigate("schedule");
										}}
									>
										ログアウト
									</Button>
								</Stack>
							) : (
								<Button
									onClick={() =>
										demo(
											"Slack ログインのデモです。認証後の表示は「ログイン中」の状態で確認できます。",
										)
									}
								>
									Slack でログイン
								</Button>
							)}
						</Stack>
					</div>
				</div>
			</header>

			<main id="main" ref={mainRef} tabIndex={-1} className={styles.Main}>
				<PageLayout
					containerWidth="xlarge"
					padding="normal"
					columnGap="normal"
					rowGap="normal"
				>
					<PageLayout.Header>
						<Stack gap="normal">
							{screen !== "schedule" && (
								<Breadcrumbs>
									<Breadcrumbs.Item
										href="#schedule"
										onClick={(e: React.MouseEvent) => {
											e.preventDefault();
											navigate("schedule");
										}}
									>
										CT組み合わせ表
									</Breadcrumbs.Item>
									<Breadcrumbs.Item selected>{title}</Breadcrumbs.Item>
								</Breadcrumbs>
							)}
							<Stack
								direction="horizontal"
								justify="space-between"
								align="end"
								wrap="wrap"
								gap="normal"
							>
								<Stack gap="condensed">
									<Heading as="h1" variant="large">
										{title}
									</Heading>
									<Text className={styles.Muted}>{lead}</Text>
								</Stack>
								{screen === "schedule" && (
									<Stack direction="horizontal" gap="condensed" align="center">
										<CalendarIcon />
										<Text className={styles.Muted}>毎週月曜 14:00〜</Text>
									</Stack>
								)}
							</Stack>
							{topNotice && (
								<Banner
									variant={topNotice.variant}
									title={topNotice.title}
									hideTitle={!topNotice.description}
									description={topNotice.description ?? topNotice.title}
									onDismiss={
										state === "loginError" ? undefined : () => setNotice(null)
									}
									primaryAction={
										topNotice.action && (
											<Banner.PrimaryAction onClick={topNotice.action.onClick}>
												{topNotice.action.label}
											</Banner.PrimaryAction>
										)
									}
								/>
							)}
						</Stack>
					</PageLayout.Header>
					<PageLayout.Content
						as="div"
						width={screen === "settings" || screen === "onboarding" ? "medium" : "full"}
					>
						{loadingOrError ? (
							<LoadingOrError state={state} onRetry={() => setState("ready")} />
						) : (
							<>
								{screen === "schedule" && scheduleMain}
								{screen === "members" && membersView}
								{(screen === "settings" || screen === "onboarding") &&
									settingsMain}
								{screen === "notFound" && notFound}
							</>
						)}
					</PageLayout.Content>
					{hasPane && (
						<PageLayout.Pane
							position="end"
							width="medium"
							aria-label={screen === "schedule" ? "CTの補足情報" : "設定の補足"}
						>
							{screen === "schedule" ? scheduleAside : settingsAside}
						</PageLayout.Pane>
					)}
				</PageLayout>
			</main>

			<footer className={styles.Footer}>
				<div className={styles.Inner}>
					<Stack
						direction="horizontal"
						justify="space-between"
						align="center"
						wrap="wrap"
						gap="normal"
					>
						<Stack
							direction="horizontal"
							gap="normal"
							align="baseline"
							wrap="wrap"
						>
							<Text weight="semibold">Gaji-Labo</Text>
							<Text size="small" className={styles.Muted}>
								ちょっと話す。それだけで、チームは近くなる。
							</Text>
						</Stack>
						<Text size="small" className={styles.Muted}>
							UIプレビュー · データ・操作はデモです
						</Text>
					</Stack>
				</div>
			</footer>

			<AriaStatus>{announcement}</AriaStatus>

			{dialog && (
				// [MCP:get_pattern Delete] 削除確認は ConfirmationDialog。danger の時は初期フォーカスがキャンセルになる
				// [MCP:get_component_accessibility_guidelines ConfirmationDialog]
				<ConfirmationDialog
					title={`${dialog.name}さんを削除しますか？`}
					confirmButtonContent="削除する"
					cancelButtonContent="キャンセル"
					confirmButtonType="danger"
					onClose={(gesture) => {
						if (gesture !== "confirm") {
							setDialog(null);
							return;
						}
						// [MCP:get_pattern Delete] 失敗したらダイアログを閉じず、中に critical Banner を出す
						if (state === "deleteError") return;
						setDeleted([...deleted, dialog.id]);
						setAnnouncement(
							`${dialog.name}を削除しました。デモの一覧のみ変更しています。`,
						);
						setDialog(null);
						// [MCP:get_pattern Delete] 削除で起点のボタンが消えるので、一覧の見出しにフォーカスを移す
						requestAnimationFrame(() => membersHeadingRef.current?.focus());
					}}
				>
					<Stack gap="normal">
						<Text as="p" className={styles.Paragraph}>
							メンバー一覧と今後の組み合わせから外れます。全員の組み合わせが変わる場合があります。この操作は取り消せません。
						</Text>
						{state === "deleteError" && (
							<Banner
								variant="critical"
								title="削除に失敗しました"
								hideTitle
								description="削除に失敗しました。時間をおいて、もう一度お試しください。"
							/>
						)}
					</Stack>
				</ConfirmationDialog>
			)}
		</div>
	);
}

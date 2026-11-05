/**
 * CTスケジュール UI を SmartHR Design System（smarthr-ui）で再現した版。
 *
 * 原本: takumibv/digital-go-design-system@codex/ct-schedule-ui の src/pages/CTApp.tsx
 * 状態・props・固定データ (fixtures.ts) は原本と同一にし、見た目だけを smarthr-ui の
 * コンポーネントとデザイントークン（Tailwind プリセット shr-*）に置き換えている。
 * 自前の CSS は持たない。部品の選定と使い方は SmartHR 公式スキル
 * （component-guidelines / design-pattern-guidelines）を読んでから決めた（harness-logs/ 参照）。
 */
import { type MouseEvent, type ReactNode, useRef, useState } from "react";
import {
	AnchorButton,
	AppNavi,
	AppNaviButton,
	Aside,
	Button,
	Center,
	Checkbox,
	Chip,
	Cluster,
	Container,
	ControlledActionDialog,
	FaCalendarDaysIcon,
	FaChevronLeftIcon,
	FaChevronRightIcon,
	FaCommentsIcon,
	FaTrashCanIcon,
	FaUsersIcon,
	Fieldset,
	FormControl,
	Header,
	Heading,
	InformationPanel,
	Input,
	Loader,
	NotificationBar,
	OpenInNewTabIcon,
	PageHeading,
	Panel,
	RequiredLabel,
	ResponseMessage,
	Section,
	Select,
	Sidebar,
	Stack,
	StatusLabel,
	Table,
	Td,
	Text,
	TextLink,
	Th,
	UpwardLink,
	WarningIcon,
	useEnvironment,
} from "smarthr-ui";

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

/* ---------- 小さな部品 ---------- */

// smarthr-ui に Avatar はない。原本と同じ「色付きの頭文字」を、トークン色の 15% 透過で作る。
const avatarColor: Record<string, string> = {
	blue: "shr-bg-main/15",
	green: "shr-bg-green/15",
	orange: "shr-bg-warning-yellow/30",
	purple: "shr-bg-danger/15",
};
const avatarSize = {
	S: "shr-h-2 shr-w-2 shr-text-sm",
	M: "shr-h-2.5 shr-w-2.5 shr-text-base",
	L: "shr-h-4 shr-w-4 shr-text-xl",
};
function Avatar({
	member,
	size = "M",
}: {
	member: Member;
	size?: keyof typeof avatarSize;
}) {
	return (
		<span
			aria-hidden="true"
			className={`shr-inline-flex shr-shrink-0 shr-items-center shr-justify-center shr-rounded-full shr-font-bold shr-text-black ${avatarColor[member.color]} ${avatarSize[size]}`}
		>
			{member.name.slice(0, 1)}
		</span>
	);
}

// スキップリンク。smarthr-ui に該当部品がないため、Tailwind の sr-only で作る。
function SkipLink({ href }: { href: string }) {
	return (
		<a
			href={href}
			className="shr-sr-only focus:shr-not-sr-only focus:shr-absolute focus:shr-left-0.5 focus:shr-top-0.5 focus:shr-z-overlap focus:shr-bg-white focus:shr-p-0.5 focus:shr-shadow-layer-3"
		>
			本文へ移動
		</a>
	);
}

function Person({ member, self = false }: { member: Member; self?: boolean }) {
	return (
		<Cluster align="center" className="shr-min-w-0 shr-flex-nowrap">
			<Avatar member={member} />
			<Stack gap={0.25} className="shr-min-w-0">
				<Cluster align="center">
					<Text weight="bold">{member.name}</Text>
					{self && (
						<Chip color="blue" size="S">
							あなた
						</Chip>
					)}
				</Cluster>
				<Text size="S" color="TEXT_GREY">
					{member.channel ? `# ${member.channel}` : "uチャンネル未設定"}
				</Text>
			</Stack>
		</Cluster>
	);
}

export function CTApp({
	initialScreen = "schedule",
	initialState = "ready",
	signedIn = true,
	initialDialog = false,
}: CTAppProps) {
	const { mobile } = useEnvironment();
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
	// ページ全体の操作結果（画面が切り替わる・操作したボタンが消える）は NotificationBar で知らせる
	const [pageNotice, setPageNotice] = useState<string | null>(
		initialState === "saveSuccess"
			? "設定を保存しました。"
			: initialState === "deleteSuccess"
				? "加藤 大輔を削除しました。"
				: null,
	);
	// ボタン近くの結果表示（ResponseMessage）。key は押したボタンを表す
	const [inlineNotice, setInlineNotice] = useState<{
		key: string;
		text: string;
	} | null>(null);
	const notifyAt = (key: string, text: string) => setInlineNotice({ key, text });
	const InlineNotice = ({ at }: { at: string }) =>
		inlineNotice?.key === at ? (
			<ResponseMessage role="status">
				{inlineNotice.text}
			</ResponseMessage>
		) : null;

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
		setInlineNotice(null);
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

	// ハドルボタン。Primary は画面に 1 つ（Button チェックリスト [must]）なので、主役のみ primary
	const huddle = (target: Member, key: string, prominent = false) =>
		!target.channel ? (
			<Text color="TEXT_GREY">uチャンネル未設定</Text>
		) : (
			<Cluster align="center" justify={prominent ? "center" : undefined}>
				<Button
					variant={prominent ? "primary" : "secondary"}
					size={prominent ? "M" : "S"}
					wide={prominent && mobile}
					suffix={<OpenInNewTabIcon />}
					onClick={() =>
						notifyAt(
							key,
							`${target.channel} でハドルを開始するデモです。実際の Slack には接続しません。`,
						)
					}
				>
					{prominent ? "Slack でハドルを始める" : "ハドルを始める"}
				</Button>
				<InlineNotice at={key} />
			</Cluster>
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

	/* ---------- CT組み合わせ表 ---------- */
	const renderPersonalArea = (): ReactNode => {
		if (week.holiday)
			return (
				<Panel padding={1.5}>
<Section>
					<Stack align="center">
						<Heading type="blockTitle">今週のCTはお休みです</Heading>
						<p>
							{`${week.holiday}のため、CTはありません。組み合わせは次の開催週へ繰り越します。`}
						</p>
						<Button onClick={() => updateWeek(2)}>次の開催週を見る</Button>
					</Stack>
				</Section>
</Panel>
			);
		if (activeCount < 2)
			return (
				<Panel padding={1.5}>
<Section>
					<Stack align="center">
						<Heading type="blockTitle">もうひとりの参加を待っています</Heading>
						<p>
							CTには2人以上の参加者が必要です。Slack でログインし、自分の設定から参加できます。
						</p>
						{loggedIn ? (
							// 画面遷移なので Button ではなく AnchorButton（Button チェックリスト）
							<AnchorButton
								variant="primary"
								href="#settings"
								onClick={(e) => {
									e.preventDefault();
									navigate("settings");
								}}
							>
								自分の設定を開く
							</AnchorButton>
						) : (
							<Cluster align="center" justify="center">
								<Button
									variant="primary"
									onClick={() =>
										notifyAt("insufficient-login", "Slack ログインのデモです。")
									}
								>
									Slack でログイン
								</Button>
								<InlineNotice at="insufficient-login" />
							</Cluster>
						)}
					</Stack>
				</Section>
</Panel>
			);
		if (loggedIn && savedProfile.participating)
			return (
				<Section>
					<Panel padding={1.5}>
						<Stack gap={1.5}>
							<Cluster align="center">
								<Heading type="blockTitle">
									{weekIndex === 0 ? "今週" : "この週"}のあなたのCT
								</Heading>
								<Text size="S" color="TEXT_GREY">
									14:00 開始
								</Text>
							</Cluster>
							{week.rest === currentId ? (
								<Stack gap={0.5}>
									<Text as="p" size="XL" weight="bold">
										今週は、ひと休み。
									</Text>
									<p>
										参加者が奇数のため、今週はお休みです。お休みのメンバーは週ごとに入れ替わります。
									</p>
								</Stack>
							) : (
								partner && (
									<Stack gap={1.5} align="center">
										<Cluster gap={2} align="center" justify="center">
											<Stack gap={0.25} align="center">
												<Avatar member={me} size="L" />
												<Text weight="bold" size="L">
													{me.name}
												</Text>
												<Text size="S" color="TEXT_GREY">
													あなた
												</Text>
											</Stack>
											<FaCommentsIcon color="TEXT_GREY" />
											<Stack gap={0.25} align="center">
												<Avatar member={partner} size="L" />
												<Text weight="bold" size="L">
													{partner.name}
												</Text>
												<Text size="S" color="TEXT_GREY">
													今週の話し相手
												</Text>
											</Stack>
										</Cluster>
										<Stack gap={0.5} align="center" className="shr-w-full">
											{huddle(partner, "featured", true)}
											<Text color="TEXT_GREY">
												{state === "missingChannel"
													? "相手にチャンネルの設定をお願いしてください。"
													: `# ${partner.channel} で話しましょう`}
											</Text>
										</Stack>
									</Stack>
								)
							)}
						</Stack>
					</Panel>
				</Section>
			);
		if (!loggedIn)
			return (
				<InformationPanel heading="あなたの今週の相手を、すぐに。">
					<Stack align="flex-start">
						<p>
							Slack でログインすると、自分のペアの確認や参加の切り替えができます。
						</p>
						<Cluster align="center">
							<Button
								onClick={() =>
									notifyAt("guest-login", "Slack ログインのデモです。")
								}
							>
								Slack でログイン
							</Button>
							<InlineNotice at="guest-login" />
						</Cluster>
					</Stack>
				</InformationPanel>
			);
		return (
			<NotificationBar
				type="info"
				paneled
				subActionArea={
					<TextLink
						href="#settings"
						onClick={(e) => {
							e.preventDefault();
							navigate("settings");
						}}
					>
						参加設定を変更する
					</TextLink>
				}
			>
				現在、CTには参加していません。
			</NotificationBar>
		);
	};

	const schedule = (
		<Sidebar right gap={2} contentsMinWidth="60%">
			<Stack gap={2}>
				<Section>
					<Stack>
						<Cluster justify="space-between" align="center" gap={1}>
							<Cluster align="center">
								<StatusLabel type={weekIndex === 0 ? "blue" : "grey"} bold>
									{week.label}
								</StatusLabel>
								<Heading size="XL">{`${week.date}（月）`}</Heading>
							</Cluster>
							<Cluster>
								<Button
									size={mobile ? "M" : "S"}
									disabled={weekIndex === 0}
									disabledReason={
										weekIndex === 0
											? { text: "これより前の組み合わせはありません。" }
											: undefined
									}
									onClick={() => updateWeek(weekIndex - 1)}
								>
									<FaChevronLeftIcon alt="前の週" />
								</Button>
								<Button
									size={mobile ? "M" : "S"}
									disabled={weekIndex === 0}
									disabledReason={
										weekIndex === 0
											? { text: "今週の組み合わせを表示しています。" }
											: undefined
									}
									onClick={() => updateWeek(0)}
								>
									今週
								</Button>
								<Button
									size={mobile ? "M" : "S"}
									disabled={weekIndex === weeks.length - 1}
									onClick={() => updateWeek(weekIndex + 1)}
								>
									<FaChevronRightIcon alt="次の週" />
								</Button>
							</Cluster>
						</Cluster>
						{weekIndex > 0 && (
							<Text as="p" size="S" color="TEXT_GREY">
								先の週の組み合わせは予定です。参加者の変更により組み替わります。
							</Text>
						)}
						{renderPersonalArea()}
					</Stack>
				</Section>

				{hasPairs && (
					<Section>
						<Stack>
							<Cluster justify="space-between" align="baseline">
								<Heading>みんなの組み合わせ</Heading>
								<Text color="TEXT_GREY">{`${week.pairs.length}組・お休み1人`}</Text>
							</Cluster>
							<Panel>
								<ul className="shr-m-0 shr-list-none shr-p-0">
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
												className={`shr-border-0 shr-border-b shr-border-solid shr-border-default shr-px-1.5 shr-py-1 ${isMine ? "shr-bg-main/10" : ""}`}
											>
												<Cluster justify="space-between" align="center" gap={1}>
													<Cluster align="center" gap={1}>
														<Person
															member={displayPerson(first)}
															self={isMine && first === currentId}
														/>
														<Text color="TEXT_GREY" aria-hidden="true">
															×
														</Text>
														<Person
															member={displayPerson(second)}
															self={isMine && second === currentId}
														/>
													</Cluster>
													{huddle(target, `pair-${first}`)}
												</Cluster>
											</li>
										);
									})}
								</ul>
								<Cluster align="center" gap={1} className="shr-px-1.5 shr-py-1">
									<StatusLabel>今週のお休み</StatusLabel>
									<Person
										member={person(week.rest)}
										self={loggedIn && week.rest === currentId}
									/>
									<Text color="TEXT_GREY">また次のCTで。</Text>
								</Cluster>
							</Panel>
						</Stack>
					</Section>
				)}

				<Section>
					<Stack>
						<Heading>この先のCT</Heading>
						<Panel>
							<ul className="shr-m-0 shr-list-none shr-p-0">
								{weeks.slice(1, 4).map((item, index) => (
									<li
										key={item.date}
										className="shr-border-0 shr-border-b shr-border-solid shr-border-default last:shr-border-b-0"
									>
										<Button
											variant="text"
											wide
											suffix={<FaChevronRightIcon />}
											onClick={() => updateWeek(index + 1)}
											aria-label={`${item.short}の組み合わせを見る`}
											className="shr-justify-between shr-px-1.5"
										>
											<Cluster as="span" align="center" gap={1}>
												<Text weight="bold">{`${item.short}（月）`}</Text>
												{item.holiday ? (
													<StatusLabel type="warning">祝日のためお休み</StatusLabel>
												) : (
													<Text color="TEXT_GREY">14:00〜・予定</Text>
												)}
											</Cluster>
										</Button>
									</li>
								))}
							</ul>
						</Panel>
					</Stack>
				</Section>
			</Stack>

			<Stack gap={1.5} className="shr-basis-[20rem]">
				<Aside>
					<Panel padding={1.5}>
						<Stack align="flex-start">
							<Heading type="blockTitle" icon={<FaUsersIcon />}>
								CTに参加する人
							</Heading>
							<Cluster align="baseline" gap={0.25}>
								<Text size="XXL" weight="bold">
									{String(activeCount)}
								</Text>
								人
							</Cluster>
							<Text as="p" color="TEXT_GREY">
								参加者が奇数の週は、ひとりずつ順番にお休みします。
							</Text>
							<TextLink
								href="#members"
								onClick={(e) => {
									e.preventDefault();
									navigate("members");
								}}
							>
								メンバー一覧を見る
							</TextLink>
						</Stack>
					</Panel>
				</Aside>
				<Aside>
					<Stack align="flex-start">
						<Heading type="blockTitle">CTの過ごし方</Heading>
						<p>仕事の話も、週末の話も。まずは「こんにちは」から。</p>
						<p>
							時間になったら、相手の uチャンネルでハドルを始めましょう。
						</p>
						<Text as="p" size="S" color="TEXT_GREY">
							毎週月曜 11:00 に Slack でも今週の組み合わせをお知らせします。
						</Text>
						{loggedIn && (
							<TextLink
								href="#settings"
								onClick={(e) => {
									e.preventDefault();
									navigate("settings");
								}}
							>
								自分の参加設定を変更する
							</TextLink>
						)}
					</Stack>
				</Aside>
			</Stack>
		</Sidebar>
	);

	/* ---------- メンバー一覧 ---------- */
	const memberActions = (member: Member) => (
		<Cluster gap={1} align="center" justify="end">
			{loggedIn && member.id === 1 && (
				<TextLink
					href="#settings"
					onClick={(e) => {
						e.preventDefault();
						navigate("settings");
					}}
				>
					設定
				</TextLink>
			)}
			{loggedIn && (
				<Button
					variant="text"
					size={mobile ? "M" : "S"}
					prefix={<FaTrashCanIcon />}
					aria-label={`${member.name}を削除`}
					onClick={() => setDialog(member)}
				>
					削除
				</Button>
			)}
		</Cluster>
	);
	const employeeNo = (member: Member) =>
		member.incomplete ? (
			<Text color="TEXT_GREY">未設定</Text>
		) : (
			String(member.id).padStart(3, "0")
		);
	const memberStatus = (member: Member) => (
		<StatusLabel type={member.active ? "green" : "grey"}>
			{member.active ? "参加する" : "参加しない"}
		</StatusLabel>
	);
	const memberCell = (member: Member) => (
		<Stack gap={0.25}>
			<Person member={member} self={loggedIn && member.id === 1} />
			{member.incomplete && (
				<Text size="S" icon={<WarningIcon />}>
					初回設定が未完了
				</Text>
			)}
		</Stack>
	);

	const membersView = (
		<Stack gap={2}>
			<Cluster gap={1} align="stretch">
				<Panel padding={1.5} className="shr-min-w-[10em]">
					<Text as="p" color="TEXT_GREY">
						参加する
					</Text>
					<Text as="p" size="XXL" weight="bold">
						{`${visibleMembers.filter((m) => m.active).length}人`}
					</Text>
				</Panel>
				<Panel padding={1.5} className="shr-min-w-[10em]">
					<Text as="p" color="TEXT_GREY">
						参加しない
					</Text>
					<Text as="p" size="XXL" weight="bold">
						{`${visibleMembers.filter((m) => !m.active).length}人`}
					</Text>
				</Panel>
				<Center verticalCentering className="shr-flex-1 shr-basis-[20em]">
					<Text as="p" color="TEXT_GREY">
						参加者が奇数の週は、ひとりずつ順番にお休みします。参加状況が変わると、今後の組み合わせも変わります。
					</Text>
				</Center>
			</Cluster>
			<Section>
				<Stack>
					<Cluster justify="space-between" align="baseline">
						<Heading>{`すべてのメンバー ${visibleMembers.length}人`}</Heading>
						{visibleMembers.length > 0 && <Text color="TEXT_GREY">社員番号順</Text>}
					</Cluster>
					<Panel>
					{visibleMembers.length === 0 ? (
						// よくあるテーブルの「初期表示」パターン：Panel 内にメッセージとボタンを中央に置く
							<Section>
							<Stack align="center" className="shr-px-4 shr-py-4">
								<Heading type="blockTitle">まだメンバーがいません</Heading>
								<p>Slack で初めてログインすると、メンバーに登録されます。</p>
								<Cluster align="center" justify="center">
									<Button
										size="S"
										onClick={() =>
											notifyAt("empty-login", "Slack ログインのデモです。")
										}
									>
										Slack でログイン
									</Button>
									<InlineNotice at="empty-login" />
								</Cluster>
							</Stack>
						</Section>
					) : mobile ? (
						// モバイルでは「よくあるテーブル」ではなく「よくあるリスト」を使う（smarthr-table パターン）
							<ul className="shr-m-0 shr-list-none shr-p-0">
								{visibleMembers.map((member) => (
									<li
										key={member.id}
										className="shr-border-0 shr-border-b shr-border-solid shr-border-default shr-p-1 last:shr-border-b-0"
									>
										<Stack gap={0.5}>
											<Cluster justify="space-between" align="flex-start">
												{memberCell(member)}
												{memberStatus(member)}
											</Cluster>
											<Cluster justify="space-between" align="center">
												<Text size="S" color="TEXT_GREY">
													社員番号：{member.incomplete ? "未設定" : String(member.id).padStart(3, "0")}
												</Text>
												{memberActions(member)}
											</Cluster>
										</Stack>
									</li>
								))}
							</ul>
					) : (
							<Table>
								<thead>
									<tr>
										<Th>社員番号</Th>
										<Th>メンバー</Th>
										<Th>参加状況</Th>
										<Th>
											<span className="shr-sr-only">操作</span>
										</Th>
									</tr>
								</thead>
								<tbody>
									{visibleMembers.map((member) => (
										<tr key={member.id}>
											<Td>{employeeNo(member)}</Td>
											<Td>{memberCell(member)}</Td>
											<Td>{memberStatus(member)}</Td>
											<Td align="right">{memberActions(member)}</Td>
										</tr>
									))}
								</tbody>
							</Table>
					)}
					</Panel>
					{visibleMembers.length > 0 && !loggedIn && (
						<Text as="p" size="S" color="TEXT_GREY">
							メンバーの削除や自分の設定変更には、Slack ログインが必要です。
						</Text>
					)}
				</Stack>
			</Section>
		</Stack>
	);

	/* ---------- 自分の設定・初回設定 ---------- */
	const channelOptions = members
		.filter((m) => m.channel)
		.map((m) => ({ label: `# ${m.channel}`, value: m.channel as string }));
	// 送信時のエラーは最初のエラー項目へフォーカスを移す（InformationPanel は tabIndex を持てないため）
	const focusFirstError = () =>
		requestAnimationFrame(() =>
			document.querySelector<HTMLElement>('form [aria-invalid="true"]')?.focus(),
		);
	const nameError = invalid && !name.trim();
	const employeeError = invalid && !/^\d+$/.test(employee);
	const channelError = invalid && !channel;
	const settingsView = (
		<Sidebar right gap={2} contentsMinWidth="60%">
			<form
				noValidate
				onSubmit={(event) => {
					event.preventDefault();
					if (!name.trim() || !channel || !/^\d+$/.test(employee)) {
						setInvalid(true);
						focusFirstError();
						return;
					}
					if (state === "saveError") return;
					setInvalid(false);
					setSavedProfile({ name, employee, channel, participating });
					setScreen("schedule");
					setState("ready");
					setPageNotice(
						"設定を保存しました。表示への反映はデモです。組み合わせの再計算は行いません。",
					);
				}}
			>
				<Stack gap={1.5}>
					{invalid && (
						<InformationPanel
							type="error"
							heading="入力内容を確認してください"
						>
								<p>
									名前・社員番号・uチャンネルは必須です。社員番号は半角数字で入力してください。
								</p>
							</InformationPanel>
					)}
					<Panel padding={1.5}>
						<Stack gap={1.5}>
							<Cluster align="center" gap={1}>
								<Avatar member={me} />
								<Stack gap={0.25}>
									<Text size="S" color="TEXT_GREY">
										Slack アカウント
									</Text>
									<span>{person(1).name}</span>
								</Stack>
							</Cluster>
							<FormControl
								label="名前"
								statusLabels={[<RequiredLabel key="required" />]}
								helpMessage="組み合わせ表とメンバー一覧に表示されます。"
								errorMessages={nameError ? "名前を入力してください。" : undefined}
							>
								<Input
									name="displayName"
									value={name}
									required
									error={nameError}
									width="100%"
									onChange={(e) => setName(e.currentTarget.value)}
								/>
							</FormControl>
							<FormControl
								label="社員番号"
								statusLabels={[<RequiredLabel key="required" />]}
								helpMessage="組み合わせを決める並び順に使います。"
								errorMessages={
									employeeError ? "社員番号を半角数字で入力してください。" : undefined
								}
							>
								<Input
									name="employeeId"
									value={employee}
									inputMode="numeric"
									required
									error={employeeError}
									width="100%"
									onChange={(e) => setEmployee(e.currentTarget.value)}
								/>
							</FormControl>
							<FormControl
								label="uチャンネル"
								statusLabels={[<RequiredLabel key="required" />]}
								helpMessage="相手がハドルを始める、あなたの個人用チャンネルです。"
								errorMessages={
									channelError ? "uチャンネルを選択してください。" : undefined
								}
							>
								<Select
									name="channel"
									options={channelOptions}
									value={channel}
									hasBlank
									blankLabel="チャンネルを選択してください"
									required
									error={channelError}
									width="100%"
									onChangeValue={(value) => setChannel(value)}
								/>
							</FormControl>
							<Fieldset
								legend="CTへの参加"
								helpMessage="参加状況を変更すると、全員の今後の組み合わせが変わります。休職中などはチェックを外し、復帰したら再び参加できます。"
							>
								<Checkbox
									name="participating"
									checked={participating}
									onChange={(e) => setParticipating(e.currentTarget.checked)}
								>
									CTに参加する
								</Checkbox>
							</Fieldset>
						</Stack>
					</Panel>
					<Cluster align="center" gap={1}>
						{screen !== "onboarding" && (
							<Button onClick={() => navigate("schedule")}>キャンセル</Button>
						)}
						<Button type="submit" variant="primary" wide={mobile}>
							{screen === "onboarding" ? "設定を保存してはじめる" : "変更を保存する"}
						</Button>
						{state === "saveError" && (
							<ResponseMessage status="error">
								設定を保存できませんでした。入力内容は保持されています。時間をおいて再度保存してください。
							</ResponseMessage>
						)}
					</Cluster>
				</Stack>
			</form>
			<Stack gap={1.5} className="shr-basis-[20rem]">
				<Aside>
					<Stack gap={0.5}>
						<Heading type="blockTitle">あなたらしい名前で。</Heading>
						<p>
							Slack のプロフィールから取り込んだ名前を、CTで使う表示名に変更できます。
						</p>
					</Stack>
				</Aside>
				<Aside>
					<Stack gap={0.5}>
						<Heading type="blockTitle">参加はいつでも変更できます</Heading>
						<p>
							忙しい時期は、無理せずお休みを。再開するときも、この画面から変更できます。
						</p>
					</Stack>
				</Aside>
				<Text as="p" size="S" color="TEXT_GREY">
					変更できるのは、自分の設定だけです。
				</Text>
			</Stack>
		</Sidebar>
	);

	const notFoundView = (
		<Panel padding={1.5}>
			<Stack align="center">
				<Text as="p" size="XXL" weight="bold">
					404
				</Text>
				<p>お探しのページは見つかりませんでした。</p>
				<AnchorButton
					variant="primary"
					href="#schedule"
					onClick={(e) => {
						e.preventDefault();
						navigate("schedule");
					}}
				>
					CT組み合わせ表へ戻る
				</AnchorButton>
			</Stack>
		</Panel>
	);

	const accountArea = loggedIn ? (
						<Cluster align="center" gap={1} justify="end">
							<TextLink
								href="#settings"
								onClick={(e) => {
									e.preventDefault();
									navigate("settings");
								}}
							>
								{me.name}
							</TextLink>
							<Button
								size="S"
								onClick={() => {
									setLoggedIn(false);
									navigate("schedule");
								}}
							>
								ログアウト
							</Button>
						</Cluster>
	) : undefined;

	return (
		<div className="shr-flex shr-min-h-screen shr-flex-col shr-bg-background">
			<SkipLink href="#main" />
			<Header
				logo={
					<img
						src="/gaji-labo-logo.svg"
						alt="Gaji-Labo（新しいタブで開く）"
						className="shr-block shr-h-1.5"
					/>
				}
				logoHref="https://www.gaji.jp/"
			>
				<Text size="S">Communication Time</Text>
				{!loggedIn && (
					<Button
						size="S"
						onClick={() =>
							setPageNotice(
								"Slack ログインのデモです。認証後の表示は「ログイン中」の状態で確認できます。",
							)
						}
					>
						Slack でログイン
					</Button>
				)}
			</Header>
			{/* AppNavi はモバイル用の表示を持たないため、モバイルではラベルとアカウント操作を外し、アカウント操作は別の行に出す */}
			<AppNavi
				label={mobile ? undefined : "CTスケジュール"}
				additionalArea={
					mobile ? undefined : accountArea
				}
			>
				<AppNaviButton
					icon={FaCalendarDaysIcon}
					current={screen === "schedule"}
					onClick={() => navigate("schedule")}
				>
					CT組み合わせ表
				</AppNaviButton>
				<AppNaviButton
					icon={FaUsersIcon}
					current={screen === "members"}
					onClick={() => navigate("members")}
				>
					メンバー一覧
				</AppNaviButton>
			</AppNavi>
			{mobile && accountArea && (
				<div className="shr-bg-white shr-px-1 shr-py-0.5">{accountArea}</div>
			)}

			{pageNotice && (
				<NotificationBar
					type={pageNotice.includes("デモです。認証") ? "info" : "success"}
					bold
					animate
					role="status"
					onClose={() => setPageNotice(null)}
					className="shr-sticky shr-top-0 shr-z-overlap"
				>
					{pageNotice}
				</NotificationBar>
			)}
			{state === "loginError" && (
				<NotificationBar
					type="error"
					bold
					role="alert"
					subActionArea={
						<Cluster align="center">
							<Button
								size="S"
								onClick={() =>
									notifyAt("login-retry", "Slack ログインを再試行するデモです。")
								}
							>
								もう一度ログインする
							</Button>
							<InlineNotice at="login-retry" />
						</Cluster>
					}
				>
					Slack にログインできませんでした。時間をおいて、もう一度お試しください。
				</NotificationBar>
			)}

			{/* 画面切り替え後にフォーカスを本文へ戻すため tabIndex=-1 が必要（SPA のフォーカス管理）。原本・ADS 版と同じ */}
			{/* eslint-disable-next-line smarthr/a11y-scroller-has-tabindex */}
			<main id="main" ref={mainRef} tabIndex={-1} className="shr-flex-1">
				<Container>
					<Stack gap={1.5}>
						<Stack>
							{screen !== "schedule" && (
								<UpwardLink
									href="#schedule"
									indent={false}
									onClick={(e: MouseEvent) => {
										e.preventDefault();
										navigate("schedule");
									}}
								>
									CT組み合わせ表に戻る
								</UpwardLink>
							)}
							<Cluster justify="space-between" align="flex-end" gap={1}>
								<PageHeading autoPageTitle={false}>{title}</PageHeading>
								{screen === "schedule" && (
									<Text color="TEXT_GREY" icon={<FaCalendarDaysIcon />}>
										毎週月曜 14:00〜
									</Text>
								)}
							</Cluster>
							<Text as="p" color="TEXT_GREY">
								{lead}
							</Text>
						</Stack>

						{state === "loading" ? (
							<Center padding={4}>
								<Loader text="読み込んでいます。しばらくお待ちください。" />
							</Center>
						) : state === "error" ? (
							<Panel padding={1.5}>
<Section>
								<Stack align="center">
									<Heading>データを読み込めませんでした</Heading>
									<p>通信状況を確認して、もう一度お試しください。</p>
									<Button onClick={() => setState("ready")}>再読み込み</Button>
								</Stack>
							</Section>
</Panel>
						) : (
							<>
								{screen === "schedule" && schedule}
								{screen === "members" && membersView}
								{(screen === "settings" || screen === "onboarding") &&
									settingsView}
								{screen === "notFound" && notFoundView}
							</>
						)}
					</Stack>
				</Container>
			</main>

			<footer className="shr-bg-white">
				<Container>
					<Cluster justify="space-between" align="center" gap={1}>
						<Stack gap={0.25}>
							<Text weight="bold">Gaji-Labo</Text>
							<Text size="S" color="TEXT_GREY">
								ちょっと話す。それだけで、チームは近くなる。
							</Text>
						</Stack>
						<Text size="S" color="TEXT_GREY">
							UIプレビュー · データ・操作はデモです
						</Text>
					</Cluster>
				</Container>
			</footer>

			{/* 削除の確認は ActionDialog（delete-dialog パターン）。開閉はアプリ側で持つので Controlled 版 */}
			<ControlledActionDialog
				isOpen={dialog !== null}
				size="S"
				heading={`${dialog?.name ?? ""}さんを削除しますか？`}
				actionButton={{ text: "削除する", theme: "danger" }}
				closeButton="キャンセル"
				responseStatus={
					state === "deleteError"
						? {
								status: "error",
								text: "削除に失敗しました。時間をおいて、もう一度お試しください。",
							}
						: undefined
				}
				onClickAction={(_, { close }) => {
					if (state === "deleteError" || !dialog) return;
					setDeleted([...deleted, dialog.id]);
					setPageNotice(`${dialog.name}を削除しました。デモの一覧のみ変更しています。`);
					close();
				}}
				onClickClose={() => setDialog(null)}
				onPressEscape={() => setDialog(null)}
			>
				<p>
					メンバー一覧と今後の組み合わせから外れます。全員の組み合わせが変わる場合があります。この操作は取り消せません。
				</p>
			</ControlledActionDialog>
		</div>
	);
}

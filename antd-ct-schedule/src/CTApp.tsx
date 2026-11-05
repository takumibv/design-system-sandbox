/**
 * CTスケジュール UI を Ant Design（antd v6）で再現した版。
 *
 * 原本: takumibv/digital-go-design-system@codex/ct-schedule-ui の src/pages/CTApp.tsx
 * 状態・props・固定データ（fixtures.ts）・文言は原本と同一にし、見た目だけを antd の
 * 部品とトークンに置き換えている。自前の CSS ファイルは持たない。
 * やむを得ず書いた inline style は、値をすべて theme.useToken() のトークンから取り、
 * 該当箇所に「STYLE:」コメントで理由を残している（docs/design-decisions.md に一覧）。
 */
import {
	CalendarOutlined,
	LeftOutlined,
	MessageOutlined,
	RightOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import {
	Alert,
	App,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Col,
	Empty,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	Listy,
	Modal,
	Result,
	Row,
	Select,
	Spin,
	Statistic,
	Table,
	Tag,
	Tooltip,
	Typography,
	theme,
} from "antd";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { type Member, members, person, weeks } from "./fixtures";

const { Title, Text, Paragraph } = Typography;

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

type Profile = {
	name: string;
	employee: string;
	channel: string;
	participating: boolean;
};

/* ---------- small building blocks ---------- */

/** STYLE: antd にスキップリンクも「視覚的に隠す」ユーティリティもないため、トークン値で最小限を書く。 */
function SkipLink() {
	const { token } = theme.useToken();
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
							top: token.marginXS,
							left: token.marginXS,
							zIndex: token.zIndexPopupBase,
							padding: token.paddingXS,
							background: token.colorBgElevated,
							boxShadow: token.boxShadowSecondary,
							borderRadius: token.borderRadius,
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

/** 人ごとの色（fixtures の color）は分類の表示なので、DESIGN.md に従いプリセット色の淡色＋濃色で表す。 */
function PersonAvatar({
	member,
	size,
}: {
	member: Member;
	size?: number | "small" | "medium" | "large";
}) {
	const { token } = theme.useToken();
	const palette = token as unknown as Record<string, string>;
	return (
		<Avatar
			size={size}
			aria-hidden
			// STYLE: Avatar に色の props がないため、プリセット色トークン（1 段目と 8 段目）を当てる。
			style={{
				backgroundColor: palette[`${member.color}1`],
				color: palette[`${member.color}8`],
				flex: "none",
			}}
		>
			{member.name.slice(0, 1)}
		</Avatar>
	);
}

function Person({ member, self = false }: { member: Member; self?: boolean }) {
	return (
		<Flex gap="small" align="center" style={{ minWidth: 0 }}>
			<PersonAvatar member={member} />
			<Flex vertical style={{ minWidth: 0 }}>
				<Flex gap="small" align="center" wrap>
					<Text strong>{member.name}</Text>
					{self && (
						<Tag color="blue" variant="filled">
							あなた
						</Tag>
					)}
				</Flex>
				<Text type="secondary">
					{member.channel ? `# ${member.channel}` : "uチャンネル未設定"}
				</Text>
			</Flex>
		</Flex>
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
		<Card>
			<Flex vertical align="center" gap="middle" role="status">
				<Spin size="large" />
				<Title level={2}>読み込んでいます</Title>
				<Text type="secondary">しばらくお待ちください。</Text>
			</Flex>
		</Card>
	) : (
		<Card>
			<Result
				status="error"
				title={<Title level={2}>データを読み込めませんでした</Title>}
				subTitle="通信状況を確認して、もう一度お試しください。"
				extra={<Button onClick={onRetry}>再読み込み</Button>}
			/>
		</Card>
	);
}

export function CTApp({
	initialScreen = "schedule",
	initialState = "ready",
	signedIn = true,
	initialDialog = false,
}: CTAppProps) {
	const { token } = theme.useToken();
	const screens = Grid.useBreakpoint();
	const { message } = App.useApp();
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
	const [savedProfile, setSavedProfile] = useState<Profile>({
		name: person(1).name,
		employee: "001",
		channel: "u-misaki",
		participating: true,
	});
	const [invalid, setInvalid] = useState(initialState === "validation");
	const [form] = Form.useForm<Profile>();
	const mainRef = useRef<HTMLElement>(null);

	// 操作の結果は message（上部中央、自動で消える軽い通知）で知らせる。Story 用に初期状態でも出す。
	useEffect(() => {
		if (initialState === "saveSuccess") message.success("設定を保存しました。");
		if (initialState === "deleteSuccess")
			message.success("加藤 大輔を削除しました。");
		if (initialState === "validation")
			form.validateFields().catch(() => undefined);
	}, [initialState, message, form]);

	const navigate = (next: Screen) => {
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
	const displayPerson = (id: number): Member => ({
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
	const demoLogin = () => message.info("Slack ログインのデモです。");

	// Primary はこの画面で最も重要な 1 つ（自分のペアのハドル）だけ。一覧のハドルは default。
	const huddle = (target: Member, prominent = false) =>
		!target.channel ? (
			<Text type="secondary">uチャンネル未設定</Text>
		) : (
			<Button
				type={prominent ? "primary" : "default"}
				size={prominent ? "large" : "medium"}
				icon={<MessageOutlined />}
				onClick={() =>
					message.info(
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
				<Card>
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={
							<Flex vertical gap="small" align="center">
								<Title level={3}>今週のCTはお休みです</Title>
								<Text type="secondary">
									{week.holiday}
									のため、CTはありません。組み合わせは次の開催週へ繰り越します。
								</Text>
							</Flex>
						}
					>
						<Button onClick={() => updateWeek(2)}>次の開催週を見る</Button>
					</Empty>
				</Card>
			);
		if (activeCount < 2)
			return (
				<Card>
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={
							<Flex vertical gap="small" align="center">
								<Title level={3}>もうひとりの参加を待っています</Title>
								<Text type="secondary">
									CTには2人以上の参加者が必要です。Slack
									でログインし、自分の設定から参加できます。
								</Text>
							</Flex>
						}
					>
						<Button
							type="primary"
							onClick={() => (loggedIn ? navigate("settings") : demoLogin())}
						>
							{loggedIn ? "自分の設定を開く" : "Slack でログイン"}
						</Button>
					</Empty>
				</Card>
			);
		if (loggedIn && savedProfile.participating)
			return (
				<Card>
					<section aria-labelledby="your-pair-title">
					<Flex vertical gap="large">
						<Flex justify="space-between" align="center" gap="small" wrap>
							<Title level={3} id="your-pair-title">
								{weekIndex === 0 ? "今週" : "この週"}のあなたのCT
							</Title>
							<Tag>14:00 開始</Tag>
						</Flex>
						{week.rest === currentId ? (
							<Flex vertical gap="small" align="center">
								<Title level={4}>今週は、ひと休み。</Title>
								<Text>
									参加者が奇数のため、今週はお休みです。お休みのメンバーは週ごとに入れ替わります。
								</Text>
							</Flex>
						) : (
							partner && (
								<Flex vertical gap="large" align="center">
									<Flex gap="large" align="center" justify="center" wrap>
										<Flex vertical gap="small" align="center">
											<PersonAvatar member={me} size={64} />
											<Text strong>{me.name}</Text>
											<Text type="secondary">あなた</Text>
										</Flex>
										<MessageOutlined
											aria-hidden
											style={{ color: token.colorTextSecondary }}
										/>
										<Flex vertical gap="small" align="center">
											<PersonAvatar member={partner} size={64} />
											<Text strong>{partner.name}</Text>
											<Text type="secondary">今週の話し相手</Text>
										</Flex>
									</Flex>
									<Flex vertical gap="small" align="center">
										{huddle(partner, true)}
										<Text type="secondary">
											{state === "missingChannel"
												? "相手にチャンネルの設定をお願いしてください。"
												: `# ${partner.channel} で話しましょう`}
										</Text>
									</Flex>
								</Flex>
							)
						)}
					</Flex>
					</section>
				</Card>
			);
		if (!loggedIn)
			return (
				<Alert
					type="info"
					showIcon
					title="あなたの今週の相手を、すぐに。"
					description="Slack でログインすると、自分のペアの確認や参加の切り替えができます。"
					action={
						<Button type="primary" onClick={demoLogin}>
							Slack でログイン
						</Button>
					}
				/>
			);
		return (
			<Alert
				type="info"
				showIcon
				title="現在、CTには参加していません。"
				action={
					<Button onClick={() => navigate("settings")}>
						参加設定を変更する
					</Button>
				}
			/>
		);
	};

	const schedule = (
		<Row gutter={[token.marginLG, token.marginLG]}>
			<Col xs={24} lg={16}>
				<Flex vertical gap="large">
					<Flex vertical gap="middle" component="section" aria-labelledby="week-title">
						<Flex justify="space-between" align="center" gap="middle" wrap>
							<Flex gap="small" align="center">
								<Tag color={weekIndex === 0 ? "processing" : "default"}>
									{week.label}
								</Tag>
								<Title level={2} id="week-title">
									{week.date}（月）
								</Title>
							</Flex>
							<Flex gap="small">
								<Tooltip title="前の週">
									<Button
										icon={<LeftOutlined />}
										aria-label="前の週"
										disabled={weekIndex === 0}
										onClick={() => updateWeek(weekIndex - 1)}
									/>
								</Tooltip>
								<Button
									disabled={weekIndex === 0}
									onClick={() => updateWeek(0)}
								>
									今週
								</Button>
								<Tooltip title="次の週">
									<Button
										icon={<RightOutlined />}
										aria-label="次の週"
										disabled={weekIndex === weeks.length - 1}
										onClick={() => updateWeek(weekIndex + 1)}
									/>
								</Tooltip>
							</Flex>
						</Flex>
						{weekIndex > 0 && (
							<Text type="secondary">
								先の週の組み合わせは予定です。参加者の変更により組み替わります。
							</Text>
						)}
						{renderPersonalArea()}
					</Flex>

					{hasPairs && (
						<Flex vertical gap="middle" component="section" aria-labelledby="all-pairs-title">
							<Flex justify="space-between" align="baseline" gap="small" wrap>
								<Title level={2} id="all-pairs-title">
									みんなの組み合わせ
								</Title>
								<Text type="secondary">{week.pairs.length}組・お休み1人</Text>
							</Flex>
							<Card styles={{ body: { padding: 0 } }}>
								<Listy
									items={week.pairs as number[][]}
									rowKey={(pair) => pair[0]}
									itemRender={([first, second]) => {
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
											<Flex
												justify="space-between"
												align="center"
												gap="middle"
												wrap
												// STYLE: 自分のペアの行は DESIGN.md の「現在地」の合図（Menu 選択色 = colorPrimaryBg）で示す。
												style={{
													padding: `${token.paddingSM}px ${token.padding}px`,
													borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
													background: isMine ? token.colorPrimaryBg : undefined,
												}}
											>
												<Flex gap="small" align="center" wrap>
													<Person
														member={displayPerson(first)}
														self={isMine && first === currentId}
													/>
													<Text type="secondary" aria-hidden>
														×
													</Text>
													<Person
														member={displayPerson(second)}
														self={isMine && second === currentId}
													/>
												</Flex>
												{huddle(target)}
											</Flex>
										);
									}}
								/>
								<Flex
									gap="small"
									align="center"
									wrap
									style={{ padding: `${token.paddingSM}px ${token.padding}px` }}
								>
									<Tag>今週のお休み</Tag>
									<Person
										member={person(week.rest)}
										self={loggedIn && week.rest === currentId}
									/>
									<Text type="secondary">また次のCTで。</Text>
								</Flex>
							</Card>
						</Flex>
					)}

					<Flex vertical gap="middle" component="section" aria-labelledby="upcoming-title">
						<Title level={2} id="upcoming-title">
							この先のCT
						</Title>
						<Row gutter={[token.margin, token.margin]}>
							{weeks.slice(1, 4).map((item, index) => (
								<Col xs={24} md={8} key={item.date}>
									<Card
										size="small"
										title={`${item.short}（月）`}
										extra={
											<Tooltip title="組み合わせを見る">
												<Button
													type="text"
													icon={<RightOutlined />}
													aria-label={`${item.short}の組み合わせを見る`}
													onClick={() => updateWeek(index + 1)}
												/>
											</Tooltip>
										}
									>
										{item.holiday ? (
											<Tag color="warning">祝日のためお休み</Tag>
										) : (
											<Text type="secondary">14:00〜・予定</Text>
										)}
									</Card>
								</Col>
							))}
						</Row>
					</Flex>
				</Flex>
			</Col>

			<Col xs={24} lg={8}>
				<Flex vertical gap="large" component="aside">
					<Card>
						<Flex vertical gap="middle">
							<Flex gap="small" align="center">
								<TeamOutlined aria-hidden />
								<Title level={2}>CTに参加する人</Title>
							</Flex>
							<Flex justify="space-between" align="center">
								<Statistic value={activeCount} suffix="人" />
								<Avatar.Group>
									{members.slice(0, 3).map((m) => (
										<PersonAvatar key={m.id} member={m} size="small" />
									))}
								</Avatar.Group>
							</Flex>
							<Text type="secondary">
								参加者が奇数の週は、ひとりずつ順番にお休みします。
							</Text>
							<Typography.Link
								href="#members"
								onClick={(e) => {
									e.preventDefault();
									navigate("members");
								}}
							>
								メンバー一覧を見る
							</Typography.Link>
						</Flex>
					</Card>
					<Card>
						<Flex vertical gap="small">
							<Title level={2}>CTの過ごし方</Title>
							<Paragraph>
								仕事の話も、週末の話も。まずは「こんにちは」から。
							</Paragraph>
							<Paragraph>
								時間になったら、相手の uチャンネルでハドルを始めましょう。
							</Paragraph>
							<Text type="secondary">
								毎週月曜 11:00 に Slack でも今週の組み合わせをお知らせします。
							</Text>
						</Flex>
					</Card>
					{loggedIn && (
						<Button type="link" onClick={() => navigate("settings")}>
							自分の参加設定を変更する
						</Button>
					)}
				</Flex>
			</Col>
		</Row>
	);

	/* ---------- members ---------- */
	const membersView = (
		<Flex vertical gap="large">
			<Row gutter={[token.margin, token.margin]} align="middle">
				<Col xs={12} md={6}>
					<Card>
						<Statistic
							title="参加する"
							value={visibleMembers.filter((m) => m.active).length}
							suffix="人"
						/>
					</Card>
				</Col>
				<Col xs={12} md={6}>
					<Card>
						<Statistic
							title="参加しない"
							value={visibleMembers.filter((m) => !m.active).length}
							suffix="人"
						/>
					</Card>
				</Col>
				<Col xs={24} md={12}>
					<Text type="secondary">
						参加者が奇数の週は、ひとりずつ順番にお休みします。参加状況が変わると、今後の組み合わせも変わります。
					</Text>
				</Col>
			</Row>
			{visibleMembers.length === 0 ? (
				<Card>
					<Empty
						description={
							<Flex vertical gap="small" align="center">
								<Title level={2}>まだメンバーがいません</Title>
								<Text type="secondary">
									Slack で初めてログインすると、メンバーに登録されます。
								</Text>
							</Flex>
						}
					>
						<Button type="primary" onClick={demoLogin}>
							Slack でログイン
						</Button>
					</Empty>
				</Card>
			) : (
				<Flex vertical gap="middle">
					<Flex justify="space-between" align="baseline" gap="small" wrap>
						<Title level={2} id="members-title">
							すべてのメンバー {visibleMembers.length}人
						</Title>
						<Text type="secondary">社員番号順</Text>
					</Flex>
					<Table<Member>
						aria-labelledby="members-title"
						rowKey="id"
						pagination={false}
						dataSource={visibleMembers}
						columns={[
							{
								key: "no",
								title: "社員番号",
								responsive: ["md"],
								render: (_, member) =>
									member.incomplete ? (
										<Text type="secondary">未設定</Text>
									) : (
										String(member.id).padStart(3, "0")
									),
							},
							{
								key: "member",
								title: "メンバー",
								render: (_, member) => (
									<Flex vertical gap="small" align="start">
										<Person member={member} self={loggedIn && member.id === 1} />
										{member.incomplete && (
											<Tag color="warning">初回設定が未完了</Tag>
										)}
									</Flex>
								),
							},
							{
								key: "status",
								title: "参加状況",
								render: (_, member) => (
									<Badge
										status={member.active ? "success" : "default"}
										text={member.active ? "参加する" : "参加しない"}
									/>
								),
							},
							...(loggedIn
								? [
										{
											key: "actions",
											title: "操作",
											render: (_: unknown, member: Member) => (
												<Flex gap="small" wrap>
													{member.id === 1 && (
														<Button
															type="text"
															size="small"
															onClick={() => navigate("settings")}
														>
															設定
														</Button>
													)}
													<Button
														type="text"
														size="small"
														danger
														aria-label={`${member.name}を削除`}
														onClick={() => setDialog(member)}
													>
														削除
													</Button>
												</Flex>
											),
										},
									]
								: []),
						]}
					/>
					{!loggedIn && (
						<Text type="secondary">
							メンバーの削除や自分の設定変更には、Slack ログインが必要です。
						</Text>
					)}
				</Flex>
			)}
		</Flex>
	);

	/* ---------- settings / onboarding ---------- */
	const channelOptions = members
		.filter((m) => m.channel)
		.map((m) => ({ label: `# ${m.channel}`, value: m.channel as string }));
	const settingsView = (
		<Row gutter={[token.marginXL, token.marginXL]}>
			<Col xs={24} lg={15}>
				<Card>
					<Form<Profile>
						form={form}
						layout="vertical"
						requiredMark={(label, { required }) => (
							<>
								{label}
								{required && "（必須）"}
							</>
						)}
						initialValues={
							screen === "onboarding"
								? { ...savedProfile, employee: "", channel: "" }
								: savedProfile
						}
						onFinishFailed={() => {
							setInvalid(true);
							requestAnimationFrame(() =>
								document.getElementById("form-errors")?.focus(),
							);
						}}
						onFinish={(values) => {
							if (state === "saveError") return;
							setInvalid(false);
							setSavedProfile(values);
							setScreen("schedule");
							setState("ready");
							message.success(
								"設定を保存しました。表示への反映はデモです。組み合わせの再計算は行いません。",
							);
						}}
					>
						<Flex vertical gap="large">
							<Flex gap="middle" align="center">
								<PersonAvatar member={me} size="large" />
								<Flex vertical>
									<Text strong>Slack アカウント</Text>
									<Text type="secondary">{person(1).name}</Text>
								</Flex>
							</Flex>
							{invalid && (
								<div id="form-errors" tabIndex={-1}>
									<Alert
										type="error"
										showIcon
										title="入力内容を確認してください"
										description="名前・社員番号・uチャンネルは必須です。社員番号は半角数字で入力してください。"
									/>
								</div>
							)}
							{state === "saveError" && (
								<Alert
									type="error"
									showIcon
									title="設定を保存できませんでした"
									description="入力内容は保持されています。時間をおいて再度保存してください。"
								/>
							)}
							<div>
								<Form.Item
									name="name"
									label="名前"
									rules={[
										{ required: true, whitespace: true, message: "名前を入力してください。" },
									]}
									extra="組み合わせ表とメンバー一覧に表示されます。"
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="employee"
									label="社員番号"
									rules={[
										{
											required: true,
											pattern: /^\d+$/,
											message: "社員番号を半角数字で入力してください。",
										},
									]}
									extra="組み合わせを決める並び順に使います。"
								>
									<Input inputMode="numeric" />
								</Form.Item>
								<Form.Item
									name="channel"
									label="uチャンネル"
									rules={[{ required: true, message: "uチャンネルを選択してください。" }]}
									extra="相手がハドルを始める、あなたの個人用チャンネルです。"
								>
									<Select
										options={channelOptions}
										placeholder="チャンネルを選択してください"
									/>
								</Form.Item>
								<Form.Item
									name="participating"
									label="CTへの参加"
									valuePropName="checked"
									extra="参加状況を変更すると、全員の今後の組み合わせが変わります。休職中などはチェックを外し、復帰したら再度チェックしてください。"
								>
									<Checkbox>CTに参加する</Checkbox>
								</Form.Item>
							</div>
							<Flex gap="small">
								<Button type="primary" htmlType="submit">
									{screen === "onboarding"
										? "設定を保存してはじめる"
										: "変更を保存する"}
								</Button>
								{screen !== "onboarding" && (
									<Button onClick={() => navigate("schedule")}>キャンセル</Button>
								)}
							</Flex>
						</Flex>
					</Form>
				</Card>
			</Col>
			<Col xs={24} lg={9}>
				<Flex vertical gap="small" component="aside">
					<Title level={2}>あなたらしい名前で。</Title>
					<Paragraph>
						Slack のプロフィールから取り込んだ名前を、CTで使う表示名に変更できます。
					</Paragraph>
					<Title level={2}>参加はいつでも変更できます</Title>
					<Paragraph>
						忙しい時期は、無理せずお休みを。再開するときも、この画面から変更できます。
					</Paragraph>
					<Text type="secondary">変更できるのは、自分の設定だけです。</Text>
				</Flex>
			</Col>
		</Row>
	);

	// STYLE: 本文の最大幅と左右の余白。Layout に max-width の props がないため、トークン値で指定する。
	const inner = {
		maxWidth: token.screenXL,
		margin: "0 auto",
		width: "100%",
		paddingInline: screens.md ? token.paddingLG : token.padding,
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<SkipLink />
			<Layout.Header style={{ paddingInline: 0, height: "auto", lineHeight: "normal" }}>
				<Flex
					justify="space-between"
					align="center"
					style={{ ...inner, paddingBlock: token.paddingXS }}
				>
					<a href="https://www.gaji.jp/" target="_blank" rel="noreferrer">
						<img
							src="/gaji-labo-logo.svg"
							alt="Gaji-Labo（新しいタブで開く）"
							// STYLE: ロゴ SVG は黒（currentColor）。原本と同じく暗いヘッダー上で反転して白く見せる。
							style={{ height: token.sizeLG, display: "block", filter: "invert(1)" }}
						/>
					</a>
					<Text style={{ color: token.colorTextLightSolid }}>Communication Time</Text>
				</Flex>
			</Layout.Header>
			<div
				style={{
					background: token.colorBgContainer,
					borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					gap="small"
					wrap
					style={{ ...inner, paddingBlock: token.paddingSM }}
				>
					<Button
						type="text"
						icon={<MessageOutlined />}
						onClick={() => navigate("schedule")}
					>
						CTスケジュール
					</Button>
					{loggedIn ? (
						<Flex gap="small" align="center">
							<Button
								type="text"
								icon={<PersonAvatar member={me} size="small" />}
								onClick={() => navigate("settings")}
								aria-label={`${me.name}の設定`}
							>
								{me.name}
							</Button>
							<Button
								type="text"
								onClick={() => {
									setLoggedIn(false);
									navigate("schedule");
								}}
							>
								ログアウト
							</Button>
						</Flex>
					) : (
						<Button
							onClick={() =>
								message.info(
									"Slack ログインのデモです。認証後の表示は「ログイン中」の状態で確認できます。",
								)
							}
						>
							Slack でログイン
						</Button>
					)}
				</Flex>
			</div>

			<Layout.Content>
				<main
					id="main"
					ref={mainRef}
					tabIndex={-1}
					style={{ ...inner, paddingBlock: token.paddingXL, outline: "none" }}
				>
					<Flex vertical gap="large">
						{screen !== "schedule" && (
							<Breadcrumb
								items={[
									{
										title: "CT組み合わせ表",
										href: "#",
										onClick: (e) => {
											e.preventDefault();
											navigate("schedule");
										},
									},
									{ title },
								]}
							/>
						)}
						<Flex justify="space-between" align="end" gap="middle" wrap>
							<Flex vertical gap="small">
								<Title level={1}>{title}</Title>
								<Text type="secondary">{lead}</Text>
							</Flex>
							{screen === "schedule" && (
								<Flex gap="small" align="center">
									<CalendarOutlined aria-hidden />
									<Text type="secondary">毎週月曜 14:00〜</Text>
								</Flex>
							)}
						</Flex>

						{state === "loginError" && (
							<Alert
								type="error"
								showIcon
								title="Slack にログインできませんでした"
								description="時間をおいて、もう一度お試しください。"
								action={
									<Button
										size="small"
										onClick={() =>
											message.info("Slack ログインを再試行するデモです。")
										}
									>
										もう一度ログインする
									</Button>
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
									<Card>
										<Result
											status="404"
											title={<Title level={2}>404</Title>}
											subTitle="お探しのページは見つかりませんでした。"
											extra={
												<Button type="primary" onClick={() => navigate("schedule")}>
													CT組み合わせ表へ戻る
												</Button>
											}
										/>
									</Card>
								)}
							</>
						)}
					</Flex>
				</main>
			</Layout.Content>

			<Layout.Footer style={{ paddingInline: 0 }}>
				<Flex justify="space-between" align="center" gap="middle" wrap style={inner}>
					<Flex vertical>
						<Text strong>Gaji-Labo</Text>
						<Text type="secondary">ちょっと話す。それだけで、チームは近くなる。</Text>
					</Flex>
					<Text type="secondary">UIプレビュー · データ・操作はデモです</Text>
				</Flex>
			</Layout.Footer>

			<Modal
				open={dialog !== null}
				title={dialog ? `${dialog.name}さんを削除しますか？` : ""}
				onCancel={() => setDialog(null)}
				footer={[
					<Button key="cancel" onClick={() => setDialog(null)} autoFocus>
						キャンセル
					</Button>,
					<Button
						key="delete"
						type="primary"
						danger
						onClick={() => {
							if (!dialog || state === "deleteError") return;
							setDeleted([...deleted, dialog.id]);
							message.success(
								`${dialog.name}を削除しました。デモの一覧のみ変更しています。`,
							);
							setDialog(null);
						}}
					>
						削除する
					</Button>,
				]}
			>
				<Flex vertical gap="middle">
					<Paragraph>
						メンバー一覧と今後の組み合わせから外れます。全員の組み合わせが変わる場合があります。この操作は取り消せません。
					</Paragraph>
					{state === "deleteError" && (
						<Alert
							type="error"
							showIcon
							title="削除に失敗しました。時間をおいて、もう一度お試しください。"
						/>
					)}
				</Flex>
			</Modal>
		</Layout>
	);
}

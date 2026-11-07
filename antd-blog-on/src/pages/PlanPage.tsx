import { CheckCircleOutlined, ExclamationCircleOutlined, LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Empty, Flex, Grid, Row, Timeline, Typography } from "antd";
import dayjs from "dayjs";
import type { Post } from "../data/fixtures";
import {
	byPlanned,
	canCreate,
	emptyUpcomingWeeks,
	formatShortDate,
	formatWeek,
	HORIZON_WEEKS,
	isAuthor,
	isEditor,
	isOpen,
	isOverdue,
	thisWeek,
	today,
	weekStart,
	weeksFrom,
	type WeekSummary,
} from "../lib/domain";
import { linkProps, setParams, useLocation } from "../lib/router";
import { useStore } from "../store";
import { AuthorNames, CategoryTag, CreateButton, DueText, LoadGate, PageHeading, StatusBadge } from "../components/parts";

const WINDOW_WEEKS = 9; // 先週＋今週から 8 週
const STEP_WEEKS = 4;

/** 1 本の投稿の行（計画・担当・要対応で共通） */
function PostLine({ post, showDate = true }: { post: Post; showDate?: boolean }) {
	const cancelled = post.status === "cancelled";
	return (
		<Flex vertical gap={2}>
			<Flex gap="small" wrap align="center">
				<StatusBadge status={post.status} />
				<Typography.Link {...linkProps(`/posts/${post.id}`)} delete={cancelled}>
					{post.title}
				</Typography.Link>
			</Flex>
			<Flex gap="small" wrap align="center">
				<Typography.Text type="secondary">
					{showDate && <>{post.status === "published" ? `${formatShortDate(post.publishedDate)} 公開` : `${formatShortDate(post.plannedDate)} 予定`}・</>}
					<AuthorNames ids={post.authorIds} />
				</Typography.Text>
				<DueText post={post} />
			</Flex>
		</Flex>
	);
}

function WeekContent({ week }: { week: WeekSummary }) {
	const { viewer } = useStore();
	const label = (
		<Flex gap="small" align="baseline" wrap>
			<Typography.Title level={3}>
				{formatWeek(week.start)}
				{week.isCurrent && "（今週）"}
			</Typography.Title>
			{week.covered ? (
				<Typography.Text type="success">
					<CheckCircleOutlined /> {week.isPast ? `${week.count} 本公開` : `${week.count} 本予定`}
				</Typography.Text>
			) : (
				<Typography.Text type="danger">
					<ExclamationCircleOutlined /> {week.isPast ? "公開なし" : "予定がありません"}
				</Typography.Text>
			)}
		</Flex>
	);
	return (
		<Flex vertical gap="small">
			{label}
			{week.posts.map((p) => (
				<PostLine key={p.id} post={p} />
			))}
			{!week.covered && !week.isPast && week.posts.some((p) => p.status === "cancelled") && (
				<Typography.Text type="secondary">取りやめの投稿は本数に数えていません</Typography.Text>
			)}
			{!week.covered && !week.isPast && canCreate(viewer) && (
				<div>
					<Button type="dashed" icon={<PlusOutlined />} onClick={() => setParams({ new: "1", date: week.start.format("YYYY-MM-DD") })}>
						この週に予定を入れる
					</Button>
				</div>
			)}
		</Flex>
	);
}

function WeeklyPlan() {
	const { posts } = useStore();
	const { params } = useLocation();
	const fromParam = params.get("from");
	const from = fromParam && dayjs(fromParam).isValid() ? weekStart(dayjs(fromParam)) : thisWeek.subtract(1, "week");
	const weeks = weeksFrom(posts, from, WINDOW_WEEKS);
	const end = from.add(WINDOW_WEEKS, "week").subtract(1, "day");
	const isDefault = from.isSame(thisWeek.subtract(1, "week"), "day");

	return (
		<Card
			title={
				<Typography.Title level={2}>
					週ごとの計画
				</Typography.Title>
			}
			extra={
				<Typography.Text type="secondary">
					{from.format("M月D日")}〜{end.format("M月D日")}
				</Typography.Text>
			}
		>
			<Flex vertical gap="large">
				<Flex gap="small" wrap aria-label="表示する期間">
					<Button icon={<LeftOutlined />} onClick={() => setParams({ from: from.subtract(STEP_WEEKS, "week").format("YYYY-MM-DD") })}>
						前の {STEP_WEEKS} 週
					</Button>
					<Button disabled={isDefault} onClick={() => setParams({ from: null })}>
						今週に戻る
					</Button>
					<Button icon={<RightOutlined />} iconPlacement="end" onClick={() => setParams({ from: from.add(STEP_WEEKS, "week").format("YYYY-MM-DD") })}>
						次の {STEP_WEEKS} 週
					</Button>
				</Flex>
				<Timeline
					items={weeks.map((w) => ({
						key: w.start.format("YYYY-MM-DD"),
						color: w.covered ? (w.isCurrent ? "blue" : "green") : w.isPast ? "gray" : "red",
						content: <WeekContent week={w} />,
					}))}
				/>
			</Flex>
		</Card>
	);
}

/** 遅れ・空き週の知らせ（全員に出す） */
function PlanAlert() {
	const { posts } = useStore();
	const overdue = posts.filter(isOverdue);
	const empty = emptyUpcomingWeeks(posts);
	if (overdue.length === 0 && empty.length === 0)
		return <Alert type="success" showIcon title={`予定日を過ぎた投稿はありません。今週から ${HORIZON_WEEKS} 週間、毎週予定が入っています`} />;
	const parts = [];
	if (overdue.length) parts.push(`予定日を過ぎても公開されていない投稿が ${overdue.length} 件`);
	if (empty.length) parts.push(`今週から ${HORIZON_WEEKS} 週間で予定の無い週が ${empty.length} 週（${empty.map((w) => w.start.format("M/D")).join("・")} の週）`);
	return (
		<Alert
			type="warning"
			showIcon
			title={`${parts.join("、")}あります`}
			action={
				overdue.length > 0 && (
					<Button size="small" {...linkProps("/posts?overdue=1&undated=0")} href="/posts?overdue=1&undated=0">
						遅れを一覧で見る
					</Button>
				)
			}
		/>
	);
}

function MyPosts() {
	const { posts, viewer } = useStore();
	if (viewer.kind !== "member") return null;
	const mine = posts.filter((p) => isAuthor(viewer, p) && isOpen(p)).sort(byPlanned);
	return (
		<Card
			title={
				<Typography.Title level={2}>
					あなたの担当
				</Typography.Title>
			}
			extra={<Typography.Link {...linkProps("/posts?mine=1")}>すべて見る</Typography.Link>}
		>
			{mine.length === 0 ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="公開前のあなたの担当はありません。書きたいテーマがあれば登録しましょう">
					<CreateButton type="default" />
				</Empty>
			) : (
				<Flex vertical gap="middle">
					{mine.map((p) => (
						<PostLine key={p.id} post={p} />
					))}
				</Flex>
			)}
		</Card>
	);
}

const SOON_DAYS = 14;
function NeedsAttention() {
	const { posts, viewer } = useStore();
	if (!isEditor(viewer)) return null;
	const overdue = posts.filter(isOverdue).sort(byPlanned);
	const stillIdea = posts
		.filter((p) => p.status === "idea" && p.plannedDate && !dayjs(p.plannedDate).isBefore(today, "day") && dayjs(p.plannedDate).diff(today, "day") <= SOON_DAYS)
		.sort(byPlanned);
	const empty = emptyUpcomingWeeks(posts);
	const nothing = overdue.length + stillIdea.length + empty.length === 0;
	return (
		<Card
			title={
				<Typography.Title level={2}>
					要対応（編集担当）
				</Typography.Title>
			}
		>
			{nothing ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="いま対応が必要なことはありません" />
			) : (
				<Flex vertical gap="middle">
					{overdue.length > 0 && (
						<section>
							<Typography.Title level={3}>予定日を過ぎた投稿（{overdue.length}）</Typography.Title>
							<Flex vertical gap="small">
								{overdue.map((p) => (
									<PostLine key={p.id} post={p} />
								))}
							</Flex>
						</section>
					)}
					{stillIdea.length > 0 && (
						<section>
							<Typography.Title level={3}>2 週間以内なのにアイデアのまま（{stillIdea.length}）</Typography.Title>
							<Flex vertical gap="small">
								{stillIdea.map((p) => (
									<PostLine key={p.id} post={p} />
								))}
							</Flex>
						</section>
					)}
					{empty.length > 0 && (
						<section>
							<Typography.Title level={3}>予定の無い週（{empty.length}）</Typography.Title>
							<Flex vertical gap="small">
								{empty.map((w) => (
									<Flex key={w.start.valueOf()} justify="space-between" align="center" gap="small" wrap>
										<Typography.Text>{formatWeek(w.start)}</Typography.Text>
										<Button size="small" type="dashed" icon={<PlusOutlined />} onClick={() => setParams({ new: "1", date: w.start.format("YYYY-MM-DD") })}>
											予定を入れる
										</Button>
									</Flex>
								))}
							</Flex>
						</section>
					)}
				</Flex>
			)}
		</Card>
	);
}

function GuestInvite() {
	const { viewer } = useStore();
	if (viewer.kind !== "guest") return null;
	return (
		<Card
			title={
				<Typography.Title level={2}>
					ログインするとできること
				</Typography.Title>
			}
		>
			<Typography.Paragraph>Slack アカウントでログインすると、自分の担当と予定日をここで確かめたり、投稿予定を登録・編集したりできます。</Typography.Paragraph>
			<CreateButton type="default" />
		</Card>
	);
}

function UndatedIdeas() {
	const { posts } = useStore();
	const undated = posts.filter((p) => p.plannedDate === null && isOpen(p));
	return (
		<Card
			title={
				<Typography.Title level={2}>
					日付未定のアイデア
				</Typography.Title>
			}
		>
			{undated.length === 0 ? (
				<Typography.Text type="secondary">日付未定のアイデアはありません</Typography.Text>
			) : (
				<Flex vertical gap="middle">
					<Typography.Text type="secondary">予定の無い週に入れられるか、書く人と相談してみましょう</Typography.Text>
					{undated.map((p) => (
						<Flex key={p.id} vertical gap={2}>
							<Flex gap="small" wrap align="center">
								<CategoryTag category={p.category} />
								<Typography.Link {...linkProps(`/posts/${p.id}`)}>{p.title}</Typography.Link>
							</Flex>
							<Typography.Text type="secondary">
								<AuthorNames ids={p.authorIds} />
							</Typography.Text>
						</Flex>
					))}
				</Flex>
			)}
		</Card>
	);
}

export function PlanPage() {
	const { posts } = useStore();
	const screens = Grid.useBreakpoint();
	const side = (
		<Flex vertical gap="large">
			<NeedsAttention />
			<MyPosts />
			<GuestInvite />
		</Flex>
	);
	return (
		<Flex vertical gap="large">
			<PageHeading title="投稿計画" description={`今日は ${today.format("YYYY年M月D日（ddd）")}。週 1 本以上の公開を目安に、空いている週と遅れを確かめましょう`} extra={<CreateButton />} />
			<LoadGate rows={10}>
				{posts.length === 0 ? (
					<Card>
						<Empty description="投稿予定はまだありません。最初の 1 本を登録して、計画を始めましょう">
							<CreateButton type="default" />
						</Empty>
					</Card>
				) : (
					<Flex vertical gap="large">
						<PlanAlert />
						<Row gutter={[24, 24]}>
							<Col xs={{ span: 24, order: 2 }} lg={{ span: 15, order: 1 }}>
								<WeeklyPlan />
							</Col>
							<Col xs={{ span: 24, order: 1 }} lg={{ span: 9, order: 2 }}>
								{screens.lg ? (
									<Flex vertical gap="large">
										{side}
										<UndatedIdeas />
									</Flex>
								) : (
									side
								)}
							</Col>
							{!screens.lg && (
								<Col xs={{ span: 24, order: 3 }}>
									<UndatedIdeas />
								</Col>
							)}
						</Row>
					</Flex>
				)}
			</LoadGate>
		</Flex>
	);
}

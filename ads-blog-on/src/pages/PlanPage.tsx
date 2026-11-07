import { cssMap } from "@atlaskit/css";
import PageHeader from "@atlaskit/page-header";
import { LinkButton } from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import Link from "@atlaskit/link";
import Lozenge from "@atlaskit/lozenge/new/lozenge";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import EmptyState from "@atlaskit/empty-state";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import { useStore, useViewParams } from "../store";
import { PeriodPicker, usePeriod } from "../components/PeriodPicker";
import { PostList } from "../components/PostList";
import { ListSkeleton, LoadError } from "../components/PageStates";
import { buildWeeks, emptyUpcomingWeeks, isOpen, isOverdue, sortForAssignee, undatedPosts, STATUS_LABEL, type Week } from "../lib/plan";
import { formatDate, formatWeek } from "../lib/date";

const styles = cssMap({
	week: {
		borderWidth: token("border.width"),
		borderStyle: "solid",
		borderColor: token("color.border"),
		borderRadius: token("radius.large"),
		paddingInline: token("space.200"),
		paddingBlock: token("space.150"),
	},
	weekEmpty: {
		borderWidth: token("border.width"),
		borderStyle: "dashed",
		borderColor: token("color.border.warning"),
		borderRadius: token("radius.large"),
		paddingInline: token("space.200"),
		paddingBlock: token("space.150"),
	},
});

function WeekSection({ week, canCreate }: { week: Week; canCreate: boolean }) {
	const { members, today, user } = useStore();
	const headingId = `week-${week.monday}`;
	const isGap = week.count === 0;
	return (
		<Box as="section" aria-labelledby={headingId} xcss={isGap && !week.isPast ? styles.weekEmpty : styles.week}>
			<Stack space="space.100">
				<Inline space="space.100" alignBlock="center" shouldWrap spread="space-between">
					<Heading size="small" as="h3" id={headingId}>
						{formatWeek(week.monday)}
						{week.isCurrent ? "（今週）" : ""}
					</Heading>
					{isGap ? (
						<Lozenge appearance={week.isPast ? "neutral" : "warning"}>{week.isPast ? "公開なし" : "予定なし"}</Lozenge>
					) : (
						<Text color="color.text.subtle">{week.count}本</Text>
					)}
				</Inline>
				{week.posts.length > 0 && (
					<PostList posts={week.posts} members={members} today={today} userId={user?.id} label={`${formatWeek(week.monday)}の投稿`} />
				)}
				{isGap && !week.isPast && (
					<Text color="color.text.subtle">
						{week.posts.length > 0 ? "取りやめのほかに予定がありません。" : "この週はまだ予定がありません。"}
						{canCreate && (
							<>
								{" "}
								<Link href={`/posts/new?date=${week.monday}`}>この週に登録</Link>
							</>
						)}
					</Text>
				)}
			</Stack>
		</Box>
	);
}

/** 一覧の上の「要対応」：遅れ・予定の無い週・自分の次の締切 */
function Attention({ weeks }: { weeks: Week[] }) {
	const { posts, today, user } = useStore();
	const overdue = posts.filter((p) => isOverdue(p, today));
	const gaps = emptyUpcomingWeeks(weeks);
	const mine = user ? sortForAssignee(posts.filter((p) => isOpen(p) && p.authorIds.includes(user.id) && p.plannedDate)) : [];
	const next = mine[0];
	if (overdue.length === 0 && gaps.length === 0 && !next) return null;
	return (
		<Stack space="space.150">
			{(overdue.length > 0 || gaps.length > 0) && (
				<SectionMessage appearance="warning" headingLevel="h2" title="計画に遅れと抜けがあります">
					<Stack space="space.100">
						{overdue.length > 0 && (
							<Box>
								<Text weight="bold">予定日を過ぎた投稿：{overdue.length}件</Text>
								<Box as="ul">
									{overdue.map((p) => (
										<Box as="li" key={p.id}>
											<Link href={`/posts/${p.id}`}>{p.title}</Link>（予定日 {formatDate(p.plannedDate!)}・{STATUS_LABEL[p.status]}）
										</Box>
									))}
								</Box>
							</Box>
						)}
						{gaps.length > 0 && (
							<Box>
								<Text weight="bold">予定の無い週：{gaps.length}週</Text>
								<Text as="p">{gaps.map((w) => formatWeek(w.monday)).join("、")}。週 1 本のペースを保つには、書く人を決めて予定を入れてください。</Text>
							</Box>
						)}
					</Stack>
				</SectionMessage>
			)}
			{next && (
				<SectionMessage
					appearance="information"
					headingLevel="h2"
					title={`あなたの次の締切は${formatDate(next.plannedDate!)}です`}
					actions={[
						<SectionMessageAction key="me" href="/me">
							自分の担当を見る
						</SectionMessageAction>,
					]}
				>
					<Text as="p">
						<Link href={`/posts/${next.id}`}>{next.title}</Link>（{STATUS_LABEL[next.status]}）
						{mine.length > 1 ? `ほか、担当が${mine.length - 1}件あります。` : ""}
					</Text>
				</SectionMessage>
			)}
		</Stack>
	);
}

export function PlanPage() {
	const { posts, members, today, user } = useStore();
	const { state } = useViewParams();
	const { from, to, isValid } = usePeriod();
	const visible = state === "empty" ? [] : posts;
	const weeks = isValid ? buildWeeks(visible, from, to, today) : [];
	const hasAny = weeks.some((w) => w.posts.length > 0);
	const undated = undatedPosts(visible);

	return (
		<Stack space="space.300">
			<PageHeader
				actions={
					user ? (
						<LinkButton appearance="primary" href="/posts/new">
							投稿予定を登録
						</LinkButton>
					) : undefined
				}
				bottomBar={<PeriodPicker />}
			>
				投稿計画
			</PageHeader>

			{!user && (
				<SectionMessage appearance="information" headingLevel="h2" title="閲覧のみの表示です">
					<Text as="p">Slack でログインすると、投稿予定を登録したり、自分が書く投稿を編集したりできます。ログインは右上から行えます。</Text>
				</SectionMessage>
			)}

			{state === "loading" ? (
				<ListSkeleton />
			) : state === "error" ? (
				<LoadError what="投稿計画" />
			) : !hasAny && undated.length === 0 ? (
				<EmptyState
					header="この期間の投稿予定はありません"
					headingLevel={2}
					description={
						user
							? "期間を広げるか、投稿予定を登録してください。週 1 本のペースを保つには、まず今週と来週の予定を入れるのがおすすめです。"
							: "期間を広げてみてください。ログインすると投稿予定を登録できます。"
					}
				/>
			) : (
				<>
					<Attention weeks={weeks} />
					<Stack space="space.200">
						<Heading size="medium" as="h2">
							週ごとの予定
						</Heading>
						{weeks.map((w) => (
							<WeekSection key={w.monday} week={w} canCreate={!!user} />
						))}
					</Stack>
					{undated.length > 0 && (
						<Stack space="space.100">
							<Heading size="medium" as="h2">
								公開予定日が未定の投稿
							</Heading>
							<PostList posts={undated} members={members} today={today} userId={user?.id} label="公開予定日が未定の投稿" />
						</Stack>
					)}
				</>
			)}
		</Stack>
	);
}

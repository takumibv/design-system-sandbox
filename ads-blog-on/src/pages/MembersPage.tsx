import { useParams } from "react-router-dom";
import PageHeader from "@atlaskit/page-header";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import DynamicTable from "@atlaskit/dynamic-table";
import Link from "@atlaskit/link";
import Lozenge from "@atlaskit/lozenge/new/lozenge";
import EmptyState from "@atlaskit/empty-state";
import { Stack, Text } from "@atlaskit/primitives/compiled";
import { useStore, useViewParams } from "../store";
import { PeriodPicker, usePeriod } from "../components/PeriodPicker";
import { ListSkeleton, LoadError, NotFound } from "../components/PageStates";
import { summarizeMembers } from "../lib/plan";
import { formatDate } from "../lib/date";
import { AssigneePosts } from "./MyPage";

export function MembersPage() {
	const { members, posts, today, user } = useStore();
	const { state } = useViewParams();
	const { from, to, isValid } = usePeriod();
	const list = state === "empty" ? [] : members;
	const rows = isValid ? summarizeMembers(list, posts, from, to, today) : [];

	return (
		<Stack space="space.300">
			<PageHeader bottomBar={<PeriodPicker />}>書く人ごと</PageHeader>
			<Text as="p" color="color.text.subtle">
				期間内に公開した本数と、これから公開する予定の本数をメンバーごとに比べられます。予定が 0 本の人には、予定の無い週を相談してみてください。
			</Text>
			{state === "loading" ? (
				<ListSkeleton rows={6} />
			) : state === "error" ? (
				<LoadError what="メンバーの一覧" />
			) : rows.length === 0 ? (
				<EmptyState
					header="メンバーがいません"
					headingLevel={2}
					description="メンバーは Slack でログインすると自動で追加されます。ログインした人がいないか確認してください。"
				/>
			) : (
				<DynamicTable
					caption="書く人ごとの予定と実績"
					head={{
						cells: [
							{ key: "name", content: "書く人", isSortable: true },
							{ key: "published", content: "公開済み（期間内）", isSortable: true },
							{ key: "planned", content: "予定（期間内）", isSortable: true },
							{ key: "last", content: "最後の公開日", isSortable: true },
							{ key: "next", content: "次の予定日", isSortable: true },
							{ key: "overdue", content: "予定日超過", isSortable: true },
						],
					}}
					rows={rows.map((r) => ({
						key: String(r.member.id),
						cells: [
							{
								key: r.member.name,
								content: (
									<Stack space="space.0">
										<Link href={`/members/${r.member.id}`}>
											{r.member.name}
											{user?.id === r.member.id ? "（あなた）" : ""}
										</Link>
										{r.member.role === "editor" && (
											<Text size="small" color="color.text.subtle">
												編集担当
											</Text>
										)}
									</Stack>
								),
							},
							{ key: r.published, content: `${r.published}本` },
							{
								key: r.planned,
								content: r.planned === 0 ? <Lozenge appearance="warning">予定なし</Lozenge> : `${r.planned}本`,
							},
							{ key: r.lastPublished ?? "", content: r.lastPublished ? formatDate(r.lastPublished) : "なし" },
							{ key: r.nextPlanned ?? "9999", content: r.nextPlanned ? formatDate(r.nextPlanned) : "なし" },
							{
								key: r.overdue,
								content: r.overdue > 0 ? <Lozenge appearance="danger">{`${r.overdue}件`}</Lozenge> : "なし",
							},
						],
					}))}
				/>
			)}
		</Stack>
	);
}

export function MemberPage() {
	const { id } = useParams();
	const { members, posts, user } = useStore();
	const { state } = useViewParams();
	const member = members.find((m) => String(m.id) === id);
	if (!member) return <NotFound what="メンバー" />;
	return (
		<Stack space="space.300">
			<PageHeader
				breadcrumbs={
					<Breadcrumbs>
						<BreadcrumbsItem href="/members" text="書く人ごと" />
						<BreadcrumbsItem href={`/members/${member.id}`} text={member.name} />
					</Breadcrumbs>
				}
			>
				{`${member.name}の投稿`}
			</PageHeader>
			{state === "loading" ? (
				<ListSkeleton />
			) : state === "error" ? (
				<LoadError what={`${member.name}の投稿`} />
			) : (
				<AssigneePosts person={member} posts={state === "empty" ? [] : posts} isSelf={user?.id === member.id} />
			)}
		</Stack>
	);
}

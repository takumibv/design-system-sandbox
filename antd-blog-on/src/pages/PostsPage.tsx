import { Button, Card, Checkbox, DatePicker, Empty, Flex, Form, Select, Table, Typography, type TableColumnsType } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import type { Post, Status } from "../data/fixtures";
import { CATEGORIES, effectiveDate, formatShortDate, isAuthor, isOverdue, STATUSES, STATUS_LABEL, today, type Category } from "../lib/domain";
import { linkProps, setParams, useLocation } from "../lib/router";
import { members, useStore } from "../store";
import { AuthorNames, CategoryTag, CreateButton, DueText, LoadGate, PageHeading, StatusBadge } from "../components/parts";

const DEFAULT_FROM = today.startOf("month").subtract(1, "month");
const DEFAULT_TO = today.add(1, "month").endOf("month");
const fmt = (d: Dayjs) => d.format("YYYY-MM-DD");

const PRESETS: { label: string; value: [Dayjs, Dayjs] }[] = [
	{ label: "先月〜来月", value: [DEFAULT_FROM, DEFAULT_TO.startOf("day")] },
	{ label: "今月", value: [today.startOf("month"), today.endOf("month").startOf("day")] },
	{ label: "今後 4 週間", value: [today, today.add(4, "week")] },
	{ label: "過去 3 か月", value: [today.subtract(3, "month"), today] },
];

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function PostsPage() {
	const { posts, viewer } = useStore();
	const { params } = useLocation();

	const from = params.get("from") ? dayjs(params.get("from")) : DEFAULT_FROM;
	const to = params.get("to") ? dayjs(params.get("to")) : DEFAULT_TO;
	const statuses = list(params.get("status")) as Status[];
	const cats = list(params.get("cat")) as Category[];
	const authors = list(params.get("author")).map(Number);
	const mine = params.get("mine") === "1" && viewer.kind === "member";
	const overdueOnly = params.get("overdue") === "1";
	const undated = params.get("undated") !== "0";

	const rows = posts
		.filter((p) => {
			const d = effectiveDate(p);
			if (d === null) {
				if (!undated) return false;
			} else if (dayjs(d).isBefore(from, "day") || dayjs(d).isAfter(to, "day")) return false;
			if (statuses.length && !statuses.includes(p.status)) return false;
			if (cats.length && !cats.includes(p.category)) return false;
			if (authors.length && !p.authorIds.some((a) => authors.includes(a))) return false;
			if (mine && !isAuthor(viewer, p)) return false;
			if (overdueOnly && !isOverdue(p)) return false;
			return true;
		})
		.sort((a, b) => (effectiveDate(a) ?? "9999").localeCompare(effectiveDate(b) ?? "9999"));

	const filtered = statuses.length + cats.length + authors.length > 0 || mine || overdueOnly || !undated || params.has("from") || params.has("to");

	const columns: TableColumnsType<Post> = [
		{
			title: "日付",
			key: "date",
			width: 150,
			render: (_, p) => (
				<Flex vertical>
					<span>{formatShortDate(effectiveDate(p))}</span>
					<Typography.Text type="secondary">{p.status === "published" ? "公開日" : p.plannedDate ? "公開予定日" : "日付未定"}</Typography.Text>
				</Flex>
			),
			sorter: (a, b) => (effectiveDate(a) ?? "9999").localeCompare(effectiveDate(b) ?? "9999"),
		},
		{
			title: "タイトル",
			key: "title",
			render: (_, p) => (
				<Flex vertical gap={2}>
					<Typography.Link {...linkProps(`/posts/${p.id}`)} delete={p.status === "cancelled"}>
						{p.title}
					</Typography.Link>
					<DueText post={p} />
				</Flex>
			),
		},
		{ title: "カテゴリ", dataIndex: "category", width: 130, render: (c: Category) => <CategoryTag category={c} /> },
		{ title: "書く人", dataIndex: "authorIds", width: 200, render: (ids: number[]) => <AuthorNames ids={ids} /> },
		{ title: "状態", dataIndex: "status", width: 120, render: (s: Status) => <StatusBadge status={s} /> },
		{ title: "メモ", dataIndex: "note", width: 200, render: (n?: string) => n ?? "-" },
	];

	return (
		<Flex vertical gap="large">
			<PageHeading title="投稿一覧" description="期間や条件で絞り込んで、投稿予定と公開済みの投稿を確かめられます" extra={<CreateButton />} />
			<Card>
				<Form layout="vertical" aria-label="絞り込み">
					<Flex gap="middle" wrap align="flex-end">
						<Form.Item label="期間（公開日・公開予定日）" htmlFor="posts-range">
							<DatePicker.RangePicker
								id={{ start: "posts-range" }}
								value={[from, to]}
								presets={PRESETS}
								allowClear={false}
								format="YYYY/M/D"
								onChange={(v) => v && v[0] && v[1] && setParams({ from: fmt(v[0]), to: fmt(v[1]) }, { replace: true })}
							/>
						</Form.Item>
						<Form.Item label="状態" htmlFor="posts-status">
							<Select
								id="posts-status"
								mode="multiple"
								allowClear
								placeholder="すべて"
								style={{ minWidth: 180 }}
								value={statuses}
								options={STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }))}
								onChange={(v) => setParams({ status: v.join(",") }, { replace: true })}
							/>
						</Form.Item>
						<Form.Item label="カテゴリ" htmlFor="posts-cat">
							<Select
								id="posts-cat"
								mode="multiple"
								allowClear
								placeholder="すべて"
								style={{ minWidth: 180 }}
								value={cats}
								options={CATEGORIES.map((c) => ({ value: c, label: c }))}
								onChange={(v) => setParams({ cat: v.join(",") }, { replace: true })}
							/>
						</Form.Item>
						<Form.Item label="書く人" htmlFor="posts-author">
							<Select
								id="posts-author"
								mode="multiple"
								allowClear
								placeholder="すべて"
								style={{ minWidth: 180 }}
								value={authors}
								showSearch={{ optionFilterProp: "label" }}
								options={members.map((m) => ({ value: m.id, label: m.name }))}
								onChange={(v) => setParams({ author: v.join(",") }, { replace: true })}
							/>
						</Form.Item>
						<Form.Item>
							<Flex gap="small" wrap>
								{viewer.kind === "member" && (
									<Checkbox checked={mine} onChange={(e) => setParams({ mine: e.target.checked ? "1" : null }, { replace: true })}>
										自分の担当だけ
									</Checkbox>
								)}
								<Checkbox checked={overdueOnly} onChange={(e) => setParams({ overdue: e.target.checked ? "1" : null }, { replace: true })}>
									遅れだけ
								</Checkbox>
								<Checkbox checked={undated} onChange={(e) => setParams({ undated: e.target.checked ? null : "0" }, { replace: true })}>
									日付未定も表示
								</Checkbox>
							</Flex>
						</Form.Item>
					</Flex>
				</Form>
			</Card>
			<LoadGate>
				<Card>
					<Flex vertical gap="middle">
						<Flex justify="space-between" align="center" wrap gap="small">
							<Typography.Text aria-live="polite">{rows.length} 件</Typography.Text>
							{filtered && (
								<Button type="link" onClick={() => setParams({ from: null, to: null, status: null, cat: null, author: null, mine: null, overdue: null, undated: null })}>
									条件をすべて解除
								</Button>
							)}
						</Flex>
						<Table<Post>
							rowKey="id"
							columns={columns}
							dataSource={rows}
							pagination={rows.length > 20 ? { pageSize: 20 } : false}
							scroll={{ x: 900 }}
							locale={{
								emptyText: (
									<Empty
										description={
											posts.length === 0 ? "投稿予定はまだありません。最初の 1 本を登録しましょう" : "条件に合う投稿はありません。期間を広げるか、条件を解除してください"
										}
									>
										{posts.length === 0 ? (
											<CreateButton type="default" />
										) : (
											<Button onClick={() => setParams({ from: null, to: null, status: null, cat: null, author: null, mine: null, overdue: null, undated: null })}>
												条件をすべて解除
											</Button>
										)}
									</Empty>
								),
							}}
						/>
					</Flex>
				</Card>
			</LoadGate>
		</Flex>
	);
}

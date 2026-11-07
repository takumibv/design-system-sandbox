import { Card, Col, DatePicker, Flex, Form, Row, Statistic, Table, Tag, Typography, type TableColumnsType } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import type { Member } from "../data/fixtures";
import { formatShortDate, isOpen, isOverdue, today } from "../lib/domain";
import { linkProps, setParams, useLocation } from "../lib/router";
import { members, useStore } from "../store";
import { CreateButton, LoadGate, PageHeading } from "../components/parts";

const DEFAULT_FROM = today.startOf("month").subtract(1, "month");
const DEFAULT_TO = today.add(1, "month").endOf("month");
const fmt = (d: Dayjs) => d.format("YYYY-MM-DD");

type Row = Member & { published: number; planned: number; overdue: number; next: string | null; last: string | null };

export function MembersPage() {
	const { posts, viewer } = useStore();
	const { params } = useLocation();
	const from = params.get("from") ? dayjs(params.get("from")) : DEFAULT_FROM;
	const to = params.get("to") ? dayjs(params.get("to")) : DEFAULT_TO;
	const inRange = (d: string | null | undefined) => !!d && !dayjs(d).isBefore(from, "day") && !dayjs(d).isAfter(to, "day");

	const rows: Row[] = members.map((m) => {
		const own = posts.filter((p) => p.authorIds.includes(m.id));
		const published = own.filter((p) => p.status === "published" && inRange(p.publishedDate));
		const planned = own.filter((p) => isOpen(p) && inRange(p.plannedDate));
		const upcoming = own.filter((p) => isOpen(p) && p.plannedDate && !dayjs(p.plannedDate).isBefore(today, "day")).map((p) => p.plannedDate!).sort();
		const lastPublished = own.filter((p) => p.status === "published" && p.publishedDate).map((p) => p.publishedDate!).sort();
		return {
			...m,
			published: published.length,
			planned: planned.length,
			overdue: own.filter(isOverdue).length,
			next: upcoming[0] ?? null,
			last: lastPublished.at(-1) ?? null,
		};
	});
	const publishedPeople = rows.filter((r) => r.published > 0).length;
	const totalPublished = posts.filter((p) => p.status === "published" && inRange(p.publishedDate)).length;
	const nothing = rows.filter((r) => r.published === 0 && r.planned === 0 && r.overdue === 0);

	const columns: TableColumnsType<Row> = [
		{
			title: "書く人",
			key: "name",
			render: (_, r) => (
				<Flex gap="small" align="center" wrap>
					<Typography.Link {...linkProps(`/posts?author=${r.id}&from=${fmt(from)}&to=${fmt(to)}`)}>{r.name}</Typography.Link>
					{viewer.kind === "member" && viewer.member.id === r.id && <Typography.Text strong>（あなた）</Typography.Text>}
					{r.role === "editor" && <Tag>編集担当</Tag>}
				</Flex>
			),
		},
		{ title: "公開済み（期間内）", dataIndex: "published", width: 150, align: "right", sorter: (a, b) => a.published - b.published, render: (n: number) => `${n} 本` },
		{ title: "予定（期間内・未公開）", dataIndex: "planned", width: 170, align: "right", sorter: (a, b) => a.planned - b.planned, render: (n: number) => `${n} 本` },
		{
			title: "遅れ",
			dataIndex: "overdue",
			width: 100,
			align: "right",
			sorter: (a, b) => a.overdue - b.overdue,
			render: (n: number) => (n > 0 ? <Typography.Text type="danger">{n} 件</Typography.Text> : "-"),
		},
		{ title: "次の予定日", dataIndex: "next", width: 140, sorter: (a, b) => (a.next ?? "9999").localeCompare(b.next ?? "9999"), render: (d: string | null) => (d ? formatShortDate(d) : "-") },
		{ title: "最後に公開した日", dataIndex: "last", width: 150, sorter: (a, b) => (a.last ?? "").localeCompare(b.last ?? ""), render: (d: string | null) => (d ? formatShortDate(d) : "-") },
		{
			title: "メモ",
			key: "memo",
			width: 200,
			render: (_, r) => (r.published === 0 && r.planned === 0 ? (r.overdue > 0 ? "遅れのみ" : <Typography.Text type="secondary">期間内の公開・予定なし</Typography.Text>) : "-"),
		},
	];

	return (
		<Flex vertical gap="large">
			<PageHeading title="書く人" description="書く人ごとの公開数と予定を比べて、偏りがないか確かめられます。名前を押すと、その人の投稿一覧を開きます" extra={<CreateButton />} />
			<Card>
				<Form layout="vertical" aria-label="期間">
					<Form.Item label="期間" htmlFor="members-range">
						<DatePicker.RangePicker
							id={{ start: "members-range" }}
							value={[from, to]}
							allowClear={false}
							format="YYYY/M/D"
							presets={[
								{ label: "先月〜来月", value: [DEFAULT_FROM, DEFAULT_TO.startOf("day")] },
								{ label: "過去 3 か月", value: [today.subtract(3, "month"), today] },
								{ label: "今後 3 か月", value: [today, today.add(3, "month")] },
							]}
							onChange={(v) => v && v[0] && v[1] && setParams({ from: fmt(v[0]), to: fmt(v[1]) }, { replace: true })}
						/>
					</Form.Item>
				</Form>
			</Card>
			<LoadGate>
				<Flex vertical gap="large">
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title="期間内に公開した人" value={publishedPeople} suffix={`/ ${members.length} 人`} />
							</Card>
						</Col>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title="期間内の公開" value={totalPublished} suffix="本" />
							</Card>
						</Col>
						<Col xs={24} sm={8}>
							<Card>
								<Statistic title="期間内の公開・予定がない人" value={nothing.length} suffix="人" />
								{nothing.length > 0 && <Typography.Text type="secondary">{nothing.map((r) => r.name).join("、")}</Typography.Text>}
							</Card>
						</Col>
					</Row>
					<Card>
						<Table<Row> rowKey="id" columns={columns} dataSource={rows} pagination={false} scroll={{ x: 1000 }} />
					</Card>
				</Flex>
			</LoadGate>
		</Flex>
	);
}

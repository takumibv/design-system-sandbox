import { ClockCircleOutlined, ExclamationCircleOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Result, Skeleton, Tag, Typography, type BadgeProps } from "antd";
import type { ReactNode } from "react";
import type { Post, Status } from "../data/fixtures";
import { canCreate, daysOverdue, daysUntil, isOverdue, memberName, NEAR_DAYS, STATUS_LABEL, type Category } from "../lib/domain";
import { setParams } from "../lib/router";
import { members, useStore } from "../store";

const STATUS_BADGE: Record<Status, BadgeProps["status"]> = {
	idea: "default",
	writing: "processing",
	review: "warning",
	published: "success",
	cancelled: "default",
};

/** 状態：機能色の点＋文字（design.md「状態には機能色、Tag は分類に」） */
export const StatusBadge = ({ status }: { status: Status }) => <Badge status={STATUS_BADGE[status]} text={STATUS_LABEL[status]} />;

const CATEGORY_COLOR: Record<Category, string> = {
	技術: "blue",
	デザイン: "purple",
	"チーム・文化": "green",
	イベント報告: "orange",
};
/** カテゴリ：プリセット色の Tag（分類） */
export const CategoryTag = ({ category }: { category: Category }) => <Tag color={CATEGORY_COLOR[category]}>{category}</Tag>;

/** 書く人の名前。自分には「（あなた）」を付ける */
export const AuthorNames = ({ ids }: { ids: number[] }) => {
	const { viewer } = useStore();
	return (
		<span>
			{ids.map((id, i) => (
				<span key={id}>
					{i > 0 && "、"}
					{memberName(members, id)}
					{viewer.kind === "member" && viewer.member.id === id && <Typography.Text strong>（あなた）</Typography.Text>}
				</span>
			))}
		</span>
	);
};

/** 予定日との関係：遅れ・近い（色だけに頼らずアイコンと文で） */
export const DueText = ({ post }: { post: Post }) => {
	if (isOverdue(post))
		return (
			<Typography.Text type="danger">
				<ExclamationCircleOutlined /> 予定日を {daysOverdue(post)} 日過ぎています
			</Typography.Text>
		);
	const d = daysUntil(post);
	if (post.status !== "published" && post.status !== "cancelled" && d !== null && d <= NEAR_DAYS)
		return (
			<Typography.Text>
				<ClockCircleOutlined /> {d === 0 ? "今日が予定日です" : `あと ${d} 日`}
			</Typography.Text>
		);
	return null;
};

/** ページの見出し行：h1 と、その画面の主ボタン */
export const PageHeading = ({ title, description, extra }: { title: ReactNode; description?: ReactNode; extra?: ReactNode }) => (
	<Flex justify="space-between" align="flex-start" gap="middle" wrap>
		<div>
			<Typography.Title level={1}>{title}</Typography.Title>
			{description && <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>}
		</div>
		{extra}
	</Flex>
);

/** 「投稿予定を登録」：各画面の主ボタン。未ログインならログインを促す */
export const CreateButton = ({ date, type = "primary" }: { date?: string; type?: "primary" | "default" }) => {
	const { viewer, login } = useStore();
	if (!canCreate(viewer))
		return (
			<Button
				type={type}
				icon={<PlusOutlined />}
				onClick={() => {
					login();
					setParams({ new: "1", date: date ?? null });
				}}
			>
				Slack でログインして登録
			</Button>
		);
	return (
		<Button type={type} icon={<PlusOutlined />} onClick={() => setParams({ new: "1", date: date ?? null })}>
			投稿予定を登録
		</Button>
	);
};

/** 読み込み中・失敗の出し分け。ready のときだけ中身を出す */
export const LoadGate = ({ children, rows = 6 }: { children: ReactNode; rows?: number }) => {
	const { loadStatus, reload } = useStore();
	if (loadStatus === "loading")
		return (
			<div role="status" aria-live="polite" aria-label="読み込み中">
				<Skeleton active paragraph={{ rows }} />
			</div>
		);
	if (loadStatus === "error")
		return (
			<Result
				status="warning"
				title="投稿予定を読み込めませんでした"
				subTitle="通信が不安定な可能性があります。もう一度読み込んでください。続く場合は編集担当に知らせてください。"
				extra={
					<Button
						type="primary"
						icon={<ReloadOutlined />}
						onClick={() => {
							setParams({ state: null }, { replace: true });
							reload();
						}}
					>
						もう一度読み込む
					</Button>
				}
			/>
		);
	return <>{children}</>;
};

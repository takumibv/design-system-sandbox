import { ArrowLeftOutlined, DeleteOutlined, DownOutlined, EditOutlined, LoginOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card, DatePicker, Descriptions, Dropdown, Flex, Form, Input, Modal, Popconfirm, Steps, Typography } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { NotFound } from "../components/NotFound";
import type { Status } from "../data/fixtures";
import { canDelete, canEdit, formatDate, isAuthor, memberName, STATUSES, STATUS_LABEL, today } from "../lib/domain";
import { linkProps, navigate, setParams, useLocation } from "../lib/router";
import { members, useStore } from "../store";
import { AuthorNames, CategoryTag, DueText, LoadGate, optionalMark, StatusBadge } from "../components/parts";

const FLOW: Status[] = ["idea", "writing", "review", "published"];

export function PostDetailPage({ id }: { id: string }) {
	return (
		<LoadGate rows={8}>
			<Detail id={id} />
		</LoadGate>
	);
}

function Detail({ id }: { id: string }) {
	const { posts, viewer, savePost, deletePost, login } = useStore();
	const { message, modal } = App.useApp();
	const { params } = useLocation();
	const [deleting, setDeleting] = useState(false);
	const [publishForm] = Form.useForm<{ publishedDate: Dayjs; url?: string }>();
	const post = posts.find((p) => String(p.id) === id);

	if (!post) return <NotFound title="投稿予定が見つかりません" subTitle="削除されたか、URL が間違っている可能性があります。計画や投稿一覧から探してください。" />;

	const editable = canEdit(viewer, post);
	const deletable = canDelete(viewer);
	const publishOpen = params.get("publish") === "1" && editable;
	const confirmOpen = params.get("confirm") === "delete" && deletable;

	const changeStatus = async (s: Status) => {
		if (s === "published") {
			setParams({ publish: "1" });
			return;
		}
		try {
			await savePost({ ...post, status: s });
			message.success(`状態を「${STATUS_LABEL[s]}」にしました`);
		} catch {
			message.error("状態を変えられませんでした。もう一度お試しください", 6);
		}
	};

	const onDelete = async () => {
		setDeleting(true);
		try {
			await deletePost(post.id);
			message.success(`「${post.title}」を削除しました`);
			navigate("/posts");
		} catch {
			modal.error({ title: "削除できませんでした", content: "通信に失敗しました。投稿予定は残っています。時間をおいてもう一度削除してください。", okText: "閉じる" });
		} finally {
			setDeleting(false);
			setParams({ confirm: null }, { replace: true });
		}
	};

	const onPublish = async () => {
		const v = await publishForm.validateFields();
		try {
			await savePost({ ...post, status: "published", publishedDate: v.publishedDate.format("YYYY-MM-DD"), url: v.url || undefined });
			message.success("公開を記録しました");
			setParams({ publish: null });
		} catch {
			message.error("公開を記録できませんでした。もう一度お試しください", 6);
		}
	};

	const cancelled = post.status === "cancelled";
	const current = cancelled ? -1 : FLOW.indexOf(post.status);

	const actions = editable ? (
		<Flex gap="small" wrap>
			<Button type="primary" icon={<EditOutlined />} onClick={() => setParams({ edit: String(post.id) })}>
				編集
			</Button>
			<Dropdown
				trigger={["click"]}
				menu={{
					items: STATUSES.filter((s) => s !== post.status).map((s) => ({ key: s, label: s === "published" ? "公開済みにする（公開日と URL を記録）" : `「${STATUS_LABEL[s]}」にする` })),
					onClick: ({ key }) => changeStatus(key as Status),
				}}
			>
				<Button>
					状態を変更 <DownOutlined />
				</Button>
			</Dropdown>
			{deletable && (
				<Popconfirm
					open={confirmOpen || undefined}
					onOpenChange={(o) => !o && params.get("confirm") && setParams({ confirm: null }, { replace: true })}
					title="この投稿予定を削除しますか？"
					description="削除すると元に戻せません。予定をやめるだけなら「取りやめ」にしてください。"
					okText="削除する"
					cancelText="キャンセル"
					okButtonProps={{ danger: true, loading: deleting }}
					onConfirm={onDelete}
				>
					<Button danger icon={<DeleteOutlined />}>
						削除
					</Button>
				</Popconfirm>
			)}
		</Flex>
	) : null;

	const permissionNote =
		viewer.kind === "guest" ? (
			<Alert
				type="info"
				showIcon
				title="閲覧のみです"
				description="編集や状態の変更は、Slack でログインした書く人と編集担当ができます。"
				action={
					<Button size="small" icon={<LoginOutlined />} onClick={login}>
						Slack でログイン
					</Button>
				}
			/>
		) : !editable ? (
			<Alert
				type="info"
				showIcon
				title="この投稿は編集できません"
				description={`編集できるのは、書く人（${post.authorIds.map((a) => memberName(members, a)).join("、")}）と編集担当です。変更が必要なら Slack で伝えてください。`}
			/>
		) : !deletable && isAuthor(viewer, post) ? (
			<Typography.Text type="secondary">削除は編集担当に依頼してください。予定をやめるときは「状態を変更」から「取りやめ」にできます。</Typography.Text>
		) : null;

	return (
		<Flex vertical gap="large">
			<div>
				<Button type="link" icon={<ArrowLeftOutlined />} {...linkProps("/posts")}>
					投稿一覧へ戻る
				</Button>
			</div>
			<Flex justify="space-between" align="flex-start" gap="middle" wrap>
				<Flex vertical gap="small">
					<Flex gap="small" align="center" wrap>
						<CategoryTag category={post.category} />
						<StatusBadge status={post.status} />
					</Flex>
					<Typography.Title level={1} delete={cancelled}>
						{post.title}
					</Typography.Title>
					<DueText post={post} />
				</Flex>
				{actions}
			</Flex>
			{permissionNote}
			{cancelled && <Alert type="info" showIcon title="取りやめた投稿です" description="計画の本数には数えません。再開するときは「状態を変更」から戻せます。" />}
			<Card title={<Typography.Title level={2}>進み具合</Typography.Title>}>
				<Steps
					current={current}
					status={cancelled ? "error" : post.status === "published" ? "finish" : "process"}
					items={FLOW.map((s) => ({ title: STATUS_LABEL[s] }))}
					responsive
				/>
			</Card>
			<Card title={<Typography.Title level={2}>詳細</Typography.Title>}>
				<Descriptions
					column={{ xs: 1, md: 2 }}
					items={[
						{ key: "planned", label: "公開予定日", children: formatDate(post.plannedDate) },
						{ key: "published", label: "公開日", children: post.publishedDate ? formatDate(post.publishedDate) : "-" },
						{ key: "authors", label: "書く人", children: <AuthorNames ids={post.authorIds} /> },
						{ key: "category", label: "カテゴリ", children: post.category },
						{
							key: "url",
							label: "記事 URL",
							children: post.url ? (
								<Typography.Link href={post.url} target="_blank" rel="noopener noreferrer">
									{post.url}（新しいタブで開く）
								</Typography.Link>
							) : (
								"-"
							),
						},
						{ key: "note", label: "メモ", children: post.note ?? "-" },
					]}
				/>
			</Card>
			<Modal
				open={publishOpen}
				title="公開を記録"
				okText="公開済みにする"
				cancelText="キャンセル"
				onOk={onPublish}
				onCancel={() => setParams({ publish: null })}
				destroyOnHidden
			>
				<Form form={publishForm} layout="vertical" initialValues={{ publishedDate: today, url: post.url }} requiredMark={optionalMark}>
					<Form.Item name="publishedDate" label="公開日" rules={[{ required: true, message: "公開日を入力してください" }]}>
						<DatePicker format="YYYY年M月D日（ddd）" disabledDate={(d) => d.isAfter(dayjs(today).add(1, "year"))} />
					</Form.Item>
					<Form.Item name="url" label="記事 URL" extra="あとから入れることもできます" rules={[{ type: "url", message: "https:// から始まる URL を入力してください" }]}>
						<Input type="url" placeholder="https://" />
					</Form.Item>
				</Form>
			</Modal>
		</Flex>
	);
}

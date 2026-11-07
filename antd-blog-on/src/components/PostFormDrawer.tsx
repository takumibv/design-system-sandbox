import { LoginOutlined } from "@ant-design/icons";
import { Alert, App, Button, DatePicker, Drawer, Flex, Form, Grid, Input, Radio, Result, Select } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import type { Post, Status } from "../data/fixtures";
import { canCreate, canEdit, CATEGORIES, memberName, STATUSES, STATUS_LABEL, today, type Category } from "../lib/domain";
import { setParams, useLocation } from "../lib/router";
import { members, useStore } from "../store";

type FormValues = {
	title: string;
	category: Category;
	authorIds: number[];
	plannedDate: Dayjs | null;
	status: Status;
	publishedDate?: Dayjs | null;
	url?: string;
	note?: string;
};

const close = () => setParams({ new: null, edit: null, date: null, preview: null });

/** 登録・編集のドロワー。?new=1（&date=YYYY-MM-DD）か ?edit=<投稿ID> で開く */
export function PostFormDrawer() {
	const { params } = useLocation();
	const { posts, viewer, savePost, login } = useStore();
	const { message } = App.useApp();
	const screens = Grid.useBreakpoint();
	const [form] = Form.useForm<FormValues>();
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState(false);

	const isNew = params.get("new") === "1";
	const editId = params.get("edit");
	const target = editId ? posts.find((p) => String(p.id) === editId) : undefined;
	const open = isNew || editId !== null;
	const date = params.get("date");
	const previewSaveFailed = params.get("preview") === "save-failed";

	const allowed = isNew ? canCreate(viewer) : target ? canEdit(viewer, target) : false;

	useEffect(() => {
		if (open) setSaveError(previewSaveFailed);
	}, [open, previewSaveFailed]);

	const initialValues: Partial<FormValues> = target
		? {
				...target,
				plannedDate: target.plannedDate ? dayjs(target.plannedDate) : null,
				publishedDate: target.publishedDate ? dayjs(target.publishedDate) : null,
			}
		: { authorIds: viewer.kind === "member" ? [viewer.member.id] : [], plannedDate: date ? dayjs(date) : null, status: "idea" };

	const status = Form.useWatch("status", form);

	const onFinish = async (v: FormValues) => {
		setSaving(true);
		setSaveError(false);
		const payload: Omit<Post, "id"> & { id?: number } = {
			id: target?.id,
			title: v.title.trim(),
			category: v.category,
			authorIds: v.authorIds,
			plannedDate: v.plannedDate ? v.plannedDate.format("YYYY-MM-DD") : null,
			status: v.status,
			...(v.status === "published" ? { publishedDate: v.publishedDate?.format("YYYY-MM-DD"), url: v.url || undefined } : {}),
			note: v.note || undefined,
		};
		try {
			await savePost(payload);
			message.success(isNew ? `「${payload.title}」を登録しました` : `「${payload.title}」を保存しました`);
			close();
		} catch {
			setSaveError(true);
		} finally {
			setSaving(false);
		}
	};

	const title = isNew ? "投稿予定を登録" : "投稿予定を編集";

	let body;
	if (!isNew && editId !== null && !target) {
		body = <Result status="404" title="投稿予定が見つかりません" subTitle="削除されたか、URL が間違っている可能性があります。" extra={<Button onClick={close}>閉じる</Button>} />;
	} else if (!allowed) {
		body =
			viewer.kind === "guest" ? (
				<Result
					status="403"
					title={isNew ? "登録するにはログインが必要です" : "編集するにはログインが必要です"}
					subTitle="閲覧はログインしなくてもできます。登録・編集は Slack アカウントでログインした人ができます。"
					extra={
						<Flex gap="small" justify="center" wrap>
							<Button type="primary" icon={<LoginOutlined />} onClick={login}>
								Slack でログイン
							</Button>
							<Button onClick={close}>閉じる</Button>
						</Flex>
					}
				/>
			) : (
				<Result
					status="403"
					title="この投稿予定は編集できません"
					subTitle={`編集できるのは、書く人（${target ? target.authorIds.map((id) => memberName(members, id)).join("、") : ""}）と編集担当です。変更が必要なら、書く人か編集担当に Slack で伝えてください。`}
					extra={<Button onClick={close}>閉じる</Button>}
				/>
			);
	} else {
		body = (
			<Form key={editId ?? `new-${date ?? ""}`} form={form} initialValues={initialValues} layout="vertical" onFinish={onFinish} requiredMark="optional" disabled={saving} id="post-form">
				{saveError && (
					<Form.Item>
						<Alert
							type="error"
							showIcon
							title="保存できませんでした"
							description="通信に失敗しました。入力した内容は残っています。もう一度「保存」を押してください。"
						/>
					</Form.Item>
				)}
				<Form.Item name="title" label="タイトル" extra="仮タイトルでかまいません" rules={[{ required: true, whitespace: true, message: "タイトルを入力してください" }]}>
					<Input maxLength={100} />
				</Form.Item>
				<Form.Item name="category" label="カテゴリ" rules={[{ required: true, message: "カテゴリを選んでください" }]}>
					<Radio.Group options={CATEGORIES.map((c) => ({ label: c, value: c }))} />
				</Form.Item>
				<Form.Item name="authorIds" label="書く人" extra="共著なら複数選べます" rules={[{ required: true, message: "書く人を 1 人以上選んでください" }]}>
					<Select mode="multiple" options={members.map((m) => ({ label: m.name, value: m.id }))} showSearch={{ optionFilterProp: "label" }} />
				</Form.Item>
				<Form.Item name="plannedDate" label="公開予定日" extra="未定のままでも登録できます">
					<DatePicker format="YYYY年M月D日（ddd）" />
				</Form.Item>
				<Form.Item name="status" label="状態" rules={[{ required: true }]}>
					<Select options={STATUSES.map((s) => ({ label: STATUS_LABEL[s], value: s }))} />
				</Form.Item>
				{status === "published" && (
					<>
						<Form.Item name="publishedDate" label="公開日" initialValue={today} rules={[{ required: true, message: "公開日を入力してください" }]}>
							<DatePicker format="YYYY年M月D日（ddd）" />
						</Form.Item>
						<Form.Item name="url" label="記事 URL" rules={[{ type: "url", message: "https:// から始まる URL を入力してください" }]}>
							<Input type="url" placeholder="https://" />
						</Form.Item>
					</>
				)}
				<Form.Item name="note" label="メモ">
					<Input.TextArea rows={3} />
				</Form.Item>
			</Form>
		);
	}

	return (
		<Drawer
			open={open}
			onClose={close}
			title={title}
			size={screens.sm ? 480 : "100%"}
			destroyOnHidden
			footer={
				allowed && (target || isNew) ? (
					<Flex gap="small" justify="flex-end">
						<Button onClick={close}>キャンセル</Button>
						<Button type="primary" htmlType="submit" form="post-form" loading={saving}>
							{isNew ? "登録する" : "保存する"}
						</Button>
					</Flex>
				) : undefined
			}
		>
			{body}
		</Drawer>
	);
}

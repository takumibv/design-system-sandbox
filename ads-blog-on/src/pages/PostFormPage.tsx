import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cssMap } from "@atlaskit/css";
import PageHeader from "@atlaskit/page-header";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { LinkButton } from "@atlaskit/button/new";
import ButtonGroup from "@atlaskit/button/button-group";
import Textfield from "@atlaskit/textfield";
import Textarea from "@atlaskit/textarea";
import Select from "@atlaskit/select";
import { RadioGroup } from "@atlaskit/radio";
import { DatePicker } from "@atlaskit/datetime-picker";
import { ErrorMessage, Fieldset, FormFooter, HelperMessage, Label, Legend, RequiredAsterisk } from "@atlaskit/form";
import SectionMessage from "@atlaskit/section-message";
import { Box, Stack, Text } from "@atlaskit/primitives/compiled";
import type { Post, Status } from "../data/fixtures";
import { useStore, useViewParams, type PostInput } from "../store";
import { NoPermission, NotFound } from "../components/PageStates";
import { PRESET_FLAGS } from "../components/Flags";
import { CATEGORIES, STATUS_LABEL, STATUS_ORDER, canCreate, canEdit } from "../lib/plan";
import { isValidISODate } from "../lib/date";

const styles = cssMap({ narrow: { maxWidth: "864px" } });

type Draft = {
	title: string;
	category: Post["category"] | null;
	authorIds: number[];
	plannedDate: string;
	status: Status;
	publishedDate: string;
	url: string;
	note: string;
};

type Errors = Partial<Record<"title" | "category" | "authorIds" | "publishedDate" | "url", string>>;

const validate = (d: Draft): Errors => {
	const e: Errors = {};
	if (!d.title.trim()) e.title = "タイトルを入力してください。仮タイトルでもかまいません。";
	if (!d.category) e.category = "カテゴリを選んでください。";
	if (d.authorIds.length === 0) e.authorIds = "書く人を 1 人以上選んでください。";
	if (d.status === "published" && !isValidISODate(d.publishedDate)) e.publishedDate = "公開済みにするには公開日を入力してください。";
	if (d.url && !/^https?:\/\//.test(d.url)) e.url = "記事 URL は https:// から始まる形で入力してください。";
	return e;
};

const FIELD_ORDER: (keyof Errors)[] = ["title", "category", "authorIds", "publishedDate", "url"];

export function PostFormPage({ mode }: { mode: "new" | "edit" }) {
	const { id } = useParams();
	const { posts, members, user, createPost, updatePost, showFlag } = useStore();
	const { date, validate: validateNow } = useViewParams();
	const navigate = useNavigate();
	const post = mode === "edit" ? posts.find((p) => String(p.id) === id) : undefined;

	const [draft, setDraft] = useState<Draft>(() => ({
		title: post?.title ?? "",
		category: post?.category ?? null,
		authorIds: post?.authorIds ?? (user ? [user.id] : []),
		plannedDate: post?.plannedDate ?? (isValidISODate(date) ? date : ""),
		status: post?.status ?? "idea",
		publishedDate: post?.publishedDate ?? "",
		url: post?.url ?? "",
		note: post?.note ?? "",
	}));
	const [submitted, setSubmitted] = useState(validateNow);
	const [busy, setBusy] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const ids = {
		title: useId(),
		category: useId(),
		authorIds: useId(),
		plannedDate: useId(),
		status: useId(),
		publishedDate: useId(),
		url: useId(),
		note: useId(),
	};
	const errors = submitted ? validate(draft) : {};
	const errorCount = Object.keys(errors).length;

	// ?validate=1 で開いたとき（撮影用）は、空のまま保存を押した状態を再現する
	useEffect(() => {
		if (validateNow) setSubmitted(true);
	}, [validateNow]);

	if (mode === "edit" && !post) return <NotFound what="投稿予定" />;
	if (mode === "new" && !canCreate(user)) return <NoPermission action="投稿予定を登録する" backHref="/" />;
	if (mode === "edit" && post && !canEdit(post, user)) return <NoPermission action="この投稿予定を編集する" backHref={`/posts/${post.id}`} />;

	const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		const errs = validate(draft);
		if (Object.keys(errs).length > 0) {
			// 最初の誤りの欄へ移動する
			const first = FIELD_ORDER.find((k) => errs[k]);
			if (first) document.getElementById(ids[first])?.focus();
			return;
		}
		const input: PostInput = {
			title: draft.title.trim(),
			category: draft.category!,
			authorIds: draft.authorIds,
			plannedDate: draft.plannedDate || null,
			status: draft.status,
			publishedDate: draft.status === "published" ? draft.publishedDate : undefined,
			url: draft.url || undefined,
			note: draft.note || undefined,
		};
		setBusy(true);
		try {
			const saved = mode === "new" ? await createPost(input) : await updatePost(post!.id, input);
			showFlag(mode === "new" ? PRESET_FLAGS.created : PRESET_FLAGS.saved);
			navigate(`/posts/${saved.id}`);
		} catch {
			setBusy(false);
			showFlag(PRESET_FLAGS["save-error"]);
		}
	};

	const memberOptions = members.map((m) => ({ label: m.role === "editor" ? `${m.name}（編集担当）` : m.name, value: m.id }));
	const statusOptions = STATUS_ORDER.map((s) => ({ label: STATUS_LABEL[s], value: s }));
	const title = mode === "new" ? "投稿予定を登録" : "投稿予定を編集";
	const backHref = mode === "new" ? "/" : `/posts/${post!.id}`;

	return (
		<Stack space="space.300">
			<PageHeader
				breadcrumbs={
					<Breadcrumbs>
						<BreadcrumbsItem href="/" text="投稿計画" />
						{post && <BreadcrumbsItem href={`/posts/${post.id}`} text={post.title} />}
						<BreadcrumbsItem href={mode === "new" ? "/posts/new" : `/posts/${post!.id}/edit`} text={mode === "new" ? "登録" : "編集"} />
					</Breadcrumbs>
				}
			>
				{title}
			</PageHeader>
			<Box xcss={styles.narrow}>
				<form onSubmit={onSubmit} noValidate aria-label={title}>
					<Stack space="space.300">
						<Text as="p" color="color.text.subtle">
							<RequiredAsterisk /> の付いた項目は必須です。
						</Text>
						{errorCount > 0 && (
							<Box ref={summaryRef}>
								<SectionMessage appearance="error" title={`入力内容に${errorCount}件の誤りがあります`}>
									<Box as="ul">
										{FIELD_ORDER.filter((k) => errors[k]).map((k) => (
											<Box as="li" key={k}>
												{errors[k]}
											</Box>
										))}
									</Box>
								</SectionMessage>
							</Box>
						)}

						<Box>
							<Label htmlFor={ids.title}>
								タイトル <RequiredAsterisk />
							</Label>
							<Textfield
								id={ids.title}
								value={draft.title}
								onChange={(e) => set("title", e.currentTarget.value)}
								isInvalid={!!errors.title}
								aria-required
							/>
							{errors.title ? <ErrorMessage>{errors.title}</ErrorMessage> : <HelperMessage>仮タイトルでもかまいません。</HelperMessage>}
						</Box>

						<Fieldset legend={<Legend>カテゴリ <RequiredAsterisk /></Legend>}>
							<RadioGroup
								name="category"
								options={CATEGORIES.map((c, i) => ({ label: c, value: c, id: i === 0 ? ids.category : undefined }))}
								value={draft.category}
								onChange={(e) => set("category", e.currentTarget.value as Post["category"])}
								isInvalid={!!errors.category}
							/>
							{errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
						</Fieldset>

						<Box>
							<Label htmlFor={ids.authorIds}>
								書く人 <RequiredAsterisk />
							</Label>
							<Select
								inputId={ids.authorIds}
								isMulti
								options={memberOptions}
								value={memberOptions.filter((o) => draft.authorIds.includes(o.value))}
								onChange={(v) => set("authorIds", v.map((o) => o.value))}
								isInvalid={!!errors.authorIds}
								placeholder="名前で探す"
							/>
							{errors.authorIds ? (
								<ErrorMessage>{errors.authorIds}</ErrorMessage>
							) : (
								<HelperMessage>共著のときは全員を選んでください。</HelperMessage>
							)}
						</Box>

						<Box>
							<Label htmlFor={ids.plannedDate}>公開予定日</Label>
							<DatePicker
								id={ids.plannedDate}
								value={draft.plannedDate}
								onChange={(v) => set("plannedDate", v)}
								locale="ja-JP"
								weekStartDay={1}
								dateFormat="YYYY/MM/DD"
								placeholder="未定"
								shouldShowCalendarButton
								openCalendarLabel="カレンダーを開く"
							/>
							<HelperMessage>未定なら空のままにしてください。</HelperMessage>
						</Box>

						<Box>
							<Label htmlFor={ids.status}>状態</Label>
							<Select
								inputId={ids.status}
								options={statusOptions}
								value={statusOptions.find((o) => o.value === draft.status)}
								onChange={(v) => v && set("status", v.value)}
							/>
						</Box>

						{draft.status === "published" && (
							<Box>
								<Label htmlFor={ids.publishedDate}>
									公開日 <RequiredAsterisk />
								</Label>
								<DatePicker
									id={ids.publishedDate}
									value={draft.publishedDate}
									onChange={(v) => set("publishedDate", v)}
									locale="ja-JP"
									weekStartDay={1}
									dateFormat="YYYY/MM/DD"
									shouldShowCalendarButton
									openCalendarLabel="カレンダーを開く"
									isInvalid={!!errors.publishedDate}
								/>
								{errors.publishedDate && <ErrorMessage>{errors.publishedDate}</ErrorMessage>}
							</Box>
						)}

						<Box>
							<Label htmlFor={ids.url}>記事 URL</Label>
							<Textfield
								id={ids.url}
								type="url"
								value={draft.url}
								onChange={(e) => set("url", e.currentTarget.value)}
								isInvalid={!!errors.url}
							/>
							{errors.url ? <ErrorMessage>{errors.url}</ErrorMessage> : <HelperMessage>公開後に入力してください。</HelperMessage>}
						</Box>

						<Box>
							<Label htmlFor={ids.note}>メモ</Label>
							<Textarea id={ids.note} value={draft.note} onChange={(e) => set("note", e.currentTarget.value)} minimumRows={3} />
						</Box>

						<FormFooter align="start">
							<ButtonGroup label="フォームの操作">
								<Button appearance="primary" type="submit" isLoading={busy}>
									保存
								</Button>
								<LinkButton appearance="subtle" href={backHref}>
									キャンセル
								</LinkButton>
							</ButtonGroup>
						</FormFooter>
					</Stack>
				</form>
			</Box>
		</Stack>
	);
}

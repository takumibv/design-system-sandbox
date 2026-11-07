import { useId, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cssMap } from "@atlaskit/css";
import PageHeader from "@atlaskit/page-header";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { LinkButton } from "@atlaskit/button/new";
import ButtonGroup from "@atlaskit/button/button-group";
import DropdownMenu, { DropdownItemRadio, DropdownItemRadioGroup } from "@atlaskit/dropdown-menu";
import LozengeDropdownTrigger from "@atlaskit/lozenge/lozenge-dropdown-trigger";
import Link from "@atlaskit/link";
import SectionMessage from "@atlaskit/section-message";
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from "@atlaskit/modal-dialog";
import { DatePicker } from "@atlaskit/datetime-picker";
import Textfield from "@atlaskit/textfield";
import { ErrorMessage, HelperMessage, Label } from "@atlaskit/form";
import Heading from "@atlaskit/heading";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import type { Post, Status } from "../data/fixtures";
import { useStore, useViewParams } from "../store";
import { CategoryTag, PlannedDate, STATUS_APPEARANCE, StatusLozenge, authorNames } from "../components/PostParts";
import { DetailSpinner, LoadError, NotFound } from "../components/PageStates";
import { PRESET_FLAGS } from "../components/Flags";
import { canDelete, canEdit, STATUS_LABEL, STATUS_ORDER } from "../lib/plan";
import { formatDateLong, isValidISODate } from "../lib/date";

const styles = cssMap({
	narrow: { maxWidth: "864px" },
	dl: {
		display: "grid",
		gridTemplateColumns: "minmax(7rem, max-content) 1fr",
		columnGap: token("space.300"),
		rowGap: token("space.150"),
		marginBlock: token("space.0"),
		marginInline: token("space.0"),
		paddingInline: token("space.0"),
	},
	dd: { marginInlineStart: token("space.0"), overflowWrap: "anywhere" },
});

function useDialog() {
	const navigate = useNavigate();
	const location = useLocation();
	const { dialog } = useViewParams();
	const setDialog = (d: string | null) => {
		const p = new URLSearchParams(location.search);
		if (d) p.set("dialog", d);
		else p.delete("dialog");
		navigate({ pathname: location.pathname, search: p.toString() }, { replace: true });
	};
	return { dialog, setDialog };
}

function DeleteDialog({ post, onClose }: { post: Post; onClose: () => void }) {
	const { deletePost, showFlag } = useStore();
	const navigate = useNavigate();
	const [busy, setBusy] = useState(false);
	const run = async () => {
		setBusy(true);
		try {
			await deletePost(post.id);
			showFlag(PRESET_FLAGS.deleted);
			navigate("/");
		} catch {
			setBusy(false);
			onClose();
			showFlag(PRESET_FLAGS["delete-error"]);
		}
	};
	return (
		<Modal onClose={onClose} width="small">
			<ModalHeader hasCloseButton>
				<ModalTitle appearance="danger">投稿予定を削除しますか</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Stack space="space.100">
					<Text as="p">「{post.title}」を削除します。削除すると元に戻せません。</Text>
					<Text as="p">予定だけを止めたいときは、削除せずに状態を「取りやめ」にすると、記録を残せます。</Text>
				</Stack>
			</ModalBody>
			<ModalFooter>
				<Button appearance="subtle" onClick={onClose}>
					キャンセル
				</Button>
				<Button appearance="danger" onClick={run} isLoading={busy}>
					削除
				</Button>
			</ModalFooter>
		</Modal>
	);
}

function PublishDialog({ post, onClose }: { post: Post; onClose: () => void }) {
	const { updatePost, showFlag, today } = useStore();
	const [date, setDate] = useState(post.publishedDate ?? today);
	const [url, setUrl] = useState(post.url ?? "");
	const [submitted, setSubmitted] = useState(false);
	const [busy, setBusy] = useState(false);
	const dateId = useId();
	const urlId = useId();
	const dateError = submitted && !isValidISODate(date) ? "公開日を入力してください。" : null;
	const urlError = submitted && url && !/^https?:\/\//.test(url) ? "記事 URL は https:// から始まる形で入力してください。" : null;

	const run = async () => {
		setSubmitted(true);
		if (!isValidISODate(date) || (url && !/^https?:\/\//.test(url))) return;
		setBusy(true);
		try {
			await updatePost(post.id, { status: "published", publishedDate: date, url: url || undefined });
			showFlag(PRESET_FLAGS.published);
			onClose();
		} catch {
			setBusy(false);
			showFlag(PRESET_FLAGS["save-error"]);
		}
	};
	return (
		<Modal onClose={onClose} width="medium">
			<ModalHeader hasCloseButton>
				<ModalTitle>公開済みにする</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Stack space="space.200">
					<Text as="p">「{post.title}」の公開日と記事 URL を記録します。</Text>
					<Box>
						<Label htmlFor={dateId}>公開日（必須）</Label>
						<DatePicker
							id={dateId}
							value={date}
							onChange={setDate}
							locale="ja-JP"
							weekStartDay={1}
							dateFormat="YYYY/MM/DD"
							shouldShowCalendarButton
							openCalendarLabel="カレンダーを開く"
							isInvalid={!!dateError}
						/>
						{dateError && <ErrorMessage>{dateError}</ErrorMessage>}
					</Box>
					<Box>
						<Label htmlFor={urlId}>記事 URL</Label>
						<Textfield id={urlId} value={url} onChange={(e) => setUrl(e.currentTarget.value)} isInvalid={!!urlError} type="url" autoComplete="url" />
						{urlError ? <ErrorMessage>{urlError}</ErrorMessage> : <HelperMessage>あとから編集画面で追加することもできます。</HelperMessage>}
					</Box>
				</Stack>
			</ModalBody>
			<ModalFooter>
				<Button appearance="subtle" onClick={onClose}>
					キャンセル
				</Button>
				<Button appearance="primary" onClick={run} isLoading={busy}>
					公開済みにする
				</Button>
			</ModalFooter>
		</Modal>
	);
}

function StatusControl({ post, editable, onPublish }: { post: Post; editable: boolean; onPublish: () => void }) {
	const { updatePost, showFlag } = useStore();
	const [busy, setBusy] = useState(false);
	if (!editable) return <StatusLozenge status={post.status} />;
	const change = async (s: Status) => {
		if (s === post.status) return;
		if (s === "published") return onPublish();
		setBusy(true);
		try {
			await updatePost(post.id, { status: s });
			showFlag({ kind: "success", title: `状態を「${STATUS_LABEL[s]}」に変更しました` });
		} catch {
			showFlag(PRESET_FLAGS["save-error"]);
		} finally {
			setBusy(false);
		}
	};
	return (
		<DropdownMenu
			shouldRenderToParent
			trigger={({ triggerRef, ...props }) => (
				<LozengeDropdownTrigger
					{...props}
					ref={triggerRef}
					appearance={STATUS_APPEARANCE[post.status]}
					isLoading={busy}
					aria-label={`状態：${STATUS_LABEL[post.status]}。押すと変更できます`}
				>
					{STATUS_LABEL[post.status]}
				</LozengeDropdownTrigger>
			)}
		>
			<DropdownItemRadioGroup id="status" title="状態を変更">
				{STATUS_ORDER.map((s) => (
					<DropdownItemRadio key={s} id={s} isSelected={post.status === s} onClick={() => change(s)}>
						{STATUS_LABEL[s]}
					</DropdownItemRadio>
				))}
			</DropdownItemRadioGroup>
		</DropdownMenu>
	);
}

export function PostPage() {
	const { id } = useParams();
	const { posts, members, today, user } = useStore();
	const { state } = useViewParams();
	const { dialog, setDialog } = useDialog();
	const post = posts.find((p) => String(p.id) === id);

	if (state === "loading") return <DetailSpinner />;
	if (state === "error") return <LoadError what="投稿予定" />;
	if (!post) return <NotFound what="投稿予定" />;

	const editable = canEdit(post, user);
	const deletable = canDelete(user);

	return (
		<Stack space="space.300">
			<PageHeader
				breadcrumbs={
					<Breadcrumbs>
						<BreadcrumbsItem href="/" text="投稿計画" />
						<BreadcrumbsItem href={`/posts/${post.id}`} text={post.title} />
					</Breadcrumbs>
				}
				actions={
					editable || deletable ? (
						<ButtonGroup label="投稿予定の操作">
							{editable && (
								<LinkButton appearance="primary" href={`/posts/${post.id}/edit`}>
									編集
								</LinkButton>
							)}
							{deletable && <Button onClick={() => setDialog("delete")}>削除</Button>}
						</ButtonGroup>
					) : undefined
				}
			>
				{post.title}
			</PageHeader>

			<Box xcss={styles.narrow}>
				<Stack space="space.300">
					<Inline space="space.150" alignBlock="center" shouldWrap>
						<StatusControl post={post} editable={editable} onPublish={() => setDialog("publish")} />
						<PlannedDate post={post} today={today} spacious />
					</Inline>

					{!editable && (
						<SectionMessage appearance="information" headingLevel="h2" title={user ? "この投稿は閲覧のみです" : "ログインしていないため閲覧のみです"}>
							<Text as="p">
								{user
									? `この投稿を編集できるのは、書く人（${authorNames(post, members)}）と編集担当です。`
									: "Slack でログインすると、自分が書く投稿を編集できます。"}
							</Text>
						</SectionMessage>
					)}

					<Stack space="space.150">
						<Heading size="small" as="h2">
							詳細
						</Heading>
						<Box as="dl" xcss={styles.dl}>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">カテゴリ</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								<CategoryTag category={post.category} />
							</Box>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">書く人</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								{authorNames(post, members)}
							</Box>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">公開予定日</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								{post.plannedDate ? formatDateLong(post.plannedDate) : "未定"}
							</Box>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">公開日</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								{post.publishedDate ? formatDateLong(post.publishedDate) : "未公開"}
							</Box>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">記事 URL</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								{post.url ? (
									<Link href={post.url} target="_blank">
										{post.url}
									</Link>
								) : (
									"未登録"
								)}
							</Box>
							<Box as="dt">
								<Text weight="medium" color="color.text.subtle">メモ</Text>
							</Box>
							<Box as="dd" xcss={styles.dd}>
								{post.note || "なし"}
							</Box>
						</Box>
					</Stack>
				</Stack>
			</Box>

			<ModalTransition>
				{dialog === "delete" && deletable && <DeleteDialog post={post} onClose={() => setDialog(null)} />}
				{dialog === "publish" && editable && <PublishDialog post={post} onClose={() => setDialog(null)} />}
			</ModalTransition>
		</Stack>
	);
}

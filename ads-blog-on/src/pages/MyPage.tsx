import PageHeader from "@atlaskit/page-header";
import Button, { LinkButton } from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import EmptyState from "@atlaskit/empty-state";
import { Stack, Text } from "@atlaskit/primitives/compiled";
import { useStore, useViewParams } from "../store";
import { PostList } from "../components/PostList";
import { ListSkeleton, LoadError } from "../components/PageStates";
import { PRESET_FLAGS } from "../components/Flags";
import { effectiveDate, isOpen, sortForAssignee } from "../lib/plan";
import type { Member, Post } from "../data/fixtures";

/** ある人の投稿を「これから（遅れ→近い順→未定）」と「公開済み」に分けて出す。自分の担当・メンバーの投稿で共通 */
export function AssigneePosts({ person, posts, isSelf }: { person: Member; posts: Post[]; isSelf: boolean }) {
	const { members, today, user } = useStore();
	const mine = posts.filter((p) => p.authorIds.includes(person.id));
	const open = sortForAssignee(mine.filter(isOpen));
	const done = mine
		.filter((p) => p.status === "published")
		.sort((a, b) => (effectiveDate(a)! < effectiveDate(b)! ? 1 : -1));
	const cancelled = mine.filter((p) => p.status === "cancelled");
	const who = isSelf ? "あなた" : person.name;

	if (mine.length === 0) {
		return (
			<EmptyState
				header={isSelf ? "担当している投稿はまだありません" : `${person.name}さんの投稿はまだありません`}
				headingLevel={2}
				description={
					isSelf
						? "書きたいテーマがあれば、アイデアとして登録しておきましょう。公開予定日は未定のままでも登録できます。"
						: "予定の無い週に書いてもらえないか、相談してみてください。"
				}
			/>
		);
	}

	return (
		<Stack space="space.400">
			<Stack space="space.100">
				<Heading size="medium" as="h2">
					これから公開する投稿（{open.length}件）
				</Heading>
				{open.length > 0 ? (
					<PostList posts={open} members={members} today={today} userId={user?.id} label="これから公開する投稿" />
				) : (
					<Text color="color.text.subtle">{who}が書く予定の投稿はありません。</Text>
				)}
			</Stack>
			<Stack space="space.100">
				<Heading size="medium" as="h2">
					公開済み（{done.length}件）
				</Heading>
				{done.length > 0 ? (
					<PostList posts={done} members={members} today={today} userId={user?.id} label="公開済みの投稿" />
				) : (
					<Text color="color.text.subtle">まだ公開した投稿はありません。</Text>
				)}
			</Stack>
			{cancelled.length > 0 && (
				<Stack space="space.100">
					<Heading size="medium" as="h2">
						取りやめ（{cancelled.length}件）
					</Heading>
					<PostList posts={cancelled} members={members} today={today} userId={user?.id} label="取りやめた投稿" />
				</Stack>
			)}
		</Stack>
	);
}

export function MyPage() {
	const { user, posts, setRole, showFlag } = useStore();
	const { state } = useViewParams();

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
			>
				自分の担当
			</PageHeader>
			{!user ? (
				<EmptyState
					header="ログインすると自分の担当が表示されます"
					headingLevel={2}
					description="Slack でログインすると、あなたが書く投稿と公開予定日をここで確認できます。"
					primaryAction={
						<Button
							appearance="primary"
							onClick={() => {
								setRole("member");
								showFlag(PRESET_FLAGS.login);
							}}
						>
							Slack でログイン
						</Button>
					}
					secondaryAction={<LinkButton href="/">投稿計画を見る</LinkButton>}
				/>
			) : state === "loading" ? (
				<ListSkeleton />
			) : state === "error" ? (
				<LoadError what="自分の担当" />
			) : (
				<AssigneePosts person={user} posts={state === "empty" ? [] : posts} isSelf />
			)}
		</Stack>
	);
}

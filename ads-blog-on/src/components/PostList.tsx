import { cssMap } from "@atlaskit/css";
import Link from "@atlaskit/link";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import type { Member, Post } from "../data/fixtures";
import { CategoryTag, PlannedDate, StatusLozenge } from "./PostParts";

const styles = cssMap({
	item: { paddingBlock: token("space.150") },
	itemDivided: {
		paddingBlock: token("space.150"),
		borderBlockStartWidth: token("border.width"),
		borderBlockStartStyle: "solid",
		borderBlockStartColor: token("color.border"),
	},
	list: { listStyle: "none", paddingInlineStart: token("space.0"), marginBlock: token("space.0") },
});

type Props = { posts: Post[]; members: Member[]; today: string; userId?: number; label: string };

/** 投稿の一覧（週の中・自分の担当・メンバーの投稿で共通）。各行：タイトル／予定日・状態・カテゴリ／書く人 */
export function PostList({ posts, members, today, userId, label }: Props) {
	return (
		<Stack as="ul" xcss={styles.list} aria-label={label}>
			{posts.map((post, i) => (
				<Box as="li" key={post.id} xcss={i === 0 ? styles.item : styles.itemDivided}>
					<Stack space="space.075">
						<Link href={`/posts/${post.id}`} appearance="default">
							{post.title}
						</Link>
						<Inline space="space.100" shouldWrap alignBlock="center">
							<PlannedDate post={post} today={today} />
							<StatusLozenge status={post.status} />
							<CategoryTag category={post.category} />
						</Inline>
						<Text color="color.text.subtle" size="small">
							書く人：
							{post.authorIds
								.map((id) => {
									const name = members.find((m) => m.id === id)?.name ?? `不明なメンバー（${id}）`;
									return id === userId ? `${name}（あなた）` : name;
								})
								.join("、")}
						</Text>
					</Stack>
				</Box>
			))}
		</Stack>
	);
}

import Lozenge from "@atlaskit/lozenge/new/lozenge";
import SimpleTag from "@atlaskit/tag/simple-tag";
import DateLabel from "@atlaskit/date-label/date-label";
import { Text } from "@atlaskit/primitives/compiled";
import type { Member, Post, Status } from "../data/fixtures";
import { formatDate } from "../lib/date";
import { diffDays } from "../lib/date";
import { dateTone, STATUS_LABEL } from "../lib/plan";

// 状態の色：意味のある色は semantic を使う（ADS Lozenge usage「Semantic colors … workflow status」）。
// アイデア・取りやめは灰。レビュー中は warning（注意）と区別するため discovery にした（自分の判断）。
export const STATUS_APPEARANCE: Record<Status, "neutral" | "information" | "discovery" | "success"> = {
	idea: "neutral",
	writing: "information",
	review: "discovery",
	published: "success",
	cancelled: "neutral",
};

export function StatusLozenge({ status }: { status: Status }) {
	return <Lozenge appearance={STATUS_APPEARANCE[status]}>{STATUS_LABEL[status]}</Lozenge>;
}

/** カテゴリは分類なので Lozenge ではなく Tag（ADS Lozenge usage「use a tag instead」） */
export function CategoryTag({ category }: { category: Post["category"] }) {
	return <SimpleTag text={category} />;
}

/** 公開予定日。遅れは danger、近いは warning。色だけに頼らず文字でも「超過」「あと N 日」を書く */
export function PlannedDate({ post, today, spacious }: { post: Post; today: string; spacious?: boolean }) {
	if (post.status === "published") {
		const d = post.publishedDate ?? post.plannedDate;
		return d ? <DateLabel label={`${formatDate(d)} 公開`} isSpacious={spacious} hasIconBefore={false} /> : null;
	}
	if (!post.plannedDate) {
		return <DateLabel label="公開予定日 未定" isSpacious={spacious} hasIconBefore={false} />;
	}
	const tone = dateTone(post, today);
	const d = diffDays(post.plannedDate, today);
	if (tone === "overdue") {
		return (
			<DateLabel
				appearance="danger"
				label={`${formatDate(post.plannedDate)}（${-d}日超過）`}
				iconLabel="予定日超過"
				isSpacious={spacious}
			/>
		);
	}
	if (tone === "near") {
		return (
			<DateLabel
				appearance="warning"
				label={`${formatDate(post.plannedDate)}（${d === 0 ? "今日" : `あと${d}日`}）`}
				iconLabel="予定日が近い"
				isSpacious={spacious}
			/>
		);
	}
	return <DateLabel label={formatDate(post.plannedDate)} isSpacious={spacious} hasIconBefore={false} />;
}

export function authorNames(post: Post, members: Member[]) {
	return post.authorIds.map((id) => members.find((m) => m.id === id)?.name ?? `不明なメンバー（${id}）`).join("、");
}

export function Authors({ post, members }: { post: Post; members: Member[] }) {
	return (
		<Text color="color.text.subtle" size="small">
			書く人：{authorNames(post, members)}
		</Text>
	);
}

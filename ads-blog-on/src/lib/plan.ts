import type { Member, Post, Status } from "../data/fixtures";
import { addDays, diffDays, startOfWeek, type ISODate } from "./date";

export const STATUS_LABEL: Record<Status, string> = {
	idea: "アイデア",
	writing: "執筆中",
	review: "レビュー中",
	published: "公開済み",
	cancelled: "取りやめ",
};

export const STATUS_ORDER: Status[] = ["idea", "writing", "review", "published", "cancelled"];

export const CATEGORIES: Post["category"][] = ["技術", "デザイン", "チーム・文化", "イベント報告"];

/** 「近い」とみなす日数（今日を含めて 7 日以内）。ブリーフに無いので自分で決めた値 */
export const NEAR_DAYS = 7;

/** その投稿が「どの日に属するか」：公開済みは公開日、それ以外は公開予定日 */
export const effectiveDate = (p: Post): ISODate | null =>
	p.status === "published" ? (p.publishedDate ?? p.plannedDate) : p.plannedDate;

export const isOpen = (p: Post) => p.status !== "published" && p.status !== "cancelled";

/** 予定日を過ぎても公開されていない */
export const isOverdue = (p: Post, today: ISODate) => isOpen(p) && !!p.plannedDate && diffDays(p.plannedDate, today) < 0;

/** 公開予定日が近い（今日から NEAR_DAYS 日以内） */
export const isNear = (p: Post, today: ISODate) => {
	if (!isOpen(p) || !p.plannedDate) return false;
	const d = diffDays(p.plannedDate, today);
	return d >= 0 && d < NEAR_DAYS;
};

export type DateTone = "overdue" | "near" | "normal";
export const dateTone = (p: Post, today: ISODate): DateTone =>
	isOverdue(p, today) ? "overdue" : isNear(p, today) ? "near" : "normal";

/** 週に数える投稿か（取りやめは数えない） */
export const countsForWeek = (p: Post) => p.status !== "cancelled";

export type Week = { monday: ISODate; posts: Post[]; count: number; isPast: boolean; isCurrent: boolean };

/** 期間内の週を月曜はじまりで並べ、各週に投稿を割り当てる。0 本の週も含める */
export const buildWeeks = (posts: Post[], from: ISODate, to: ISODate, today: ISODate): Week[] => {
	const weeks: Week[] = [];
	const thisWeek = startOfWeek(today);
	for (let m = startOfWeek(from); diffDays(m, to) <= 0; m = addDays(m, 7)) {
		const inWeek = posts
			.filter((p) => {
				const d = effectiveDate(p);
				return !!d && startOfWeek(d) === m;
			})
			.sort((a, b) => (effectiveDate(a)! < effectiveDate(b)! ? -1 : 1));
		weeks.push({
			monday: m,
			posts: inWeek,
			count: inWeek.filter(countsForWeek).length,
			isPast: diffDays(m, thisWeek) < 0,
			isCurrent: m === thisWeek,
		});
	}
	return weeks;
};

/** 今週以降で、投稿が 0 本の週（「予定の無い週」） */
export const emptyUpcomingWeeks = (weeks: Week[]) => weeks.filter((w) => !w.isPast && w.count === 0);

export const undatedPosts = (posts: Post[]) => posts.filter((p) => !p.plannedDate && isOpen(p));

/** 自分の担当の並べ方：遅れ → 予定日の近い順 → 日付未定 */
export const sortForAssignee = (posts: Post[]) =>
	[...posts].sort((a, b) => {
		if (!a.plannedDate && !b.plannedDate) return a.id - b.id;
		if (!a.plannedDate) return 1;
		if (!b.plannedDate) return -1;
		return a.plannedDate < b.plannedDate ? -1 : a.plannedDate > b.plannedDate ? 1 : a.id - b.id;
	});

export const inRange = (d: ISODate | null, from: ISODate, to: ISODate) => !!d && d >= from && d <= to;

export type MemberSummary = {
	member: Member;
	published: number;
	planned: number;
	lastPublished: ISODate | null;
	nextPlanned: ISODate | null;
	overdue: number;
};

/** 書く人ごとの予定と実績（期間内） */
export const summarizeMembers = (members: Member[], posts: Post[], from: ISODate, to: ISODate, today: ISODate): MemberSummary[] =>
	members.map((member) => {
		const mine = posts.filter((p) => p.authorIds.includes(member.id));
		const published = mine.filter((p) => p.status === "published" && inRange(effectiveDate(p), from, to));
		const planned = mine.filter((p) => isOpen(p) && inRange(p.plannedDate, from, to));
		const lastPublished = mine
			.filter((p) => p.status === "published")
			.map((p) => effectiveDate(p)!)
			.sort()
			.at(-1) ?? null;
		const nextPlanned = mine
			.filter((p) => isOpen(p) && p.plannedDate && p.plannedDate >= today)
			.map((p) => p.plannedDate!)
			.sort()[0] ?? null;
		return {
			member,
			published: published.length,
			planned: planned.length,
			lastPublished,
			nextPlanned,
			overdue: mine.filter((p) => isOverdue(p, today)).length,
		};
	});

export const canEdit = (post: Post, user: Member | null) =>
	!!user && (user.role === "editor" || post.authorIds.includes(user.id));

export const canDelete = (user: Member | null) => !!user && user.role === "editor";

export const canCreate = (user: Member | null) => !!user;

import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ja";
import type { Member, Post, Status } from "../data/fixtures";
import { today as TODAY_STR } from "../data/fixtures";

dayjs.locale("ja");

export type Category = Post["category"];
export const CATEGORIES: Category[] = ["技術", "デザイン", "チーム・文化", "イベント報告"];

export const STATUS_LABEL: Record<Status, string> = {
	idea: "アイデア",
	writing: "執筆中",
	review: "レビュー中",
	published: "公開済み",
	cancelled: "取りやめ",
};
export const STATUSES: Status[] = ["idea", "writing", "review", "published", "cancelled"];

/** 今日（固定データの 2026-11-09） */
export const today = dayjs(TODAY_STR);

/** 月曜始まりの週の初日 */
export const weekStart = (d: Dayjs) => d.subtract((d.day() + 6) % 7, "day").startOf("day");
export const thisWeek = weekStart(today);

/** 週の表示：「11月9日〜15日」 */
export const formatWeek = (w: Dayjs) => {
	const end = w.add(6, "day");
	return w.month() === end.month() ? `${w.format("M月D日")}〜${end.format("D日")}` : `${w.format("M月D日")}〜${end.format("M月D日")}`;
};
export const formatDate = (s: string | null | undefined) => (s ? dayjs(s).format("YYYY年M月D日（ddd）") : "未定");
export const formatShortDate = (s: string | null | undefined) => (s ? dayjs(s).format("M/D（ddd）") : "未定");

/** 週に数える日付：公開済みは公開日、それ以外は公開予定日 */
export const effectiveDate = (p: Post): string | null => (p.status === "published" ? (p.publishedDate ?? p.plannedDate) : p.plannedDate);

export const isOpen = (p: Post) => p.status !== "published" && p.status !== "cancelled";
/** 遅れ：公開予定日を過ぎても公開済み・取りやめになっていない */
export const isOverdue = (p: Post) => isOpen(p) && p.plannedDate !== null && dayjs(p.plannedDate).isBefore(today, "day");
/** 何日過ぎているか（遅れのとき） */
export const daysOverdue = (p: Post) => (p.plannedDate ? today.diff(dayjs(p.plannedDate), "day") : 0);
/** 今日から何日後か（0 = 今日） */
export const daysUntil = (p: Post) => (p.plannedDate ? dayjs(p.plannedDate).diff(today, "day") : null);
export const NEAR_DAYS = 7;
export const isNear = (p: Post) => {
	const d = daysUntil(p);
	return isOpen(p) && d !== null && d >= 0 && d <= NEAR_DAYS;
};

export type WeekSummary = {
	start: Dayjs;
	posts: Post[];
	/** 取りやめ以外の本数（過去の週は公開済みの本数） */
	count: number;
	covered: boolean;
	isPast: boolean;
	isCurrent: boolean;
};

export const summarizeWeek = (posts: Post[], start: Dayjs): WeekSummary => {
	const end = start.add(7, "day");
	const inWeek = posts
		.filter((p) => {
			const d = effectiveDate(p);
			return d !== null && !dayjs(d).isBefore(start, "day") && dayjs(d).isBefore(end, "day");
		})
		.sort((a, b) => (effectiveDate(a) ?? "").localeCompare(effectiveDate(b) ?? ""));
	const isPast = start.isBefore(thisWeek, "day");
	const count = inWeek.filter((p) => (isPast ? p.status === "published" : p.status !== "cancelled")).length;
	return { start, posts: inWeek, count, covered: count > 0, isPast, isCurrent: start.isSame(thisWeek, "day") };
};

export const weeksFrom = (posts: Post[], from: Dayjs, n: number) => Array.from({ length: n }, (_, i) => summarizeWeek(posts, from.add(i, "week")));

/** 今週から 8 週間で予定の無い週 */
export const HORIZON_WEEKS = 8;
export const emptyUpcomingWeeks = (posts: Post[]) => weeksFrom(posts, thisWeek, HORIZON_WEEKS).filter((w) => !w.covered);

export const byPlanned = (a: Post, b: Post) => (a.plannedDate ?? "9999").localeCompare(b.plannedDate ?? "9999");

export const memberName = (members: Member[], id: number) => members.find((m) => m.id === id)?.name ?? "（不明なメンバー）";

export type Viewer = { kind: "guest" } | { kind: "member"; member: Member };

export const canCreate = (v: Viewer) => v.kind === "member";
export const isEditor = (v: Viewer) => v.kind === "member" && v.member.role === "editor";
export const isAuthor = (v: Viewer, p: Post) => v.kind === "member" && p.authorIds.includes(v.member.id);
export const canEdit = (v: Viewer, p: Post) => isEditor(v) || isAuthor(v, p);
export const canDelete = (v: Viewer) => isEditor(v);

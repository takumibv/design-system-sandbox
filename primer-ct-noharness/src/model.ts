// 状態（S01〜S18）の切り替えと、組み合わせの表示に使う計算。
// 組み合わせそのものは計算せず、fixtures.ts の固定データを使う。
import { members as fixtureMembers, weeks as fixtureWeeks, type Member } from "./fixtures";

export type { Member };
export type Week = {
	date: string;
	short: string;
	label: string;
	pairs: number[][];
	rest: number;
	holiday?: string;
};

export type LoadState = "ready" | "loading" | "error";

export type Scenario = {
	/** ログイン中の人の id。null は未ログイン */
	userId: number | null;
	load: LoadState;
	loginError: boolean;
	/** 「今週」とみなす週の位置（S04 では祝日の週を今週にする） */
	thisWeekIndex: number;
	members: Member[];
	weeks: Week[];
	/** メンバー画面：削除の確認を開いておく相手 */
	confirmDeleteId?: number;
	/** メンバー画面：削除に失敗する */
	deleteFails: boolean;
	/** 設定画面：保存に成功した直後 */
	saved: boolean;
	/** 設定画面：保存に失敗する */
	saveFails: boolean;
	/** 設定画面：未入力のまま送信した直後 */
	submittedEmpty: boolean;
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export function scenarioFromQuery(search: string): Scenario {
	const id = new URLSearchParams(search).get("state")?.toUpperCase() ?? "S01";
	const base: Scenario = {
		userId: 1,
		load: "ready",
		loginError: false,
		thisWeekIndex: 0,
		members: clone(fixtureMembers),
		weeks: clone(fixtureWeeks) as Week[],
		deleteFails: false,
		saved: false,
		saveFails: false,
		submittedEmpty: false,
	};
	switch (id) {
		case "S02":
			return { ...base, userId: null };
		case "S03":
			return { ...base, userId: 9 };
		case "S04":
			return { ...base, thisWeekIndex: 1 };
		case "S05": {
			// 参加者が自分 1 人だけになった場合。組み合わせは空。
			const members = base.members.map((m) => ({ ...m, active: m.id === 1 }));
			const weeks = base.weeks.map((w) => ({ ...w, pairs: [], rest: 0 }));
			return { ...base, members, weeks };
		}
		case "S06":
			return { ...base, load: "loading" };
		case "S07":
			return { ...base, load: "error" };
		case "S08":
			return { ...base, userId: null, loginError: true };
		case "S09": {
			const members = base.members.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m));
			return { ...base, members };
		}
		case "S10":
			return { ...base, saved: true };
		case "S12":
			return { ...base, userId: null, members: [], weeks: base.weeks.map((w) => ({ ...w, pairs: [], rest: 0 })) };
		case "S13":
			return { ...base, confirmDeleteId: 10 };
		case "S14":
			return { ...base, confirmDeleteId: 10, deleteFails: true };
		case "S15":
			return { ...base, userId: 11 };
		case "S16":
			return { ...base, userId: 11, submittedEmpty: true };
		case "S17":
			return { ...base, saveFails: true };
		default:
			return base;
	}
}

/** 固定データに社員番号がないため、id の順を社員番号の順とみなす（仮定） */
export const employeeNumber = (m: Member) => (m.incomplete ? "" : String(1000 + m.id));

export const isParticipant = (m: Member) => m.active && !m.incomplete;

export const withWeekday = (date: string) => `${date}（月）`;

export const CT_TIME = "14:00";

/** ペアの集合場所：社員番号が若い人（左側）の uチャンネル。片方でも未設定なら null */
export function huddleChannel(a: Member, b: Member): string | null {
	if (!a.channel || !b.channel) return null;
	const [first] = [a, b].sort((x, y) => x.id - y.id);
	return first.channel ?? null;
}

export type MyWeek =
	| { kind: "pair"; partner: Member; channel: string | null; missingChannelOf?: Member }
	| { kind: "rest" }
	| { kind: "holiday"; name: string }
	| { kind: "none" }
	| { kind: "out" };

export function myWeek(week: Week, userId: number, find: (id: number) => Member | undefined): MyWeek {
	if (week.holiday) return { kind: "holiday", name: week.holiday };
	if (week.pairs.length === 0) return { kind: "none" };
	if (week.rest === userId) return { kind: "rest" };
	const pair = week.pairs.find((p) => p.includes(userId));
	if (!pair) return { kind: "out" };
	const me = find(userId);
	const partner = find(pair[0] === userId ? pair[1] : pair[0]);
	if (!me || !partner) return { kind: "out" };
	const channel = huddleChannel(me, partner);
	const missingChannelOf = !partner.channel ? partner : !me.channel ? me : undefined;
	return { kind: "pair", partner, channel, missingChannelOf };
}

/** 表示中の Slack の uチャンネル一覧（デモ用。既存の一覧から選ぶ想定） */
export function channelOptions(members: Member[]): string[] {
	const set = new Set<string>(["u-mao", "u-yoshida"]);
	for (const m of members) if (m.channel) set.add(m.channel);
	return [...set].sort();
}

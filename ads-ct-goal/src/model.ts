// 画面が使うデータの形と、状態 S01〜S18 の初期値。
// 組み合わせの計算はしない（ブリーフどおり fixtures.ts の固定データを使う）。
import { type Member, members as fixtureMembers, weeks as fixtureWeeks } from "../../brief/fixtures";

export type { Member };

export type Week = {
	/** 2026-10-05 のような ISO 日付（キーと日付の整形に使う） */
	iso: string;
	pairs: [number, number][];
	rest?: number;
	holiday?: string;
};

export const CT_TIME = "14:00";

const toIso = (date: string) => {
	const m = date.match(/(\d+)年(\d+)月(\d+)日/);
	if (!m) throw new Error(`Bad date: ${date}`);
	return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
};

export const baseWeeks: Week[] = fixtureWeeks.map((w) => ({
	iso: toIso(w.date),
	pairs: w.pairs.map(([a, b]) => [a, b] as [number, number]),
	rest: w.rest || undefined,
	holiday: "holiday" in w ? w.holiday : undefined,
}));

export const baseMembers: Member[] = fixtureMembers.map((m) => ({ ...m }));

// ---- 日付の整形（日本語 UI のため ja-JP。ADS の日付規則は US 形式なので採らない） ----
const weekday = (iso: string) => new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(new Date(`${iso}T00:00:00+09:00`));
const parts = (iso: string) => iso.split("-").map(Number);
/** 2026年10月5日（月） */
export const longDate = (iso: string) => {
	const [y, m, d] = parts(iso);
	return `${y}年${m}月${d}日（${weekday(iso)}）`;
};
/** 10月5日（月） */
export const shortDate = (iso: string) => {
	const [, m, d] = parts(iso);
	return `${m}月${d}日（${weekday(iso)}）`;
};

// ---- 状態 ----
export type LoadStatus = "loading" | "error" | "ready";
export type FlagKind = "save-success" | "delete-failed" | "delete-success" | "login-demo" | "huddle-demo" | "logout";
export type AppFlag = { id: number; kind: FlagKind; subject?: string };

export type AppState = {
	userId: number | null;
	members: Member[];
	weeks: Week[];
	/** weeks のうち「今週」の位置 */
	thisWeekIndex: number;
	load: LoadStatus;
	loginFailed: boolean;
	flags: AppFlag[];
	/** 削除確認中のメンバー id */
	confirmDeleteId: number | null;
	openDeleteOnMount?: number;
	/** 設定画面の初期表示（S16・S17 の再現用） */
	settingsPreset: "none" | "submitted-empty" | "save-failed";
};

export const initialState = (): AppState => ({
	userId: 1,
	members: baseMembers.map((m) => ({ ...m })),
	weeks: baseWeeks,
	thisWeekIndex: 0,
	load: "ready",
	loginFailed: false,
	flags: [],
	confirmDeleteId: null,
	settingsPreset: "none",
});

let flagSeq = 1;
export const newFlag = (kind: FlagKind, subject?: string): AppFlag => ({ id: flagSeq++, kind, subject });

/** URL の ?state=Sxx から初期状態を作る（撮影と比較のため。画面の行き来は通常の操作で行う） */
export const stateFromPreset = (preset: string | null): AppState => {
	const s = initialState();
	switch (preset) {
		case "S02":
			return { ...s, userId: null };
		case "S03":
			return { ...s, userId: 9 };
		case "S04":
			// 今日が祝日の週（2026-10-12 スポーツの日）にあたる場合
			return { ...s, thisWeekIndex: 1 };
		case "S05":
			// 参加者が 1 人（自分だけ）になった場合。組み合わせは空になる（ルール 5）
			return {
				...s,
				members: s.members.map((m) => ({ ...m, active: m.id === 1 })),
				weeks: s.weeks.map((w) => ({ ...w, pairs: [], rest: undefined })),
			};
		case "S06":
			return { ...s, load: "loading" };
		case "S07":
			return { ...s, load: "error" };
		case "S08":
			return { ...s, userId: null, loginFailed: true };
		case "S09":
			return { ...s, members: s.members.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m)) };
		case "S10":
			return { ...s, flags: [newFlag("save-success")] };
		case "S12":
			return { ...s, userId: null, members: [], weeks: s.weeks.map((w) => ({ ...w, pairs: [], rest: undefined })) };
		case "S13":
			// Modal は初回描画時に開いた状態だと表示されない（ModalTransition の仕様と推測）ため、マウント後に開く
			return { ...s, openDeleteOnMount: 10 };
		case "S14":
			return { ...s, flags: [newFlag("delete-failed", "加藤 大輔")] };
		case "S15":
			return { ...s, userId: 11 };
		case "S16":
			return { ...s, userId: 11, settingsPreset: "submitted-empty" };
		case "S17":
			return { ...s, settingsPreset: "save-failed" };
		default:
			return s;
	}
};

// ---- 派生値 ----
export const isSetupComplete = (m: Member | undefined) => !!m && !m.incomplete && !!m.channel;

export type MyWeek =
	| { kind: "pair"; partner: Member; huddleChannel?: string; missingChannelOf?: Member }
	| { kind: "rest" }
	| { kind: "holiday"; name: string }
	| { kind: "none" }; // 組み合わせなし（参加していない・参加者 2 人未満）

export const findMember = (members: Member[], id: number) => members.find((m) => m.id === id);

/**
 * 自分のその週の予定。ハドルは「ペアのうち社員番号が小さい人の uチャンネル」で始める（docs/design-decisions.md §3）。
 * 社員番号の代わりに fixtures の id 順を使う（fixtures は社員番号順に並んでいる前提）。
 */
export const myWeek = (week: Week, members: Member[], userId: number): MyWeek => {
	if (week.holiday) return { kind: "holiday", name: week.holiday };
	if (week.rest === userId) return { kind: "rest" };
	const pair = week.pairs.find(([a, b]) => a === userId || b === userId);
	if (!pair) return { kind: "none" };
	const partner = findMember(members, pair[0] === userId ? pair[1] : pair[0]);
	if (!partner) return { kind: "none" };
	const [first, second] = [...pair].sort((x, y) => x - y).map((id) => findMember(members, id));
	const missing = [first, second].find((m) => !m?.channel);
	if (missing) return { kind: "pair", partner, missingChannelOf: missing };
	return { kind: "pair", partner, huddleChannel: first?.channel };
};

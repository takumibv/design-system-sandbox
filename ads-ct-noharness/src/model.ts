// 固定データ（brief/fixtures.ts の写し）を画面で使いやすい形にする。
// 組み合わせの計算はしない（ブリーフ「計算は実装しなくてよい」）。
import { members as fixtureMembers, weeks as fixtureWeeks, type Member } from './fixtures';

export type { Member };

export type AppMember = Member & {
	/** 社員番号。固定データに無いのでデモ用に id から作る（初回設定未完了の人は未設定） */
	employeeNo?: string;
};

export type Week = {
	/** 例: 2026-10-05 */
	iso: string;
	date: string;
	short: string;
	label: string;
	pairs: [number, number][];
	rest: number;
	holiday?: string;
	isCurrent: boolean;
};

export const CT_START = '14:00';
export const THIS_WEEK_ISO = '2026-10-05';

export function initialMembers(): AppMember[] {
	return fixtureMembers.map((m) => ({
		...m,
		employeeNo: m.incomplete ? undefined : String(1000 + m.id),
	}));
}

const toIso = (date: string) => {
	const m = date.match(/(\d+)年(\d+)月(\d+)日/);
	if (!m) return date;
	return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
};

export const weeks: Week[] = fixtureWeeks.map((w, i) => ({
	...w,
	iso: toIso(w.date),
	pairs: w.pairs as [number, number][],
	isCurrent: i === 0,
}));

/** 固定データの日付はすべて月曜。曜日つきで表示する */
export const withWeekday = (short: string) => `${short}（月）`;

export const findMember = (list: AppMember[], id: number) => list.find((m) => m.id === id);

/** 社員番号順（固定データでは id 順と一致） */
export const sortByEmployeeNo = (list: AppMember[]) => [...list].sort((a, b) => a.id - b.id);

/** 名前の頭文字（姓の 1 文字目） */
export const initialOf = (name: string) => name.trim().charAt(0);

/**
 * ハドルを始める場所。ペアごとに 1 か所に決める（社員番号が後ろの人の uチャンネル）。
 * どちらかの uチャンネルが未設定なら null（ブリーフ「uチャンネル未設定の人とのペアでは出さない」）。
 */
export function huddleChannel(a?: AppMember, b?: AppMember): string | null {
	if (!a?.channel || !b?.channel) return null;
	const later = a.id > b.id ? a : b;
	return later.channel ?? null;
}

export type MyWeek =
	| { kind: 'pair'; week: Week; partnerId: number }
	| { kind: 'rest'; week: Week }
	| { kind: 'holiday'; week: Week }
	| { kind: 'none'; week: Week };

export function myWeek(week: Week, meId: number): MyWeek {
	if (week.holiday) return { kind: 'holiday', week };
	const pair = week.pairs.find((p) => p.includes(meId));
	if (pair) return { kind: 'pair', week, partnerId: pair[0] === meId ? pair[1] : pair[0] };
	if (week.rest === meId) return { kind: 'rest', week };
	return { kind: 'none', week };
}

export const slackChannels = [
	'u-misaki',
	'u-kenta',
	'u-haruka',
	'u-shota',
	'u-aoi',
	'u-naoki',
	'u-yui',
	'u-ren',
	'u-aya',
	'u-daisuke',
	'u-mao',
	'u-yoshida',
];

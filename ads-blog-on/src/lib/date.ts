// 日付は "YYYY-MM-DD" の文字列で扱う。計算は UTC で行い、タイムゾーンの影響を受けないようにする。
// 表示の書式は Intl.DateTimeFormat に任せる（ADS の日付の文書「Reference the programming i18n library API」に従う）。

export type ISODate = string;

const toUTC = (d: ISODate) => {
	const [y, m, day] = d.split("-").map(Number);
	return Date.UTC(y, m - 1, day);
};

const fromUTC = (ms: number): ISODate => new Date(ms).toISOString().slice(0, 10);

const DAY = 24 * 60 * 60 * 1000;

export const addDays = (d: ISODate, n: number): ISODate => fromUTC(toUTC(d) + n * DAY);

export const diffDays = (a: ISODate, b: ISODate): number => Math.round((toUTC(a) - toUTC(b)) / DAY);

/** その日を含む週の月曜日 */
export const startOfWeek = (d: ISODate): ISODate => {
	const dow = new Date(toUTC(d)).getUTCDay(); // 0=日
	return addDays(d, dow === 0 ? -6 : 1 - dow);
};

export const isValidISODate = (s: string | null | undefined): s is ISODate =>
	!!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(toUTC(s));

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("ja-JP", { timeZone: "UTC", ...opts });

const mediumFmt = fmt({ month: "long", day: "numeric", weekday: "short" });
const longFmt = fmt({ year: "numeric", month: "long", day: "numeric", weekday: "short" });
const shortFmt = fmt({ month: "long", day: "numeric" });

/** 例：11月12日(木) */
export const formatDate = (d: ISODate) => mediumFmt.format(toUTC(d));
/** 例：2026年11月12日(木) */
export const formatDateLong = (d: ISODate) => longFmt.format(toUTC(d));
/** 例：11月12日 */
export const formatDateShort = (d: ISODate) => shortFmt.format(toUTC(d));

/** 週の見出し。例：11月9日(月)の週 */
export const formatWeek = (monday: ISODate) => `${formatDate(monday)}の週`;

/** 範囲はハイフンでなく「から」で書く（ADS：Date ranges「use ‘to’ and not hyphens」） */
export const formatRange = (from: ISODate, to: ISODate) => `${formatDateLong(from)}から${formatDateLong(to)}まで`;

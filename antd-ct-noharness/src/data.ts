// fixtures（ブリーフ同梱の固定データ）と、状態 S01〜S18 を URL から再現するための仕組み。
import { members as fixtureMembers, weeks as fixtureWeeks, type Member } from "../../brief/fixtures";

export type { Member };
export type Week = {
  date: string;
  short: string;
  label: string;
  pairs: number[][];
  rest: number;
  holiday?: string;
};

/** fixtures の週はすべて月曜。曜日つきで出すための文字列。 */
export const withWeekday = (date: string) => `${date}（月）`;
export const CT_START = "14:00";

/**
 * fixtures に社員番号は無いため、id の並び（＝社員番号順）からデモ用の番号を作る。
 * 実データでは社員番号そのものを使う。
 */
export const employeeNo = (id: number) => String(1000 + id);

/** Slack ワークスペースにある u- チャンネル（デモ用。fixtures の uチャンネル＋未割り当ての 1 つ） */
export const uChannels = [
  ...fixtureMembers.flatMap((m) => (m.channel ? [m.channel] : [])),
  "u-mao",
];

export type StateId =
  | "ready" | "guest" | "rest" | "holiday" | "few" | "loading" | "load-error"
  | "login-error" | "no-channel" | "saved" | "members" | "members-empty"
  | "delete-confirm" | "delete-error" | "setup" | "setup-invalid" | "save-error";

export type Scenario = {
  state: StateId;
  loggedIn: boolean;
  meId: number;
  members: Member[];
  weeks: Week[];
  loading: boolean;
  loadError: boolean;
  loginError: boolean;
  /** 設定画面：保存直後の結果 */
  saveResult?: "success" | "error";
  /** 設定画面：開いた直後に検証を走らせる（未入力のまま送信した状態の再現） */
  validateOnOpen: boolean;
  /** メンバー画面：削除確認を開いておく相手 */
  deleteTargetId?: number;
  deleteError: boolean;
  /** 組み合わせ画面：開いておく先の週（date） */
  openWeek?: string;
};

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

export function scenarioFromUrl(search: string): Scenario {
  const raw = new URLSearchParams(search).get("state") ?? "ready";
  const state = (raw as StateId);
  const base: Scenario = {
    state,
    loggedIn: true,
    meId: 1,
    members: clone(fixtureMembers),
    weeks: clone(fixtureWeeks) as Week[],
    loading: false,
    loadError: false,
    loginError: false,
    validateOnOpen: false,
    deleteError: false,
  };
  switch (state) {
    case "guest":
      return { ...base, loggedIn: false };
    case "rest":
      return { ...base, meId: 9 };
    case "holiday":
      return { ...base, openWeek: fixtureWeeks[1].date };
    case "few":
      // 参加者が 1 人だけ（自分）。組み合わせはすべて空になる。
      return {
        ...base,
        members: base.members.map((m) => ({ ...m, active: m.id === 1 })),
        weeks: base.weeks.map((w) => ({ ...w, pairs: [], rest: 0 })),
      };
    case "loading":
      return { ...base, loading: true };
    case "load-error":
      return { ...base, loadError: true };
    case "login-error":
      return { ...base, loggedIn: false, loginError: true };
    case "no-channel":
      return {
        ...base,
        members: base.members.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m)),
      };
    case "saved":
      return { ...base, saveResult: "success" };
    case "save-error":
      return { ...base, saveResult: "error" };
    case "members-empty":
      return { ...base, loggedIn: false, members: [], weeks: base.weeks.map((w) => ({ ...w, pairs: [], rest: 0 })) };
    case "delete-confirm":
      return { ...base, deleteTargetId: 10 };
    case "delete-error":
      return { ...base, deleteTargetId: 10, deleteError: true };
    case "setup":
      return { ...base, meId: 11 };
    case "setup-invalid":
      return { ...base, meId: 11, validateOnOpen: true };
    default:
      return { ...base, state: "ready" };
  }
}

/**
 * ハドルを始める uチャンネル（ブリーフの未決事項への判断）：
 * ペアのうち社員番号が若い人の uチャンネルに固定し、両者が同じ場所に集まれるようにする。
 * どちらか一方でも uチャンネル未設定なら導線を出さない（ブリーフの要件）。
 */
export function huddleChannel(pair: Member[]): string | undefined {
  if (pair.some((m) => !m.channel)) return undefined;
  const [first] = [...pair].sort((a, b) => a.id - b.id);
  return first.channel;
}

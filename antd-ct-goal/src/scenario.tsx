// URL の ?state=S01〜S18 から、固定データとアプリの状態を組み立てる。
// 通常の操作（ログイン、削除、保存など）もこの状態を書き換えて再現する。
import { createContext, useContext } from 'react';
import { members as baseMembers, weeks as baseWeeks, type Member } from './fixtures';

export type Week = {
  date: string;
  short: string;
  label: string;
  pairs: number[][];
  rest: number;
  holiday?: string;
};

export type Scenario = {
  stateId: string | null;
  /** ログイン中の人の id。未ログインなら null */
  userId: number | null;
  load: 'loading' | 'ready' | 'error';
  loginError: boolean;
  members: Member[];
  /** 今週を先頭にした週の一覧（過去の週は含めない） */
  weeks: Week[];
  /** 削除確認を開いている相手 */
  deleteTargetId: number | null;
  deleteError: boolean;
  /** 次の削除を失敗させる（S14 の再現用） */
  failNextDelete: boolean;
  /** 次の保存を失敗させる（S17 の再現用） */
  saveError: boolean;
  /** 保存成功の直後（S10）。message を消さずに出しておく */
  justSaved: boolean;
  /** 初回設定で未入力のまま送信した直後（S16） */
  submittedEmpty: boolean;
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export const scenarioFromUrl = (search: string): Scenario => {
  const stateId = new URLSearchParams(search).get('state');
  const base: Scenario = {
    stateId,
    userId: 1,
    load: stateId ? 'ready' : 'loading',
    loginError: false,
    members: clone(baseMembers),
    weeks: clone(baseWeeks) as Week[],
    deleteTargetId: null,
    deleteError: false,
    failNextDelete: false,
    saveError: false,
    justSaved: false,
    submittedEmpty: false,
  };
  switch (stateId) {
    case 'S02':
      return { ...base, userId: null };
    case 'S03':
      return { ...base, userId: 9 };
    case 'S04':
      // 今日を 2026-10-12（スポーツの日）の週として開く
      return { ...base, weeks: base.weeks.slice(1) };
    case 'S05': {
      // 参加者が自分（id=1）だけ
      const members = base.members.map((member) => ({ ...member, active: member.id === 1 }));
      const weeks = base.weeks.map((week) => ({ ...week, pairs: [], rest: 0 }));
      return { ...base, members, weeks };
    }
    case 'S06':
      return { ...base, load: 'loading' };
    case 'S07':
      return { ...base, load: 'error' };
    case 'S08':
      return { ...base, userId: null, loginError: true };
    case 'S09': {
      const members = base.members.map((member) =>
        member.id === 2 ? { ...member, channel: undefined } : member,
      );
      return { ...base, members };
    }
    case 'S10':
      return { ...base, justSaved: true };
    case 'S12':
      return { ...base, userId: null, members: [], weeks: base.weeks.map((week) => ({ ...week, pairs: [], rest: 0 })) };
    case 'S13':
      return { ...base, deleteTargetId: 10 };
    case 'S14':
      return { ...base, deleteTargetId: 10, deleteError: true, failNextDelete: true };
    case 'S15':
      return { ...base, userId: 11 };
    case 'S16':
      return { ...base, userId: 11, submittedEmpty: true };
    case 'S17':
      return { ...base, saveError: true };
    default:
      return base;
  }
};

type ScenarioContextValue = {
  scenario: Scenario;
  update: (patch: Partial<Scenario> | ((current: Scenario) => Partial<Scenario>)) => void;
};

export const ScenarioContext = createContext<ScenarioContextValue | null>(null);

export const useScenario = () => {
  const value = useContext(ScenarioContext);
  if (!value) throw new Error('ScenarioContext がありません');
  return value;
};

export const findMember = (members: Member[], id: number | null | undefined) =>
  id == null ? undefined : members.find((member) => member.id === id);

/** 必須項目（社員番号・uチャンネル）が埋まっていない */
export const isIncomplete = (member: Member) => Boolean(member.incomplete) || !member.channel;

/** ペアのハドルの場所：社員番号が大きい方の uチャンネル（2 人とも設定済みのときだけ） */
export const huddleChannel = (a: Member, b: Member) => {
  if (!a.channel || !b.channel) return undefined;
  return (a.id > b.id ? a : b).channel;
};

/** 週の中で、ある人の相手（いなければ undefined）とお休みかどうか */
export const partnerOf = (week: Week, id: number) => {
  const pair = week.pairs.find((p) => p.includes(id));
  return {
    partnerId: pair ? pair.find((x) => x !== id) : undefined,
    resting: week.rest === id,
  };
};

export const withWeekday = (date: string) => `${date}（月）`;

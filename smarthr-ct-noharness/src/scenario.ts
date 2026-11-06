// URL の ?state= から、デモの状態（S01〜S18）を組み立てる。
// 組み合わせの計算はせず、brief/fixtures.ts の固定データ（src/fixtures.ts に無変更で複写）を使う。
import { members as baseMembers, weeks as baseWeeks, type Member } from './fixtures'

export type Week = {
  date: string
  short: string
  label: string
  pairs: number[][]
  rest: number
  holiday?: string
}

export type StateKey =
  | 'ready'
  | 'guest'
  | 'rest'
  | 'few'
  | 'loading'
  | 'load-error'
  | 'login-error'
  | 'no-channel'
  | 'saved'
  | 'save-error'
  | 'empty'
  | 'delete-confirm'
  | 'delete-error'
  | 'setup'
  | 'setup-error'

export type Scenario = {
  state: StateKey
  meId: number | null
  members: Member[]
  weeks: Week[]
  load: 'loading' | 'error' | 'ready'
}

const KNOWN: StateKey[] = [
  'ready',
  'guest',
  'rest',
  'few',
  'loading',
  'load-error',
  'login-error',
  'no-channel',
  'saved',
  'save-error',
  'empty',
  'delete-confirm',
  'delete-error',
  'setup',
  'setup-error',
]

export const readState = (search: string): StateKey => {
  const s = new URLSearchParams(search).get('state')
  return KNOWN.includes(s as StateKey) ? (s as StateKey) : 'ready'
}

export const buildScenario = (state: StateKey): Scenario => {
  let members = baseMembers.map((m) => ({ ...m }))
  let weeks: Week[] = baseWeeks.map((w) => ({ ...w, pairs: w.pairs.map((p) => [...p]) }))
  let meId: number | null = 1

  switch (state) {
    case 'guest':
    case 'login-error':
      meId = null
      break
    case 'rest':
      meId = 9
      break
    case 'setup':
    case 'setup-error':
      meId = 11
      break
    case 'no-channel':
      members = members.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m))
      break
    case 'few':
      // 参加者が 2 人未満（自分だけが参加）。組み合わせは空になる。
      members = members.map((m) => (m.id === 1 ? m : { ...m, active: false }))
      weeks = weeks.map((w) => ({ ...w, pairs: [], rest: 0 }))
      break
    case 'empty':
      members = []
      meId = null
      weeks = weeks.map((w) => ({ ...w, pairs: [], rest: 0 }))
      break
  }

  return {
    state,
    meId,
    members,
    weeks,
    load: state === 'loading' ? 'loading' : state === 'load-error' ? 'error' : 'ready',
  }
}

// 曜日つきの日付。fixtures の "2026年10月5日" から曜日を付ける（CT は毎週月曜）。
export const withWeekday = (date: string) => `${date}（月）`

// ハドルを行う uチャンネル：ペアのうち社員番号（並び順）が後の人のチャンネル。
// どちらかが uチャンネル未設定なら導線を出さない（null）。
export const huddleChannel = (pair: Member[]) => {
  if (pair.some((m) => !m.channel)) return null
  const sorted = [...pair].sort((a, b) => a.id - b.id)
  return sorted[sorted.length - 1].channel ?? null
}

export const allChannels = baseMembers
  .map((m) => m.channel)
  .filter((c): c is string => !!c)
  .concat(['u-mao'])
  .sort()

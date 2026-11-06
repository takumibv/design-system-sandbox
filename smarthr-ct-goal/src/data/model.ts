// 固定データ（brief/fixtures.ts の写し）と、状態 S01〜S18 を URL から再現するための土台。
import { type Member, members as fixtureMembers, weeks as fixtureWeeks } from './fixtures'

export type { Member }

export type Week = {
  /** 2026-10-05 形式。URL の ?week= に使う */
  key: string
  /** 10月5日 */
  short: string
  /** 2026年10月5日 */
  date: string
  /** 今週 / 来週 / 予定 */
  label: string
  pairs: number[][]
  rest: number
  holiday?: string
}

const toKey = (date: string) => {
  const m = date.match(/(\d+)年(\d+)月(\d+)日/)
  if (!m) throw new Error(`Unknown date: ${date}`)
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
}

export const baseWeeks: Week[] = fixtureWeeks.map((w) => ({
  key: toKey(w.date),
  short: w.short,
  date: w.date,
  label: w.label,
  pairs: w.pairs,
  rest: w.rest,
  holiday: 'holiday' in w ? w.holiday : undefined,
}))

export const baseMembers: Member[] = fixtureMembers.map((m) => ({ ...m }))

/** 固定データに社員番号が無いため、id を社員番号として扱う（並び順＝id 順）。 */
export const empCode = (m: Member) => String(m.id).padStart(4, '0')

export const isIncomplete = (m: Member) => Boolean(m.incomplete) || !m.channel

/** ハドルを始めるチャンネル：ペアのうち社員番号が後の人の uチャンネル。2 人とも uチャンネルが設定済みのときだけ。 */
export const huddleChannel = (a: Member, b: Member) => {
  if (!a.channel || !b.channel) return undefined
  return a.id < b.id ? b.channel : a.channel
}

/** 選べる uチャンネル（Slack にある u- で始まるチャンネルの想定） */
export const channelOptions = [
  'u-aoi',
  'u-aya',
  'u-daisuke',
  'u-haruka',
  'u-kenta',
  'u-mao',
  'u-misaki',
  'u-naoki',
  'u-ren',
  'u-shota',
  'u-yui',
]

export type ScenarioId =
  | 'S01'
  | 'S02'
  | 'S03'
  | 'S04'
  | 'S05'
  | 'S06'
  | 'S07'
  | 'S08'
  | 'S09'
  | 'S10'
  | 'S11'
  | 'S12'
  | 'S13'
  | 'S14'
  | 'S15'
  | 'S16'
  | 'S17'

export type Scenario = {
  /** ログイン中の人の id。未ログインは null */
  meId: number | null
  members: Member[]
  weeks: Week[]
  load: 'ready' | 'loading' | 'error'
  loginError: boolean
  /** メンバー画面：最初から削除ダイアログを開く対象 */
  deleteTargetId?: number
  /** 削除・保存を失敗させる */
  failDelete: boolean
  failSave: boolean
  /** 設定画面：最初の表示で保存結果／送信済みを再現する */
  initialSettingsResult?: 'success' | 'error' | 'invalid'
}

const base = (): Scenario => ({
  meId: 1,
  members: baseMembers.map((m) => ({ ...m })),
  weeks: baseWeeks.map((w) => ({ ...w })),
  load: 'ready',
  loginError: false,
  failDelete: false,
  failSave: false,
})

export const buildScenario = (id: string | null): Scenario => {
  const s = base()
  switch (id) {
    case 'S02':
      s.meId = null
      break
    case 'S03':
      s.meId = 9
      break
    case 'S05':
      // 参加者が自分（id=1）だけ。組み合わせは空。
      s.members = s.members.map((m) => ({ ...m, active: m.id === 1 }))
      s.weeks = s.weeks.map((w) => ({ ...w, pairs: [], rest: 0 }))
      break
    case 'S06':
      s.load = 'loading'
      break
    case 'S07':
      s.load = 'error'
      break
    case 'S08':
      s.meId = null
      s.loginError = true
      break
    case 'S09':
      s.members = s.members.map((m) => (m.id === 2 ? { ...m, channel: undefined } : m))
      break
    case 'S10':
      s.initialSettingsResult = 'success'
      break
    case 'S12':
      s.meId = null
      s.members = []
      break
    case 'S13':
      s.deleteTargetId = 10
      break
    case 'S14':
      s.deleteTargetId = 10
      s.failDelete = true
      break
    case 'S15':
      s.meId = 11
      break
    case 'S16':
      s.meId = 11
      s.initialSettingsResult = 'invalid'
      break
    case 'S17':
      s.failSave = true
      s.initialSettingsResult = 'error'
      break
    default:
      break
  }
  return s
}

export const weekdayLabel = (w: Week) => `${w.short}（月）`
export const fullDateLabel = (w: Week) => `${w.date}（月）`

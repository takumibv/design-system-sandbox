import { members as fixtureMembers, weeks as fixtureWeeks, type Member } from './fixtures'

export type { Member }

export type Week = {
  /** ISO 形式の月曜日（例: 2026-10-05） */
  iso: string
  /** 表示用（例: 10月5日（月）） */
  label: string
  /** 年つき（例: 2026年10月5日（月）） */
  longLabel: string
  pairs: [number, number][]
  rest?: number
  holiday?: string
}

/** CT の開始時刻（ルール上固定） */
export const CT_START = '14:00'

/** uチャンネルの候補（既存の一覧から選ぶ、の「一覧」。デモ用に固定） */
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

const toIso = (date: string) => {
  const m = date.match(/(\d+)年(\d+)月(\d+)日/)
  if (!m) throw new Error(`bad date ${date}`)
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
}

export const allWeeks: Week[] = fixtureWeeks.map((w) => ({
  iso: toIso(w.date),
  // fixtures の週はすべて月曜日
  label: `${w.short}（月）`,
  longLabel: `${w.date}（月）`,
  pairs: w.pairs as [number, number][],
  rest: w.rest || undefined,
  holiday: w.holiday,
}))

export type DataMode = 'ok' | 'loading' | 'error' | 'few' | 'empty'

export type Dataset = {
  members: Member[]
  weeks: Week[]
}

/**
 * デモ用のデータを作る。
 * - few: 参加者が 1 人だけ（組み合わせは空）
 * - empty: メンバー 0 人
 * - unsetChannel: 指定した id の uチャンネルを未設定にする
 */
export function buildDataset(mode: DataMode, unsetChannel: number[]): Dataset {
  let members = fixtureMembers.map((m) => ({ ...m }))
  let weeks = allWeeks.map((w) => ({ ...w }))
  for (const id of unsetChannel) {
    const m = members.find((x) => x.id === id)
    if (m) delete m.channel
  }
  if (mode === 'few') {
    members = members.map((m) => ({ ...m, active: m.id === 1 }))
    weeks = weeks.map((w) => ({ ...w, pairs: [], rest: undefined }))
  }
  if (mode === 'empty') {
    members = []
    weeks = weeks.map((w) => ({ ...w, pairs: [], rest: undefined }))
  }
  return { members, weeks }
}

export const findMember = (members: Member[], id: number | undefined) => members.find((m) => m.id === id)

/**
 * ハドルを始める場所。ペアの 2 人が同じチャンネルに集まれるよう、
 * 「社員番号が大きい方の uチャンネル」に決める（docs/design-decisions.md 参照）。
 * どちらかの uチャンネルが未設定なら undefined（ブリーフ：未設定の人とのペアでは導線を出さない）。
 */
export function huddleChannel(members: Member[], pair: [number, number]): string | undefined {
  const [a, b] = pair.map((id) => findMember(members, id))
  if (!a?.channel || !b?.channel) return undefined
  return (a.id > b.id ? a : b).channel
}

export const isIncomplete = (m: Member) => Boolean(m.incomplete || !m.channel)

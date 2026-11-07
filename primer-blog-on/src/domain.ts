// 投稿予定まわりの判定（遅れ・近い・週・期間）をまとめる。画面からは計算をしない。
import type {Member, Post, Status} from '../../brief/fixtures'
import {today as fixtureToday} from '../../brief/fixtures'

export type {Member, Post, Status}
export type Category = Post['category']

export const TODAY = fixtureToday // 2026-11-09（月）
export const NEAR_DAYS = 7

export const CATEGORIES: Category[] = ['技術', 'デザイン', 'チーム・文化', 'イベント報告']

export const STATUS_LABEL: Record<Status, string> = {
  idea: 'アイデア',
  writing: '執筆中',
  review: 'レビュー中',
  published: '公開済み',
  cancelled: '取りやめ',
}
export const STATUS_ORDER: Status[] = ['idea', 'writing', 'review', 'published', 'cancelled']

// ---- 日付（すべて YYYY-MM-DD 文字列で扱い、UTC で計算してタイムゾーンの影響を避ける） ----
const toUtc = (d: string) => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10))
const fromUtc = (ms: number) => new Date(ms).toISOString().slice(0, 10)
const DAY = 86_400_000

export const addDays = (d: string, n: number) => fromUtc(toUtc(d) + n * DAY)
export const diffDays = (a: string, b: string) => Math.round((toUtc(a) - toUtc(b)) / DAY) // a - b
export const isValidDate = (d: string | null | undefined): d is string =>
  !!d && /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(toUtc(d)) && fromUtc(toUtc(d)) === d

/** その日を含む週の月曜 */
export const weekStart = (d: string) => {
  const dow = new Date(toUtc(d)).getUTCDay() // 0=日
  return addDays(d, dow === 0 ? -6 : 1 - dow)
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
/** 11/12（木） */
export const formatDate = (d: string, withYear = false) => {
  const dt = new Date(toUtc(d))
  const md = `${dt.getUTCMonth() + 1}/${dt.getUTCDate()}`
  return `${withYear ? `${dt.getUTCFullYear()}/` : ''}${md}（${WEEKDAYS[dt.getUTCDay()]}）`
}
/** 11/9〜11/15 */
export const formatWeek = (monday: string) => {
  const s = new Date(toUtc(monday))
  const e = new Date(toUtc(addDays(monday, 6)))
  return `${s.getUTCMonth() + 1}/${s.getUTCDate()}〜${e.getUTCMonth() + 1}/${e.getUTCDate()}`
}

// ---- 投稿の判定 ----
export const isOpen = (p: Post) => p.status !== 'published' && p.status !== 'cancelled'

/** 予定日を過ぎた未公開。戻り値は遅れ日数（遅れていなければ 0） */
export const overdueDays = (p: Post, today = TODAY) =>
  isOpen(p) && p.plannedDate && p.plannedDate < today ? diffDays(today, p.plannedDate) : 0

/** 7 日以内に予定日が来る未公開 */
export const isNear = (p: Post, today = TODAY) =>
  isOpen(p) && !!p.plannedDate && p.plannedDate >= today && diffDays(p.plannedDate, today) <= NEAR_DAYS

/** 週に割り当てる日付：公開済みは公開日、それ以外は予定日 */
export const effectiveDate = (p: Post) => (p.status === 'published' ? (p.publishedDate ?? p.plannedDate) : p.plannedDate)

export const isMine = (p: Post, memberId: number | null) => memberId != null && p.authorIds.includes(memberId)

// ---- 期間 ----
export const WEEK_SPANS = [4, 8, 12] as const
export type WeekSpan = (typeof WEEK_SPANS)[number]
export const DEFAULT_SPAN: WeekSpan = 8
/** 既定の期間：2 週前の月曜から 8 週（直近の実績と先の予定の両方が見える） */
export const defaultFrom = () => addDays(weekStart(TODAY), -14)

export type Period = {from: string; weeks: WeekSpan; to: string}
export const makePeriod = (fromParam: string | null, weeksParam: string | null): Period => {
  const weeks = (WEEK_SPANS as readonly number[]).includes(Number(weeksParam)) ? (Number(weeksParam) as WeekSpan) : DEFAULT_SPAN
  const from = isValidDate(fromParam) ? weekStart(fromParam) : defaultFrom()
  return {from, weeks, to: addDays(from, weeks * 7 - 1)}
}
export const inPeriod = (d: string | null | undefined, period: Period) => !!d && d >= period.from && d <= period.to

export type Week = {
  monday: string
  isThisWeek: boolean
  isPast: boolean
  posts: Post[] // 取りやめを含む（表示用）
  activeCount: number // 取りやめ以外
  publishedCount: number
}

const statusRank = (p: Post) => (overdueDays(p) > 0 ? 0 : p.status === 'cancelled' ? 3 : p.status === 'published' ? 1 : 2)

export const buildWeeks = (posts: Post[], period: Period): Week[] => {
  const thisWeek = weekStart(TODAY)
  return Array.from({length: period.weeks}, (_, i) => {
    const monday = addDays(period.from, i * 7)
    const inWeek = posts
      .filter(p => {
        const d = effectiveDate(p)
        return d != null && weekStart(d) === monday
      })
      .sort((a, b) => statusRank(a) - statusRank(b) || (effectiveDate(a) ?? '').localeCompare(effectiveDate(b) ?? ''))
    return {
      monday,
      isThisWeek: monday === thisWeek,
      isPast: monday < thisWeek,
      posts: inWeek,
      activeCount: inWeek.filter(p => p.status !== 'cancelled').length,
      publishedCount: inWeek.filter(p => p.status === 'published').length,
    }
  })
}

/** 予定の無い週（今週以降のみ。過去の空き週は「抜け」ではなく実績として週の列に出る） */
export const emptyUpcomingWeeks = (weeks: Week[]) => weeks.filter(w => !w.isPast && w.activeCount === 0)

export type AuthorStat = {
  member: Member
  published: number // 期間内に公開
  upcoming: number // 未公開で取りやめ以外（日付未定を含む）
  overdue: number
  lastPublished: string | null // 期間に関係なく最後の公開日
  nextPlanned: string | null
}
export const authorStats = (members: Member[], posts: Post[], period: Period): AuthorStat[] =>
  members
    .map(member => {
      const mine = posts.filter(p => p.authorIds.includes(member.id))
      const published = mine.filter(p => p.status === 'published')
      const open = mine.filter(isOpen)
      const lastPublished = published.map(p => p.publishedDate ?? p.plannedDate ?? '').sort().pop() || null
      const nextPlanned =
        open
          .map(p => p.plannedDate)
          .filter((d): d is string => !!d && d >= TODAY)
          .sort()[0] ?? null
      return {
        member,
        published: published.filter(p => inPeriod(p.publishedDate ?? p.plannedDate, period)).length,
        upcoming: open.length,
        overdue: open.filter(p => overdueDays(p) > 0).length,
        lastPublished,
        nextPlanned,
      }
    })
    // 予定も期間内の公開も無い人を先頭に、次に件数の少ない順
    .sort((a, b) => a.published + a.upcoming - (b.published + b.upcoming) || a.member.id - b.member.id)

/** 自分の担当の並び：遅れ → 予定日が近い順 → 日付未定 → 公開済み（新しい順） → 取りやめ */
export const sortMine = (posts: Post[]) => {
  const rank = (p: Post) => (overdueDays(p) > 0 ? 0 : isOpen(p) && p.plannedDate ? 1 : isOpen(p) ? 2 : p.status === 'published' ? 3 : 4)
  return [...posts].sort((a, b) => {
    const r = rank(a) - rank(b)
    if (r !== 0) return r
    if (rank(a) === 3) return (effectiveDate(b) ?? '').localeCompare(effectiveDate(a) ?? '')
    return (a.plannedDate ?? '').localeCompare(b.plannedDate ?? '')
  })
}

// ---- 権限 ----
export type Viewer = {kind: 'guest'} | {kind: 'member'; member: Member}
export const viewerId = (v: Viewer) => (v.kind === 'member' ? v.member.id : null)
export const isEditor = (v: Viewer) => v.kind === 'member' && v.member.role === 'editor'
export const canCreate = (v: Viewer) => v.kind === 'member'
export const canEdit = (v: Viewer, p: Post) => isEditor(v) || isMine(p, viewerId(v))
export const canDelete = (v: Viewer) => isEditor(v)

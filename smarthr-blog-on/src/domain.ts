// 投稿・メンバー・週に関する計算。画面に依存しない。
import {
  type Member,
  type Post,
  type Status,
  members as fixtureMembers,
  posts as fixturePosts,
  today as fixtureToday,
} from '../../brief/fixtures.ts'

export type { Member, Post, Status }

export const TODAY = fixtureToday
export const MEMBERS = fixtureMembers
export const INITIAL_POSTS = fixturePosts

export const CATEGORIES: Array<Post['category']> = ['技術', 'デザイン', 'チーム・文化', 'イベント報告']

export const STATUS_LABEL: Record<Status, string> = {
  idea: 'アイデア',
  writing: '執筆中',
  review: 'レビュー中',
  published: '公開済み',
  cancelled: '取りやめ',
}
export const STATUSES: Status[] = ['idea', 'writing', 'review', 'published', 'cancelled']

/** 予定日の近さを「近い」とみなす日数（今日を含む） */
export const NEAR_DAYS = 14
/** 投稿計画で一度に表示する週の数 */
export const PERIOD_WEEKS = 10

// ---- 日付 ----
// 日付は "YYYY-MM-DD" の文字列で持ち、計算するときだけ年・月・日を明示して Date を作る
// （引数 1 つの new Date は実行環境で結果が変わるため使わない：eslint smarthr/best-practice-for-date）
const DAY = 24 * 60 * 60 * 1000
const toDate = (iso: string, plusDays = 0) =>
  new Date(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)) + plusDays)
const pad = (n: number) => String(n).padStart(2, '0')
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const addDays = (iso: string, days: number) => toIso(toDate(iso, days))
export const diffDays = (from: string, to: string) => Math.round((toDate(to).getTime() - toDate(from).getTime()) / DAY)
export const isValidDate = (value: string | null | undefined): value is string =>
  !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && toIso(toDate(value)) === value

/** その日を含む週の月曜日 */
export const weekStart = (iso: string) => {
  const dow = toDate(iso).getDay() // 0=日
  return addDays(iso, -((dow + 6) % 7))
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
export const formatDate = (iso: string, withYear = false) => {
  const d = toDate(iso)
  const md = `${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`
  return withYear ? `${d.getFullYear()}年${md}` : md
}
export const formatWeek = (monday: string) => `${formatDate(monday)}〜${formatDate(addDays(monday, 6))}`

// ---- 投稿 ----
export const isOpen = (post: Post) => post.status !== 'published' && post.status !== 'cancelled'

/** 計画上の日付：公開済みなら公開日、それ以外は公開予定日 */
export const planDate = (post: Post) =>
  post.status === 'published' ? (post.publishedDate ?? post.plannedDate) : post.plannedDate

/** 予定日を過ぎても公開も取りやめもされていない日数（遅れていなければ 0） */
export const overdueDays = (post: Post, today = TODAY) =>
  isOpen(post) && post.plannedDate && post.plannedDate < today ? diffDays(post.plannedDate, today) : 0

/** 公開予定日までの日数（今日=0）。予定日が無い・遅れている・公開済みなら null */
export const daysUntil = (post: Post, today = TODAY) =>
  isOpen(post) && post.plannedDate && post.plannedDate >= today ? diffDays(today, post.plannedDate) : null

export const isNear = (post: Post, today = TODAY) => {
  const d = daysUntil(post, today)
  return d !== null && d < NEAR_DAYS
}

/** 週の本数として数えるか（取りやめは数えない） */
export const countsForWeek = (post: Post) => post.status !== 'cancelled'

export const memberName = (id: number) => MEMBERS.find((m) => m.id === id)?.name ?? '（不明なメンバー）'
export const authorNames = (post: Post) => post.authorIds.map(memberName).join('、')

// ---- 週ごとの計画 ----
export type Week = {
  monday: string
  posts: Post[]
  count: number
  isPast: boolean
  isCurrent: boolean
  /** 今週以降で、数える投稿が 0 本 */
  isGap: boolean
}

export const buildWeeks = (posts: Post[], from: string, to: string, today = TODAY): Week[] => {
  const thisMonday = weekStart(today)
  const weeks: Week[] = []
  for (let monday = weekStart(from); monday <= to; monday = addDays(monday, 7)) {
    const sunday = addDays(monday, 6)
    const inWeek = posts
      .filter((p) => {
        const d = planDate(p)
        return !!d && d >= monday && d <= sunday
      })
      .sort((a, b) => (planDate(a) ?? '').localeCompare(planDate(b) ?? '') || a.id - b.id)
    const count = inWeek.filter(countsForWeek).length
    weeks.push({
      monday,
      posts: inWeek,
      count,
      isPast: monday < thisMonday,
      isCurrent: monday === thisMonday,
      isGap: monday >= thisMonday && count === 0,
    })
  }
  return weeks
}

export const defaultPeriod = (today = TODAY) => {
  const from = addDays(weekStart(today), -14)
  return { from, to: addDays(from, PERIOD_WEEKS * 7 - 1) }
}

// ---- メンバーごとの集計 ----
export type MemberStats = {
  member: Member
  published: number
  upcoming: number
  lastPublished: string | null
  nextPlanned: string | null
}

export const memberStats = (posts: Post[]): MemberStats[] =>
  MEMBERS.map((member) => {
    const mine = posts.filter((p) => p.authorIds.includes(member.id))
    const published = mine.filter((p) => p.status === 'published')
    const upcoming = mine.filter(isOpen)
    const lastPublished = published.map(planDate).filter(isValidDate).sort().at(-1) ?? null
    const nextPlanned =
      upcoming
        .map((p) => p.plannedDate)
        .filter(isValidDate)
        .sort()[0] ?? null
    return { member, published: published.length, upcoming: upcoming.length, lastPublished, nextPlanned }
  }).sort((a, b) => a.upcoming - b.upcoming || a.published - b.published || a.member.id - b.member.id)

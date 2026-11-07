import {CalendarIcon, PlusIcon} from '@primer/octicons-react'
import {ActionList, ActionMenu, Banner, Button, Heading, Label, Link, Stack, Text} from '@primer/react'
import {Blankslate} from '@primer/react/experimental'
import {Fragment} from 'react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {PeriodControls} from '../components/PeriodControls'
import {PostRow} from '../components/PostRow'
import classes from '../components/PostList.module.css'
import {EmptyState, ListSkeleton, LoadError} from '../components/StateViews'
import {
  buildWeeks,
  canCreate,
  CATEGORIES,
  diffDays,
  emptyUpcomingWeeks,
  formatDate,
  formatWeek,
  isMine,
  isNear,
  makePeriod,
  overdueDays,
  TODAY,
  viewerId,
  type Post,
} from '../domain'
import {useStore} from '../store'
import {useDemoState, useQuery} from '../url'

/** V1 計画（最初に開く画面）。主役は「週の列」。上に要対応（遅れ・予定の無い週）。 */
export function PlanPage() {
  const {posts: allPosts, members, viewer, memberName} = useStore()
  const navigate = useNavigate()
  const {get, update} = useQuery()
  const demo = useDemoState()
  const period = makePeriod(get('from'), get('weeks'))
  const authorId = Number(get('author')) || null
  const category = CATEGORIES.find(c => c === get('category')) ?? null
  const filtered = authorId != null || category != null

  const posts = demo === 'empty' ? [] : allPosts
  const shown = posts.filter(p => (authorId == null || p.authorIds.includes(authorId)) && (category == null || p.category === category))

  const weeks = buildWeeks(shown, period)
  const allWeeks = buildWeeks(posts, period) // 要対応は絞り込みに関係なく全体で数える
  const gaps = emptyUpcomingWeeks(allWeeks)
  const overdue = posts.filter(p => overdueDays(p) > 0).sort((a, b) => overdueDays(b) - overdueDays(a))
  const near = posts.filter(p => isNear(p))
  const myNext = posts.filter(p => isMine(p, viewerId(viewer)) && (isNear(p) || overdueDays(p) > 0)).sort((a, b) => (a.plannedDate ?? '').localeCompare(b.plannedDate ?? ''))
  const coveredWeeks = allWeeks.filter(w => w.activeCount > 0).length
  const undated = shown.filter(p => !p.plannedDate && p.status !== 'published' && p.status !== 'cancelled')

  return (
    <Stack gap="spacious">
      {demo === 'loading' || demo === 'error' ? null : demo !== 'empty' && (overdue.length > 0 || gaps.length > 0) ? (
        <Banner
            variant="warning"
            title={`要対応：${[overdue.length > 0 ? `予定日を過ぎた投稿 ${overdue.length} 件` : null, gaps.length > 0 ? `予定の無い週 ${gaps.length} 週` : null].filter(Boolean).join('、')}`}
            description={
              <Stack gap="condensed">
                {overdue.length > 0 ? (
                  <span>
                    予定日を過ぎても公開されていません：
                    {overdue.map((p, i) => (
                      <Fragment key={p.id}>
                        {i > 0 ? '、' : null}
                        <Link as={RouterLink} to={`/posts/${p.id}`} inline>
                          {p.title}
                        </Link>
                        （{p.authorIds.map(memberName).join('、')}・{overdueDays(p)} 日遅れ）
                      </Fragment>
                    ))}
                  </span>
                ) : null}
                {gaps.length > 0 ? <span>投稿予定が入っていない週：{gaps.map(w => formatWeek(w.monday)).join('、')}</span> : null}
              </Stack>
            }
          />
      ) : null}

      <section aria-labelledby="period-heading">
        <Stack gap="normal">
          <PeriodControls period={period} headingId="period-heading" />

          {demo === 'loading' ? (
            <ListSkeleton label="投稿予定を読み込んでいます" />
          ) : demo === 'error' ? (
            <LoadError what="投稿予定" />
          ) : posts.length === 0 ? (
            <EmptyState
              heading="まだ投稿予定がありません"
              description="書きたいテーマや、決まっている公開日を登録すると、週ごとの予定がここに並びます。仮タイトル・日付未定でも登録できます。"
              action={canCreate(viewer) ? <Blankslate.PrimaryAction onClick={() => navigate('/posts/new')}>投稿予定を登録</Blankslate.PrimaryAction> : undefined}
            />
          ) : (
            <>
              <Stack gap="condensed">
                <Text as="p">
                  {period.weeks} 週のうち <strong>{coveredWeeks} 週</strong>に投稿予定・公開があります。7 日以内に予定日が来る投稿は {near.length} 件です。
                </Text>
                {viewer.kind === 'member' && myNext.length > 0 ? (
                  <Text as="p">
                    あなたの担当：
                    {myNext.map((p, i) => (
                      <Fragment key={p.id}>
                        {i > 0 ? '、' : null}
                        <Link as={RouterLink} to={`/posts/${p.id}`} inline>
                          {p.title}
                        </Link>
                        （{formatDate(p.plannedDate!)}・{overdueDays(p) > 0 ? `${overdueDays(p)} 日遅れ` : diffDays(p.plannedDate!, TODAY) === 0 ? '今日' : `あと ${diffDays(p.plannedDate!, TODAY)} 日`}）
                      </Fragment>
                    ))}{' '}
                    <Link as={RouterLink} to="/mine" inline>
                      自分の担当をすべて見る
                    </Link>
                  </Text>
                ) : null}
              </Stack>

              <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center">
                <ActionMenu>
                  <ActionMenu.Button>書く人：{authorId ? memberName(authorId) : 'すべて'}</ActionMenu.Button>
                  <ActionMenu.Overlay width="small">
                    <ActionList selectionVariant="single" role="menu" aria-label="書く人で絞り込む">
                      <ActionList.Item role="menuitemradio" selected={authorId == null} aria-checked={authorId == null} onSelect={() => update({author: null})}>
                        すべて
                      </ActionList.Item>
                      {members.map(m => (
                        <ActionList.Item key={m.id} role="menuitemradio" selected={authorId === m.id} aria-checked={authorId === m.id} onSelect={() => update({author: String(m.id)})}>
                          {m.name}
                        </ActionList.Item>
                      ))}
                    </ActionList>
                  </ActionMenu.Overlay>
                </ActionMenu>
                <ActionMenu>
                  <ActionMenu.Button>カテゴリ：{category ?? 'すべて'}</ActionMenu.Button>
                  <ActionMenu.Overlay width="small">
                    <ActionList selectionVariant="single" role="menu" aria-label="カテゴリで絞り込む">
                      <ActionList.Item role="menuitemradio" selected={category == null} aria-checked={category == null} onSelect={() => update({category: null})}>
                        すべて
                      </ActionList.Item>
                      {CATEGORIES.map(c => (
                        <ActionList.Item key={c} role="menuitemradio" selected={category === c} aria-checked={category === c} onSelect={() => update({category: c})}>
                          {c}
                        </ActionList.Item>
                      ))}
                    </ActionList>
                  </ActionMenu.Overlay>
                </ActionMenu>
                {filtered ? (
                  <Button variant="invisible" onClick={() => update({author: null, category: null})}>
                    絞り込みを解除
                  </Button>
                ) : null}
              </Stack>
              <div role="status">
                {filtered ? (
                  <Text as="p" size="small">
                    {[authorId ? `書く人「${memberName(authorId)}」` : null, category ? `カテゴリ「${category}」` : null].filter(Boolean).join('・')}で絞り込み中：この期間に {weeks.reduce((n, w) => n + w.posts.length, 0)} 件
                  </Text>
                ) : null}
              </div>

              <Stack as="ol" gap="normal" className={classes.List} aria-label="週ごとの投稿予定">
                  {weeks.map(w => (
                    <li key={w.monday} className={classes.Box}>
                      <div className={w.isThisWeek ? classes.WeekHeaderCurrent : classes.WeekHeader}>
                        <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
                          <Heading as="h3" className={classes.WeekTitle}>
                            {formatWeek(w.monday)}
                          </Heading>
                          {w.isThisWeek ? <Label variant="accent">今週</Label> : null}
                          <Text size="small">
                            {w.isPast ? `公開 ${w.publishedCount} 本` : `公開 ${w.publishedCount} 本・予定 ${w.activeCount - w.publishedCount} 本`}
                          </Text>
                        </Stack>
                      </div>
                      {w.activeCount === 0 ? <EmptyWeek monday={w.monday} isPast={w.isPast} filtered={filtered} /> : null}
                      {w.posts.length > 0 ? (
                        <ul className={classes.List} aria-label={`${formatWeek(w.monday)} の投稿`}>
                          {w.posts.map(p => (
                            <PostRow key={p.id} post={p} />
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
              </Stack>

              {undated.length > 0 ? (
                <section aria-labelledby="undated-heading">
                  <Stack gap="condensed">
                    <Heading as="h2" variant="small" id="undated-heading">
                      公開予定日が未定のアイデア（{undated.length} 件）
                    </Heading>
                    <ul className={`${classes.List} ${classes.Box}`}>
                      {undated.map((p: Post) => (
                        <PostRow key={p.id} post={p} />
                      ))}
                    </ul>
                  </Stack>
                </section>
              ) : null}
            </>
          )}
        </Stack>
      </section>
    </Stack>
  )
}

/** 予定の無い週の行。抜けを「行が無い」ではなく「予定なし」という行として見せる（docs/design-decisions.md O1） */
function EmptyWeek({monday, isPast, filtered}: {monday: string; isPast: boolean; filtered: boolean}) {
  const {viewer} = useStore()
  if (filtered) {
    return (
      <div className={classes.EmptyWeek}>
        <Text size="small" className={classes.Meta}>
          絞り込みに当てはまる投稿はありません
        </Text>
      </div>
    )
  }
  if (isPast) {
    return (
      <div className={classes.EmptyWeek}>
        <Stack direction="horizontal" gap="condensed" align="center">
          <Label variant="secondary">公開なし</Label>
          <Text size="small">この週は公開された投稿がありません。</Text>
        </Stack>
      </div>
    )
  }
  return (
    <div className={classes.EmptyWeek}>
      <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap" justify="space-between">
        <Stack direction="horizontal" gap="condensed" align="center">
          <Label variant="attention">
            <CalendarIcon size={12} /> 予定なし
          </Label>
          <Text size="small">この週は投稿予定がありません。</Text>
        </Stack>
        {canCreate(viewer) ? (
          <Button as={RouterLink} to={`/posts/new?date=${monday}`} size="small" leadingVisual={PlusIcon} >
            この週に投稿予定を登録
          </Button>
        ) : null}
      </Stack>
    </div>
  )
}


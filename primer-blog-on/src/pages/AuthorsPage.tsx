import {Label, Link, Stack, Text} from '@primer/react'
import {DataTable, ScrollableRegion, Table, type Column} from '@primer/react/experimental'
import {Link as RouterLink} from 'react-router-dom'
import {PeriodControls} from '../components/PeriodControls'
import classes from '../components/PostList.module.css'
import {EmptyState, LoadError} from '../components/StateViews'
import {authorStats, formatDate, makePeriod, type AuthorStat} from '../domain'
import {useStore} from '../store'
import {useDemoState, useQuery} from '../url'

type Row = AuthorStat & {id: number}

const columns: Column<Row>[] = [
  {
    header: '書く人',
    field: 'member.name',
    rowHeader: true,
    renderCell: (r: Row) => (
      <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
        <Link as={RouterLink} to={`/?author=${r.member.id}`}>
          {r.member.name}
        </Link>
        {r.member.role === 'editor' ? <Label variant="accent">編集担当</Label> : null}
        {r.published + r.upcoming === 0 ? <Label variant="attention">予定なし</Label> : null}
      </Stack>
    ),
  },
  {header: '期間内の公開', field: 'published', align: 'end', renderCell: (r: Row) => `${r.published} 本`},
  {header: 'これからの予定', field: 'upcoming', align: 'end', renderCell: (r: Row) => `${r.upcoming} 本`},
  {
    header: '遅れ',
    field: 'overdue',
    align: 'end',
    renderCell: (r: Row) => (r.overdue > 0 ? <Label variant="danger">{r.overdue} 本</Label> : '0 本'),
  },
  {header: '最後の公開日', field: 'lastPublished', renderCell: (r: Row) => (r.lastPublished ? formatDate(r.lastPublished, true) : 'まだありません')},
  {header: '次の予定日', field: 'nextPlanned', renderCell: (r: Row) => (r.nextPlanned ? formatDate(r.nextPlanned, true) : '未定')},
]

/** V3 書く人ごと。主役はメンバー全員の予定と実績の表（O2）。予定も公開も無い人を先頭に並べる。 */
export function AuthorsPage() {
  const {members, posts} = useStore()
  const {get} = useQuery()
  const demo = useDemoState()
  const period = makePeriod(get('from'), get('weeks'))
  const rows = authorStats(members, demo === 'empty' ? [] : posts, period).map(r => ({...r, id: r.member.id}))
  const idle = rows.filter(r => r.published + r.upcoming === 0)

  return (
    <Stack gap="normal">
      <PeriodControls period={period} headingId="period-heading" />
      {demo === 'error' ? (
        <LoadError what="書く人ごとの予定と実績" />
      ) : demo !== 'loading' && rows.every(r => r.published + r.upcoming === 0) ? (
        <EmptyState heading="この期間の公開も、これからの予定もありません" description="期間を切り替えるか、計画のタブから投稿予定を登録してください。" />
      ) : (
        <>
          {demo !== 'loading' ? (
            <Text as="p">
              期間内の公開も、これからの予定も無い人：{idle.length > 0 ? `${idle.length} 人（${idle.map(r => r.member.name).join('、')}）` : 'いません'}
            </Text>
          ) : null}
          <Table.Container>
            <Table.Title as="h2" id="authors-title">
              書く人ごとの予定と実績
            </Table.Title>
            <Table.Subtitle as="p" id="authors-subtitle">
              「期間内の公開」は上の期間に公開した本数、「これからの予定」は公開日未定を含む未公開の本数です。共著は書く人それぞれに 1 本と数えます。
            </Table.Subtitle>
            {demo === 'loading' ? (
              <Table.Skeleton aria-labelledby="authors-title" columns={columns} rows={10} />
            ) : (
              <ScrollableRegion aria-labelledby="authors-title" className={classes.TableScroll}>
                <DataTable aria-labelledby="authors-title" aria-describedby="authors-subtitle" data={rows} columns={columns} />
              </ScrollableRegion>
            )}
          </Table.Container>
        </>
      )}
    </Stack>
  )
}

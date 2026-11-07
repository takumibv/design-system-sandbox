// V1 投稿計画：週ごとの予定（最初の画面）。主役は週ごとの予定、見出し領域に「確認が必要なこと」。
import { type ChangeEvent, type FC, type FormEvent, useCallback, useMemo, useState } from 'react'
import {
  Button,
  Center,
  Chip,
  Cluster,
  FaChevronLeftIcon,
  FaChevronRightIcon,
  FaCirclePlusIcon,
  Fieldset,
  FormControl,
  Heading,
  InformationPanel,
  Input,
  PageHeading,
  Panel,
  ResponseMessage,
  Section,
  Select,
  Stack,
  Text,
} from 'smarthr-ui'

import { DataState } from '../components/DataState'
import { PostList } from '../components/PostParts'
import {
  MEMBERS,
  PERIOD_WEEKS,
  type Post,
  type Week,
  addDays,
  buildWeeks,
  daysUntil,
  defaultPeriod,
  formatDate,
  formatWeek,
  isNear,
  isValidDate,
  memberName,
  overdueDays,
  planDate,
} from '../domain'
import { AppLink, useRouter } from '../router'
import { useStore } from '../store'

const usePeriod = () => {
  const { params } = useRouter()
  const fallback = defaultPeriod()
  const from = params.get('from')
  const to = params.get('to')
  return isValidDate(from) && isValidDate(to) && from <= to ? { from, to } : fallback
}

/** 見出し領域：遅れと予定の無い週（目標 O4・O1） */
const Attention: FC<{ overdue: Post[]; gaps: Week[] }> = ({ overdue, gaps }) => {
  const { href } = useRouter()
  if (overdue.length === 0 && gaps.length === 0) {
    return <ResponseMessage status="success">表示中の期間に、予定のない週と、公開予定日を過ぎた投稿はありません。</ResponseMessage>
  }
  return (
    <InformationPanel type="warning" heading="確認が必要なこと">
      <Stack>
        {overdue.length > 0 && (
          <Stack gap={0.25}>
            <Text as="p" weight="bold">
              公開予定日を過ぎても公開されていない投稿が{overdue.length}件あります。
            </Text>
            <ul className="shr-m-0 shr-ps-1.5">
              {overdue.map((p) => (
                <li key={p.id}>
                  <AppLink href={href(`/posts/${p.id}`)}>{p.title}</AppLink>（{memberName(p.authorIds[0])}
                  {p.authorIds.length > 1 ? 'ほか' : ''}・予定日 {formatDate(p.plannedDate!)}・{overdueDays(p)}日超過）
                </li>
              ))}
            </ul>
          </Stack>
        )}
        {gaps.length > 0 && (
          <Stack gap={0.25}>
            <Text as="p" weight="bold">
              投稿予定のない週が{gaps.length}週あります。書く人を探して、予定を入れてください。
            </Text>
            <ul className="shr-m-0 shr-ps-1.5">
              {gaps.map((w) => (
                <li key={w.monday}>{formatWeek(w.monday)}</li>
              ))}
            </ul>
          </Stack>
        )}
      </Stack>
    </InformationPanel>
  )
}

/** 見出し領域：ログイン中の人が書く投稿で、急ぐもの（目標 O3） */
const MyNotice: FC<{ posts: Post[] }> = ({ posts }) => {
  const { viewer } = useStore()
  const { href } = useRouter()
  if (!viewer) return null
  const mine = posts.filter((p) => p.authorIds.includes(viewer.id))
  const overdue = mine.filter((p) => overdueDays(p) > 0)
  const near = mine.filter((p) => isNear(p))
  if (overdue.length === 0 && near.length === 0) return null
  const first = [...overdue, ...near][0]
  const days = daysUntil(first)
  return (
    <Cluster align="center" gap={{ row: 0.25, column: 0.5 }}>
      <ResponseMessage status={overdue.length > 0 ? 'warning' : 'info'}>
        {viewer.name}さんが書く投稿：
        {overdue.length > 0 ? `公開予定日を過ぎた投稿が${overdue.length}件、` : ''}
        {near.length > 0 ? `2週間以内に公開予定の投稿が${near.length}件あります。` : 'あります。'}
        {first.plannedDate && days !== null ? `次は「${first.title}」（${formatDate(first.plannedDate)}）です。` : ''}
      </ResponseMessage>
      {/* ResponseMessage の中にリンクを置くと、読み上げ用の領域で aria-hidden の中にフォーカスできる要素ができる（axe aria-hidden-focus） */}
      <AppLink href={href('/mine')}>自分の担当を見る</AppLink>
    </Cluster>
  )
}

const WeekBlock: FC<{ week: Week; filtered: boolean }> = ({ week, filtered }) => (
  <Section className="[&_+_&]:shr-border-t-shorthand shr-px-1.5 shr-py-1">
    <Stack gap={0.75}>
      <Cluster align="center" gap={0.75}>
        <Heading type="blockTitle">{formatWeek(week.monday)}</Heading>
        {week.isCurrent && <Chip>今週</Chip>}
        <Text size="S" color="TEXT_GREY">
          {week.count}本
        </Text>
      </Cluster>
      {week.posts.length > 0 && (
        <PostList posts={week.posts} />
      )}
      {week.count === 0 &&
        (filtered ? (
          <Text size="S" color="TEXT_GREY">
            この週に該当する投稿はありません。
          </Text>
        ) : week.isGap ? (
          <ResponseMessage status="warning">この週は投稿予定がありません。</ResponseMessage>
        ) : (
          <ResponseMessage status="warning">この週は公開された投稿がありませんでした。</ResponseMessage>
        ))}
    </Stack>
  </Section>
)

const PeriodForm: FC<{ from: string; to: string; author: string }> = ({ from, to, author }) => {
  const { setParams } = useRouter()
  const [draft, setDraft] = useState({ from, to, author })
  const [error, setError] = useState<string>()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setDraft((current) => ({ ...current, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValidDate(draft.from) || !isValidDate(draft.to)) {
        setError('開始日と終了日を入力してください。')
        return
      }
      if (draft.from > draft.to) {
        setError('終了日は開始日より後の日付にしてください。')
        return
      }
      setError(undefined)
      setParams({ from: draft.from, to: draft.to, author: draft.author || null }, { replace: false })
    },
    [draft, setParams],
  )

  const shift = useCallback(
    (weeks: number) => {
      const nextFrom = addDays(from, weeks * 7)
      const nextTo = addDays(to, weeks * 7)
      setDraft((current) => ({ ...current, from: nextFrom, to: nextTo }))
      setParams({ from: nextFrom, to: nextTo }, { replace: false })
    },
    [from, setParams, to],
  )
  const handlePrev = useCallback(() => shift(-PERIOD_WEEKS), [shift])
  const handleNext = useCallback(() => shift(PERIOD_WEEKS), [shift])

  const authorOptions = useMemo(
    () => [{ label: 'すべての書く人', value: '' }, ...MEMBERS.map((m) => ({ label: m.name, value: String(m.id) }))],
    [],
  )

  return (
    <Stack className="shr-p-1.5">
      <form onSubmit={handleSubmit}>
        <Cluster align="flex-end" gap={1}>
          <Fieldset legend="期間" errorMessages={error}>
            <Cluster align="center">
              <FormControl label={{ text: '開始日', unrecommendedHide: true }}>
                <Input type="date" name="from" value={draft.from} onChange={handleChange} error={!!error} />
              </FormControl>
              <span aria-hidden="true">〜</span>
              <FormControl label={{ text: '終了日', unrecommendedHide: true }}>
                <Input type="date" name="to" value={draft.to} onChange={handleChange} error={!!error} />
              </FormControl>
            </Cluster>
          </Fieldset>
          <FormControl label="書く人">
            <Select name="author" options={authorOptions} value={draft.author} onChange={handleChange} />
          </FormControl>
          <Button type="submit">表示</Button>
        </Cluster>
      </form>
      <Cluster>
        <Button size="S" prefix={<FaChevronLeftIcon />} onClick={handlePrev}>
          前の{PERIOD_WEEKS}週
        </Button>
        <Button size="S" suffix={<FaChevronRightIcon />} onClick={handleNext}>
          次の{PERIOD_WEEKS}週
        </Button>
      </Cluster>
    </Stack>
  )
}

export const PlanPage: FC = () => {
  const { posts, canAdd } = useStore()
  const { params, setParams } = useRouter()
  const { from, to } = usePeriod()
  const authorParam = params.get('author') ?? ''
  const authorId = Number(authorParam) || null

  const allWeeks = useMemo(() => buildWeeks(posts, from, to), [posts, from, to])
  const shown = useMemo(
    () => (authorId ? posts.filter((p) => p.authorIds.includes(authorId)) : posts),
    [authorId, posts],
  )
  const weeks = useMemo(() => buildWeeks(shown, from, to), [shown, from, to])
  const undated = shown.filter((p) => !planDate(p))
  const overdue = posts.filter((p) => overdueDays(p) > 0)
  const gaps = allWeeks.filter((w) => w.isGap)
  const hasResult = weeks.some((w) => w.posts.length > 0) || undated.length > 0

  const handleAdd = useCallback(() => setParams({ dialog: 'add', result: null }, { replace: false }), [setParams])

  const addButton = canAdd ? (
    <Button prefix={<FaCirclePlusIcon />} onClick={handleAdd}>
      投稿を追加
    </Button>
  ) : (
    <Text size="S" color="TEXT_GREY">
      ログインすると投稿を追加できます。
    </Text>
  )

  return (
    <Stack gap={2}>
      <Stack gap={1.5}>
        <Stack gap={0.5}>
          <PageHeading>投稿計画</PageHeading>
          <p>
            週ごとの投稿予定と、公開済みの投稿です。週 1 本以上の公開を目標にしています。予定のない週や、公開予定日を過ぎた投稿がないか確認してください。
          </p>
        </Stack>
        <DataState what="投稿計画">
          {posts.length > 0 && (
            <Stack>
              <Attention overdue={overdue} gaps={gaps} />
              <MyNotice posts={posts} />
            </Stack>
          )}
        </DataState>
      </Stack>
      <DataState what="投稿">
        <Section>
          <Stack>
            <Cluster align="center" justify="space-between">
              <Heading>週ごとの予定</Heading>
              {addButton}
            </Cluster>
            <Panel>
              {posts.length === 0 ? (
                <Center padding={4}>
                  <Stack align="center">
                    <p>投稿はありません。</p>
                    {canAdd && (
                      <Button size="S" prefix={<FaCirclePlusIcon />} onClick={handleAdd}>
                        投稿を追加
                      </Button>
                    )}
                  </Stack>
                </Center>
              ) : (
                <>
                  <PeriodForm key={`${from}-${to}-${authorParam}`} from={from} to={to} author={authorParam} />
                  <div className="shr-border-t-shorthand">
                    {authorId && (
                      <Text as="p" size="S" className="shr-px-1.5 shr-pt-1">
                        {memberName(authorId)}さんが書く投稿だけを表示しています。
                      </Text>
                    )}
                    {hasResult ? (
                      weeks.map((w) => <WeekBlock key={w.monday} week={w} filtered={!!authorId} />)
                    ) : (
                      <Center padding={3}>
                        <p>
                          該当する投稿はありません。
                          <br />
                          別の条件を試してください。
                        </p>
                      </Center>
                    )}
                  </div>
                </>
              )}
            </Panel>
          </Stack>
        </Section>
        {undated.length > 0 && (
          <Section>
            <Stack>
              <Heading>公開予定日が未定の投稿</Heading>
              <Panel padding={1.5}>
                <PostList posts={undated} />
              </Panel>
            </Stack>
          </Section>
        )}
      </DataState>
    </Stack>
  )
}

// V2 自分の担当：ログイン中の人が書く投稿を、急ぐ順に（目標 O3）。
import { type FC, useCallback } from 'react'
import { Button, Center, Cluster, FaCirclePlusIcon, Heading, PageHeading, Panel, Section, Stack, Text } from 'smarthr-ui'

import { DataState } from '../components/DataState'
import { PostList } from '../components/PostParts'
import { type Post, isOpen, overdueDays, planDate } from '../domain'
import { useRouter } from '../router'
import { useStore } from '../store'

const byPlanDate = (a: Post, b: Post) => (planDate(a) ?? '').localeCompare(planDate(b) ?? '') || a.id - b.id

const Group: FC<{ title: string; posts: Post[]; emptyText: string }> = ({ title, posts, emptyText }) => (
  <Section>
    <Stack>
      <Heading>{title}</Heading>
      <Panel padding={1.5}>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <Text as="p" color="TEXT_GREY">
            {emptyText}
          </Text>
        )}
      </Panel>
    </Stack>
  </Section>
)

export const MinePage: FC = () => {
  const { posts, viewer } = useStore()
  const { setParams, navigate, pathname, params } = useRouter()

  const handleAdd = useCallback(() => setParams({ dialog: 'add', result: null }, { replace: false }), [setParams])
  const handleLogin = useCallback(() => {
    const next = new URLSearchParams(params)
    next.set('as', 'member')
    next.set('result', 'login')
    navigate(`${pathname}?${next.toString()}`)
  }, [navigate, params, pathname])

  const mine = viewer ? posts.filter((p) => p.authorIds.includes(viewer.id)) : []
  const overdue = mine.filter((p) => overdueDays(p) > 0).sort(byPlanDate)
  const upcoming = mine.filter((p) => isOpen(p) && p.plannedDate && overdueDays(p) === 0).sort(byPlanDate)
  const undated = mine.filter((p) => isOpen(p) && !p.plannedDate)
  const done = mine.filter((p) => !isOpen(p)).sort(byPlanDate).reverse()

  return (
    <Stack gap={2}>
      <Stack gap={0.5}>
        <Cluster align="center" justify="space-between">
          <PageHeading>自分の担当</PageHeading>
          {viewer && (
            <Button prefix={<FaCirclePlusIcon />} onClick={handleAdd}>
              投稿を追加
            </Button>
          )}
        </Cluster>
        <p>
          {viewer
            ? `${viewer.name}さんが書く人に入っている投稿です。公開予定日が近い順に並べています。公開したら、投稿を開いて「公開済みにする」を押してください。`
            : 'ログインすると、自分が書く投稿と公開予定日を確認できます。'}
        </p>
      </Stack>
      <DataState what="自分の担当">
        {!viewer ? (
          // 権限による表示制御：操作に関わる UI は出さず、理由と回避方法を示す
          <Panel padding={2}>
            <Center>
              <Button onClick={handleLogin}>Slackでログイン</Button>
            </Center>
          </Panel>
        ) : mine.length === 0 ? (
          <Panel padding={2}>
            <Center>
              <Stack align="center">
                <p>{viewer?.name}さんが書く投稿はありません。</p>
                <Button size="S" prefix={<FaCirclePlusIcon />} onClick={handleAdd}>
                  投稿を追加
                </Button>
              </Stack>
            </Center>
          </Panel>
        ) : (
          <Stack gap={2}>
            {overdue.length > 0 && <Group title="公開予定日を過ぎた投稿" posts={overdue} emptyText="" />}
            <Group title="これから公開する投稿" posts={upcoming} emptyText="公開予定日が決まっている投稿はありません。" />
            <Group title="公開予定日が未定の投稿" posts={undated} emptyText="公開予定日が未定の投稿はありません。" />
            <Group title="公開済み・取りやめの投稿" posts={done} emptyText="公開済みの投稿はまだありません。" />
          </Stack>
        )}
      </DataState>
    </Stack>
  )
}

import {SignInIcon} from '@primer/octicons-react'
import {Heading, Stack, Text} from '@primer/react'
import {Blankslate} from '@primer/react/experimental'
import {useNavigate} from 'react-router-dom'
import {PostRow} from '../components/PostRow'
import classes from '../components/PostList.module.css'
import {EmptyState, ListSkeleton, LoadError, NoPermission} from '../components/StateViews'
import {isMine, isOpen, overdueDays, sortMine, viewerId, type Post} from '../domain'
import {useStore} from '../store'
import {useDemoState} from '../url'

/** V2 自分の担当。主役は自分が書く人に入っている投稿の、予定日順の一覧（O3）。 */
export function MinePage() {
  const {posts, viewer, login} = useStore()
  const demo = useDemoState()
  const navigate = useNavigate()

  if (viewer.kind === 'guest') {
    return (
      <NoPermission
        heading="ログインすると、あなたの担当が表示されます"
        description="自分が書く人に入っている投稿予定と、その予定日をまとめて確認できます。ログインには Slack アカウントを使います。"
        action={
          <Blankslate.PrimaryAction
            onClick={() => {
              login()
              navigate('/mine?result=loggedin')
            }}
          >
            <SignInIcon /> Slack でログイン
          </Blankslate.PrimaryAction>
        }
      />
    )
  }
  if (demo === 'loading') return <ListSkeleton label="あなたの担当を読み込んでいます" />
  if (demo === 'error') return <LoadError what="あなたの担当" />

  const mine = demo === 'empty' ? [] : sortMine(posts.filter(p => isMine(p, viewerId(viewer))))
  if (mine.length === 0) {
    return (
      <EmptyState
        heading="あなたが書く投稿予定はまだありません"
        description="書きたいテーマがあれば、仮タイトル・公開日未定のアイデアとして登録できます。"
        action={<Blankslate.PrimaryAction onClick={() => navigate('/posts/new')}>投稿予定を登録</Blankslate.PrimaryAction>}
      />
    )
  }
  const groups: {id: string; title: string; items: Post[]; note?: string}[] = [
    {id: 'due', title: '予定日が決まっている投稿', items: mine.filter(p => isOpen(p) && p.plannedDate), note: '予定日が近い順。予定日を過ぎたものを先頭に出しています。'},
    {id: 'undated', title: '公開予定日が未定', items: mine.filter(p => isOpen(p) && !p.plannedDate)},
    {id: 'done', title: '公開済み・取りやめ', items: mine.filter(p => !isOpen(p))},
  ]
  const late = mine.filter(p => overdueDays(p) > 0).length
  return (
    <Stack gap="spacious">
      <Text as="p">
        {viewer.member.name} さんが書く人に入っている投稿は {mine.length} 件です（未公開 {mine.filter(isOpen).length} 件{late > 0 ? `、うち予定日を過ぎたもの ${late} 件` : ''}）。
      </Text>
      {groups
        .filter(g => g.items.length > 0)
        .map(g => (
          <section key={g.id} aria-labelledby={`mine-${g.id}`}>
            <Stack gap="condensed">
              <Heading as="h2" variant="small" id={`mine-${g.id}`}>
                {g.title}（{g.items.length} 件）
              </Heading>
              {g.note ? (
                <Text as="p" size="small" className={classes.Meta}>
                  {g.note}
                </Text>
              ) : null}
              <ul className={`${classes.List} ${classes.Box}`}>
                {g.items.map(p => (
                  <PostRow key={p.id} post={p} />
                ))}
              </ul>
            </Stack>
          </section>
        ))}
    </Stack>
  )
}

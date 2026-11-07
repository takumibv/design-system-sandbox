// V4 投稿：シングル（1 カラム）。主役はタイトルとステータス、公開予定日と遅れ。
import { type FC, type MouseEvent, useCallback } from 'react'
import {
  Button,
  Cluster,
  DefinitionList,
  DefinitionListItem,
  DropdownMenuButton,
  FaCircleCheckIcon,
  FaPenIcon,
  FaTrashCanIcon,
  Heading,
  PageHeading,
  Panel,
  ResponseMessage,
  Section,
  Stack,
  Text,
  TextLink,
  UpwardLink,
} from 'smarthr-ui'

import { DataState } from '../components/DataState'
import { DueNote, PostStatusLabel } from '../components/PostParts'
import { type Post, authorNames, formatDate, isOpen } from '../domain'
import { useRouter } from '../router'
import { useStore } from '../store'

const PostActions: FC<{ post: Post }> = ({ post }) => {
  const { viewer, canEdit, canDelete } = useStore()
  const { setParams, navigate, pathname, params } = useRouter()
  const open = useCallback((dialog: string) => setParams({ dialog, result: null }, { replace: false }), [setParams])
  const handleEdit = useCallback(() => open('edit'), [open])
  const handlePublish = useCallback(() => open('publish'), [open])
  const handleDelete = useCallback(() => open('delete'), [open])
  const handleLogin = useCallback(() => {
    const next = new URLSearchParams(params)
    next.set('as', 'member')
    next.set('result', 'login')
    navigate(`${pathname}?${next.toString()}`)
  }, [navigate, params, pathname])

  // 権限による表示制御：権限の無い操作は出さず、理由を近くに示す（表示パターン B）
  if (!viewer) {
    return (
      <Cluster align="center" gap={0.75}>
        <Text size="S">ログインすると、自分が書く投稿を編集できます。</Text>
        <Button size="S" onClick={handleLogin}>
          Slack でログイン
        </Button>
      </Cluster>
    )
  }
  if (!canEdit(post)) {
    return <Text size="S">この投稿は、書く人と編集担当だけが編集できます。</Text>
  }
  return (
    <Cluster align="center">
      <Button prefix={<FaPenIcon />} onClick={handleEdit}>
        編集
      </Button>
      {isOpen(post) && (
        <Button prefix={<FaCircleCheckIcon />} onClick={handlePublish}>
          公開済みにする
        </Button>
      )}
      {canDelete && (
        <DropdownMenuButton trigger="操作">
          <Button prefix={<FaTrashCanIcon />} onClick={handleDelete}>
            削除
          </Button>
        </DropdownMenuButton>
      )}
    </Cluster>
  )
}

export const PostPage: FC<{ post: Post }> = ({ post }) => {
  const { href, navigate } = useRouter()
  const handleBack = useCallback(
    (e: MouseEvent<Element>) => {
      e.preventDefault()
      navigate(href('/'))
    },
    [href, navigate],
  )

  const items = [
    { term: 'カテゴリ', description: post.category },
    { term: '書く人', description: authorNames(post) },
    {
      term: '公開予定日',
      description: (
        <Stack gap={0.25}>
          <span>{post.plannedDate ? formatDate(post.plannedDate, true) : '未定'}</span>
          <DueNote post={post} />
        </Stack>
      ),
    },
    { term: '公開日', description: post.publishedDate ? formatDate(post.publishedDate, true) : '' },
    {
      term: '記事の URL',
      description: post.url ? (
        <TextLink href={post.url} target="_blank">
          {post.url}
        </TextLink>
      ) : (
        ''
      ),
    },
    { term: 'メモ', description: post.note ?? '' },
  ]

  return (
    <Stack gap={1.5}>
      <UpwardLink href={href('/')} indent={false} onClick={handleBack}>
        投稿計画
      </UpwardLink>
      <DataState what="投稿">
        <Stack gap={2}>
          <Stack>
            <Cluster align="center" gap={0.75}>
              <PageHeading>{post.title}</PageHeading>
              <PostStatusLabel status={post.status} />
            </Cluster>
            <PostActions post={post} />
            {post.status === 'cancelled' && (
              <ResponseMessage>
                この投稿は取りやめになっています。再開する場合は、編集してステータスを変えてください。
              </ResponseMessage>
            )}
          </Stack>
          <Section>
            <Stack>
              <Heading>投稿の情報</Heading>
              <Panel padding={1.5}>
                <DefinitionList>
                  {items.map((item) => (
                    <DefinitionListItem key={item.term} term={item.term} fullWidth>
                      {item.description}
                    </DefinitionListItem>
                  ))}
                </DefinitionList>
              </Panel>
            </Stack>
          </Section>
        </Stack>
      </DataState>
    </Stack>
  )
}

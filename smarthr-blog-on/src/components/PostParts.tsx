import { Cluster, ResponseMessage, Stack, StatusLabel, Text } from 'smarthr-ui'

import {
  NEAR_DAYS,
  type Post,
  STATUS_LABEL,
  type Status,
  authorNames,
  daysUntil,
  formatDate,
  overdueDays,
  planDate,
} from '../domain'
import { AppLink, useRouter } from '../router'

import type { FC } from 'react'

// ステータスの色。警告・エラーの色は特別な状態のために残す（StatusLabel のチェックリスト）。
const STATUS_TYPE: Record<Status, { type: 'grey' | 'blue' | 'green'; bold?: boolean }> = {
  idea: { type: 'grey' },
  writing: { type: 'blue' },
  review: { type: 'blue', bold: true },
  published: { type: 'green' },
  cancelled: { type: 'grey' },
}

export const PostStatusLabel: FC<{ status: Status }> = ({ status }) => (
  <StatusLabel type={STATUS_TYPE[status].type} bold={STATUS_TYPE[status].bold}>
    {STATUS_LABEL[status]}
  </StatusLabel>
)

/** 予定日についての注意。遅れは警告、近い予定は文字だけ。StatusLabel を 2 つ付けないための表示 */
export const DueNote: FC<{ post: Post }> = ({ post }) => {
  const overdue = overdueDays(post)
  if (overdue > 0) {
    return <ResponseMessage status="warning">公開予定日を{overdue}日過ぎています</ResponseMessage>
  }
  const days = daysUntil(post)
  if (days === null || days >= NEAR_DAYS) return null
  return (
    <Text size="S" color="TEXT_BLACK">
      {days === 0 ? '今日が公開予定日です' : `公開予定日まであと${days}日`}
    </Text>
  )
}

/** 投稿 1 件の行（週ごとの計画・自分の担当で共通） */
export const PostRow: FC<{ post: Post; showDate?: 'plan' | 'none' }> = ({ post, showDate = 'plan' }) => {
  const { href } = useRouter()
  const date = planDate(post)
  return (
    <Cluster gap={{ row: 0.25, column: 1 }} align="center" justify="space-between">
      <Cluster gap={{ row: 0.25, column: 0.75 }} align="center">
        {showDate === 'plan' && (
          <Text size="S" color="TEXT_GREY" whiteSpace="nowrap">
            {date ? formatDate(date) : '日付未定'}
            {post.status === 'published' ? ' 公開' : ''}
          </Text>
        )}
        <PostStatusLabel status={post.status} />
        <Text weight={post.status === 'cancelled' ? 'normal' : 'bold'}>
          <AppLink href={href(`/posts/${post.id}`)}>{post.title}</AppLink>
        </Text>
      </Cluster>
      <Cluster gap={{ row: 0.25, column: 0.75 }} align="center">
        <DueNote post={post} />
        <Text size="S" color="TEXT_GREY">
          {authorNames(post)}・{post.category}
        </Text>
      </Cluster>
    </Cluster>
  )
}

export const PostList: FC<{ posts: Post[] }> = ({ posts }) => (
  <Stack as="ul" gap={0.5} className="shr-m-0 shr-list-none shr-p-0">
    {posts.map((p) => (
      <li key={p.id}>
        <PostRow post={p} />
      </li>
    ))}
  </Stack>
)

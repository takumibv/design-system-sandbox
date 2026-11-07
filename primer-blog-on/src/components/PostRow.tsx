import {Label, Link, Stack, Text} from '@primer/react'
import {Link as RouterLink} from 'react-router-dom'
import {diffDays, formatDate, isMine, isNear, overdueDays, TODAY, viewerId, type Post} from '../domain'
import {useStore} from '../store'
import classes from './PostList.module.css'
import {StatusLabel} from './StatusLabel'

/** 投稿予定 1 件の行：タイトル（詳細へのリンク）・状態・遅れ/担当の印・カテゴリ・書く人・日付 */
export function PostRow({post, showAuthors = true}: {post: Post; showAuthors?: boolean}) {
  const {viewer, memberName} = useStore()
  const late = overdueDays(post)
  const mine = isMine(post, viewerId(viewer))
  return (
    <li className={classes.Row}>
      <Stack gap="condensed">
        <Stack direction="horizontal" gap="condensed" align="center" wrap="wrap">
          <Link as={RouterLink} to={`/posts/${post.id}`} className={post.status === 'cancelled' ? classes.TitleMuted : classes.Title}>
            {post.title}
          </Link>
          <StatusLabel status={post.status} />
          {late > 0 ? <Label variant="danger">{late} 日遅れ</Label> : null}
          {mine ? <Label variant="primary">あなたの担当</Label> : null}
        </Stack>
        <Text as="p" size="small" className={classes.Meta}>
          {[post.category, showAuthors ? post.authorIds.map(memberName).join('、') : null, dateText(post)].filter(Boolean).join('　・　')}
        </Text>
      </Stack>
    </li>
  )
}

export function dateText(p: Post) {
  if (p.status === 'published') {
    const pub = p.publishedDate ?? p.plannedDate
    return pub ? `公開 ${formatDate(pub)}` : '公開済み（公開日未記録）'
  }
  if (!p.plannedDate) return '公開予定日 未定'
  if (p.status === 'cancelled') return `予定だった日 ${formatDate(p.plannedDate)}`
  const late = overdueDays(p)
  if (late > 0) return `予定 ${formatDate(p.plannedDate)}（${late} 日過ぎています）`
  const left = diffDays(p.plannedDate, TODAY)
  if (left === 0) return `予定 ${formatDate(p.plannedDate)}（今日）`
  return `予定 ${formatDate(p.plannedDate)}${isNear(p) ? `（あと ${left} 日）` : ''}`
}

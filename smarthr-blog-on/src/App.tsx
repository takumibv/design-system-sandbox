import { type FC, useCallback, useEffect } from 'react'
import { NotFoundErrorScreen } from 'smarthr-ui'

import { AppLayout } from './components/AppLayout'
import { DeleteDialog, PostFormDialog, PublishDialog } from './components/PostDialogs'
import { MembersPage } from './pages/MembersPage'
import { MinePage } from './pages/MinePage'
import { PlanPage } from './pages/PlanPage'
import { PostPage } from './pages/PostPage'
import { useRouter } from './router'
import { useStore } from './store'

/** URL の ?dialog= に応じたダイアログ。権限の無い操作は開かずに、失敗として伝える */
const Dialogs: FC<{ postId: number | null }> = ({ postId }) => {
  const { params, setParams } = useRouter()
  const { posts, canAdd, canEdit, canDelete } = useStore()
  const dialog = params.get('dialog')
  const post = postId === null ? null : (posts.find((p) => p.id === postId) ?? null)
  const handleClose = useCallback(() => setParams({ dialog: null, result: null }), [setParams])

  const allowed =
    dialog === 'add' ? canAdd : dialog === 'edit' || dialog === 'publish' ? !!post && canEdit(post) : dialog === 'delete' ? canDelete : true

  useEffect(() => {
    if (dialog && !allowed) setParams({ dialog: null, result: 'forbidden' })
  }, [allowed, dialog, setParams])

  if (!dialog || !allowed) return null
  // key で開くたびに入力内容を初期化する
  if (dialog === 'add') return <PostFormDialog key="add" post={null} isOpen onClose={handleClose} />
  if (!post) return null
  if (dialog === 'edit') return <PostFormDialog key={`edit-${post.id}`} post={post} isOpen onClose={handleClose} />
  if (dialog === 'publish') return <PublishDialog key={`publish-${post.id}`} post={post} isOpen onClose={handleClose} />
  if (dialog === 'delete') return <DeleteDialog key={`delete-${post.id}`} post={post} isOpen onClose={handleClose} />
  return null
}

export const App: FC = () => {
  const { pathname, href } = useRouter()
  const { posts } = useStore()

  const postMatch = pathname.match(/^\/posts\/(\d+)$/)
  const postId = postMatch ? Number(postMatch[1]) : null
  const post = postId === null ? undefined : posts.find((p) => p.id === postId)

  const page =
    pathname === '/' ? (
      <PlanPage />
    ) : pathname === '/mine' ? (
      <MinePage />
    ) : pathname === '/members' ? (
      <MembersPage />
    ) : post ? (
      <PostPage post={post} />
    ) : null

  // 存在しないページ・投稿
  if (!page) return <NotFoundErrorScreen homeUrl={href('/')} />

  return (
    <AppLayout>
      {page}
      <Dialogs postId={postId} />
    </AppLayout>
  )
}

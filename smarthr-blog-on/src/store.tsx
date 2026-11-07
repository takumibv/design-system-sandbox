// 画面内の状態：投稿の一覧と、誰として見ているか。保存は実装しない（ブリーフの指示）。
import { type FC, type ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { INITIAL_POSTS, MEMBERS, type Member, type Post } from './domain'
import { useRouter } from './router'

export type ViewerKind = 'guest' | 'member' | 'editor'

type StoreValue = {
  posts: Post[]
  /** ?state= で強制した表示状態 */
  dataState: 'ready' | 'loading' | 'error' | 'empty'
  viewerKind: ViewerKind
  viewer: Member | null
  canAdd: boolean
  canEdit: (post: Post) => boolean
  canDelete: boolean
  savePost: (post: Omit<Post, 'id'> & { id?: number }) => Post
  deletePost: (id: number) => void
}

const StoreContext = createContext<StoreValue | null>(null)

const VIEWER_ID: Record<ViewerKind, number | null> = { guest: null, member: 1, editor: 2 }

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { params } = useRouter()
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)

  const asParam = params.get('as')
  const viewerKind: ViewerKind = asParam === 'guest' || asParam === 'editor' ? asParam : 'member'
  const viewer = MEMBERS.find((m) => m.id === VIEWER_ID[viewerKind]) ?? null

  const stateParam = params.get('state')
  const dataState: StoreValue['dataState'] =
    stateParam === 'loading' || stateParam === 'error' || stateParam === 'empty' ? stateParam : 'ready'

  const savePost = useCallback<StoreValue['savePost']>(
    (input) => {
      const { id } = input
      if (id !== undefined) {
        const saved: Post = { ...input, id }
        setPosts(posts.map((p) => (p.id === id ? saved : p)))
        return saved
      }
      const saved: Post = { ...input, id: Math.max(0, ...posts.map((p) => p.id)) + 1 }
      setPosts([...posts, saved])
      return saved
    },
    [posts],
  )

  const deletePost = useCallback((id: number) => {
    setPosts((current) => current.filter((p) => p.id !== id))
  }, [])

  const value = useMemo<StoreValue>(() => {
    const isEditor = viewer?.role === 'editor'
    return {
      posts: dataState === 'empty' ? [] : posts,
      dataState,
      viewerKind,
      viewer,
      canAdd: !!viewer,
      canEdit: (post) => !!viewer && (isEditor || post.authorIds.includes(viewer.id)),
      canDelete: isEditor,
      savePost,
      deletePost,
    }
  }, [posts, dataState, viewerKind, viewer, savePost, deletePost])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const value = useContext(StoreContext)
  if (!value) throw new Error('StoreProviderがありません')
  return value
}

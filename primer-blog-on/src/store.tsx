// 画面内だけで持つデータ（保存は実装しない：ブリーフ「データの保存は実装しなくてよい」）。
// デモ用に URL の ?as=guest|member|editor で「誰として見るか」を切り替えられる。
import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from 'react'
import {members, posts as initialPosts} from '../../brief/fixtures'
import type {Member, Post, Viewer} from './domain'

const SELF_ID = 1 // ログイン中の自分（一般メンバー）
const EDITOR_ID = 2 // 編集担当

const memberById = (id: number) => members.find(m => m.id === id) as Member

export const viewerFromParam = (as: string | null): Viewer =>
  as === 'guest' ? {kind: 'guest'} : as === 'editor' ? {kind: 'member', member: memberById(EDITOR_ID)} : {kind: 'member', member: memberById(SELF_ID)}

type Store = {
  members: Member[]
  posts: Post[]
  viewer: Viewer
  setViewer: (v: Viewer) => void
  login: () => void
  logout: () => void
  createPost: (p: Omit<Post, 'id'>) => Post
  updatePost: (p: Post) => void
  deletePost: (id: number) => void
  memberName: (id: number) => string
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({children, initialViewer}: {children: ReactNode; initialViewer: Viewer}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [viewer, setViewer] = useState<Viewer>(initialViewer)

  const createPost = useCallback((p: Omit<Post, 'id'>) => {
    const created = {...p, id: Math.max(0, ...posts.map(x => x.id)) + 1}
    setPosts(prev => [...prev, created])
    return created
  }, [posts])
  const updatePost = useCallback((p: Post) => setPosts(prev => prev.map(x => (x.id === p.id ? p : x))), [])
  const deletePost = useCallback((id: number) => setPosts(prev => prev.filter(x => x.id !== id)), [])

  const value = useMemo<Store>(
    () => ({
      members,
      posts,
      viewer,
      setViewer,
      login: () => setViewer({kind: 'member', member: memberById(SELF_ID)}),
      logout: () => setViewer({kind: 'guest'}),
      createPost,
      updatePost,
      deletePost,
      memberName: (id: number) => memberById(id)?.name ?? `不明なメンバー（${id}）`,
    }),
    [posts, viewer, createPost, updatePost, deletePost],
  )
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const s = useContext(StoreContext)
  if (!s) throw new Error('StoreProvider がありません')
  return s
}

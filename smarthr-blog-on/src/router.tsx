// 依存を増やさないための最小のクライアントルーター。
// 画面内の状態（追加・編集した投稿）を画面遷移で失わないよう、ページを読み込み直さずに切り替える。
import {
  type FC,
  type MouseEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { TextLink } from 'smarthr-ui'

type Location = { pathname: string; params: URLSearchParams }

const read = (): Location => ({
  pathname: window.location.pathname,
  params: new URLSearchParams(window.location.search),
})

type RouterValue = Location & {
  navigate: (to: string, options?: { replace?: boolean }) => void
  /** 現在の閲覧者（as）を引き継いだ URL を作る */
  href: (path: string, params?: Record<string, string | null | undefined>) => string
  /** 現在の URL のクエリを書き換える */
  setParams: (patch: Record<string, string | null | undefined>, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterValue | null>(null)

const KEEP_PARAMS = ['as']

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState(read)

  useEffect(() => {
    const handlePopState = () => setLocation(read())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback<RouterValue['navigate']>((to, options) => {
    if (options?.replace) window.history.replaceState(null, '', to)
    else window.history.pushState(null, '', to)
    setLocation(read())
    if (!options?.replace) window.scrollTo(0, 0)
  }, [])

  const href = useCallback<RouterValue['href']>(
    (path, params = {}) => {
      const next = new URLSearchParams()
      KEEP_PARAMS.forEach((key) => {
        const value = location.params.get(key)
        if (value) next.set(key, value)
      })
      Object.entries(params).forEach(([key, value]) => {
        if (value) next.set(key, value)
        else next.delete(key)
      })
      const query = next.toString()
      return query ? `${path}?${query}` : path
    },
    [location.params],
  )

  const setParams = useCallback<RouterValue['setParams']>(
    (patch, options) => {
      const next = new URLSearchParams(location.params)
      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, value)
        else next.delete(key)
      })
      const query = next.toString()
      navigate(query ? `${location.pathname}?${query}` : location.pathname, { replace: options?.replace ?? true })
    },
    [location, navigate],
  )

  const value = useMemo(() => ({ ...location, navigate, href, setParams }), [location, navigate, href, setParams])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export const useRouter = () => {
  const value = useContext(RouterContext)
  if (!value) throw new Error('RouterProvider がありません')
  return value
}

/** 画面内で遷移するテキストリンク */
export const AppLink: FC<{ href: string; children: ReactNode }> = ({ href: to, children }) => {
  const { navigate } = useRouter()
  const handleClick = useCallback(
    (e: MouseEvent<Element>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      navigate(to)
    },
    [navigate, to],
  )
  return (
    <TextLink href={to} onClick={handleClick}>
      {children}
    </TextLink>
  )
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DataMode } from './data/model'

/**
 * URL が状態の出発点。S01〜S18 を URL で直接開けるようにするため、
 * デモ用のパラメータ（user / data / unset / today / login / result / confirm / submitted）を読む。
 * 画面遷移では user・data・unset・today を引き継ぎ、一度きりの表示用パラメータは捨てる。
 */
const STICKY = ['user', 'data', 'unset', 'today'] as const

export type Location = { path: string; params: URLSearchParams }

export type Scenario = {
  /** ログイン中のメンバー id。未ログインは undefined */
  userId?: number
  data: DataMode
  unsetChannel: number[]
  today?: string
  loginFailed: boolean
  result?: 'saved' | 'save-failed' | 'delete-failed' | 'onboarded'
  confirmDelete?: number
  submitted: boolean
}

export function readScenario(params: URLSearchParams): Scenario {
  const user = params.get('user')
  const data = (params.get('data') ?? 'ok') as DataMode
  const result = params.get('result') as Scenario['result'] | null
  const confirm = params.get('confirm')
  return {
    // パラメータなしは id=1 でログイン中（ブリーフの「ログイン中の自分は id=1」）
    userId: user === 'guest' ? undefined : Number(user ?? 1),
    data: ['ok', 'loading', 'error', 'few', 'empty'].includes(data) ? data : 'ok',
    unsetChannel: (params.get('unset') ?? '')
      .split(',')
      .filter(Boolean)
      .map(Number),
    today: params.get('today') ?? undefined,
    loginFailed: params.get('login') === 'failed',
    result: result ?? undefined,
    confirmDelete: confirm ? Number(confirm) : undefined,
    submitted: params.get('submitted') === '1',
  }
}

type RouterValue = {
  location: Location
  /** 内部リンク。sticky なパラメータを引き継いだ href を返す */
  href: (path: string, extra?: Record<string, string | undefined>) => string
  navigate: (path: string, extra?: Record<string, string | undefined>) => void
}

const RouterContext = createContext<RouterValue | null>(null)

const current = (): Location => ({ path: window.location.pathname, params: new URLSearchParams(window.location.search) })

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(current)

  useEffect(() => {
    const onPop = () => setLocation(current())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const href = useCallback(
    (path: string, extra: Record<string, string | undefined> = {}) => {
      const next = new URLSearchParams()
      for (const key of STICKY) {
        const v = location.params.get(key)
        if (v) next.set(key, v)
      }
      for (const [k, v] of Object.entries(extra)) {
        if (v === undefined) next.delete(k)
        else next.set(k, v)
      }
      const qs = next.toString()
      return qs ? `${path}?${qs}` : path
    },
    [location],
  )

  const navigate = useCallback(
    (path: string, extra?: Record<string, string | undefined>) => {
      const url = href(path, extra)
      window.history.pushState(null, '', url)
      setLocation(current())
      window.scrollTo(0, 0)
    },
    [href],
  )

  const value = useMemo(() => ({ location, href, navigate }), [location, href, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('RouterProvider missing')
  return ctx
}

/** <a> のクリックを SPA 遷移に置き換える onClick を返す */
export function useLinkHandler() {
  const { navigate } = useRouter()
  return (path: string, extra?: Record<string, string | undefined>) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    navigate(path, extra)
  }
}

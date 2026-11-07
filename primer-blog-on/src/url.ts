// URL のクエリを状態として読み書きする小さな補助。状態はすべて URL に置く（patterns/view.md:121, patterns/filter.md:72）。
import {useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'

export function useQuery() {
  const [params, setParams] = useSearchParams()
  /** 指定したキーだけ書き換える（null で削除）。履歴は置き換え。 */
  const update = useCallback(
    (patch: Record<string, string | null>, opts: {push?: boolean} = {}) => {
      setParams(
        prev => {
          const next = new URLSearchParams(prev)
          for (const [k, v] of Object.entries(patch)) {
            if (v == null || v === '') next.delete(k)
            else next.set(k, v)
          }
          return next
        },
        {replace: !opts.push},
      )
    },
    [setParams],
  )
  return {params, get: (k: string) => params.get(k), update}
}

/** 画面の擬似状態（撮影・確認用）。?state=loading|error|empty */
export type DemoState = 'loading' | 'error' | 'empty' | null
export function useDemoState(): DemoState {
  const [params] = useSearchParams()
  const s = params.get('state')
  return s === 'loading' || s === 'error' || s === 'empty' ? s : null
}

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { buildScenario, type Member, type Scenario } from './data/model'

export type Notice = { type: 'info' | 'success' | 'error'; text: ReactNode; action?: 'retryLogin' } | null

type AppState = Scenario & {
  scenarioId: string | null
  me: Member | null
  notice: Notice
  setNotice: (n: Notice) => void
  login: () => void
  logout: () => void
  reload: () => void
  deleteMember: (id: number) => Promise<void>
  saveMe: (next: Pick<Member, 'name' | 'channel' | 'active'> & { code: string }) => Promise<void>
}

const Ctx = createContext<AppState | null>(null)

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const AppStateProvider = ({ scenarioId, children }: { scenarioId: string | null; children: ReactNode }) => {
  const [scenario, setScenario] = useState<Scenario>(() => buildScenario(scenarioId))
  const [notice, setNotice] = useState<Notice>(() =>
    scenario.loginError
      ? {
          type: 'error',
          text: 'Slack でのログインに失敗しました。通信状況を確認して、もう一度ログインしてください。',
          action: 'retryLogin',
        }
      : null,
  )

  const me = useMemo(
    () => (scenario.meId === null ? null : (scenario.members.find((m) => m.id === scenario.meId) ?? null)),
    [scenario.meId, scenario.members],
  )

  const login = useCallback(() => {
    // デモ：実際の Slack 認証は行わず、通知だけを出す。
    setNotice({
      type: 'info',
      text: 'デモのため Slack には接続しません。本番では Slack のログイン画面に移動します。',
    })
  }, [])

  const logout = useCallback(() => {
    setScenario((s) => ({ ...s, meId: null }))
    setNotice({ type: 'success', text: 'ログアウトしました。' })
  }, [])

  const reload = useCallback(() => {
    setScenario((s) => ({ ...s, load: 'loading' }))
    setTimeout(() => setScenario((s) => ({ ...s, load: 'ready' })), 1200)
  }, [])

  const deleteMember = useCallback(
    async (id: number) => {
      await wait(400)
      if (scenario.failDelete) throw new Error('delete failed')
      setScenario((s) => ({ ...s, members: s.members.filter((m) => m.id !== id) }))
    },
    [scenario.failDelete],
  )

  const saveMe = useCallback<AppState['saveMe']>(
    async (next) => {
      await wait(400)
      if (scenario.failSave) throw new Error('save failed')
      setScenario((s) => ({
        ...s,
        members: s.members.map((m) =>
          m.id === s.meId
            ? { ...m, name: next.name, channel: next.channel, active: next.active, incomplete: false }
            : m,
        ),
      }))
    },
    [scenario.failSave],
  )

  const value: AppState = {
    ...scenario,
    scenarioId,
    me,
    notice,
    setNotice,
    login,
    logout,
    reload,
    deleteMember,
    saveMe,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAppState = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('AppStateProvider is missing')
  return v
}

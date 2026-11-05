import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { buildDataset, findMember, type Member, type Week } from './data/model'
import { readScenario, useRouter, type Scenario } from './router'

type AppState = {
  scenario: Scenario
  members: Member[]
  weeks: Week[]
  /** 今週（基準日を含む週）以降の週。過去の週は出さない */
  visibleWeeks: Week[]
  me?: Member
  /** 初回設定が済んでいない（必須項目が未入力） */
  needsOnboarding: boolean
  login: () => void
  logout: () => void
  removeMember: (id: number) => Promise<void>
  saveMe: (values: Pick<Member, 'name' | 'channel' | 'active'> & { employeeNo: string }) => Promise<void>
}

const Ctx = createContext<AppState | null>(null)

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { location, navigate } = useRouter()
  const scenario = useMemo(() => readScenario(location.params), [location.params])
  const dataKey = `${scenario.data}|${scenario.unsetChannel.join(',')}`
  const [members, setMembers] = useState<Member[]>(() => buildDataset(scenario.data, scenario.unsetChannel).members)
  const [weeks, setWeeks] = useState<Week[]>(() => buildDataset(scenario.data, scenario.unsetChannel).weeks)

  // データの種類（URL）が変わったら作り直す
  useEffect(() => {
    const d = buildDataset(scenario.data, scenario.unsetChannel)
    setMembers(d.members)
    setWeeks(d.weeks)
  }, [dataKey])

  const start = scenario.today ? Math.max(0, weeks.findIndex((w) => w.iso === scenario.today)) : 0
  const visibleWeeks = weeks.slice(start)
  const me = findMember(members, scenario.userId)
  const needsOnboarding = Boolean(me && (me.incomplete || !me.channel))

  const value: AppState = {
    scenario,
    members,
    weeks,
    visibleWeeks,
    me,
    needsOnboarding,
    // デモ：Slack 認証は行わず、id=1 としてログインした扱いにする
    login: () => navigate(location.path, { user: '1', login: undefined, result: undefined }),
    logout: () => navigate('/', { user: 'guest', result: undefined }),
    removeMember: async (id) => {
      await wait(500)
      if (scenario.result === 'delete-failed') throw new Error('delete failed')
      setMembers((list) => list.filter((m) => m.id !== id))
    },
    saveMe: async (values) => {
      await wait(500)
      if (scenario.result === 'save-failed') throw new Error('save failed')
      setMembers((list) =>
        list.map((m) =>
          m.id === me?.id
            ? { ...m, name: values.name, channel: values.channel, active: values.active, incomplete: false }
            : m,
        ),
      )
    },
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAppState() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('AppStateProvider missing')
  return ctx
}

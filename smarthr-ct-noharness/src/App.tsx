import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  AppNavi,
  AppNaviAnchor,
  Button,
  Cluster,
  Container,
  DropdownMenuButton,
  FaCalendarDaysIcon,
  FaGearIcon,
  FaUsersIcon,
  Header,
  NotificationBar,
  Scroller,
  Stack,
  Text,
  useEnvironment,
} from 'smarthr-ui'
import type { Member } from './fixtures'
import { Avatar } from './Person'
import { buildScenario, readState, type Scenario } from './scenario'
import { SchedulePage } from './pages/SchedulePage'
import { MembersPage } from './pages/MembersPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export type Notice = { type: 'success' | 'error' | 'info' | 'warning'; text: ReactNode; action?: ReactNode }

type Route = 'schedule' | 'members' | 'settings' | 'setup' | 'notfound'

const routeOf = (path: string): Route => {
  if (path === '/' || path === '') return 'schedule'
  if (path === '/members') return 'members'
  if (path === '/settings') return 'settings'
  if (path === '/setup') return 'setup'
  return 'notfound'
}

const TITLES: Record<Route, string> = {
  schedule: '組み合わせ',
  members: 'メンバー',
  settings: '自分の設定',
  setup: '初回設定',
  notfound: 'ページが見つかりません',
}

export type AppApi = {
  scenario: Scenario
  me: Member | null
  setScenario: (updater: (s: Scenario) => Scenario) => void
  navigate: (path: string) => void
  notify: (n: Notice | null) => void
  login: () => void
}

export const App = () => {
  const [path, setPath] = useState(window.location.pathname)
  const [scenario, setScenarioState] = useState<Scenario>(() => buildScenario(readState(window.location.search)))
  const [notice, setNotice] = useState<Notice | null>(() => initialNotice(scenario.state))

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname)
      const s = buildScenario(readState(window.location.search))
      setScenarioState(s)
      setNotice(initialNotice(s.state))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const route = routeOf(path)
  const env = useEnvironment()

  // Header の logoHref には target を渡す口が無いため、ブリーフの「別タブで開く」を満たすよう DOM に後付けする。
  useEffect(() => {
    const a = document.querySelector<HTMLAnchorElement>('.smarthr-ui-Header-logoLink')
    if (a) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
  })
  useEffect(() => {
    document.title = `${TITLES[route]} | CTスケジュール`
  }, [route])

  const me = useMemo(
    () => (scenario.meId == null ? null : (scenario.members.find((m) => m.id === scenario.meId) ?? null)),
    [scenario],
  )

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, '', to)
    setPath(new URL(to, window.location.origin).pathname)
    setNotice(null)
    window.scrollTo(0, 0)
  }, [])

  const login = useCallback(() => {
    setScenarioState((s) => ({ ...s, meId: 1 }))
    setNotice({ type: 'success', text: '（デモ）Slack アカウントでログインしました。' })
  }, [])

  const logout = () => {
    setScenarioState((s) => ({ ...s, meId: null }))
    setNotice({ type: 'info', text: 'ログアウトしました。' })
    if (route === 'settings' || route === 'setup') navigate('/')
  }

  const api: AppApi = {
    scenario,
    me,
    setScenario: (u) => setScenarioState(u),
    navigate,
    notify: setNotice,
    login,
  }

  const link = (to: string) => ({
    href: to,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault()
      navigate(to)
    },
  })

  return (
    <Stack gap={0}>
      <Header
        logo={<img src="/gaji-labo-logo.svg" alt="Gaji-Labo（新しいタブで開きます）" width={108} height={20} />}
        logoHref="https://www.gaji.jp/"
      >
        {me ? (
          <DropdownMenuButton
            trigger={{
              text: (
                <Cluster gap={0.5} align="center" as="span">
                  <Avatar member={me} size="S" />
                  <span>{me.name}</span>
                  <Text size="S" color="TEXT_GREY">
                    でログイン中
                  </Text>
                </Cluster>
              ),
              size: 'S',
            }}
          >
            <Button onClick={() => navigate('/settings')}>自分の設定</Button>
            <Button onClick={logout}>ログアウト</Button>
          </DropdownMenuButton>
        ) : (
          <Button size="S" onClick={login}>
            Slack でログイン
          </Button>
        )}
      </Header>
      <Scroller direction="horizontal">
      <AppNavi label={env.mobile ? undefined : 'CTスケジュール'}>
        <AppNaviAnchor {...link('/')} icon={env.mobile ? undefined : FaCalendarDaysIcon} current={route === 'schedule'}>
          組み合わせ
        </AppNaviAnchor>
        <AppNaviAnchor {...link('/members')} icon={env.mobile ? undefined : FaUsersIcon} current={route === 'members'}>
          メンバー
        </AppNaviAnchor>
        {me && (
          <AppNaviAnchor {...link('/settings')} icon={env.mobile ? undefined : FaGearIcon} current={route === 'settings' || route === 'setup'}>
            自分の設定
          </AppNaviAnchor>
        )}
      </AppNavi>
      </Scroller>
      <Container padding={{ block: 1.5, inline: 1.5, narrowModeBlock: 1, narrowModeInline: 1 }}>
        <Stack gap={1.5}>
          {me?.incomplete && route !== 'setup' && (
            <NotificationBar
              type="warning"
              role="status"
              subActionArea={
                <Button size="S" onClick={() => navigate('/setup')}>
                  初回設定へ進む
                </Button>
              }
            >
              初回設定が済んでいません。社員番号と uチャンネルを設定すると組み合わせに入れます。
            </NotificationBar>
          )}
          {notice && (
            <NotificationBar
              type={notice.type}
              role={notice.type === 'error' ? 'alert' : 'status'}
              onClose={() => setNotice(null)}
              subActionArea={notice.action}
            >
              {notice.text}
            </NotificationBar>
          )}
          <main>
            {route === 'schedule' && <SchedulePage api={api} />}
            {route === 'members' && <MembersPage api={api} />}
            {(route === 'settings' || route === 'setup') && <SettingsPage api={api} setup={route === 'setup'} />}
            {route === 'notfound' && <NotFoundPage api={api} />}
          </main>
        </Stack>
      </Container>
    </Stack>
  )

  function initialNotice(state: Scenario['state']): Notice | null {
    switch (state) {
      case 'login-error':
        return {
          type: 'error',
          text: 'Slack でのログインに失敗しました。時間をおいて、もう一度ログインしてください。',
          action: (
            <Button size="S" onClick={() => login()}>
              もう一度ログイン
            </Button>
          ),
        }
      case 'saved':
        return { type: 'success', text: '設定を保存しました。' }
      case 'save-error':
        return {
          type: 'error',
          text: '設定を保存できませんでした。通信状態を確かめて、もう一度「保存」を押してください。入力した内容は残っています。',
        }
      default:
        return null
    }
  }
}

import { Banner } from '@primer/react'
import { useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { useRouter } from './router'
import { useAppState } from './state'
import { SchedulePage } from './pages/SchedulePage'
import { MembersPage } from './pages/MembersPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import styles from './App.module.css'

function PageNotices() {
  const { scenario, login } = useAppState()
  const [dismissed, setDismissed] = useState(false)
  if (scenario.loginFailed) {
    return (
      <div className={styles.Notices}>
      <Banner
        variant="critical"
        title="Slack でログインできませんでした"
        description="Slack 側で許可が取り消されたか、通信が途切れた可能性があります。もう一度ログインしてください。ログインしなくても、組み合わせとメンバーは見られます。"
        primaryAction={<Banner.PrimaryAction onClick={login}>もう一度ログインする</Banner.PrimaryAction>}
      />
      </div>
    )
  }
  if (scenario.result === 'onboarded' && !dismissed) {
    return (
      <div className={styles.Notices}>
      <Banner
        variant="success"
        title="設定が終わりました"
        description="今週以降の組み合わせに入りました。月曜 11:00 に Slack にも今週のペアが投稿されます。"
        onDismiss={() => setDismissed(true)}
      />
      </div>
    )
  }
  return null
}

export default function App() {
  const { location } = useRouter()
  const { needsOnboarding } = useAppState()
  const path = location.path

  let page
  // 初回ログインで必須項目が未入力の人には、どの画面でも初回設定を出す（ヘッダーとナビは残す）
  if (needsOnboarding && ['/', '/members', '/settings'].includes(path)) page = <SettingsPage onboarding />
  else if (path === '/') page = <SchedulePage />
  else if (path === '/members') page = <MembersPage />
  else if (path === '/settings') page = <SettingsPage onboarding={false} />
  else page = <NotFoundPage />

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.Main}>
        <PageNotices />
        {page}
      </main>
    </div>
  )
}

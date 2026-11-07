import {SignInIcon, SignOutIcon} from '@primer/octicons-react'
import {Button, Label, Stack, Text, VisuallyHidden} from '@primer/react'
import type {ReactNode} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import logoUrl from '../../../brief/gaji-labo-logo.svg'
import {isEditor} from '../domain'
import {useStore} from '../store'
import classes from './AppShell.module.css'

/** 全画面共通のアプリ見出し（ロゴ・アプリ名・ログイン状態）。Primer の Header は GitHub の黒い全体ナビなので使わない。 */
export function AppShell({children}: {children: ReactNode}) {
  const {viewer, login, logout} = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const withResult = (result: string) => {
    const p = new URLSearchParams(location.search)
    p.delete('as')
    p.set('result', result)
    navigate({pathname: location.pathname, search: p.toString()})
  }

  return (
    <div className={classes.Shell}>
      <header className={classes.AppHeader}>
        <Stack direction="horizontal" align="center" justify="space-between" gap="condensed" wrap="wrap">
          <Stack direction="horizontal" align="center" gap="normal">
            <a href="https://www.gaji.jp/" target="_blank" rel="noopener noreferrer" className={classes.LogoLink}>
              <img src={logoUrl} alt="Gaji-Labo" className={classes.Logo} />
              <VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>
            </a>
            <Text as="p" weight="semibold" size="large" className={classes.AppName}>
              社内ブログ投稿計画
            </Text>
          </Stack>
          {viewer.kind === 'guest' ? (
            <Button
              leadingVisual={SignInIcon}
              onClick={() => {
                login()
                withResult('loggedin')
              }}
            >
              Slack でログイン
            </Button>
          ) : (
            <Stack direction="horizontal" align="center" gap="condensed">
              <Text size="medium">{viewer.member.name}</Text>
              {isEditor(viewer) ? <Label variant="accent">編集担当</Label> : null}
              <Button
                variant="invisible"
                leadingVisual={SignOutIcon}
                onClick={() => {
                  logout()
                  withResult('loggedout')
                }}
              >
                ログアウト
              </Button>
            </Stack>
          )}
        </Stack>
      </header>
      {children}
    </div>
  )
}

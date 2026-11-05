import { ActionList, ActionMenu, Button, Link, Stack, UnderlineNav, VisuallyHidden } from '@primer/react'
import { GearIcon, PeopleIcon, SignInIcon, SignOutIcon, CalendarIcon } from '@primer/octicons-react'
import { useLinkHandler, useRouter } from '../router'
import { useAppState } from '../state'
import { PersonAvatar } from './PersonAvatar'
import styles from './AppHeader.module.css'

export function AppHeader() {
  const { location, href } = useRouter()
  const link = useLinkHandler()
  const { me, login, logout, members, scenario } = useAppState()
  const { navigate } = useRouter()
  const path = location.path

  return (
    <>
      <header className={styles.header}>
        <Stack direction="horizontal" align="center" justify="space-between" gap="condensed" wrap="nowrap">
          <Stack direction="horizontal" align="center" gap="condensed" wrap="nowrap">
            <a
              className={styles.logoLink}
              href="https://www.gaji.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={styles.logo} src="/gaji-labo-logo.svg" alt="Gaji-Labo（新しいタブで開く）" />
            </a>
            <Link href={href('/')} onClick={link('/')} className={styles.appName} muted>
              CTスケジュール
            </Link>
          </Stack>
          {me ? (
            <ActionMenu>
              <ActionMenu.Button
                variant="invisible"
                leadingVisual={() => <PersonAvatar member={me} size={20} />}
              >
                <VisuallyHidden>ログイン中：</VisuallyHidden>
                <span className={styles.userName}>{me.name}</span>
              </ActionMenu.Button>
              <ActionMenu.Overlay align="end">
                <ActionList>
                  <ActionList.Group>
                    <ActionList.GroupHeading>{me.name} としてログイン中</ActionList.GroupHeading>
                    <ActionList.Item onSelect={() => navigate('/settings')}>
                      <ActionList.LeadingVisual>
                        <GearIcon />
                      </ActionList.LeadingVisual>
                      自分の設定
                    </ActionList.Item>
                  </ActionList.Group>
                  <ActionList.Divider />
                  <ActionList.Item onSelect={logout}>
                    <ActionList.LeadingVisual>
                      <SignOutIcon />
                    </ActionList.LeadingVisual>
                    ログアウト
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          ) : (
            <Button leadingVisual={SignInIcon} onClick={login} size="small">
              Slack でログイン
            </Button>
          )}
        </Stack>
      </header>
      <UnderlineNav aria-label="メインメニュー">
        <UnderlineNav.Item
          href={href('/')}
          onClick={link('/')}
          aria-current={path === '/' ? 'page' : undefined}
          leadingVisual={<CalendarIcon />}
        >
          組み合わせ
        </UnderlineNav.Item>
        <UnderlineNav.Item
          href={href('/members')}
          onClick={link('/members')}
          aria-current={path === '/members' ? 'page' : undefined}
          leadingVisual={<PeopleIcon />}
          counter={scenario.data === 'loading' || scenario.data === 'error' ? undefined : members.length}
        >
          メンバー
        </UnderlineNav.Item>
        {me ? (
          <UnderlineNav.Item
            href={href('/settings')}
            onClick={link('/settings')}
            aria-current={path === '/settings' ? 'page' : undefined}
            leadingVisual={<GearIcon />}
          >
            自分の設定
          </UnderlineNav.Item>
        ) : null}
      </UnderlineNav>
    </>
  )
}

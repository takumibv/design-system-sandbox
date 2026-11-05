import { type ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AppNavi,
  AppNaviCustomTag,
  Button,
  Cluster,
  FaGearIcon,
  FaRightFromBracketIcon,
  FaRightToBracketIcon,
  Header,
  HeaderDropdownMenuButton,
  NotificationBar,
  Text,
  useEnvironment,
} from 'smarthr-ui'

import { useAppState } from '../state'

import { GajiLaboLogo } from './GajiLaboLogo'
import { Avatar } from './Person'
import { NaviLink } from './RouterTextLink'

const LOGO_LINK_SELECTOR = '.smarthr-ui-Header-logoLink'

export const Layout = ({ title, children }: { title: string; children: ReactNode }) => {
  const { me, login, logout, notice, setNotice } = useAppState()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { mobile } = useEnvironment()

  useEffect(() => {
    // ページタイトル：「画面名｜サービス名」[D:ui-text/app-writing]
    document.title = `${title}｜CTスケジュール`
  }, [title])

  useEffect(() => {
    // Headerのロゴリンクはtargetを指定できないため、別タブで開くよう属性を補う（妥協点として記録）。
    document.querySelectorAll<HTMLAnchorElement>(LOGO_LINK_SELECTOR).forEach((a) => {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
  })

  return (
    <div className="shr-min-h-screen shr-bg-background">
      <Header logo={<GajiLaboLogo />} logoHref="https://www.gaji.jp/">
        {me ? (
          <HeaderDropdownMenuButton
            trigger={
              <Cluster inline align="center" as="span">
                <Avatar member={me} />
                {/* Header背景（BRAND #00c4cc）上の白文字は2.14:1でAA未達のため、TEXT_BLACKを指定する（トリガーの既定は白） */}
                <Text color="TEXT_BLACK">{me.name}</Text>
              </Cluster>
            }
          >
            <Button prefix={<FaGearIcon />} onClick={() => navigate(`/settings${search}`)}>
              自分の設定を変更
            </Button>
            <Button prefix={<FaRightFromBracketIcon />} onClick={logout}>
              ログアウト
            </Button>
          </HeaderDropdownMenuButton>
        ) : (
          <Button size="S" prefix={<FaRightToBracketIcon />} onClick={login}>
            Slackでログイン
          </Button>
        )}
      </Header>
      {/* モバイルではラベルを省き、3つのナビゲーションを横幅に収める */}
      <AppNavi label={mobile ? undefined : 'CTスケジュール'}>
        <AppNaviCustomTag tag={NaviLink} href="/" current={pathname === '/'}>
          組み合わせ
        </AppNaviCustomTag>
        <AppNaviCustomTag tag={NaviLink} href="/members" current={pathname === '/members'}>
          メンバー
        </AppNaviCustomTag>
        {me && (
          <AppNaviCustomTag tag={NaviLink} href="/settings" current={pathname === '/settings'}>
            自分の設定
          </AppNaviCustomTag>
        )}
      </AppNavi>
      {notice && (
        <NotificationBar
          type={notice.type}
          bold
          animate
          onClose={() => setNotice(null)}
          className="shr-sticky shr-top-0 shr-z-1"
          subActionArea={
            notice.action === 'retryLogin' ? (
              <Button size="S" prefix={<FaRightToBracketIcon />} onClick={login}>
                もう一度ログインする
              </Button>
            ) : undefined
          }
        >
          {notice.text}
        </NotificationBar>
      )}
      {children}
    </div>
  )
}

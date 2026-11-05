import { useEffect, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppNavi,
  AppNaviCustomTag,
  Button,
  Cluster,
  FaRightFromBracketIcon,
  FaRightToBracketIcon,
  FaGearIcon,
  Header,
  HeaderDropdownMenuButton,
  NotificationBar,
  Text,
  useEnvironment,
} from 'smarthr-ui'

import { useAppState } from '../state'

import { GajiLaboLogo } from './GajiLaboLogo'
import { Avatar } from './Person'

/** AppNaviCustomTag に渡す react-router の Link（?state= を引き継ぐ） */
const NaviLink = ({ to, ...rest }: { to: string; children?: ReactNode }) => {
  const { search } = useLocation()
  return <Link to={`${to}${search}`} {...rest} />
}

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
    // Header のロゴリンクは target を指定できないため、別タブで開くよう属性を補う（妥協点として記録）。
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
              <Cluster inline gap={0.5} align="center" as="span">
                <Avatar member={me} />
                <Text color="TEXT_WHITE">{me.name}</Text>
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
            Slack でログイン
          </Button>
        )}
      </Header>
      {/* モバイルではラベルを省き、3 つのナビゲーションを横幅に収める */}
      <AppNavi label={mobile ? undefined : 'CTスケジュール'}>
        <AppNaviCustomTag tag={NaviLink} to="/" current={pathname === '/'}>
          組み合わせ
        </AppNaviCustomTag>
        <AppNaviCustomTag tag={NaviLink} to="/members" current={pathname === '/members'}>
          メンバー
        </AppNaviCustomTag>
        {me && (
          <AppNaviCustomTag tag={NaviLink} to="/settings" current={pathname === '/settings'}>
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

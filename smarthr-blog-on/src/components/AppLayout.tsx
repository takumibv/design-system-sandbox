import { type FC, type MouseEvent, type ReactNode, forwardRef, useCallback, useEffect, useMemo } from 'react'
import { AppHeader, Button, Container, NotificationBar, VisuallyHiddenText } from 'smarthr-ui'

import logoSvg from '../../../brief/gaji-labo-logo.svg?raw'
import { useRouter } from '../router'
import { useStore } from '../store'


// ロゴの SVG はブリーフの素材をそのまま使う。fill="currentColor" なのでヘッダーの文字色（白）で描かれる。
const logoMarkup = logoSvg.replace(/<metadata>[\s\S]*?<\/metadata>/, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" height="20" ')

const GajiLaboLogo: FC = () => (
  <span className="shr-flex shr-items-center shr-px-0.75 shr-py-0.5 shr-text-white">
    { }
    <span dangerouslySetInnerHTML={{ __html: logoMarkup }} className="shr-flex" />
    <VisuallyHiddenText>Gaji-Labo のサイト（新しいタブで開きます）</VisuallyHiddenText>
  </span>
)

/** AppHeader のナビゲーション項目を、ページを読み込み直さずに切り替えるための要素 */
const NavAnchor = forwardRef<HTMLAnchorElement, { href: string; children: ReactNode; className?: string }>(
  ({ href, children, className, ...rest }, ref) => {
    const { navigate } = useRouter()
    const handleClick = useCallback(
      (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        navigate(href)
      },
      [href, navigate],
    )
    return (
      <a {...rest} ref={ref} href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    )
  },
)

const RESULT_MESSAGES: Record<string, { type: 'success' | 'error'; text: string }> = {
  login: {
    type: 'success',
    text: 'Slack でログインしました。自分が書く投稿の公開予定日の前日に、Slack で通知します（デモのため送信はしません）。',
  },
  added: { type: 'success', text: '投稿を追加しました。' },
  saved: { type: 'success', text: '投稿を保存しました。' },
  published: { type: 'success', text: '投稿を公開済みにしました。' },
  deleted: { type: 'success', text: '投稿を削除しました。' },
  forbidden: {
    type: 'error',
    text: 'この投稿を編集する権限がないため、操作できませんでした。書く人に入っている投稿か、編集担当だけが編集できます。',
  },
}

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname, params, href, navigate, setParams } = useRouter()
  const { viewer } = useStore()

  // ロゴは https://www.gaji.jp/ を別タブで開く（ブリーフ）。AppHeader のロゴリンクは target を受け取らないため、描画後に属性を足す。
  useEffect(() => {
    const anchor = document.querySelector<HTMLAnchorElement>('.smarthr-ui-Header-logoLink')
    if (anchor) {
      anchor.target = '_blank'
      anchor.rel = 'noopener noreferrer'
    }
  })

  const navigations = useMemo(() => {
    const items = [
      { children: '投稿計画', elementAs: NavAnchor, href: href('/'), current: pathname === '/' },
      ...(viewer ? [{ children: '自分の担当', elementAs: NavAnchor, href: href('/mine'), current: pathname === '/mine' }] : []),
      { children: '書く人', elementAs: NavAnchor, href: href('/members'), current: pathname === '/members' },
    ]
    return items
  }, [href, pathname, viewer])

  const handleLogin = useCallback(() => {
    const next = new URLSearchParams(params)
    next.set('as', 'member')
    next.set('result', 'login')
    next.delete('dialog')
    navigate(`${pathname}?${next.toString()}`)
  }, [navigate, params, pathname])

  const loginButton = viewer ? null : (
    <Button size="S" onClick={handleLogin}>
      Slack でログイン
    </Button>
  )

  const [lastName, firstName] = viewer ? viewer.name.split(' ') : []
  const result = params.get('result')
  const message = result ? RESULT_MESSAGES[result] : undefined

  const handleCloseMessage = useCallback(() => setParams({ result: null }), [setParams])

  return (
    <div className="shr-bg-background">
      <AppHeader
        appName="社内ブログ投稿計画"
        logo={<GajiLaboLogo />}
        logoHref="https://www.gaji.jp/"
        userInfo={viewer ? { lastName, firstName } : null}
        navigations={navigations}
        desktopAdditionalContent={loginButton}
        mobileAdditionalContent={loginButton}
      />
      {message && (
        <NotificationBar
          type={message.type}
          bold
          animate
          onClose={handleCloseMessage}
          role={message.type === 'error' ? 'alert' : 'status'}
          className="shr-sticky shr-top-0 shr-z-1"
        >
          {message.text}
        </NotificationBar>
      )}
      <Container padding={{ block: 2, inline: 1.5, narrowModeInline: 1 }}>{children}</Container>
    </div>
  )
}

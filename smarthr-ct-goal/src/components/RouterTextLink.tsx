import { useLocation, useNavigate } from 'react-router-dom'
import { TextLink } from 'smarthr-ui'

import type { MouseEvent, ReactNode } from 'react'

/**
 * 画面内遷移用のTextLink。hrefに実際のURL（?state= を引き継ぐ）を設定し、
 * クリック時はreact-routerで遷移する（smarthr/a11y-anchor-has-href-attributeに従う）。
 */
export const RouterTextLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const url = `${href}${search}`
  return (
    <TextLink
      href={url}
      onClick={(e: MouseEvent) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        navigate(url)
      }}
    >
      {children}
    </TextLink>
  )
}

/** AppNaviに渡すリンク。RouterTextLinkと同じくhrefを持たせる。 */
export const NaviLink = ({ href, children, ...rest }: { href: string; children?: ReactNode; className?: string }) => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const url = `${href}${search}`
  return (
    <a
      {...rest}
      href={url}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        navigate(url)
      }}
    >
      {children}
    </a>
  )
}

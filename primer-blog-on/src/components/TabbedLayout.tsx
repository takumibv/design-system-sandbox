import {PlusIcon} from '@primer/octicons-react'
import {Button, PageHeader, PageLayout, UnderlineNav} from '@primer/react'
import {Link as RouterLink, Outlet, useLocation} from 'react-router-dom'
import {canCreate, isMine, isOpen, viewerId} from '../domain'
import {useStore} from '../store'
import {ResultBanner} from './ResultBanner'

const TABS = [
  {to: '/', label: '計画'},
  {to: '/mine', label: '自分の担当'},
  {to: '/authors', label: '書く人ごと'},
]

/** 3 つのタブ（同じ投稿予定の集まりを、週・自分・人の切り口で見る）。タブで URL が変わるので UnderlineNav（patterns/navigation.md:95）。 */
export function TabbedLayout() {
  const {viewer, posts} = useStore()
  const {pathname, search} = useLocation()
  const myOpen = posts.filter(p => isOpen(p) && isMine(p, viewerId(viewer))).length
  // 期間（from / weeks）はタブ間で引き継ぐ
  const q = new URLSearchParams(search)
  const keep = new URLSearchParams()
  for (const k of ['from', 'weeks']) if (q.get(k)) keep.set(k, q.get(k)!)
  const keepStr = keep.toString() ? `?${keep}` : ''

  return (
    <PageLayout containerWidth="xlarge" padding="normal" rowGap="condensed">
      <PageLayout.Header>
        <PageHeader role="banner" aria-label="投稿予定">
          <PageHeader.TitleArea>
            <PageHeader.Title as="h1">投稿予定</PageHeader.Title>
          </PageHeader.TitleArea>
          {canCreate(viewer) ? (
            <PageHeader.Actions>
              <Button as={RouterLink} to="/posts/new" variant="primary" leadingVisual={PlusIcon}>
                投稿予定を登録
              </Button>
            </PageHeader.Actions>
          ) : null}
          <PageHeader.Navigation>
            <UnderlineNav aria-label="表示の切り替え">
              {TABS.map(t => (
                <UnderlineNav.Item
                  key={t.to}
                  as={RouterLink}
                  to={`${t.to}${t.to === '/mine' ? '' : keepStr}`}
                  aria-current={pathname === t.to ? 'page' : undefined}
                  counter={t.to === '/mine' && viewer.kind === 'member' ? myOpen : undefined}
                >
                  {t.label}
                </UnderlineNav.Item>
              ))}
            </UnderlineNav>
          </PageHeader.Navigation>
        </PageHeader>
      </PageLayout.Header>
      <PageLayout.Content as="main" aria-label="本文">
        <ResultBanner />
        <Outlet />
      </PageLayout.Content>
    </PageLayout>
  )
}

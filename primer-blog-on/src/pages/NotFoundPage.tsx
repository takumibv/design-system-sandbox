import {PageLayout} from '@primer/react'
import {Blankslate} from '@primer/react/experimental'
import {SearchIcon} from '@primer/octicons-react'
import {useNavigate} from 'react-router-dom'

/** V7 存在しないページ */
export function NotFoundPage({what = 'ページ'}: {what?: string}) {
  const navigate = useNavigate()
  return (
    <PageLayout containerWidth="medium" padding="normal">
      <PageLayout.Content as="main" aria-label="本文">
        <Blankslate border spacious>
          <Blankslate.Visual>
            <SearchIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading as="h1">{what}が見つかりません</Blankslate.Heading>
          <Blankslate.Description>
            URL が間違っているか、{what === 'ページ' ? 'ページが移動した' : '削除された'}可能性があります。計画の一覧から探してください。
          </Blankslate.Description>
          <Blankslate.PrimaryAction onClick={() => navigate('/')}>計画を見る</Blankslate.PrimaryAction>
        </Blankslate>
      </PageLayout.Content>
    </PageLayout>
  )
}

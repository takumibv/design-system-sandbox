import { useEffect } from 'react'
import { ErrorScreen, Stack, Text } from 'smarthr-ui'

import { GajiLaboLogo } from '../components/GajiLaboLogo'

/**
 * 存在しないページ。NotFoundErrorScreen はロゴが SmartHR 固定のため、logo を渡せる ErrorScreen で組み立てる。
 */
export const NotFound = () => {
  useEffect(() => {
    document.title = 'ページが見つかりません｜CTスケジュール'
  }, [])
  return (
    <ErrorScreen
      logo={<GajiLaboLogo tone="black" />}
      title="お探しのページは見つかりませんでした"
      links={[{ label: '組み合わせに戻る', url: '/' }]}
    >
      <Stack gap={0.5} align="center">
        <Text as="p">URL が間違っているか、ページが移動または削除された可能性があります。</Text>
        <Text as="p">組み合わせの画面から目的のページを開き直してください。</Text>
      </Stack>
    </ErrorScreen>
  )
}

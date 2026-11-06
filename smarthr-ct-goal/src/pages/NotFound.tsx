import { useEffect } from 'react'
import { ErrorScreen, Stack } from 'smarthr-ui'

import { GajiLaboLogo } from '../components/GajiLaboLogo'

/**
 * 存在しないページ。NotFoundErrorScreenはロゴがSmartHR固定のため、logoを渡せるErrorScreenで組み立てる。
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
        <p>URLが間違っているか、ページが移動または削除された可能性があります。</p>
        <p>組み合わせの画面から目的のページを開き直してください。</p>
      </Stack>
    </ErrorScreen>
  )
}

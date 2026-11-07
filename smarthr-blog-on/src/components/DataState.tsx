import { type FC, type ReactNode, useCallback } from 'react'
import { Button, Center, Loader, NotificationBar } from 'smarthr-ui'

import { useRouter } from '../router'
import { useStore } from '../store'

/**
 * 読み込み中・読み込みの失敗を、読み込む領域の中で表す（フィードバックのパターン）。
 * 準備ができていれば children を表示する。
 */
export const DataState: FC<{ what: string; children: ReactNode }> = ({ what, children }) => {
  const { dataState } = useStore()
  const { setParams } = useRouter()
  const handleReload = useCallback(() => setParams({ state: null }), [setParams])

  if (dataState === 'loading') {
    return (
      <Center padding={4}>
        <Loader text={`${what}を読み込んでいます…`} />
      </Center>
    )
  }
  if (dataState === 'error') {
    return (
      <NotificationBar
        type="error"
        bold
        paneled
        role="alert"
        subActionArea={
          <Button size="S" onClick={handleReload}>
            再読み込み
          </Button>
        }
      >
        {what}を読み込めませんでした。通信状況を確認して、再読み込みしてください。
      </NotificationBar>
    )
  }
  return children
}

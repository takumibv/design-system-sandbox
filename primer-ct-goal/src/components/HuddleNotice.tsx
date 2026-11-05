import { Banner } from '@primer/react'

/** デモ用：ハドル開始の代わりに出す通知（ブリーフ「デモでは通知を出すだけでよい」） */
export function HuddleNotice({ channel, onDismiss }: { channel: string; onDismiss: () => void }) {
  return (
    <Banner
      variant="info"
      layout="compact"
      title="デモのため Slack は開きません"
      description={`本番では Slack の #${channel} が開き、ハドルが始まります。`}
      onDismiss={onDismiss}
    />
  )
}

import {Banner} from '@primer/react'
import {useQuery} from '../url'

// 操作の結果（ページ移動を伴うもの）を移動先の上部に Banner で伝える（patterns/saving.md:240）。
// トーストは使わない（patterns/saving.md:242）。Banner は aria-live 領域の中に出して読み上げる。
const MESSAGES: Record<string, {variant: 'success' | 'info'; title: string; description?: (q: URLSearchParams) => string}> = {
  created: {variant: 'success', title: '投稿予定を登録しました'},
  saved: {variant: 'success', title: '変更を保存しました'},
  published: {variant: 'success', title: '公開を記録しました', description: () => '状態を「公開済み」にし、公開日と記事 URL を記録しました。'},
  status: {variant: 'success', title: '状態を変更しました'},
  deleted: {
    variant: 'success',
    title: '投稿予定を削除しました',
    description: q => (q.get('title') ? `「${q.get('title')}」を削除しました。` : '投稿予定を削除しました。'),
  },
  loggedin: {
    variant: 'info',
    title: 'Slack でログインしました',
    description: () => 'デモのため Slack には接続せず、佐藤 美咲（一般メンバー）としてログインしたことにしています。投稿予定の登録と、自分が書く投稿の編集ができます。',
  },
  loggedout: {variant: 'info', title: 'ログアウトしました', description: () => '閲覧はそのまま続けられます。登録や編集をするには Slack でログインしてください。'},
}

export function ResultBanner() {
  const {params, get, update} = useQuery()
  const key = get('result')
  const m = key ? MESSAGES[key] : undefined
  return (
    <div aria-live="polite">
      {m ? (
        <Banner
          variant={m.variant}
          title={m.title}
          description={m.description?.(params)}
          onDismiss={() => update({result: null, title: null})}
        />
      ) : null}
    </div>
  )
}

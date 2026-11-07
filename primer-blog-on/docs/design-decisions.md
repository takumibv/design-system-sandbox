# 設計判断：目標 O1〜O4 をどこで達成するか

> 実装の前に書いた。情報構造は `information-architecture.md`。引用の行番号は `harness-logs/` 以下。

## O1 社内ブログを、週 1 本以上のペースで途切れずに公開し続ける

| 画面・要素 | 何をするか | 根拠 |
| --- | --- | --- |
| V1 計画：**週の列** | 期間内のすべての週を、投稿が 0 件でも 1 行として出す。各週の見出しに「公開済み n 本／予定 n 本」 | 「途切れず」を見るには、空いた週が**行として**見えないといけない。リストに投稿だけを並べると、空いた週は「行が無い」ことでしか分からず気づけない〔自分の判断〕 |
| V1：**予定の無い週の行** | Label `attention`「予定なし」＋文「この週は投稿予定がありません」＋（ログイン中なら）「この週に投稿予定を登録」ボタン（予定日を週の月曜で埋めた登録画面へ） | Create パターン「Pre-fill sensible defaults」（`patterns/create.md:97`）、「Pair it with a local entry point on the page where the new item will live」（同 `:153`） |
| V1：**週の充足の要約** | 期間の見出しの下に「8 週のうち 6 週に投稿予定・公開があります」 | 一目でペースが分かる〔自分の判断〕 |
| 判定 | 取りやめは本数に数えない | 固定データの 11/23 週（取りやめのみ）を「予定あり」と誤認させない〔ブリーフの固定データを読んで決めた〕 |

## O2 書く人や時期の偏りを減らす

| 画面・要素 | 何をするか | 根拠 |
| --- | --- | --- |
| V3 書く人ごと：**DataTable** | メンバー 10 人全員を行に。列：書く人／公開済み（期間内）／これからの予定／遅れ／最後の公開日。**予定も公開も 0 の人を先頭**に並べ、Label「予定なし」を付ける | 偏りは「書いていない人」が見えないと減らせない。DataTable usage「make it easy to compare data points between rows」（`usage/DataTable.md:67`）、「Order rows intuitively」（同 `:88`） |
| V3：書く人の名前 | V1 を `?author=id` で絞り込んだ一覧へのリンク | 画面を増やさない（`patterns/navigation.md:25`） |
| 時期の偏り | V1 の週の列で「ある週に 2 本、次の週は 0 本」が並んで見える。週見出しの本数で比較 | 専用のグラフは作らない。Data Visualization パターンはグラフの作法で、何をグラフにすべきかは言っていない。週 8〜12 本の比較なら数字で足りる〔自分の判断〕 |
| 共著 | 共著の投稿は各書く人に 1 本ずつ数える | 〔自分の判断〕。表の下に注記 |

## O3 書く人が、自分の担当と予定日を忘れない

| 画面・要素 | 何をするか | 根拠 |
| --- | --- | --- |
| V2 自分の担当（タブ） | 自分の投稿を、遅れ → 近い順 → 先の予定 → 日付未定 → 公開済み の順に並べる。各行に予定日と「あと n 日」「n 日遅れ」 | 予定日の相対表示（あと何日）が「忘れない」に直結〔自分の判断〕 |
| V1 の行 | 自分が書く人に入っている行に Label「あなたの担当」 | 計画全体を見ているときにも自分の分が分かる。色だけに頼らずテキストで〔`patterns/view.md:109` の考え方を流用〕 |
| V1「要対応」 | ログイン中は「あなたの担当で 7 日以内：n 件」を 1 行目に | 最初に開く画面で気づける〔自分の判断〕 |
| 未ログイン | V2 は Blankslate「ログインすると、あなたが書く投稿予定がここに表示されます」＋「Slack でログイン」 | `patterns/empty-states.md:47`「the action should initiate a creation flow or link to a feature」 |

## O4 取りまとめ役（編集担当）が、計画の抜けや遅れに早く気づける

| 画面・要素 | 何をするか | 根拠 |
| --- | --- | --- |
| V1 最上部：**要対応** | 3 つの数字と中身：①予定日を過ぎた未公開（遅れ）②7 日以内に予定日が来る未公開 ③期間内の予定の無い週。遅れがあれば Banner `critical`ではなく **`warning`**、無ければ出さない | Notification パターン：warning は「Informs about a potential issue」（`patterns/notification-message.md:57`）。critical は「an action was unsuccessful」（同 `:100`）なので、遅れ（まだ取り返せる）は warning が合う〔ハーネス〕 |
| V1 の行：**遅れの印** | Label `danger`「4 日遅れ」を状態の隣に。並びは週の中で遅れを先に | 色＋文字（`patterns/view.md:109`） |
| V1 の週の行：抜けの印 | O1 と同じ「予定なし」行 | 同上 |
| V3：遅れ列 | 人ごとの遅れ件数 | 誰に声をかけるかが分かる |

## 主ボタンの方針

- 主ボタン（`variant="primary"`）は**1 画面に 1 つ**。V1〜V3 の PageHeader に「投稿予定を登録」（ログイン中のみ）、V5「投稿予定を登録」、V6「変更を保存」、D1「公開を記録」。V4 詳細には主ボタンを置かず、「編集」「状態を変更」は通常ボタン〔事前知識（DS）：GitHub の 1 画面 1 primary の慣習。ハーネスの Button usage でも確認予定〕。
- 削除は `variant="danger"`（`patterns/delete.md:31`）。

## 状態の表示

| 状態 | 部品・色 | 理由 |
| --- | --- | --- |
| アイデア | Label `secondary` | 未着手。目立たせない |
| 執筆中 | Label `accent` | 進行中 |
| レビュー中 | Label `attention` | 他人の手が要る段階 |
| 公開済み | Label `done` | GitHub の「完了＝紫」の慣習〔事前知識（DS）〕 |
| 取りやめ | Label `default` ＋タイトルを薄い文字色 | 終わったもの |

StateLabel は使わない。StateLabel は「the status of an issue or pull request」用で（`component/batch1.md:66`）、status 値も issue/PR 固有（アイコンが Issue/PR の形になる）なので、ブログの状態に当てると意味がずれる〔ハーネス：読んだ後に決めた〕。

## 結果の伝え方

- 保存・登録の成功：保存後は詳細へ移るので、詳細の上部に Banner `success`（`patterns/saving.md:240`「If the change occurred and the page refreshes or redirects, you can use a Banner」）。読み上げは Banner 自体の見出し＋ `aria-live` 領域。
- 削除の成功：計画へ移り、上部に Banner `success`「『…』を削除しました」。Delete パターンは既定では成功 Banner を出さない（`patterns/delete.md:39`）が、ブリーフが「削除の成功が分かる」ことを求めており、移動先の一覧では消えたことが見えないため出す〔ブリーフを優先〕。
- 保存の失敗：フォームの先頭に Banner `critical`、入力は保持、フォーカスを Banner へ（`patterns/create.md:45`）。
- 削除の失敗：ダイアログを閉じずに中に Banner `critical`（`patterns/delete.md:41`）。
- トーストは使わない（`patterns/saving.md:242`）。

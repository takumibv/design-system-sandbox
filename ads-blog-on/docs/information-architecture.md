# 情報構造（実装前に記述）

> 書いた時点：ハーネス調査（`harness-logs/`）の後、実装の前。
> 根拠の表記：**[H]** ハーネス（ファイル:行）／**[B]** ブリーフ／**[DS]** ADS についての事前知識／**[一般]** 一般的な事前知識／**[判断]** その他の自分の判断。
> 先に結論：ハーネスには「画面の分け方・何を主役にするか・ナビゲーションの項目」を決める記述が**無かった**（`harness-logs/README.md` §1〜3）。ここでの画面の分け方と主役は主に自分の判断で、ハーネスは「外枠（top nav / side nav / main）」「入力を専用画面にする」「1 画面 1 見出し・主ボタン 1 つ」「タブで画面を移らない」の制約として効いた。

## 1. 利用者と利用場面の仮定（ブリーフに無いので自分で置いた）

| 利用者 | 役割 | いつ・どのくらい | 何のために | 端末 |
| --- | --- | --- | --- | --- |
| 取りまとめ役（例：高橋 健太 id=2） | 編集担当 | 週 1 回（月曜の朝）に計画を見直す。ほかに Slack で相談が来たとき | 今週・来週の公開が埋まっているか、遅れている記事が無いか、誰に頼むか（O1・O2・O4） | PC 中心 |
| 書く人（例：佐藤 美咲 id=1） | 一般メンバー | 月に数回。予定日が近づいたとき、状態を変えたとき、ネタを思いついたとき | 自分の担当と予定日の確認、状態の更新、アイデアの登録（O3） | PC とスマホ半々 |
| まだ書いていない人・見るだけの人 | 未ログイン | たまに | 今後どんな記事が出るか、空いている週はどこか | どちらも |

- 根拠：[B]「依頼者：社内ブログの取りまとめ役」「誰がいつ何を書くのかが分からなくなる」「ログインしていなくても閲覧はできる」。頻度・端末は [判断]（推測）。
- 今日は 2026-11-09（月）なので、取りまとめ役が「週の頭に開く」場面を最初の画面の基準にした [B]「今日は 2026-11-09（月）」＋[判断]。

## 2. 中心の対象（オブジェクト）と関係

```
メンバー（Member: 名前・役割）
   │ 1..n（書く人・共著あり）
   ▼
投稿予定（Post: タイトル・カテゴリ・公開予定日・状態・公開日・URL・メモ）
   │ 公開日 or 公開予定日で 0..1 の「週」に属する
   ▼
週（Week: 月曜はじまり。投稿が 0 件＝「予定の無い週」）
```

- **中心は「投稿予定」**。登録・編集・削除・状態変更の対象はこれだけ [B]「投稿予定を登録・編集・削除できる」。
- **「週」は保存しない導出オブジェクト**だが、画面では一級の対象として扱う。目標 O1 が「週 1 本以上」で、要件に「投稿予定が入っていない週が分かる」があるので、週を行として並べないと「抜け」が見えない [B] O1・機能要件 ＋[判断]。
- 週への所属：公開済みは公開日、それ以外は公開予定日。未定（null）はどの週にも属さず「日付未定」にまとめる [判断]。
- 取りやめは週に表示するが「その週の本数」には数えない（取りやめだけの週は「予定の無い週」）[判断]。fixtures の 11/23 の週がちょうどこれ。
- 週は月曜はじまり [B]「今日は 2026-11-09（月）」から推測 [判断]。
- **メンバー**は「書く人ごとの予定と実績」[B] のために二つ目の入口にする。役割（一般／編集担当）は権限にだけ効く。

## 3. 画面（ビュー）の一覧と呼び出し関係

| # | 画面 | URL | 主役（いちばん大きく・最初に目に入るもの） | 誰のため |
| --- | --- | --- | --- | --- |
| V1 | **投稿計画**（最初に開く画面） | `/` | **週ごとの予定一覧**（1 週 1 区画。予定の無い週も区画として出す）。その上に「要対応」（遅れ・予定の無い週・自分の次の締切）の短い知らせ | 全員。特に取りまとめ役 |
| V2 | 自分の担当 | `/me` | 自分が書く人に入っている投稿の一覧（予定日の近い順、遅れが先頭） | 書く人（ログイン中） |
| V3 | 書く人ごと | `/members` | メンバー × 期間内の公開済み本数・予定本数・最後の公開日・次の予定日の表 | 取りまとめ役 |
| V4 | メンバーの投稿 | `/members/:id` | その人の投稿一覧（予定と実績） | 取りまとめ役・本人 |
| V5 | 投稿の詳細 | `/posts/:id` | タイトルと状態・公開予定日（遅れ表示つき）。状態の変更 | 全員 |
| V6 | 投稿予定の登録 | `/posts/new` | 入力フォーム | ログイン中 |
| V7 | 投稿予定の編集 | `/posts/:id/edit` | 入力フォーム | 書く人・編集担当 |
| V8 | 見つからない | それ以外 | 「ページが見つかりません」と戻り先 | 全員 |
| D1 | 削除の確認（ダイアログ） | `/posts/:id?dialog=delete` | 何が消えるかと「削除」ボタン | 編集担当 |
| D2 | 公開の記録（ダイアログ） | `/posts/:id?dialog=publish` | 公開日・記事 URL の入力 | 書く人・編集担当 |

呼び出し関係：

```
          ┌──────────── side nav ─────────────┐
          ▼                 ▼                  ▼
   V1 投稿計画  ←→   V2 自分の担当    V3 書く人ごと ─→ V4 メンバーの投稿
     │ 投稿のタイトル      │                         │
     ├────────────────────┴──────────┬──────────────┘
     ▼                               ▼
   V5 投稿の詳細 ─ 編集 → V7 編集 ─ 保存 → V5（成功の知らせ）
     │  ├ 状態を「公開済み」に → D2 公開の記録
     │  └ 削除 → D1 確認 → V1（削除の知らせ）
   V1 / V2 の主ボタン「投稿予定を登録」→ V6 登録 → 保存 → V5
   V1 の「予定の無い週」→「この週に登録」→ V6（公開予定日をその週の月曜で埋める）
```

### 画面の分け方の根拠

- **一覧（V1〜V4）と入力（V6・V7）を別の画面に分けた。**
  - [H] `web/components_dynamic-table_usage.txt:35`「Use a modal dialog or dedicated page for entering content instead of input fields that are directly part of the dynamic table.」→ 一覧の中で直接編集はしない。
  - [H] `web/components_modal-dialog_usage.txt:76`「Don’t use a modal dialog for complex interactions or large tables.」→ 入力項目が 7 つあり、書く人の複数選択と「公開済みなら公開日と URL」の条件付き項目があるので、モーダルより専用画面。
  - [H] `web/components_drawer_usage.txt:4`「We are planning on deprecating Drawer. Please use Modal instead.」→ ドロワーは候補から外した。
  - [H] `web/components_inline-edit_usage.txt:5`（「information needs to be updated often」の画面向け）と `:34`「Don't use inline edit inside of a form」→ 詳細画面のインライン編集も考えたが、登録画面と同じ入力の形にそろえるほうが分かりやすいと判断 [判断]。
  - 専用画面にすると URL で直接開ける（状態の撮影にも都合がよい）[判断]。
- **短い一つの作業（削除の確認・公開日の記録）はダイアログ。**
  - [H] `web/components_navigation-system_layout_usage.txt:31`「Use a modal dialog when you need the user to focus on a specific task, such as making a decision or completing an action」。
- **「計画（週）」「自分の担当」「書く人ごと」を別の画面にした。** 三つは見る人と問い（いつ埋まっているか／自分は何をするか／誰に偏っているか）が違い、並べ順も違う（週順／締切順／人順）[判断]。
  - これらをタブで一画面にまとめる案は採らなかった：[H] `web/components_tabs_usage.txt:37`「Don’t use tabs to navigate to different pages, or states.」。三つはそれぞれ URL を持つ別画面にするので、切り替えは side nav にした。
  - 一方、同じ週一覧の「全員／自分の担当だけ」程度の絞り込みはタブにしない：`web/components_tabs_usage.txt:55`「Don’t use tabs to separate information that users need at the same time, such as filtering data within a single table.」
- **カレンダー（月の格子）にしなかった。** 週の抜けを見せたいが、月の格子は 390px で 7 列が収まらず、1 日に複数の投稿・共著者名が入ると読めない。週 1 本が目標なので「日」より「週」の粒度で十分 [判断]・[一般]。ハーネスにはビューの型の選び方は無かった（`harness-logs/mcp/05-search-components.log`：dashboard / list view / board / timeline / calendar view を探しても部品しか返らない）。
- **ボード（状態ごとの列）にしなかった。** 状態は分かるが時間軸（いつ公開か・どの週が空いているか）が消え、O1・O4 に効かない [判断]。
- **表（dynamic table）を週一覧に使わなかった。** 週ごとの見出し行と「予定なし」の行を表の行に混ぜると、表としての構造（同じ列の並び）が崩れる [判断]。[H] `web/components_dynamic-table_usage.txt`「Never use tables to build visual layouts」も参考にした（後付けの裏付け）。書く人ごと（V3）は列が揃った構造データなので表にする（同ファイル「display data in rows and columns … so that people can scan, sort and analyse data」）。

## 4. ナビゲーション

- **外枠は ADS の Layout（`@atlaskit/navigation-system`）：top nav ＋ side nav ＋ main。**
  - [H] `web/components_navigation-system_layout_usage.txt` 「Use layout to compose the structure of your application. It also defines the page behavior and navigational areas.」と Parts（Top nav / Side nav / Main / Panel）。
  - [H] `llms-components.txt` の `@atlaskit/navigation-system` TopNav（CLI `cli/20-component-TopNav.log`）。
- **top nav**：左に side nav の開閉ボタンと Gaji-Labo のロゴ（https://www.gaji.jp/ を新しいタブで開く）[B]、右にログイン（未ログイン時）またはログイン中の人（アバターとメニュー：ログアウト、表示する役割の切り替え＝デモ用）。
- **side nav の項目**：「投稿計画」「自分の担当」「書く人ごと」の 3 つ。登録は side nav に置かず、各画面の主ボタンにする [判断]。
  - side nav の項目の作り方・項目数の目安はハーネスに無い：[H] `web/components_navigation-system_layout_usage.txt:8`「see navigation resources (Atlassians only)」。項目の選び方は自分の判断。
  - 未ログインでも「自分の担当」を出す（押すとログインを促す画面）。項目が人によって消えると場所を覚えにくい [判断]。
- **各画面の頭は Page header（1 画面に 1 つ）**：[H] `web/components_page-header_usage.txt:24`「Use one page header per page.」。詳細・編集・メンバーの投稿はパンくず（Breadcrumbs）で上の画面へ戻れるようにする（同ファイル Parts「Breadcrumbs: … shows people their current location」）。
- 画面の幅は fixed-wide（最大 1296px）：[H] `cli/07-docs-layout.log:210`「Fixed-wide (default) | 1296px | … | Dashboards, directories, search results」。入力画面は読み書き中心なので fixed-narrow 相当（864px）に絞る（同 :211 を入力画面に当てはめた [判断]）。
- 期間・役割・表示状態は URL のクエリに持たせ、リンクを共有すれば同じ表示になるようにする [判断]。

## 5. 各画面の主役と根拠

### V1 投稿計画（最初に開く画面）

- 主役：**週ごとの予定一覧**。1 週を 1 区画にし、見出しに「11月9日（月）の週 · 2 本」、中に投稿（公開予定日・タイトル・書く人・状態・カテゴリ）。**0 本の週も区画として出し**、「予定なし」と「この週に登録」を置く。
- 一覧の上に「要対応」：遅れ（予定日を過ぎて未公開）の件数と記事、期間内の予定の無い週、ログイン中なら自分の次の締切。
- 期間：既定は「今週の 4 週前〜8 週後」（12 週）。開始・終了の日付で変えられる。
- 根拠：最初に開く人の問い「今週・来週は埋まっているか、止まっている記事は無いか」に一画面で答える（O1・O4）[判断]。過去 4 週は「公開済みの実績」と「時期の偏り」（O2）を見るため [判断]。「要対応」は一覧の上に置く：[H] `web/components_section-message_usage.txt:9`「they need to take action to keep moving through an experience.」と `messages` の部品表（`cli/10-docs-page.log:41-49`）。banner は使わない：[H] `web/components_banner_usage.txt:5`「Use banners sparingly … critical messaging about the loss of data, functionality」。

### V2 自分の担当

- 主役：自分が書く人に入っている未公開の投稿（遅れ → 予定日の近い順 → 日付未定）。下に自分の公開済み。
- 根拠：O3「自分の担当と予定日を忘れない」。V1 の中で自分の行に印を付けるだけでは、期間外や日付未定の担当が見えない [判断]。

### V3 書く人ごと

- 主役：メンバー全員の表（期間内の公開済み・予定・最後の公開日・次の予定日）。予定も実績も 0 の人を隠さない。
- 根拠：O2「書く人の偏り」。0 本の人（fixtures の id=9・10）が見えることが大事 [B]「補足：id=9 … と id=10 … は、今のところ書く予定のある投稿が無い」。

### V4 メンバーの投稿

- 主役：その人の投稿一覧（予定と実績）。V2 と同じ並べ方。

### V5 投稿の詳細

- 主役：タイトル・状態・公開予定日（遅れ／近いの表示つき）。次に書く人・カテゴリ・公開日・URL・メモ。
- 操作：状態の変更（状態の表示そのものを押して選ぶ）、編集（主ボタン）、削除（編集担当のみ）。
- 状態の変更を詳細画面に置く根拠：[H] `web/components_lozenge_usage.txt`「If you require a lozenge that opens a dropdown menu, for example an inline status switcher, use a lozenge dropdown trigger.」

### V6・V7 登録・編集

- 主役：入力フォーム。主ボタンは「保存」。
- 権限が無い人が URL で開いたら、フォームの代わりに「権限がありません」と戻り先を出す。

### V8 見つからない

- 主役：Empty state（「ページが見つかりません」＋「投稿計画へ戻る」）。[H] `web/components_empty-state_usage.txt:80`「Some error messages, such as not found errors, may also fit this component layout.」

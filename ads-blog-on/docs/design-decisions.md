# 設計判断：目標 O1〜O4 をどの画面・要素で達成するか（実装前に記述）

> 書いた時点：`information-architecture.md` の後、実装の前。実装中に変えた点は末尾の「実装中の変更」に追記する。
> 根拠の表記は `information-architecture.md` と同じ（[H] ハーネス／[B] ブリーフ／[DS] ADS の事前知識／[一般]／[判断]）。

## 目標と画面・要素の対応

| 目標 | 達成する画面・要素 | 意図 | 根拠 |
| --- | --- | --- | --- |
| **O1** 週 1 本以上を途切れずに公開 | V1 の週ごとの区画。**0 本の週も区画として出し**、見出しの右に「予定なし」の Lozenge（warning）、区画の中に「この週に登録」リンク（ログイン中のみ）。V1 上部の「要対応」に「予定の無い週 N 週」 | 抜けを「無いもの」ではなく「空いた枠」として見せ、その場で埋められるようにする | [B] O1・「投稿予定が入っていない週が分かる」。週を行にする判断は [判断]。Lozenge で状態を示す：[H] `web/components_lozenge_usage.txt:23`「Use lozenges for workflow status, system state …」 |
| **O2** 書く人・時期の偏りを減らす | V3 書く人ごとの表（期間内の公開済み・予定・最後の公開日・次の予定日。0 本の人も行に出す）。V1 の週の見出しに本数（2 本の週・0 本の週が並んで見える） | 誰に偏っているか・誰が空いているかを表で比べる。時期の偏りは週の本数の並びで見る | [B] O2・「書く人ごとの予定と実績が分かる」。表にする：[H] `web/components_dynamic-table_usage.txt`「display data in rows and columns … scan, sort and analyse」 |
| **O3** 書く人が自分の担当と予定日を忘れない | V2 自分の担当（遅れ → 近い順）。V1 の「要対応」に「あなたの次の締切」。V1 の各投稿で自分が書く人なら「あなた」の Tag | 開いた瞬間に「次は自分が何をいつまでに」が分かる | [B] O3・「自分が書く投稿が分かる」。並べ方は [判断] |
| **O4** 取りまとめ役が抜けや遅れに早く気づく | 遅れ：公開予定日を DateLabel（danger・アイコン付き「予定日超過」）、近い（7 日以内）：DateLabel（warning）。V1 の最上部の Section message（warning）に「予定日を過ぎた投稿 N 件／予定の無い週 N 週」とその記事へのリンク | 一覧を全部読まなくても、最初の画面の最上部で「何件・どれ」が分かる | [H] `cli/21-component-DateLabel.log:7`「`warning` — orange border, used for upcoming/near-due dates - `danger` — red border, used for overdue dates」、`web/components_date-label_usage.txt:40`「Use the assigned icons for semantic appearances like an overdue date.」、`web/components_section-message_usage.txt:9`。「近い」を 7 日以内にしたのは [判断] |

## 主な判断（I07〜I19 の要約。詳細は `decision-checklist.md`）

### 部品の割り当て（ハーネスで確認した部品）

| 用途 | 部品 | 根拠 |
| --- | --- | --- |
| 外枠 | `@atlaskit/navigation-system`（Root / TopNav / SideNav / Main） | [H] `web/components_navigation-system_layout_usage.txt` |
| 画面の頭 | `@atlaskit/page-header`＋`@atlaskit/breadcrumbs` | [H] `web/components_page-header_usage.txt:24` |
| 状態 | `@atlaskit/lozenge`（詳細画面は `LozengeDropdownTrigger` で変更） | [H] `web/components_lozenge_usage.txt:5,23` |
| カテゴリ | `@atlaskit/tag`（色は意味を持たない accent） | [H] `web/components_lozenge_usage.txt:25`「use a tag instead」、`:42` accent の説明 |
| 予定日・遅れ | `@atlaskit/date-label` | [H] 上記 |
| 書く人 | `@atlaskit/avatar-group` ＋ 名前のテキスト | [H] `web/components_avatar-group_usage.txt`（label で集合を説明）。名前を必ず文字でも出すのは [判断] |
| 遅れ・抜けの知らせ | `@atlaskit/section-message` | [H] `cli/10-docs-page.log:41-49`、`web/components_section-message_usage.txt:9` |
| 保存・削除の成否 | `@atlaskit/flag`（成功は自動で消える、失敗は消えない） | [H] `cli/10-docs-page.log:39`「If you want to tell someone they've accomplished a task, consider a flag.」、`web/components_flag_usage.txt:35` |
| 削除の確認・公開の記録 | `@atlaskit/modal-dialog` | [H] `web/components_navigation-system_layout_usage.txt:31` |
| 空・404・権限なし | `@atlaskit/empty-state` | [H] `web/components_empty-state_usage.txt:7,80` |
| 読み込み中 | `@atlaskit/skeleton`（一覧）／`@atlaskit/spinner`（詳細） | [DS]（確信度 中）。ハーネスの記述は「Use skeleton patterns that represent actual content structure」（`llms-full.txt`）程度 |
| 入力 | `@atlaskit/form`・`textfield`・`select`・`datetime-picker`・`textarea` | [H] `mcp/07-plan-retry.log` の候補 |

### 主ボタン（I12）

- 1 画面（領域）に主ボタンは 1 つ：[H] `web/components_button_usage.txt:19`「Only include one primary button or call to action (CTA) in a page or area.」
- V1・V2：「投稿予定を登録」（ログイン中のみ）。V5：「編集」（権限がある人のみ）。V6・V7：「保存」。ダイアログ：「削除」（danger）／「記録」。
- 権限の無い操作はボタンを無効化せず、**出さない**＋理由を文で書く：[H] `web/components_button_usage.txt:37-38`「Avoid disabling buttons … Disabled buttons don’t explain why the button isn’t usable.」

### 文言（I19）

- です・ます調。見出しは名詞（「投稿計画」「自分の担当」「書く人ごと」）。ボタンは動詞で短く（「保存」「削除」「投稿予定を登録」「この週に登録」）。
- 失敗の文では「すみません」「お願いします」を使わず、原因と次の手を 1〜2 文で書く：[H] `mcp/01-guidelines-all.log:1540-1541`「Avoid using “please” and “sorry”.」、`:1469-1472`（Body：reason / how to act）。日本語の業務アプリとしては謝罪を入れる慣習もあるが、ADS に合わせた [判断]。
- 日付は `Intl.DateTimeFormat('ja-JP')` で整形し、手で書式を組まない：[H] `cli/08-docs-navigation.log:19`「Reference the programming i18n library API」。範囲はハイフンを使わず「から」：同 `:95`「use ‘to’ and not hyphens … Hyphens are read out by screen readers」を日本語に置き換えた [判断]。

### 色（I14）

- 状態の Lozenge：アイデア＝neutral（灰）、執筆中＝information（青）、レビュー中＝discovery（紫）、公開済み＝success（緑）、取りやめ＝neutral（灰）＋取り消し線なし。
  - 「公開済み＝success」「進行中＝青」は [H] `web/components_lozenge_usage.txt:40-41`（semantic colors for workflow status）と [DS]（Jira の慣習、確信度 中）。
  - レビュー中＝discovery は意味の対応が弱い。warning（黄）は「注意が要る」意味になり、遅れの表示とぶつかるので避けた [判断]。
  - 取りやめ＝neutral：danger（赤）にすると「対応が必要」に見えるので避けた [判断]。アイデアと取りやめが同じ灰になるが、ラベルの文字で区別する（[H] lozenge Accessibility「Don't use color alone」）。
- 色は必ずトークン経由（部品の appearance かトークン）。自前の色の値は書かない [H] `mcp/01-guidelines-all.log`（Color「use their semantic names instead of copying palette values」）。

## 実装中の変更

| 変更 | 理由 | 根拠の種類 |
| --- | --- | --- |
| 自前の CSS は `@atlaskit/css` の `cssMap`（トークンのみ）で、週の枠・投稿の区切り線・詳細の dl の 2 列・本文の最大幅・ロゴのリンクの余白の 5 か所だけ書いた。生の CSS ファイル・style 属性は 0 | ADS に「週の区画」「定義リスト」に当たる部品が無い。値はすべて token（`space.*`・`color.border*`・`radius.*`）で、最大幅 1296px／864px はグリッド文書の値 | ハーネス `cli/07-docs-layout.log:194-197` |
| `@compiled/vite-plugin` と `@atlaskit/tokens/babel-plugin` を入れた | `cssMap` 内の `token()` を静的に解決しないと「The variant object must be statically defined」でビルドが落ちる。Vite での設定方法はハーネスに無かった | 検査（ビルドエラー） |
| React の StrictMode を外した | 開発時の二重マウントで、URL（`?dialog=delete`）から最初の描画で開いた Modal が中身の無いポータルになる。押して開くと正常 | 検査（Playwright で再現） |
| 書く人ごとの表の見出しを短くした（「公開済み（期間内）」→「公開済み」、期間は caption に移した） | 390px で見出しが 1 文字ずつ折り返して読めなかった | 検査（スクリーンショット） |
| 入力欄の placeholder を外し、書式の例を helper text に移した | 公式 lint `no-placeholder` | 検査（lint） |
| SectionMessage に `headingLevel="h2"` を付けた | 公式 lint `use-heading-level-in-section-message`。lint の文面は `headingLevel={2}` だが型は `"h2"` しか受け付けない | 検査（lint・型） |
| DateLabel に `maxWidth={320}` | 既定幅では「11月5日(木)（4日超過）」が省略記号で切れ、肝心の「超過」が読めなかった | 検査（スクリーンショット） |
| 上部のアバターを外し、名前のボタンだけにした | 写真が無く汎用アイコンになり、名前と重複した | その他の自分の判断 |

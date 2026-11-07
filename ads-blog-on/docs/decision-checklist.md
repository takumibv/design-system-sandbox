# 判断チェックリスト（I01〜I20）

- 根拠の種類：**ハーネス**（ファイル:行と原文）／**ブリーフ**（引用）／**事前知識（DS）**（確信度）／**事前知識（一般）**／**型定義・README**／**検査**／**その他の自分の判断**。
- 時期：**読後**＝ハーネスや資料を読んだ後に決めた／**裏付け**＝先に決めて、後から根拠として引いた／**不明**。
- ハーネスのファイルは `harness-logs/` からの相対パス。

| # | 項目 | 決めたこと | 根拠 | 根拠の種類 | 時期 |
| --- | --- | --- | --- | --- | --- |
| I01 | 利用者と利用場面の仮定 | ①取りまとめ役（編集担当）：週 1 回・月曜朝に PC で計画を見直す。②書く人（一般）：月数回、締切前・状態変更時に PC かスマホで開く。③未ログイン：たまに眺める | ブリーフ「依頼者：社内ブログの取りまとめ役」「ログインしていなくても閲覧はできる」「今日は 2026-11-09（月）」。頻度・端末は推測 | ブリーフ＋その他の自分の判断 | 読後（ブリーフを読んだ後。ハーネスには利用者を置く手順の記述は無い） |
| I02 | 中心の対象と関係 | 中心は「投稿予定」。メンバー 1..n ↔ 投稿（共著）。投稿は公開日（公開済み）／公開予定日で「週」に属する。週は保存しない導出オブジェクトだが画面では一級に扱う | ブリーフ「投稿予定を登録・編集・削除できる」「投稿予定が入っていない週が分かる」、O1「週 1 本以上」 | ブリーフ＋その他の自分の判断 | 読後（ブリーフ）。ハーネスにオブジェクト設計の記述は無し（`mcp/02-guidelines-ia.log`） |
| I03 | 画面の数と分け方 | 一覧 4（投稿計画／自分の担当／書く人ごと／メンバーの投稿）＋詳細 1＋入力 2（登録・編集、専用画面）＋404。ダイアログ 2（削除の確認・公開の記録） | 入力を専用画面に：`web/components_dynamic-table_usage.txt:35`「Use a modal dialog or dedicated page for entering content」、`web/components_modal-dialog_usage.txt:76`「Don’t use a modal dialog for complex interactions」。一覧を 3 つに分けたのは問いと並べ順が違うため | ハーネス（入力の分離）＋その他の自分の判断（一覧の分け方） | 入力の分離＝読後／一覧の分け方＝ハーネスを読む前から考えていた案を、読んだ後も変えなかった（実質は自分の判断） |
| I04 | ナビゲーション | ADS Layout（top nav＋side nav＋main）。side nav に 3 項目（投稿計画・自分の担当・書く人ごと）。上位へはパンくず。タブで画面を切り替えない | `web/components_navigation-system_layout_usage.txt`「Use layout to compose the structure of your application」、`web/components_tabs_usage.txt:37`「Don’t use tabs to navigate to different pages」、`web/components_page-header_usage.txt`（Breadcrumbs）。項目の選び方は「navigation resources (Atlassians only)」（同 layout:8）で非公開 | ハーネス（枠・タブの禁止）＋その他の自分の判断（項目） | 読後 |
| I05 | 最初に開く画面と主役 | 「投稿計画」。主役は週ごとの区画の一覧（0 本の週も区画として出す）。上に「要対応」（遅れ・予定の無い週・自分の次の締切） | O1・O4。「要対応」を一覧の上に置くのは `web/components_section-message_usage.txt:9`「they need to take action to keep moving」 | その他の自分の判断（主役）＋ハーネス（知らせの部品） | 主役＝不明（ハーネスを読む前から「週の一覧」が頭にあった可能性が高い）／部品＝読後 |
| I06 | その他の各画面の主役 | 自分の担当：遅れ→近い順の自分の未公開投稿。書く人ごと：メンバー×公開済み・予定の表（0 本の人も出す）。詳細：タイトル・状態・予定日。入力：フォーム | O2・O3、ブリーフ「補足：id=9 … id=10 … 書く予定のある投稿が無い」。表にする根拠 `web/components_dynamic-table_usage.txt`「display data in rows and columns … scan, sort and analyse」 | ブリーフ＋その他の自分の判断＋ハーネス（表） | 主役＝自分の判断／表の部品＝裏付け |
| I07 | 投稿予定の見せ方 | 週ごとの区画を縦に並べたリスト（タイムラインに近い）。カレンダー・ボードは採らない。書く人ごとだけ表 | 週の抜けを「空いた枠」として見せる（O1）。月の格子は 390px で 7 列が入らない。ボードは時間軸が消える。ハーネスはビューの型を答えなかった（`mcp/05-search-components.log`） | その他の自分の判断＋事前知識（一般） | 自分の判断（ハーネスに記述なし） |
| I08 | 期間の切り替え・範囲 | 既定は今週の 4 週前〜8 週後（12 週・2026-10-12〜2027-01-03）。開始・終了の DatePicker で変える。URL の `from`/`to` に持つ。終了＜開始は入力誤りとして文で示す | 過去 4 週は実績と時期の偏り（O2）、8 週先は抜けの早期発見（O4）。範囲の表記は `cli/08-docs-navigation.log:95`「use ‘to’ and not hyphens」→「から」。週は月曜始まり（`weekStartDay={1}`） | その他の自分の判断＋ハーネス（表記） | 期間＝自分の判断／表記＝読後 |
| I09 | 書く人ごとの予定と実績 | 「書く人ごと」画面の表：公開済み（期間内）・予定（期間内）・最後の公開・次の予定・予定日超過。予定 0 は Lozenge「予定なし」（warning）、超過は Lozenge danger。名前から「メンバーの投稿」へ | ブリーフ「書く人ごとの予定と実績が分かる」。Lozenge の使い分け `web/components_lozenge_usage.txt:23` | ブリーフ＋ハーネス＋その他の自分の判断 | 列の選び方＝自分の判断／部品＝読後 |
| I10 | 遅れと抜けの伝え方 | 遅れ：DateLabel danger＋アイコン＋文字「（4日超過）」。近い（7 日以内）：DateLabel warning＋「（あと3日）」。抜け：週の区画を点線＋Lozenge「予定なし」(warning)＋「この週に登録」。両方を一覧上部の SectionMessage(warning) に件数とリンクで集約 | `cli/21-component-DateLabel.log:7`「`warning` — … upcoming/near-due dates - `danger` — … overdue dates」、`web/components_date-label_usage.txt:40`「Use the assigned icons for semantic appearances like an overdue date」、lozenge Accessibility「Don't use color alone」。7 日は自分で決めた | ハーネス＋その他の自分の判断 | 読後（DateLabel の存在はハーネスで知った） |
| I11 | 自分の担当の見せ方 | 専用画面「自分の担当」。投稿計画の上部に「あなたの次の締切」（SectionMessage information）。一覧の書く人名に「（あなた）」 | O3、ブリーフ「自分が書く投稿が分かる」 | ブリーフ＋その他の自分の判断 | 自分の判断 |
| I12 | 主ボタンの数と割り当て | 1 画面 1 つ。計画・自分の担当＝「投稿予定を登録」（ログイン中のみ）／詳細＝「編集」（権限がある人のみ）／入力＝「保存」／削除ダイアログ＝「削除」(danger)／公開ダイアログ＝「公開済みにする」。空状態にはボタンを置かない（見出しの主ボタンと重なるため） | `web/components_button_usage.txt:19`「Only include one primary button or call to action (CTA) in a page or area.」、`web/components_empty-state_usage.txt`「Include too many call to action buttons on one page」（Don't） | ハーネス | 読後 |
| I13 | 登録・編集の入力の形 | 専用画面（fixed-narrow 相当 864px、ボタン左寄せ）。状態変更は詳細で LozengeDropdownTrigger、公開日の記録と削除確認はモーダル | `web/components_dynamic-table_usage.txt:35`、`web/components_modal-dialog_usage.txt:76`、`web/components_drawer_usage.txt:4`「planning on deprecating Drawer」、`web/components_inline-edit_usage.txt:34`、`web/components_button_usage.txt`「Left align buttons for single-page forms」、`web/components_lozenge_usage.txt`「inline status switcher, use a lozenge dropdown trigger」 | ハーネス | 読後 |
| I14 | 状態の表示部品と色 | Lozenge。アイデア＝neutral、執筆中＝information、レビュー中＝discovery、公開済み＝success、取りやめ＝neutral。カテゴリは Tag（色なし） | `web/components_lozenge_usage.txt:5,25,40-42`（状態は lozenge、分類は tag、semantic の使い方）。色の割り当て自体は ADS に対応表が無く、Jira の慣習（事前知識 DS・確信度 中）と自分の判断。レビュー中＝discovery は意味の対応が弱い | ハーネス（部品）＋事前知識（DS・中）＋その他の自分の判断（色） | 部品＝読後／色＝自分の判断 |
| I15 | 削除・取りやめの確認 | 削除はモーダルで確認（タイトル「投稿予定を削除しますか」、本文で元に戻せないことと「取りやめ」という代わりの手を示す、danger の「削除」）。取りやめは記録が残るので確認しない。削除は編集担当だけ | ブリーフ「編集担当は、すべての投稿予定を編集・削除できる」。warning message「clearly communicate what will happen if they proceed, and provide an alternative」（`web/components_flag_usage.txt` Warning） | ブリーフ＋ハーネス | 読後 |
| I16 | 保存・削除の成否 | Flag。成功は AutoDismissFlag（自動で消える）、失敗は Flag（消えない）で原因と次の手。保存失敗では入力内容を残す | `cli/10-docs-page.log:39`「If you want to tell someone they've accomplished a task, consider a flag」、`web/components_flag_usage.txt:35`「Never use auto dismiss flags for any critical warning or error messages」 | ハーネス | 読後 |
| I17 | 読み込み中・失敗・空 | 読み込み中：一覧は行の形の Skeleton、詳細は Spinner（`role="status"` と読み上げ文）。失敗：SectionMessage(error)＋「もう一度読み込む」。空：EmptyState（理由と次にできること） | `cli/10-docs-page.log` 部品表、`web/components_empty-state_usage.txt:7`「An empty state can appear as a full screen message or within panels」、`llms-full.txt`「Use skeleton patterns that represent actual content structure」。Skeleton と Spinner の使い分けは事前知識 | ハーネス＋事前知識（DS・中） | 読後（使い分けは不明） |
| I18 | 権限による違い | 未ログイン：閲覧のみ。主ボタンを出さず、計画の上に「閲覧のみの表示です」。一般：登録可、自分が書く人の投稿だけ編集。他人の投稿は「閲覧のみです」と編集できる人を文で示す。編集担当：全件の編集・削除。権限の無い URL（登録・編集）を開いたら EmptyState「…権限がありません」＋ログイン／戻る。ボタンを無効化して見せることはしない | ブリーフ「ログイン中の人は、投稿予定を登録し、自分が書く人に入っている投稿を編集できる」「編集担当は、すべて…」。`web/components_button_usage.txt:37-38`「Avoid disabling buttons … Disabled buttons don’t explain why」 | ブリーフ＋ハーネス | 読後 |
| I19 | 文言の調子 | です・ます。見出しは名詞（「投稿計画」「自分の担当」）。ボタンは短い動詞（「保存」「削除」「この週に登録」）。失敗文は「すみません」「お願いします」を使わず原因→次の手を 1〜2 文。日付は Intl.DateTimeFormat('ja-JP')、範囲は「から」 | `mcp/01-guidelines-all.log:1540-1541`「Avoid using “please” and “sorry”」、`:1469-1472`（Body）、`web/components_button_usage.txt`「Keep button labels short」「Start with the verb」、`cli/08-docs-navigation.log:19`。です・ます調は日本語の業務アプリの慣習 | ハーネス＋事前知識（一般） | 読後（ただし英語の規約を日本語に置き換えたのは自分の判断） |
| I20 | ブリーフに無いことを自分で決めた点 | 下の一覧 | — | その他の自分の判断 | — |

## I20：ブリーフに無いことを自分で決めた点（仮定）

1. 利用者の頻度・端末・場面（I01）。
2. 週は月曜はじまり。投稿の属する週は「公開済みは公開日、それ以外は公開予定日」。
3. 取りやめは週の本数に数えない（取りやめだけの週は「予定の無い週」）。
4. 「近い」は今日を含めて 7 日以内。
5. 既定の期間は今週の 4 週前〜8 週後。
6. 「予定の無い週」は今週以降だけを要対応に数える（過去の 0 本週は「公開なし」と表示のみ）。
7. ログインのデモ：「Slack でログイン」で id=1 としてログインした扱いにし、Flag で「実際の認証はしていない」と知らせる。既定はログイン中（id=1）。役割はアカウントメニューか `?as=guest|member|editor` で切り替える。
8. 削除は編集担当だけ（ブリーフは「編集担当は … 削除できる」とだけあり、一般メンバーが自分の投稿を削除できるかは書かれていない。安全側に倒した）。
9. 一般メンバーも状態を変えられるのは「自分が書く人に入っている投稿」だけ（編集権限と同じ）。
10. 新規登録の書く人の初期値はログイン中の本人。カテゴリの初期値は無し（必ず選ぶ）。
11. 公開済みにするときの公開日は必須、記事 URL は任意（あとから追加できる）。
12. 「予定の無い週」から登録すると、公開予定日にその週の月曜を入れる。
13. 保存・削除の失敗は通信の失敗として扱い、原因を断定しない文にした（ハーネス「If you don’t know the reason for an error, don’t make one up」`mcp/01-guidelines-all.log:1471-1472`）。
14. 状態は URL のクエリで直接開ける（`state`・`flag`・`dialog`・`validate`・`fail`）。`fail=save|delete` を付けると次の保存／削除が 1 回失敗する。

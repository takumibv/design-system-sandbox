# 情報構造

> この文書は**実装の前に**書いた。ハーネス（`harness-logs/`）を読み終えた後に決めている。引用の `patterns/view.md:81` のような表記は `harness-logs/` 以下のファイルと行番号。
> 根拠の種類は〔ハーネス〕〔ブリーフ〕〔事前知識〕〔自分の判断〕で示す。

## 1. 利用者と利用場面の仮定（ブリーフに無いので自分で置いた）

| 利用者 | いつ・どのくらい | 何のために開くか | 根拠 |
| --- | --- | --- | --- |
| 取りまとめ役（編集担当、id=2 高橋 健太。1〜2 名を想定） | 週の初め（月曜の朝）に 1 回、加えて Slack で相談を受けたとき。週 1〜3 回 | 今週・来週に公開できるものがあるか、遅れている記事・予定の無い週は無いか、誰かに偏っていないかを確かめ、声をかける相手を決める | 〔ブリーフ〕「取りまとめ役（編集担当）が、計画の抜けや遅れに早く気づける」（O4）。頻度は〔自分の判断〕 |
| 書く人（一般メンバー、id=1 佐藤 美咲 など 10 名） | Slack の通知やリマインドを見たときに数週に 1 回。スマホで開くことも多い | 自分の担当と予定日を確かめる。状態を「執筆中」「レビュー中」「公開済み」に進める。思いついた題材をアイデアとして登録する | 〔ブリーフ〕O3「自分の担当と予定日を忘れない」。スマホ利用は〔自分の判断〕（撮影が 390px を含むことも理由） |
| 未ログインの閲覧者（社内の誰でも） | 不定期 | 近く何が公開されるかを見る | 〔ブリーフ〕「ログインしていなくても閲覧はできる」 |

前提：今日は 2026-11-09（月）。週は**月曜始まり**とする〔自分の判断。今日が月曜で、ブリーフが「週 1 本」を目標にしているため、週の区切りを明示する必要がある〕。

## 2. 中心の対象（オブジェクト）と関係

```
メンバー（Member） ──書く人（多対多・共著あり）── 投稿予定（Post） ──属する── 週（Week：派生）
   role: 一般 / 編集担当                         status: アイデア→執筆中→レビュー中→公開済み / 取りやめ
                                                plannedDate（未定可）, publishedDate, url, note, category
```

- **中心は「投稿予定（Post）」**。登録・編集・削除・状態変更の対象はすべてこれ〔ブリーフ：機能要件の大半が投稿予定〕。
- **「週（Week）」を派生オブジェクトとして画面に出す**。データには無いが、O1（週 1 本以上）と「投稿予定が入っていない週が分かる」は週を単位にしないと表現できない〔ブリーフ＋自分の判断〕。投稿の属する週は「公開済みなら公開日、それ以外は公開予定日」の週。**取りやめは週の本数に数えない**（固定データの 11/23 週は取りやめ 1 件のみで、実質「予定なし」）。
- **「メンバー」は投稿を束ねる軸**として扱い、メンバー自体の登録・編集画面は作らない〔ブリーフに要件が無い〕。
- 派生する判定：
  - 遅れ＝予定日 < 今日 かつ 状態が公開済み・取りやめ以外
  - 近い＝今日 ≦ 予定日 ≦ 今日+7 日 かつ 未公開（7 日は〔自分の判断〕。週 1 本なら「来週分まで」が見えれば足りる）
  - 抜け＝その週に（取りやめ以外の）投稿が 0 件

## 3. 画面（ビュー）の一覧と呼び出し関係

| # | 画面 | URL | 主役 | 誰のため |
| --- | --- | --- | --- | --- |
| V1 | 計画（週ごと）**＝最初に開く画面** | `/` | 週ごとに区切った投稿予定の一覧と、その上の「要対応」（遅れ・近い予定・予定の無い週） | 編集担当（O1・O4）、全員 |
| V2 | 自分の担当 | `/mine` | 自分が書く人に入っている投稿の、予定日順の一覧 | 書く人（O3） |
| V3 | 書く人ごと | `/authors` | メンバー全員 × 期間内の公開数・予定数・遅れ・最後の公開日の表 | 編集担当（O2） |
| V4 | 投稿予定の詳細 | `/posts/:id` | 1 件の投稿予定の全項目と状態、状態の変更 | 書く人・編集担当 |
| V5 | 投稿予定の登録 | `/posts/new` | 入力フォーム | ログイン中の人 |
| V6 | 投稿予定の編集 | `/posts/:id/edit` | 入力フォーム | 書く人・編集担当 |
| V7 | ページが見つかりません | その他すべて | 404 の説明と計画への戻り道 | 全員 |
| D1 | 公開を記録（ダイアログ） | V4 上（`?dialog=publish`） | 公開日と記事 URL の 2 項目 | 書く人・編集担当 |
| D2 | 削除の確認（ダイアログ） | V4 上（`?dialog=delete`） | 何が消えるかと「投稿予定を削除」 | 編集担当 |

呼び出し関係：

```
            ┌──────── タブ（UnderlineNav）────────┐
 V1 計画 ⇄ V2 自分の担当 ⇄ V3 書く人ごと
  │  │            │              └─ 書く人の名前 → V1（?author=id で絞り込み）
  │  └─ 予定なしの週の「この週に登録」→ V5（?date=週の月曜）
  ├─ 投稿タイトル → V4 詳細 ──「編集」→ V6 ──保存→ V4（?result=saved）
  │                  ├─「状態を変更」→（公開済みを選ぶと）D1 → V4
  │                  └─「削除」→ D2 → V1（?result=deleted）
  └─「投稿予定を登録」→ V5 ──登録→ V4（?result=created）
```

### 分け方の根拠

- **タブ 3 枚（V1〜V3）は「同じ投稿予定の集まりを、別の切り口で見る」もの**。Navigation パターンの「Tabs allow users to switch between related views within a consistent context」（`patterns/navigation.md:93`）と「Use the UnderlineNav component when activating a tab changes the URL」（同 `:95`）に従い、URL が変わるタブ＝UnderlineNav にした。〔ハーネス：読んだ後に決めた〕
  - 3 つに分けたのは、目標ごとに「誰が・何を比べるか」が違うから：O1/O4 は**時間軸（週）**、O3 は**自分**、O2 は**人**。1 画面に詰めると、View パターンの「Present all the detail up front when most of it isn't needed yet」（`patterns/view.md:57`、Don't）に当たる。〔ハーネス＋自分の判断〕
- **詳細（V4）を独立したページにした**。View パターンは「split layout」（`patterns/view.md:81`）や side sheet（`:61`）を勧めるが、(1) 一覧は週の見出しで区切られた縦長のリストで、横に詳細を並べる幅が 1440px でも窮屈、(2) 390px では結局 1 カラムになる（同 `:81`「reflow to a single column」）、(3) 撮影・状態確認のために URL で直接開ける必要がある（`patterns/view.md:121`「Encode meaningful state … in the URL」）。Dialog の usage も「Don't use side sheets to present create/edit forms … use a page instead」（`usage/Dialog.md:205`）。〔ハーネスを読んだ後に、ハーネスの推奨（split）を**採らない**判断をした〕
- **登録・編集（V5・V6）は専用ページ**。Create パターンは「a Dialog for a handful of fields, or a dedicated PageLayout page for large or multi-step forms」（`patterns/create.md:29`）、「Give the task its own page when it carries consequential choices or should survive a refresh」（同 `:77`）。項目は 8 つ（タイトル・カテゴリ・書く人・予定日・状態・公開日・URL・メモ）で "a handful" を超える、と判断。さらに Dialog の usage「Dialogs that have one or more input fields should always use the full-screen variant」（`usage/Dialog.md:282`、狭い画面）なので、スマホでは結局全画面になる。〔ハーネス：読んだ後に決めた〕
- **公開の記録（D1）だけはダイアログ**。入力は公開日と URL の 2 つで、詳細を見ながらその場で済ませたい。Create パターン「Use a dialog for a handful of fields people should stay in place for」（`patterns/create.md:69`）。〔ハーネス〕
- **削除の確認（D2）は ConfirmationDialog**。Delete パターン「Use ConfirmationDialog for most delete confirmations」（`patterns/delete.md:27`）、「a simple dialog for single resources」（同 `:61`）。〔ハーネス〕
- **書く人ごとの専用画面（V3）を作り、メンバー詳細画面は作らない**。メンバーごとの投稿一覧は V1 を `?author=` で絞れば足り、画面を増やさない。Navigation パターン「Minimize the number of navigational elements」（`patterns/navigation.md:25`）。〔ハーネス＋自分の判断〕

## 4. ナビゲーション

| 層 | 部品 | 中身 | 根拠 |
| --- | --- | --- | --- |
| アプリ見出し（全画面共通） | 自前のヘッダー（Stack で組む） | 左：Gaji-Labo ロゴ（別タブで gaji.jp）＋アプリ名「社内ブログ投稿計画」。右：未ログインなら「Slack でログイン」、ログイン中なら名前と役割（編集担当なら Label）＋「ログアウト」 | 〔ブリーフ〕ロゴ・Slack ログイン。Primer の `Header` は GitHub の黒いグローバルヘッダーで、社内ツールの見た目には強すぎると判断〔事前知識（DS）＋自分の判断〕 |
| ローカルナビ | UnderlineNav（`aria-label="表示の切り替え"`） | 計画／自分の担当／書く人ごと。現在のタブは `aria-current="page"` | `patterns/navigation.md:95`。View パターン「Give the active view … a clear cue that doesn't depend on color」（`patterns/view.md:109`）→ UnderlineNav は下線＋太字＋aria-current で色だけに頼らない〔事前知識（DS）〕 |
| ページ見出し | PageHeader | 画面名＋主ボタン。詳細・登録・編集では「計画に戻る」の親リンク（ContextArea / ParentLink） | `patterns/navigation.md:40`「the child page should have a clear way to navigate back to the parent page … breadcrumbs or a "back" button」、`:185` PageHeader |
| 期間 | 前／次ボタン＋SegmentedControl（4 週／8 週／12 週）＋「今週に戻る」 | V1・V3 で共通。URL の `from` `weeks` に反映 | SegmentedControl は「viewing content in a different format」に使える（`patterns/navigation.md:141`）、2〜5 個（`usage/SegmentedControl.md:81`）。Filter パターン「Persist filter state in URL parameters」（`patterns/filter.md:72`） |
| 絞り込み | ActionMenu（書く人／カテゴリ）＋「絞り込みを解除」 | V1 のみ。URL の `author` `category` | Filter パターン「ActionMenu with ActionList for small single-select」（`patterns/filter.md:30`）、「a clear way back to the original state」（`:80`） |

- タブ以外のページ（V4〜V7）では UnderlineNav を出さず、PageHeader の「計画に戻る」で親に戻る〔`patterns/navigation.md:206-208` の「one level deep … show a link to navigate back to the parent route」〕。
- 状態はすべて URL に持たせる（期間・絞り込み・ダイアログ・結果メッセージ・デモ用の役割 `as`）。〔`patterns/view.md:121`、`patterns/filter.md:72`、加えて撮影のため〕

## 5. 各画面の主役

| 画面 | 主役 | 脇役 | 根拠 |
| --- | --- | --- | --- |
| V1 計画 | **週の列**（1 週＝見出し「11/9〜11/15（今週）」＋その週の投稿の行）。予定の無い週も行として**必ず出す** | 上部の「要対応」（遅れ n 件／7 日以内 n 件／予定の無い週 n 週）、期間・絞り込み、日付未定のアイデア | O1・O4 を 1 画面で満たすのは「週の抜けが穴として見える」並べ方。カレンダーは 1 日 1 マスで週の本数が読みにくく、390px で潰れる〔自分の判断〕。View パターン「Default to a simple view that shows the essentials」（`patterns/view.md:53`） |
| V2 自分の担当 | **自分の投稿の一覧（予定日順）**。遅れ・近い予定を先頭に | 日付未定のアイデア、公開済み（折りたたまず下に） | O3。未ログインでは Blankslate でログインを案内 |
| V3 書く人ごと | **メンバー全員の表**（公開数・予定数・遅れ・最後の公開日・次の予定日）。0 件の人も行に出す | 期間の切り替え | O2。DataTable usage「make it easy to compare data points between rows or columns」（`usage/DataTable.md:67`） |
| V4 詳細 | **投稿の全項目と状態** | 状態の変更、編集、削除 | `patterns/edit.md:82`「Put the trigger next to the content it edits, and show it only to people who can use it」 |
| V5/V6 登録・編集 | **フォーム** | 主ボタン「投稿予定を登録」／「変更を保存」、キャンセル | `patterns/create.md:43`、`patterns/edit.md:110` |
| V7 404 | Blankslate「ページが見つかりません」 | 「計画を見る」 | `patterns/empty-states.md:105`「nudge them towards a path to recover」 |

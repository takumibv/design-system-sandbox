# ハーネス報告（Primer／GitHub）

## 1. 使ったハーネスと導入手順・つまずき

| ハーネス | 導入 | 使い方 | つまずき |
| --- | --- | --- | --- |
| 公式 MCP `@primer/mcp` 1.1.2（stdio、20 ツール） | `npm i -D @primer/mcp @modelcontextprotocol/sdk` | このセッションに MCP サーバーを途中で追加できないため、`harness-logs/scripts/mcp-call.mjs`（`@modelcontextprotocol/sdk` の `Client`＋`StdioClientTransport`）で呼んだ | ①`get_pattern` などは実行時に primer.style を fetch する作りで、プロキシ環境では Node の組み込み fetch が `fetch failed`。`NODE_USE_ENV_PROXY=1` で解決（`harness-logs/README.md`）。②`get_component_usage_guidelines` が、`/guidelines` ページの無い 15 部品で**エラーにならず primer.style のトップページ本文を返す**（後述） |
| primer.style の文書 | `harness-logs/scripts/fetch-doc.mjs`（MCP と同じ cheerio＋turndown で `<main>` を Markdown 化） | レイアウトの「ページの型」、レスポンシブ、文言、Label／StateLabel の概要 | 特になし |
| 公式 lint：`eslint-plugin-primer-react` 9.4.0（recommended） | `npm i -D eslint@9 typescript-eslint eslint-plugin-primer-react` | `eslint.config.js` | recommended が **eslintrc 形式のみ**（flat config が無い）。さらに `plugins: ['primer-react', 'github']` と未導入の `github` プラグインを名指ししている。rules は `primer-react/*` だけなので、flat config に rules と settings を手で移した |
| 公式 lint：`@primer/stylelint-config` 13.6.0 | `npm i -D stylelint @primer/stylelint-config` | `.stylelintrc.json` | なし |
| 撮影・検査 `brief/scripts/capture.mjs` | `@axe-core/playwright` を devDependencies に | — | ブリーフの場所から実行すると ESM の解決が `primer-blog-on/node_modules` を見ず `ERR_MODULE_NOT_FOUND`。同一内容を `scripts/capture.mjs` に複写して実行（`diff` で同一を確認） |

使ったツール：`listTools`、`list_patterns`、`get_pattern`（全 19 パターン）、`primer_coding_guidelines`、`list_components`、`get_component_usage_guidelines`（27 部品）、`get_component_batch`（20 部品）、`init`。使わなかったツール：トークン系（`find_tokens` `get_design_token_specs` `get_token_group_bundle` `get_token_usage_patterns` `lint_css`）、`get_color_usage` `get_typography_usage` `list_icons` `get_icon` `review_alt_text` `get_component_examples` `get_component_accessibility_guidelines`。トークンは CSS がごく少なかったので名前を事前知識で書き、`@primer/stylelint-config` で検査した（MCP の `lint_css` の「REQUIRED FINAL STEP」は実行していない。正直に記す）。

## 2. 情報構造（画面の分け方・主役・ナビゲーション）への効き方

**結論：画面の「部品の選び方」と「画面同士の移り方」には効いた。何を主役にするか・画面をいくつに分けるかには、ほぼ効かなかった。**

### 効いた記述

| 決めたこと | 効いた記述（原文） |
| --- | --- |
| タブを URL の変わる UnderlineNav に | 「Use the UnderlineNav component when activating a tab changes the URL.」（`patterns/navigation.md:95`） |
| 期間・絞り込み・ダイアログ・結果をすべて URL に | 「Encode meaningful state, like the active tab, selection, or highlighted line, in the URL so a link or a reload restores it.」（`patterns/view.md:121`）、「Persist filter state in URL parameters」（`patterns/filter.md:72`） |
| 登録・編集を専用ページに、公開の記録だけダイアログに | 「Match the surface to the task: … a Dialog for a handful of fields, or a dedicated PageLayout page for large or multi-step forms.」（`patterns/create.md:29`）、「Don't use side sheets to present create/edit forms … use a page instead.」（`usage/Dialog.md:205`） |
| 子ページから親へ戻るリンク | 「the child page should have a clear way to navigate back to the parent page」（`patterns/navigation.md:40`） |
| 読み込み中・失敗をその場に出す | 「Keep slow or failed content in place … Show a placeholder where it will appear」（`patterns/view.md:97`） |
| 権限の無い操作は出さない | 「Hide create actions people don't have permission to use.」（`patterns/create.md:165`）、「Put the trigger next to the content it edits, and show it only to people who can use it.」（`patterns/edit.md:82`） |

Scenario パターン（Create／Edit／Delete／View／Filter）は「どの面（インライン・ダイアログ・ページ）にするか」の判断基準がはっきりしていて、そのまま使えた。

### 効かなかった点

- **何を主役にするか**：計画の主役を「週の列」にし、空き週を行として出すのは自分の判断。Primer の文書は GitHub の issue／PR／リポジトリを題材にしていて、「期間を区切った計画」「週」「予定と実績」のような**時間軸の情報構造**の記述は無かった（パターンにカレンダーやタイムラインの話が無く、部品一覧にもカレンダーが無い。`Timeline` は issue の出来事の並び用）。
- **画面の数**：「3 つの切り口をタブにする」ことはブリーフの目標 O1〜O4 から考えた。ハーネスは「タブは関連する見え方の切り替え」と部品の側からしか言わない。
- **推奨を採らなかったもの**：View パターンは一覧と詳細を並べる split layout を勧める（`patterns/view.md:81`）が、週の列は縦に長く横に並べる余地が無いこと、390px では 1 カラムになること、詳細を URL で直接開きたいことから採らなかった。ハーネスは「いつ split にしないか」を言ってくれない。
- **利用者・頻度の仮定**：ハーネスには利用者像を置くための記述は無い（当然だが）。

## 3. 部品・状態の判断への効き方

- **よく効いた**：StateLabel を使わず Label にした（StateLabel は「the status of an issue or pull request」）。遅れの Banner を critical でなく warning にした（`patterns/notification-message.md:57` と `:100` の使い分け）。トーストを使わない（`patterns/saving.md:242`）。保存ボタンを無効化しない（`patterns/saving.md:131`）。削除の確認文と確定ボタンの文言（`patterns/delete.md:101`、`:109`）。取りやめに確認を挟まない（`patterns/delete.md:61`）。DataTable の数値の右寄せ（`usage/DataTable.md:114`）。1 画面 1 primary（`usage/Button.md:58`）。
- **ハーネスとブリーフがぶつかった**：Delete パターンは「Don't add a visible success banner by default」（`patterns/delete.md:39`）だが、ブリーフが「削除の成功が分かる」ことを求めるので、移動先に success Banner を出した。
- **ハーネスに従わなかった**：日付は RelativeTime を使うよう書かれている（`docs/getting-started_foundations_content.md:79`）が、デモの「今日」が 2026-11-09 に固定で、RelativeTime は実際の現在時刻を基準にするため使わず、「あと 3 日」「4 日遅れ」を自前で計算した。
- **状態の網羅**：Loading／Empty States／Degraded Experiences／Notification message の 4 パターンで、読み込み中・失敗・空・成否の置き場所と部品がほぼ決まった。「権限なし」は `unavailable` 状態（`patterns/notification-message.md:130`「User does not have permissions to perform an action」）が示されていたが、ページ全体が使えない場合の形は書かれておらず、Blankslate（LockIcon）にしたのは自分の判断。

## 4. 答えてくれなかったこと・誤り

1. **`get_component_usage_guidelines` の誤り**：Label、StateLabel、PageLayout、Timeline、InlineMessage、CounterLabel、AvatarStack、NavList、Spinner、SkeletonBox、ProgressBar、FormControl、Card、Header、Stack の 15 部品で、primer.style のトップページ本文を「usage guidelines」として返す（`harness-logs/usage/Label.md` など。本文の md5 が 15 件同一）。`/product/components/label/guidelines` が 308→307 で `/` にリダイレクトされ、それを追ってしまうため。**エラーが出ないので、AI がトップページの文を「Label の使い方」と取り違える危険がある**。`get_component`（props と例）は正しく返る。
2. ネットワーク前提：`get_pattern` と `get_component_usage_guidelines` は primer.style を毎回取得する。オフライン・プロキシ環境では使えない。
3. 日本語：文言の調子（です・ます、全角括弧、日付の書き方）の記述は無い。content ガイドは英語の sentence case 前提。
4. Dialog の閉じるボタンのツールチップが英語の「Close」のまま（Primer 内蔵の文字列。撮影 `S31-detail-publish-dialog-390.png`）。差し替える props は見つけられなかった（未確認）。
5. 時間軸の情報（計画・予定・期日）を扱うパターンが無い（§2）。
6. `init` は「agent instructions（copilot など）を追加せよ」と言うが、今回は追加していない。

## 5. AI が自発的に使ったか

- 今回は指示があったので使った。指示が無くても `primer_coding_guidelines` と `list_patterns` の description（「Prefer a scenario pattern when one fits the task」）は、作業の最初に呼ぶ動機になる書き方だと思う。
- 実際の使い方の偏り：パターンは**全件取得して読んだ**が、トークン系ツールは使わず、事前知識でトークン名を書いた。ツールの description は `lint_css` を「REQUIRED FINAL STEP」と強く求めていたが、公式 stylelint があったのでそちらで代えた。
- 誤り（§4-1）は、出力の中身が明らかにおかしいことに気づいて調べたから分かった。AI が気づかずに使えば、部品の使い方を誤る可能性がある。

## 6. 「Primer（GitHub）らしさ」

- GitHub の issue 一覧・リポジトリ設定と同じ部品と並び（PageHeader＋UnderlineNav＋counter、Label、Banner、Blankslate、DataTable、ActionMenu）で、GitHub を使う人には操作の予想がつく。
- らしさを弱めた所：GitHub の黒い `Header` は使わず、白い自前の見出しにロゴを置いた（社内ツールで「Gaji-Labo のサービス」と分かることを優先）。
- 自前の CSS（すべて CSS Modules、Primer のトークンのみ、`@primer/stylelint-config` 合格）：
  - `AppShell.module.css`：アプリ見出し（Primer に GitHub 以外のアプリ見出しの部品が無い）。
  - `PostList.module.css`：週の箱・見出し帯・行の区切り線（ActionList は選択・操作用で、リンク＋Label＋補足の読み物の行に合わない）、取りやめの打ち消し線、表の横スクロール領域。
  - `Detail.module.css`：詳細の項目一覧（`dl`。定義リストの部品が無い）。
  - `sx` と `Box` は使っていない（`primer_coding_guidelines` の指示どおり）。

## 7. 公式 lint の最終結果

- `eslint-plugin-primer-react`（recommended の rules 12 件を flat config に移して適用）：**エラー 0・警告 0**（`npx eslint src --max-warnings 0`、`docs/evidence/lint-final.txt`）。実装中に指摘は出なかった。
- `@primer/stylelint-config`：**0 件**。実装中に 1 件（`Detail.module.css` の `@media (width <= 543px)` が `media-feature-range-notation` 違反。`max-width` 表記に修正）。
- 参考：axe（WCAG 2.1 AA）は最終 90 枚すべて違反 0、横はみ出し 0（`docs/evidence/capture-final.txt`）。

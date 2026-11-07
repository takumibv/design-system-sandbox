# ハーネス報告：ADS の AI 向けハーネスは何に効いたか

対象：Atlassian Design System（ADS）。調べた日：2026-11-07。生の出力は `harness-logs/`（索引は `harness-logs/README.md`）。

## 1. 使ったハーネスと導入手順・つまずき

| ハーネス | 導入・起動 | つまずき |
| --- | --- | --- |
| llms.txt（`https://atlassian.design/llms.txt` と配下 7 本） | `curl` で取得。合計約 1.3MB（`llms-full.txt` 670KB） | 入口の一覧に **patterns・レイアウト・情報構造のセットが無い**。components は 10,475 行で、各部品の Best practices は 3〜5 行の一般論が多い |
| 公式 CLI `@atlaskit/ads-cli@0.11.1` | `npm i @atlaskit/ads-cli` → `npx ads-cli …` | ① `docs navigation` の中身が「日付と時刻の書き方」（`cli/08-docs-navigation.log`）。`docs page` は「メッセージ」、`docs error messages` は Color accents＋メッセージの連結（`cli/10`・`cli/12`）。トピック名で引くとあいまい一致で**別の文書**が返る。② `search pattern` は 0 件。③ `init` は `@atlassian/skills`（社内限定）が無いと AI 向けスキルを入れず、AGENTS.md（MCP 設定例）だけ作る（`cli/40-init.log`） |
| 公式 MCP（リモート `https://mcp.atlassian.com/v1/ads/public/mcp`） | `@modelcontextprotocol/sdk` の Client（StreamableHTTP）で接続できた。認証不要 | ① `ads_plan` は説明上 `atlaskitComponents` 省略可なのに、省略すると `Input validation error: Required at atlaskitComponents`（`mcp/04-plan.log`）。② prompts / resources は無い。③ `ads_get_guidelines` の説明が「Context Engine MCP の `get_content_standards_docs` と併用せよ」と、公開されていない社内ツールを前提にしている（`mcp/00-remote-list.log`） |
| ローカル MCP `@atlaskit/ads-mcp@1.12.5`（stdio） | 比較のため起動。ツールはリモート＋`ads_analyze_localhost_a11y` | 実装の判断には使わなかった（axe はブリーフの capture.mjs で回した） |
| atlassian.design の文書 | HTML を取得してテキスト化（サーバー描画で本文が取れる） | Layout の side nav 項目の作り方は「navigation resources (Atlassians only)」で非公開（`web/components_navigation-system_layout_usage.txt:8`）。`/components/navigation-system/usage` 等は 404 |
| 公式 lint `@atlaskit/eslint-plugin-design-system`（recommended/flat） | eslint 9 の flat config で `configs["recommended/flat"]` | lint の文面が `headingLevel={2}` を勧めるが SectionMessage の型は `"h2"` しか受けない |

実装上のつまずき（ハーネスでは分からなかったこと）：

- `@atlaskit/navigation-system` は **React 18 のみ**（peer `^18.2.0`）。Vite の雛形は React 19 なので下げた。
- `@atlaskit/primitives/compiled`＋`@atlaskit/css` の `cssMap` を Vite で使うには `@compiled/vite-plugin`、`@compiled/babel-plugin`、`@atlaskit/tokens/babel-plugin`（`transformerBabelPlugins`）が必要。llms-primitives.txt は「`@atlaskit/primitives/compiled` – PREFERRED」と書くが、ビルド設定は書いていない。
- React の StrictMode 下で、最初の描画から開いた Modal が空になる（押して開くと正常）。StrictMode を外した。
- ADS の Layout は main の中でスクロールするため、ブリーフの `capture.mjs`（`fullPage: true`）では 900px より下が写らない。axe・横はみ出しの検査は DOM 全体が対象なので影響しないが、スクリーンショットの証拠としては足りないので、補助の `scripts/capture-full.mjs` を書いた。
- TopNavEnd は `role="list"` で、ADS の EndItem 以外（DropdownMenu の Button）を直接置くと axe の `aria-required-children` 違反になる。`li` で包んで直した。
- `brief/scripts/capture.mjs` を `brief/` の場所から実行すると `@axe-core/playwright` が解決できない（ESM は NODE_PATH を見ない）。同じ内容のコピー（`cmp` で一致を確認）を `ads-blog-on/scripts/` に置いて実行した。

## 2. 情報構造（画面の分け方・主役・ナビゲーション）にハーネスは効いたか

**結論：ほとんど効かなかった。** 画面の分け方・最初の画面の主役・ナビの項目・投稿予定の見せ方（週ごとのリスト）は、自分の判断と一般的な事前知識で決めた。ハーネスは「枠」と「やってはいけないこと」を与えた。

### 効いた記述（制約として）

| 判断 | 効いた記述 |
| --- | --- |
| 入力を一覧から切り離し、専用画面にする | `web/components_dynamic-table_usage.txt:35`「Use a modal dialog or dedicated page for entering content instead of input fields that are directly part of the dynamic table.」／`web/components_modal-dialog_usage.txt:76`「Don’t use a modal dialog for complex interactions or large tables.」／`web/components_drawer_usage.txt:4`「We are planning on deprecating Drawer. Please use Modal instead.」 |
| 3 つの一覧をタブでなく side nav で切り替える | `web/components_tabs_usage.txt:37`「Don’t use tabs to navigate to different pages, or states.」 |
| 外枠（top nav／side nav／main） | `web/components_navigation-system_layout_usage.txt`「Use layout to compose the structure of your application. It also defines the page behavior and navigational areas.」 |
| 1 画面 1 見出し・パンくず | `web/components_page-header_usage.txt:24`「Use one page header per page.」 |
| 幅（一覧は fixed-wide 1296px、入力・詳細は 864px） | `cli/07-docs-layout.log:210-211` のグリッドの表 |
| 削除確認・公開の記録はダイアログ | `web/components_navigation-system_layout_usage.txt:31`「Use a modal dialog when you need the user to focus on a specific task」 |

### 効かなかった点（答えが無かった）

- **どの画面を作るか・最初の画面に何を置くか**：「情報構造」「ページの種類」「ダッシュボード」の文書は見つからない（`llms-full.txt` grep 0 件、`mcp/02-guidelines-ia.log`、`cli/11-search-dashboard.log` 0 件）。
- **ビューの型（カレンダー／リスト／表／ボード）の選び方**：`ads_search_components` に dashboard / list view / board / timeline / calendar view を渡しても、Pagination・Calendar（日付選択の部品）などが返るだけ（`mcp/05-search-components.log`）。
- **ナビゲーションの項目の決め方**：side nav 項目の資料は Atlassian 社内限定。
- **権限による画面の出し分け**の指針：`search permission` は 0 件。ボタン usage の「Avoid disabling buttons」だけが手がかり。
- 「patterns」と名の付く公開ページは AMP Patterns（人とエージェントの協働）だけで、今回とは関係しなかった（`web/amp.txt`）。

## 3. 部品・状態の判断への効き方

こちらは**よく効いた**。とくに atlassian.design の usage ページ（llms.txt や MCP には入っていない Do/Don't の本文）が具体的だった。

- 状態＝Lozenge、カテゴリ＝Tag の分け方（`web/components_lozenge_usage.txt:23-25`）。
- 遅れ・近いの表示に DateLabel の danger／warning（`cli/21-component-DateLabel.log:7`）。**DateLabel の存在自体をハーネスで知った**（事前知識には無かった）。
- 状態の変更に LozengeDropdownTrigger（lozenge usage「inline status switcher」）。
- 成否は Flag、失敗は自動で消さない（`web/components_flag_usage.txt:35`）。メッセージの種類と部品の対応表（`cli/10-docs-page.log:41-49`）。
- 権限の無い操作はボタンを無効化しない（`web/components_button_usage.txt:37-38`）。
- 文言：「please」「sorry」を避ける、原因が分からないなら作らない（`mcp/01-guidelines-all.log:1540`・`:1471`）。日付は i18n API（`cli/08-docs-navigation.log:19`）。
- 公式 lint が placeholder の禁止、SectionMessage の見出しレベル、URL 欄の autoComplete、DropdownMenu の `shouldRenderToParent`、`<img>` の置き換えを指摘し、すべて直した。

答えてくれなかった・誤っていたこと：

- 状態ごとの色の割り当て（アイデア／執筆中／レビュー中／公開済み／取りやめ）の対応表は無い。semantic を使えと言うだけ。
- 日本語の文言の規約は無い（すべて英語前提。「sentence case」「‘to’ not hyphens」は日本語に直接は当てはまらない）。
- CLI の docs 取り違え（navigation → 日付）、`ads_plan` の必須パラメータの不一致、lint 文面と型の不一致（上記）。
- CLI の Lozenge の例が `appearance="inprogress" isBold` だが、props 一覧に `isBold` は無い（`cli/20-component-Lozenge.log`）。

## 4. AI（自分）が自発的にハーネスを使ったか

- 今回は手順として「情報構造を決める前にハーネスを読む」と指示されていたので、**最初の調査は指示による**。
- 実装中に自発的に引いたのは：DateLabel・LozengeDropdownTrigger の props（CLI `component`）、Tabs・Modal・Drawer・Inline edit の usage（入力の形を決めるとき）、Flag の usage（自動で消すかどうか）、lint（実装後）。
- 一方、画面の分け方を決める段階では、ハーネスに答えが無いと分かった後は自分の判断に切り替え、ハーネスは後から「禁止事項に触れていないか」の確認に使った（`decision-checklist.md` の「時期」列）。

## 5. 「ADS らしさ」

- 出たもの：Atlassian 製品と同じ外枠（左の side nav・上の top nav・ページ見出し＋パンくず）、Lozenge／DateLabel／SectionMessage／Flag の使い分け、Atlassian Sans とトークンの色。見た目は Jira・Confluence に近い。
- 出なかったもの：情報の組み立て方（何を主役にするか）には ADS 固有のものは無く、ここは誰が作っても同じ一般論になる。
- 自前の CSS は `cssMap` で 5 ファイル・12 個のスタイルだけ（`design-decisions.md`「実装中の変更」）。

## 6. 公式 lint の最終結果

- 設定：`eslint.config.js`（`@atlaskit/eslint-plugin-design-system` の `recommended/flat`）。
- 最初：0 errors / 16 warnings（`harness-logs/lint-first.log`）。
- 最終：**0 errors / 0 warnings**（`npx eslint src --max-warnings 0`、`harness-logs/lint-final.log`）。
- 例外 1 件：`RouterLink.tsx` の `<a>`（ADS の Link が呼び出す側の部品なので、ADS の Link を使うと再帰する）。`eslint-disable-next-line` と理由のコメントを付けた。

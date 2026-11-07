# ハーネス利用ログ（索引）

情報構造を決める**前**に、ADS の AI 向けハーネスを導入・起動し、画面設計・情報構造・パターンに関する記述を探した記録。
すべて 2026-11-07 にこのセッションで実行した。出力は各ファイルにそのまま保存してある（Web ページは HTML をテキスト化したもの）。

## 1. llms.txt 系（https://atlassian.design/llms.txt と配下）

| ファイル | 取得元 | 目的 | 分かったこと |
| --- | --- | --- | --- |
| `llms.txt` | /llms.txt | 入口。どんな文書セットがあるか | 文書セットは tokens / primitives / components / styling / a11y / content / full。**「patterns」「レイアウト」「情報構造」のセットは無い**（llms.txt 1〜158 行） |
| `llms-components.txt` | /llms-components.txt | 部品の API | 10,475 行。各部品の props と短い Best practices。画面の分け方の記述は無い |
| `llms-primitives.txt` `llms-tokens.txt` `llms-styling.txt` | 同名 | レイアウト部品・トークン・スタイル規約 | Box/Stack/Inline と token の使い方 |
| `llms-a11y.txt` | /llms-a11y.txt | アクセシビリティ | WCAG 2.1 AA の修正パターン |
| `llms-content.txt` | /llms-content.txt | 文言の規約 | 英語の文体規約が中心 |
| `llms-full.txt` | /llms-full.txt | 全文 grep 用 | `grep -i "information architecture\|dashboard\|kanban\|empty state\|pattern"` → IA・画面構成の記述は 0 件。"pattern" は ARIA・skeleton・spacing の文脈のみ |

## 2. 公式 CLI `@atlaskit/ads-cli@0.11.1`（`cli/`）

導入：`npm i @atlaskit/ads-cli@0.11.1`（scratchpad に置いて `npx ads-cli` で実行）。

| ログ | コマンド | 目的 | 結果 |
| --- | --- | --- | --- |
| `cli/00-help.log` | `--help` | 何ができるか | search / component / token / icon / lint-rules / docs / init |
| `cli/01-docs-list.log` | `docs` | docs のトピック | foundations / a11y / migration の 3 系統だけ |
| `cli/02`〜`06` | `search layout\|navigation\|empty state\|page\|pattern` | 画面設計の文書を探す | `pattern` は **No results**。`layout` → Grid 文書、`page` → メッセージ文書 |
| `cli/07-docs-layout.log` | `docs layout` | 画面のグリッド | fixed-wide / fixed-narrow / fluid の使い分け表（210〜212 行） |
| `cli/08-docs-navigation.log` | `docs navigation` | ナビゲーションの考え方 | **中身は「日付と時刻の書き方」**。ナビの文書ではない（検索の取り違え） |
| `cli/09-docs-empty-state.log` | `docs empty state` | 空の表示 | 空状態の書き方（＋なぜか Color 文書が連結） |
| `cli/10-docs-page.log` | `docs page` | ページ | 中身は「メッセージの種類と部品の選び方」表（41〜49 行） |
| `cli/11-search-*.log` | `search <語> --type docs` | dashboard / filter / permission など | dashboard・filter・permission は 0 件 |
| `cli/12`〜`16` | `docs error messages` など | 失敗・成功・注意の文言 | 部分一致で別文書が連結されて返る |
| `cli/20-component-*.log` `cli/21-*` | `component <名前>` | 部品の props と例 | TopNav / PageHeader / Lozenge / DateLabel / Flag / Modal など |
| `cli/30-component-all.log` | `component --all` | 部品一覧 | |
| `cli/31-lint-rules.log` | `lint-rules` | lint ルール一覧 | |
| `cli/40-init.log` `cli/40-init-AGENTS.md` | `init`（使い捨て git リポジトリで実行） | AI 向けスキルの導入 | `@atlassian/skills` は社内限定で**入らない**。AGENTS.md（MCP の設定例）だけ生成 |

## 3. 公式 MCP（`mcp/`）

リモート `https://mcp.atlassian.com/v1/ads/public/mcp` に `@modelcontextprotocol/sdk` の Client（StreamableHTTP）で接続できた。
比較のため `@atlaskit/ads-mcp@1.12.5` をローカル（stdio）でも起動した。呼び出しスクリプトは下記。

| ログ | 呼び出し | 目的 | 結果 |
| --- | --- | --- | --- |
| `mcp/00-remote-list.log` | listTools | ツール一覧 | 20 ツール。prompts / resources は無し（-32601） |
| `mcp/06-local-list.log` | listTools（ローカル） | 差分 | ローカルだけ `ads_analyze_localhost_a11y` がある |
| `mcp/01-guidelines-all.log` | `ads_get_guidelines {}` | foundations 全文 | 5,477 行。見出しを全部見ても IA・画面構成・ナビの節は無い。メッセージ（error/success/warning/info/empty）・文体・色・グリッドはある |
| `mcp/02-guidelines-ia.log` | `ads_get_guidelines` terms=[navigation, information architecture, page layout, dashboard, list view, table, calendar] | IA の記述を探す | 日付・グリッド・色の文書が返るだけ |
| `mcp/03-guidelines-messages.log` | terms=[error message, …] | 文言 | エラー・成功・注意の書き方 |
| `mcp/04-plan.log` | `ads_plan`（atlaskitComponents 省略） | 部品候補 | **入力検証エラー**（説明では省略可なのに必須） |
| `mcp/07-plan-retry.log` | `ads_plan`（`atlaskitComponents: []`） | 部品候補 | 18 部品・5 アイコン・4 トークン |
| `mcp/05-search-components.log` | `ads_search_components` terms=[dashboard, list view, board, timeline, calendar view, navigation, sidebar] | ビューの型を探す | Pagination / Focusable / Calendar / InlineEdit / AvatarItem。ビューの型の答えは無い |

```js
// mcp.mjs（scratchpad に置いて実行。node mcp.mjs remote|local <tool|list> '<json>'）
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
// remote: new StreamableHTTPClientTransport(new URL("https://mcp.atlassian.com/v1/ads/public/mcp"))
// local : new StdioClientTransport({ command: "node", args: ["node_modules/@atlaskit/ads-mcp/index.js"] })
```

## 4. atlassian.design の文書（`web/`）

HTML を取得してテキスト化した（サーバー描画なので本文が取れる）。

| ファイル | ページ | 目的 | 効いた記述 |
| --- | --- | --- | --- |
| `web/components_navigation-system_layout_usage.txt` | Layout usage | 画面の外枠 | top nav / side nav / main / panel。**side nav の項目の作り方は「Atlassians only」で非公開** |
| `web/components_navigation-system_layout_examples.txt` | Layout examples | 同上 | 390px 以下で side nav が重なる表示になる |
| `web/components_page-header_usage.txt` | Page header | 各画面の頭 | 「Use one page header per page」 |
| `web/components_button_usage.txt` | Button | 主ボタン | 「Only include one primary button … in a page or area」「Avoid disabling buttons」「buttons for actions and links for navigation」 |
| `web/components_modal-dialog_usage.txt` | Modal | 入力の形 | 「Don't use a modal dialog for complex interactions」 |
| `web/components_drawer_usage.txt` | Drawer | 入力の形 | 「We are planning on deprecating Drawer. Please use Modal instead」 |
| `web/components_dynamic-table_usage.txt` | Dynamic table | 一覧と編集 | 「Use a modal dialog or dedicated page for entering content」 |
| `web/components_lozenge_usage.txt` | Lozenge | 状態の表示 | 状態は lozenge、分類は tag。意味のある色は semantic |
| `web/components_date-label_usage.txt` | Date label | 遅れ・近い | 「Use the assigned icons for semantic appearances like an overdue date」 |
| `web/components_tabs_usage.txt` | Tabs | 切り替え | 「Don't use tabs to navigate to different pages」 |
| `web/components_flag_usage.txt` | Flag | 成否 | 「Never use auto dismiss flags for any critical warning or error」 |
| `web/components_empty-state_usage.txt` | Empty state | 空・404 | 「not found errors, may also fit this component layout」 |
| `web/components_section-message_usage.txt` `web/components_banner_usage.txt` | Section message / Banner | 遅れ・抜けの知らせ | banner はサイト全体の重大事のみ。section message は「they need to take action」 |
| `web/components_inline-edit_usage.txt` | Inline edit | 入力の形 | 「Don't use inline edit inside of a form」 |
| `web/components_avatar-group_usage.txt` | Avatar group | 共著 | label で人の集合を説明 |
| `web/foundations_content_designing-messages_*.txt` | Error / Empty state messages | 文言 | |
| `web/amp.txt` | AMP Patterns | 「パターン」と名の付く唯一の公開ページ | 人とエージェントの協働のパターンで、今回の情報構造には関係しない |

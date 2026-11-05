# ハーネスの実行ログ

`@primer/mcp` v1.1.2（`npx @primer/mcp@latest` と同じパッケージを devDependencies に固定）を、`scripts/mcp-client.mjs`（`@modelcontextprotocol/sdk` の stdio クライアント）から呼んだ記録です。各ファイルの先頭に、引数・エラーかどうか・所要時間・文字数を書いています。`calls.jsonl` は全呼び出しの台帳です（`tools/list` を除く 101 回）。

| 番号 | 何のために呼んだか | ツール | 回数 |
| --- | --- | --- | --- |
| 00 | サーバー情報とツール一覧（20 ツール。prompts／resources は未実装、instructions は空） | `tools/list`、`prompts/list`、`resources/list` | 1 |
| 01–08 | 実装前の基礎：規約、導入手順、トークンの考え方、色・文字、パターンと部品の一覧 | `primer_coding_guidelines`、`init`、`get_design_token_specs`、`get_token_usage_patterns`、`get_color_usage`、`get_typography_usage`、`list_patterns`、`list_components` | 各 1 |
| 10 | 使う予定の 30 部品の「使い方」 | `get_component_usage_guidelines` | 30 |
| 11 | 同じ 30 部品の「アクセシビリティ」 | `get_component_accessibility_guidelines` | 30 |
| 12 | 画面に関係するパターン 11 件（Delete、Empty States、Forms、Loading、Notification message、Saving、Navigation、Degraded Experiences、Feature Onboarding、Edit、View） | `get_pattern` | 11 |
| 13–14 | props と実例（10 部品ずつ 3 回）、実例集 4 部品 | `get_component_batch`、`get_component_examples` | 3＋4 |
| 15 | トークンの検索 | `get_token_group_bundle`、`find_tokens` | 1＋7 |
| 16 | アイコン | `list_icons`、`get_icon` | 1＋2 |
| 30–33 | 公式 lint（MCP 外）：ESLint `eslint-plugin-primer-react` と stylelint `@primer/stylelint-config` の初回／最終結果 | CLI | 4 |
| 40–44 | 作った後の検査 | `lint_css`（2 回）、`review_alt_text`（2 回・失敗） | 4 |

## 注意して読むべきログ

- **`10-usage-*.md` のうち 16 件、`11-a11y-*.md` のうち 6 件は Primer のトップページ**です（本文が「The design system for GitHub」で始まる）。ガイドラインのページがない部品で、primer.style がトップへリダイレクトし、MCP がそれを「usage guidelines」として返しています。`isError` は false です。
  - 使い方が返らなかった部品：Avatar、Card、Checkbox、CounterLabel、Flash、FormControl、Header、Heading、InlineMessage、Label、Octicon、PageLayout、Spinner、Stack、StateLabel、Text
  - アクセシビリティが返らなかった部品：Avatar、Blankslate、Flash、Header、InlineMessage、Octicon
- `41-review_alt_text-*.md` は失敗しています。このツールは評価をクライアント側の LLM に依頼する（MCP の sampling）作りで、今回のクライアントはその機能を宣言していないためです。代わりに、ツールが LLM に送る問い（ソースに書かれた 1 文）に沿って、下で手作業で評価しました。
- `44-lint_css-internals.md`：`lint_css` の中身は `npx stylelint --stdin --fix` を MCP サーバーの作業ディレクトリで実行するだけです。プロジェクトに stylelint 設定がないと設定エラーになり、ある場合でも stylelint が stderr に出す理由（どのルールに違反したか）は MCP の応答に含まれません。

## review_alt_text の代わりに行った手作業の評価

ツールが LLM に送る問い：「Does this alt text: '{alt}' meet accessibility guidelines and describe the image: {image} accurately in context of this surrounding text: '{surroundingText}'?」

| 画像 | alt | 判断 |
| --- | --- | --- |
| `public/gaji-labo-logo.svg`（ブランドバーのロゴ。外部サイトへのリンクで、新しいタブで開く） | `Gaji-Labo（新しいタブで開く）` | 適切。リンクの中の画像なので、alt がリンク名になる。行き先（Gaji-Labo）と、新しいタブで開くことの両方が伝わる。「ロゴ」という語は不要 |

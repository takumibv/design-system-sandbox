# このプロジェクトで AI エージェントが従うこと

Primer MCP の `init` が「エージェント向けの指示をプロジェクトに追加する」ことを求めているため置いている。

- UI は `@primer/react` の部品を優先する。色・余白・文字・角丸は `@primer/primitives` のトークン（CSS 変数）だけを使う。
- アイコンは `@primer/octicons-react` から選ぶ。
- `sx` prop と `Box` は使わない。部品で表せない見た目は CSS Modules に書き、ファイル先頭のコメントに理由を書く。
- 部品を選ぶ前に Primer MCP の `get_pattern`、`get_component_usage_guidelines`、`get_component_accessibility_guidelines` を確認する（`npm run mcp -- call <tool> '<json>'`）。
- CSS を変えたら `npm run lint:css`（Primer MCP の `lint_css` と同じ stylelint 設定）、TSX を変えたら `npm run lint`（eslint-plugin-primer-react）。
- 状態を足したら `states.json` に追加し、`npm run capture` で axe と横はみ出しを確かめる。
- 文言は日本語。

# llms.txt / DESIGN.md の有無の確認（2026-11-05）

`curl -sIL` で確認した結果。

| URL | 結果 |
| --- | --- |
| https://primer.style/llms.txt | 404 |
| https://primer.style/product/llms.txt | 404 |
| https://primer.style/llms-full.txt | 307 → `/`（トップへリダイレクト。実体なし） |
| https://primer.style/DESIGN.md | 307 → `/`（同上） |

`node_modules/@primer/*` 内にも `llms*.txt`・`DESIGN.md`・`AGENTS.md`・`*.instructions.md` は見つからなかった（`find -maxdepth 3`）。
`@primer/react/generated/components.json` と `hooks.json` は存在する（MCP の list_components / get_component の元データと思われる＝推測）。

→ Primer の AI 向けハーネスとして実体があるのは **@primer/mcp（MCP サーバー）** と **eslint-plugin-primer-react（lint）**。

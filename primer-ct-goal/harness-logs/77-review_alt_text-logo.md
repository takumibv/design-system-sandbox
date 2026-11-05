<!-- tool: review_alt_text / args: {"image":"public/gaji-labo-logo.svg","alt":"Gaji-Labo（新しいタブで開く）","surroundingText":"ヘッダー左端のロゴ。リンクで、押すと https://www.gaji.jp/ が別タブで開く。右隣にアプリ名「CTスケジュール」"} / at: 2026-11-05T11:12:10.565Z / isError: true -->

Cannot request input 'altTextEvaluation' (sampling/createMessage): the client on this 2025-era connection did not declare the required capability

---

## 補足（手で追記）

- `review_alt_text` は、サーバー側で判定していない。MCP の新しい「input required（sampling/createMessage）」の仕組みで、
  **呼び出し元クライアントの LLM に** 次の 1 文の質問を投げ返すだけの実装だった（`node_modules/@primer/mcp/dist/server-*.js` の 1231 行付近を読んで確認）：
  `Does this alt text: '<alt>' meet accessibility guidelines and describe the image: <image> accurately in context of this surrounding text: '<surroundingText>'?`
- Primer 固有の判定基準（ルーブリック）はプロンプトに含まれていない。
- 今回のクライアント（@modelcontextprotocol/sdk 1.32.2）はこの要求に応える capability を宣言できないため、上のエラーになった。
- そこで同じ質問に**自分（エージェント）が答えた**。結果は次のとおり（ハーネスの判定ではなく、自分の判定）：
  - ロゴはリンクの中の唯一の内容なので、alt がリンク名になる。リンク先（会社サイト）と、別タブで開くことを伝える必要がある。
  - 元の alt「Gaji-Labo（新しいタブで開く）」は、ロゴの文字（Gaji-Labo）を含み、別タブで開くことも伝えている。ただし行き先が会社サイトであることは伝わりにくい。
  - → 「Gaji-Labo のサイト（新しいタブで開く）」に変更した。

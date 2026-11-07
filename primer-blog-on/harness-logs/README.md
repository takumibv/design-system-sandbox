# ハーネス利用ログ

情報構造を決める**前に**、Primer（GitHub）の公式ハーネスを導入・起動し、画面設計・情報構造・パターンに関する記述を読んだ記録。すべて 2026-11-07（作業日）に実行。

## 導入

| 手順 | コマンド | 結果 |
| --- | --- | --- |
| 1 | `npm view @primer/mcp` | 1.1.2（2 週間前公開）。bin は `mcp`、stdio 起動。 |
| 2 | `npm i -D @primer/mcp @modelcontextprotocol/sdk` | 導入できた。 |
| 3 | このセッション（Claude Code のクラウド実行）に MCP サーバーを途中追加する手段が無いため、`scripts/mcp-call.mjs` を書き、`@modelcontextprotocol/sdk` の `Client` + `StdioClientTransport` で `node_modules/@primer/mcp/bin/mcp.js` を起動して呼んだ。 | |
| 4 | `node scripts/mcp-call.mjs get_pattern '{"name":"View"}'` | **最初は `fetch failed`**（`patterns/*.md` が 23 バイト）。`get_pattern` などは実行時に primer.style を取得する作りで、Node の組み込み fetch がプロキシの環境変数を読まないため。`NODE_USE_ENV_PROXY=1` を子プロセスに渡して解決（`mcp-call.mjs` 11 行目）。 |

## 使ったツール・ページと目的

| ファイル | ツール／ページ | 目的 |
| --- | --- | --- |
| `01-list-tools.txt` | `listTools` | ハーネスに何があるかの把握（20 ツール） |
| `02-list_patterns.txt` | `list_patterns` | 画面設計・情報構造に効くパターンを探す（Scenario 9 / UI 10） |
| `03-primer_coding_guidelines.txt` | `primer_coding_guidelines` | 実装の約束（sx・Box を使わず CSS Modules） |
| `patterns/*.md`（19 本） | `get_pattern`（全パターン） | 画面の分け方・ナビゲーション・作成/編集/削除・絞り込み・空/読み込み/失敗・通知の書き方 |
| `04-list_components.txt` | `list_components` | 使える部品の一覧 |
| `usage/*.md`（27 本） | `get_component_usage_guidelines` | 部品の使い分け（DataTable／Dialog／Banner／PageHeader／SegmentedControl など） |
| `component/batch1.md` `batch2.md` | `get_component_batch` | props の確認（Label の variant、StateLabel の status、PageLayout の領域など） |
| `docs/*.md` | primer.style 文書（`scripts/fetch-doc.mjs`、MCP と同じ cheerio+turndown 方式で `<main>` を Markdown 化） | レイアウトの「ページの型」、レスポンシブ、文言（content）、Label／StateLabel の概要 |

## 気づいた誤り・不足（詳細は docs/harness-report.md）

- `get_component_usage_guidelines` は、primer.style に `/guidelines` ページが無い部品（Label、StateLabel、PageLayout、Timeline、InlineMessage、CounterLabel、AvatarStack、NavList、Spinner、SkeletonBox、ProgressBar、FormControl、Card、Header、Stack の 15 件）で、**エラーではなく primer.style のトップページ本文を返す**（`usage/Label.md` など。中身が同一であることを md5 で確認）。リダイレクト（308→307→`/`）を追ってしまうため。
- `get_pattern` はネットワーク必須。オフラインやプロキシ環境では `fetch failed` になり、パターンは一つも読めない。
- 日本語の文言についての記述は無い（content ガイドは英語の sentence case 前提）。

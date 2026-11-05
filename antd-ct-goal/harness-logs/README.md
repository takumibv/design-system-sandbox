# ハーネス利用ログ

| ファイル | 何をしたか | 目的 |
| --- | --- | --- |
| 00-npm-view-cli.txt | `npm view @ant-design/cli` / `npm view antd` | 最新版の確認（CLI 6.7.0、antd 6.7.0） |
| 01-antd-help.txt | `npx antd --help` | CLI のコマンド一覧 |
| 02-setup-dryrun.txt | `npx antd setup --client claude --mode both --dry-run` | 公式セットアップが何を書くか確認 |
| 03-skills-add.txt | `npx skills add ant-design/ant-design-cli` | **拒否された**（実行環境の権限分類器が外部コード実行として拒否） |
| 04-setup.txt | `npx antd setup --client claude --mode both --write-instructions` | **拒否された**（エージェント自身の設定書き換えとして拒否） |
| 05-SKILL.md | パッケージ同梱 skills/antd/SKILL.md の写し | 作業者が直接読んで手順に従った |
| 06-mcp-probe.jsonl | `npx antd mcp` に stdio で initialize / tools/list / prompts/list / prompts/get | MCP サーバーの動作確認 |
| 07-design-md-cli.md | `npx antd design.md` | DESIGN.md（CLI 版） |
| 08-design-md-web.md | `curl https://ant.design/design.md` | DESIGN.md（Web 版）。CLI 版とは末尾の空行 1 つだけ違う |
| 09-llms.txt | `curl https://ant.design/llms.txt` | 文書の索引 |
| spec/*.md | `curl https://ant.design/docs/spec/<name>.md` | 設計仕様 29 本 |
| 10-when-to-use.md | `npx antd info <C> --detail --format json` の whenToUse | 部品 42 種の「いつ使うか」 |
| 11-antd-list.txt | `npx antd list` | 部品一覧（List 非推奨 → Listy を確認） |
| 12-*.txt 以降 | 実装中の info/demo/lint | 実装時の参照と検査 |

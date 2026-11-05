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
| 12-info-components.jsonl / 12-deprecated-props.txt | `npx antd info <C> --detail --format json`（23 部品） | 書く前に props と非推奨 props を確認（SKILL.md の手順） |
| 13-antd-lint.txt / .json | `npx antd lint ./src` | 実装の検査（0 件） |
| 14-antd-lint-probe.txt | 誤りを仕込んだ例に `npx antd lint` | lint が何を検出し、何を検出しないかの確認 |
| 15-google-designmd-view.txt | `npm view @google/design.md` | 検査ツールの確認 |
| 16-google-designmd-lint.txt | `npx design.md lint`（antd 公式 DESIGN.md） | 公式 DESIGN.md の検査（エラー 0・警告 19） |
| 17-google-designmd-lint-project.txt | `npx design.md lint DESIGN.md`（このアプリ） | 上書き後の token の検査（エラー 0・警告 15、対比の警告 0） |
| 18-antd-usage.txt | `npx antd usage ./src` | 使っている部品の集計 |
| 19-antd-doctor.txt | `npx antd doctor` | 環境の診断（14 項目合格） |
| spec/react-*.md | getting-started / compatible-style / use-with-vite | reset.css の扱いを調べるため |

実装中には、ほかに `npx antd demo Listy`、`npx antd demo Listy rich`、`npx antd token Layout --format json` を実行した（出力は保存していないが、要点は docs/harness-report.md に記載）。

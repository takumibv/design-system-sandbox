# ハーネス利用ログ

情報構造を決める前（2026-11-07、実装着手前）に、次の順でハーネスを導入・起動して読んだ。出力はこのフォルダにそのまま保存している。

| # | 使ったもの | コマンド／URL | 目的 | 保存先 | 情報構造に使えたか |
| --- | --- | --- | --- | --- | --- |
| 1 | `@ant-design/cli` 6.7.0（devDependency） | `npx antd --help` | どんなコマンドがあるか把握 | `01-cli-help.txt` | ×（部品・トークン・lint 用。画面設計・パターンを返すコマンドは無い） |
| 2 | CLI `design.md` | `npx antd design.md` | 設計言語・原則の把握 | `02-cli-design.md` | △ 原則（Certain／Meaningful）と主ボタン 1 つ、状態色・Tag の使い分けは使えた。画面の分け方は書かれていない |
| 3 | llms.txt | `curl https://ant.design/llms.txt` | AI 向け目次。spec 配下の文書一覧を得る | `03-llms.txt` | ○ spec 文書への入口になった |
| 4 | DESIGN.md（Web 版） | `curl https://ant.design/design.md` | CLI 版との差分確認 | `04-web-design.md` | CLI 版と末尾改行以外同一（`diff` で確認） |
| 5 | 設計仕様 docs/spec 配下 29 本 | `curl https://ant.design/docs/spec/<name>.md` | ナビゲーション・データ表示・一覧・詳細・フィードバック・空・例外・結果・ワークベンチ・フォーム・ボタン・文言 | `spec/*.md` | ◎ 情報構造の判断の主な根拠（下表） |
| 6 | CLI `list` | `npx antd list` | 部品一覧（v6.7.0） | `05-cli-list.txt` | × |
| 7 | CLI `setup --help` / `--dry-run` | `npx antd setup --client claude --mode both --dry-run` | スキル・MCP の導入方法確認 | `06-`, `08-` | × |
| 8 | CLI `setup`（実書き込み） | `npx antd setup --client claude --mode both --write-instructions` | スキル・MCP をエージェントに登録 | （拒否） | 実行環境の権限設定で `.mcp.json`／`CLAUDE.md`／`.claude/skills` の書き込みが拒否された。代わりに下の 9・10 で中身を直接読んだ |
| 9 | スキル本文 | `node_modules/@ant-design/cli/skills/antd/SKILL.md` をコピー | スキルが何を指示するか | `10-skill-antd-SKILL.md` | × 「書く前に `antd info` で API を調べる」「変更後に lint」だけ。画面設計の記述なし |
| 10 | antd MCP サーバー | `npx antd mcp` を stdio で起動し `tools/list`・`prompts/list`・`prompts/get` | MCP のツールとプロンプト（`antd-page-generator` 含む）を確認 | `11-mcp-probe.json` | × 8 ツールは CLI と同じ。`antd-page-generator` プロンプトも「部品文書を先に読め」だけで、画面構成の指針なし |
| 11 | CLI `doc` / `info` | `npx antd doc <C>`、`npx antd info <C>` | 部品の「When To Use」と API | `components/*.md`, `components/info-*.txt` | △ Drawer・Calendar・Timeline・Segmented の「いつ使うか」は部品選択に効いた。List が v6.7 で非推奨（Listy へ）と分かった |
| 12 | CLI `lint` | `npx antd lint ./src` | 実装後の検査 | `12-lint-*.txt`（実装後） | — |

## spec 文書のうち、情報構造の判断に引いた箇所（行番号は `spec/*.md` のもの）

- `spec/research-workbench.md` 9行：ワークベンチは「アプリのホーム」「いま注目すべき情報を出し、重要情報への経路を短くし、高頻度タスクを直接行わせる」。55–57行：「モジュールは 5–9」「最頻の内容を最初の画面に」「役割ごとに出し分けたビュー」。→ 最初の画面を「計画」ワークベンチにし、役割で右列（要対応／あなたの担当／ログイン案内）を変える根拠。
- `spec/research-navigation.md` 44–54行：「階層はできるだけ浅く・広く」「利用経路から考える」「主題／利用者／タスクで組織する」。120–124行：トップナビは 2〜7 項目。108–112行：サイドは 6 項目超・業務系向け。33行：「ロゴを押すとホームへ戻る」。249行：一覧→詳細のドリルダウン。259行：3 階層未満ならパンくず不要。205行：「共有するページは URL に位置を残す」。
- `spec/navigation.md` 13行：「ページ遷移を最小に（1 タスクの遷移を 1〜2 回に）」。27行：トップナビの 1 階層目は 2〜7 項目。52行：他のナビで位置が分かるならパンくずは避ける。
- `spec/data-list.md` 121–126行：詳細の開き方（同ページ展開／ドロワー／独立ページ＝共有するなら独立ページ）。138–144行：右上の「新規」ボタン→フォームをポップアップ・ドロワー等で。146–152行：破線の新規ボタン。164–170行：削除の二段階確認。196–202行：空状態。
- `spec/research-list.md` 64行（照会テーブル）、74行（標準リスト：統計を添え、ワークベンチの簡易版にもなる）。
- `spec/detail-page.md` 48–60行（基本の詳細テンプレート）、106–110行（公開プロセス＝Steps）。
- `spec/data-display.md` 25–26行（表で時間・状態は折り返さない／空セルは `-`）、90–92行（Timeline は時間の流れ・予定に向く）。
- `spec/feedback.md`、`spec/research-message-and-feedback.md`、`spec/research-empty.md`、`spec/research-exception.md`、`spec/research-result.md`：状態の伝え方。
- `spec/buttons.md` 27行（ボタン群に主ボタンは最大 1）、72行（破線ボタン＝その場所に追加を促す）、88行（危険ボタン）、194–205行（ラベルは動詞・結果を書く）。
- `spec/copywriting.md`、`spec/data-entry.md`（ラジオは 5 未満）、`spec/research-form.md`（基本フォーム）、`spec/stay.md`（ページに留まる）。

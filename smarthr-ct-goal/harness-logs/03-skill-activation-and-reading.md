# スキルの起動と読んだ文書の記録

## 起動の試み
- `/plugin marketplace add kufu/smarthr-design-system` は、このクラウドセッション（エージェントからはスラッシュコマンドを実行できない）では使えなかった。
- 代替として README 記載の手順どおり clone → `plugins/smarthr-design-system/skills/` を `.claude/skills/` にコピー（`cp -rL`。`patterns/*.mdx` はシンボリックリンクなので実体化が必要だった）。
- コピー直後に Skill ツールで `component-guidelines` を呼ぶと **`Unknown skill: component-guidelines`**。
  セッション開始後に追加したスキルは、実行中のセッションには読み込まれない。
  → SKILL.md の指示（「まず component-selector.md / pattern-selector.md を読む」）に従い、ファイルを直接読んで代替した。
  次回以降のセッションでは `.claude/skills/` がリポジトリにあるので自動で読み込まれるはず（推測。未確認）。
- SKILL.md の frontmatter は `paths: ["**/*.tsx", "**/*.jsx"]`。つまり **tsx を触るまで起動条件を満たさない**設計で、
  「画面構成を決める段階」（まだ tsx が無い）では自動では効かない可能性がある（推測）。

## 読んだ順番（設計前）
1. `component-guidelines/SKILL.md`、`design-pattern-guidelines/SKILL.md`
2. `design-pattern-guidelines/pattern-selector.md`
3. patterns: `page-layout.mdx`、`visual-guidance.mdx`、`visual-grouping.mdx`、`feedback.mdx`、`delete-dialog.mdx`、
   `empty-data.mdx`、`smarthr-list.mdx`、`mobile-friendly-layout.mdx`、`spacing-layout-pattern.mdx`、`selection-component-usage.mdx`
4. `component-guidelines/component-selector.md`（基準 smarthr-ui v100.1.0。導入したのは v102.1.0）
5. components: AppHeader, Header, AppNavi, Button, PageHeading, Heading, Panel, Container, InformationPanel,
   NotificationBar, ResponseMessage, StatusLabel, ActionDialog, DefinitionList, FormControl, Select, RadioButton,
   Checkbox, Loader, NotFoundErrorScreen, AuthErrorScreen, Text, TextLink, Table, EmptyTableBody, Sidebar, Stack, Cluster
6. ハーネス外の公式ドキュメント（同リポジトリ `src/content/articles/products/contents/`）：
   `error-messages/overview.mdx`（事象・原因・対処）、`ui-text/app-writing.mdx`（ボタンは動詞終止形、見出しは名詞、「一覧」をつけない 等）
   ※ プラグインのスキルには文言（ライティング）のガイドが含まれていない。

## 読んで分かった主な指示（設計に効いたもの）
| 出典 | 指示 |
| --- | --- |
| page-layout | ヘッダー(AppHeader) → Container → 見出し領域(PageHeading＋リード文) → コンテンツ領域(セクション) |
| page-layout | モバイルでは複数カラムを避け、縦積み。横スクロールを避ける。テーブルはモバイル不適→リスト |
| visual-guidance | 重要な情報は上部・左側に（F型）。見出しの大→小で誘導 |
| visual-grouping | セクション＝見出し＋Panel。矩形は必要な箇所だけ。罫線は最終手段 |
| feedback | 操作部の近くで ResponseMessage。画面全体が切り替わる場合は NotificationBar[bold]。読み込みは Loader、ページ全体の失敗は ErrorScreen、要素の失敗は NotificationBar[error, bold] |
| delete-dialog | ActionDialog、タイトル「{オブジェクト名}の削除」、本文「以下の{オブジェクト名}を削除しますか？　この操作は元に戻せません。」、削除対象は DefinitionList、ボタン「削除」(danger)/「キャンセル」 |
| smarthr-list | 0件は「{オブジェクト名}はありません。」、人を指す場合「表示するデータはありません。」。見出しに「一覧」をつけない |
| Button [must] | Primary は1画面に最大1つ。ラベルは動詞の終止形 |
| FormControl [must] | required＋onInvalid で preventDefault、errorMessages で表示 |
| selection-component-usage | 単一選択・送信時反映・6個以上→Select、5個以下→RadioButton。即時反映→Switch |
| component-selector | ログイン失敗→AuthErrorScreen、404→NotFoundErrorScreen |

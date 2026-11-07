# ハーネス利用ログ

実行した順に、何を何のために使ったかを記録する。出力（読んだ原文）は同じディレクトリに保存した。

- `ia/*.mdx.txt`：smarthr.design の情報設計・使用性の記事（ソース原文、`cat -n` の行番号付き）
- `patterns/*.mdx.txt`：design-pattern-guidelines スキルのパターン（行番号付き）
- `components/*.md`：component-guidelines スキル（SKILL.md・選定ガイド・個別ガイド）
- `00-harness-version.txt`：取得したハーネスのコミットとプラグインのバージョン

## 1. 導入（情報構造を決める前）

| # | コマンド／ツール | 目的 | 結果 |
| --- | --- | --- | --- |
| 1 | `git clone --depth 1 https://github.com/kufu/smarthr-design-system.git`（スクラッチ領域へ） | 公式プラグインを入手する。`/plugin` はこのリモートセッションでは対話コマンドとして実行できないため、指示どおり clone で代替 | コミット `3222b543`（2026-11-06）。plugin.json の version は 0.6.0 |
| 2 | `cp -r plugins/smarthr-design-system/skills/* .claude/skills/` | スキルをプロジェクトに配置する | **つまずき**：`design-pattern-guidelines/patterns/*.mdx` はリポジトリ内 `src/content/...` へのシンボリックリンクで、コピー先ではリンク切れになった |
| 3 | `rm -rf .claude/skills && cp -rL ...` | シンボリックリンクを実体化してコピーし直す | 24 パターン（6,490 行）が読める状態になった |
| 4 | `cat .claude/skills/design-pattern-guidelines/SKILL.md pattern-selector.md` | 入口と選定表を読む | **情報設計（画面の分け方・ナビゲーション）を扱う項目は選定表に無い**ことを確認。ページレイアウト・テーブル・リスト・ダイアログ・フィードバック・権限はある |
| 5 | `find src/content -path '*information-architecture*'`（clone したリポジトリ内） | smarthr.design の情報設計の記事のソースを探す（スキルには含まれない） | `src/content/articles/products/information-architecture/` 配下に 6 記事 |
| 6 | `cat -n information-architecture/index.mdx`、`ia-outputs/index.mdx`、`user-operations-description`、`conceptual-model`、`object-model`、`view-relationship-diagram`、`main-navigation` | 情報構造を決める手順として読む（ブリーフの指示） | 5 種類のアウトプット（業務の説明→概念モデル→オブジェクトモデル→ビューの呼び出し関係→メインナビゲーション）と、概念モデル・オブジェクトモデルの「妥当性を判断する観点」表を得た |
| 7 | Read（画像）：`view-relationship-diagram.png`、`main-navigation_example.png`、`object-model_example.png` | 文章に書かれていない図の書式を確認する | ビューは「コレクション／シングル／シングル・ダイアログ」の種類＋オブジェクト名で書く。ナビは箇条書き |
| 8 | `cat -n usability/usability-checklist.mdx`、`usability/ia-review/index.mdx` | 情報設計の検査観点を得る | 使用性チェックリスト #1〜#5 が情報設計、#6〜#16 がパターン。IA レビューの観点「ビューの呼び出し関係とユーザーストーリーが一致していない」等 |
| 9 | `curl https://smarthr.design/products/information-architecture/ia-outputs/view-relationship-diagram/` | 公開サイトとソースが一致するか確認 | 本文の一致を確認（`ia/web-check-view-relationship.txt`）。サイトは HTTP 200 |
| 10 | パターンの散文抽出（コードブロックを除いて行番号付きで表示する awk）：`page-layout`、`visual-guidance`、`smarthr-table`、`smarthr-list`、`empty-data`、`access-control-pattern`、`feedback`、`delete-dialog`、`modal-ui`、`confirmation-step`、`mobile-friendly-layout`、`visual-grouping`、`multiple-inputs-field` | 画面の型（コレクション／シングル）、主ボタン、権限、状態表示、確認、期間入力の基準を得る | 本文で引用 |
| 11 | `cat component-guidelines/SKILL.md`、`component-selector.md`、`components/AppHeader.md`、`StatusLabel.md`、`DatePicker.md` | ナビゲーション部品、状態ラベル、日付入力の可否を確認 | AppHeader に `logo`/`logoHref`/`navigations`。StatusLabel は「1つのオブジェクトに複数設定しない」「インスタンスごとに異なる値を埋め込まない」。DatePicker は非推奨で Input[type=date]。Calendar は単独で使わない |

## スキルの起動について（正直な記録）

- `.claude/skills/` へのコピーはセッション開始後に行ったため、このセッションの Skill ツールの一覧には `component-guidelines`／`design-pattern-guidelines` が現れなかった。**スキルを Skill ツール経由で自動起動したのではなく、SKILL.md の指示（「必ず該当ドキュメントを読んでから」）に従って自分でファイルを開いて読んだ。**
- `paths: ["**/*.tsx", "**/*.jsx"]` による自動読み込みも、セッション内では確認できなかった。

## 2. 実装中（部品の確認）

実装中に読んだ個別ガイドは `components/` に追加で保存した（後述の harness-report.md に一覧）。

## 3. 公式 lint

`lint-logs/` を参照（eslint-plugin-smarthr、textlint-rule-preset-smarthr の実行出力）。

# 社内ブログ投稿計画（SmartHR Design System・ハーネスあり）

`brief/` のブリーフから、SmartHR Design System（smarthr-ui）と公式ハーネス（スキル・smarthr.designの情報設計の記事・公式lint）を使って、白紙から設計・実装したアプリです。

## 結論の要約

- **情報構造はハーネスの手順どおりに作った**：業務の説明 → 概念モデル → オブジェクトモデル → ビューの呼び出し関係 → メインナビゲーション。概念モデルの観点に従って「投稿予定」と「公開済みの投稿」を1つの「投稿」にまとめ、「週」はオブジェクトにせずビューのまとまりにした。
- **最初の画面は「投稿計画」で、主役は週ごとの予定**（10週）。予定のない週と、公開予定日を過ぎた投稿を、見出し領域の「確認が必要なこと」とそれぞれの週のなかで伝える（目標O1・O4）。
- **書く人の画面**でメンバーごとの公開済み・予定の本数を比べ、予定のない人を上に出す（O2）。**自分の担当**で自分の投稿を急ぐ順に並べ、最初の画面にも1行で案内する（O3）。
- 何を主役にするか・画面をいくつに分けるかは、ハーネスが答えをくれず、自分で決めた。ハーネスが効いたのは、作業の手順、概念の点検、部品と状態の基準。
- ページ上にPrimaryボタンは置かない（「追加は一覧画面の主要なアクションにはなりえない」）。遅れはStatusLabelを増やさず文字で伝える。
- 45状態 × 1440/390でaxe（WCAG 2.1 AA）違反0・横はみ出し0。eslint-config-smarthrは0 errors（警告78件はすべて多言語化の `require-i18n-text`）。
- 自前のCSSは2つ（bodyの余白と背景、ヘッダーの色。ヘッダーの既定色は白文字とのコントラストが不足）。

詳細は次の文書を参照してください。

| 文書 | 内容 |
| --- | --- |
| [docs/information-architecture.md](docs/information-architecture.md) | 情報構造（実装前に記述） |
| [docs/design-decisions.md](docs/design-decisions.md) | 目標 O1〜O4 と画面要素の対応（実装前に記述） |
| [docs/goal-evaluation.md](docs/goal-evaluation.md) | 評価の方法、目標ごとの論証、限界 |
| [docs/decision-checklist.md](docs/decision-checklist.md) | 判断チェックリスト I01〜I20 |
| [docs/harness-report.md](docs/harness-report.md) | ハーネスの導入・効き方・誤り・lint の結果 |
| [harness-logs/](harness-logs/) | 読んだハーネスの原文（行番号付き）とコマンドの記録 |
| [lint-logs/](lint-logs/) | eslint・textlint・axe・操作確認の出力 |
| [states.json](states.json)、[screenshots/](screenshots/) | 状態の一覧と撮影結果 |

## 画面構成

| 画面 | URL | 種類 | 主役 |
| --- | --- | --- | --- |
| 投稿計画（最初の画面） | `/` | コレクション（週ごとのリスト） | 週ごとの予定。見出し領域に「確認が必要なこと」 |
| 自分の担当（ログイン中のみナビに表示） | `/mine` | コレクション（リスト） | 自分が書く投稿を急ぐ順に |
| 書く人 | `/members` | コレクション（テーブル。モバイルはリスト） | メンバーごとの公開済み・予定の比較 |
| 投稿 | `/posts/:id` | シングル（1 カラム） | タイトルとステータス、公開予定日と遅れ |
| 投稿の追加・編集／公開済みにする／投稿の削除 | `?dialog=add`・`edit`・`publish`・`delete` | モーダルダイアログ | — |
| 存在しないページ | それ以外 | NotFoundErrorScreen | — |

ナビゲーション：AppHeaderのAppNaviに「投稿計画」「自分の担当」「書く人」。ロゴはGaji-Labo（押すと https://www.gaji.jp/ を新しいタブで開く）。

### 状態を URL で開く

| クエリ | 値 | 意味 |
| --- | --- | --- |
| `as` | `guest`／`member`（既定、id=1）／`editor`（id=2） | 誰として見るか |
| `state` | `loading`／`error`／`empty` | 読み込み中・読み込みの失敗・データがない |
| `dialog` | `add`／`edit`／`publish`／`delete` | ダイアログを開く（権限がなければ開かずにエラー通知） |
| `result` | `added`／`saved`／`published`／`deleted`／`login`／`save-error`／`delete-error`／`forbidden` | 操作の結果。`*-error` はダイアログのなかで失敗を表示し、その操作を失敗させる |
| `from`・`to`・`author` | 日付・メンバー id | 投稿計画の期間と書く人の絞り込み |

全45状態は `states.json` にあります。

## 部品の対応

| 用途 | smarthr-ui の部品 |
| --- | --- |
| ヘッダー・ナビゲーション | AppHeader（`navigations` に画面内移動用の要素を `elementAs` で渡す） |
| 画面タイトル・見出し・まとまり | PageHeading、Heading、Section、Panel、Stack、Cluster、Center、Container |
| 確認が必要なこと | InformationPanel（warning） |
| 遅れ・空き週・自分向けの案内・取りやめの説明 | ResponseMessage |
| ステータス | StatusLabel（アイデア grey／執筆中 blue／レビュー中 blue 強調／公開済み green／取りやめ grey） |
| 今週 | Chip |
| 書く人の比較 | Table、Th、Td |
| 投稿の情報・削除対象 | DefinitionList、DefinitionListItem |
| 期間 | Fieldset＋FormControl（`unrecommendedHide`）＋Input[type=date] |
| 書く人の絞り込み | Select |
| 入力 | ControlledFormDialog、FormControl、Fieldset、Input、RadioButton、MultiCombobox、Textarea、RequiredLabel |
| 削除 | ControlledActionDialog（Danger）、DropdownMenuButton（「操作」） |
| 操作の結果・読み込みの失敗 | NotificationBar |
| 読み込み中 | Loader |
| 戻る | UpwardLink |
| 存在しないページ | NotFoundErrorScreen |
| モバイルの判定 | useEnvironment（EnvironmentProvider） |

## 依存とサイズ

| 依存 | 版 |
| --- | --- |
| smarthr-ui | 102.1.0 |
| react／react-dom | 19.3.1 |
| react-intl | 10.2.2（smarthr-ui の peer） |
| vite／@vitejs/plugin-react | 8.3.6／6.2.1 |
| typescript | 5.9.3（eslint-config-smarthr の peer が ≤6 のため） |
| eslint／eslint-config-smarthr | 9.39.5／14.14.2 |
| textlint／textlint-rule-preset-smarthr | 15.8.0／1.38.3 |
| @axe-core/playwright | 4.14.0（撮影・検査用） |

ルーターやデータ取得の追加ライブラリは使っていません（画面内の状態を保つための小さなルーターを `src/router.tsx` に書いた）。

`npm run build` の結果：JS 666.3 kB（gzip 193.2 kB）、CSS 128.1 kB（gzip 18.8 kB）。大半はsmarthr-uiです。

## 動かし方

```sh
cd smarthr-blog-on
npm install
npm run dev            # http://localhost:5173/
npm run build          # 型チェックとビルド
npm run lint           # eslint-config-smarthr
npx textlint "docs/**/*.md" README.md
```

撮影と検査（開発サーバーを起動した状態で）：

```sh
npm run capture        # NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json
NODE_PATH=$(npm root -g) node scripts/flow-check.cjs   # 操作確認
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` と同じ内容のコピーです（`cmp` で一致を確認）。ブリーフの場所から実行すると、`@axe-core/playwright` をこのプロジェクトの `node_modules` から解決できないためです。

固定データは `brief/fixtures.ts` を直接読み込みます（今日＝2026-11-09）。保存は実装していないため、再読み込みすると初期データに戻ります。

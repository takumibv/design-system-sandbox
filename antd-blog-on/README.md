# 社内ブログ投稿計画（Ant Design v6・ハーネスあり）

`brief/` のブリーフ（要望・目標・機能要件・固定データ）だけから、画面の分け方・情報構造・主役を自分で決めて Ant Design v6 で実装したもの。判断の根拠と、それが Ant Design の AI 向けハーネスから来たのか事前知識から来たのかを `docs/` に記録している。

## 結論の要約

- **主役は「週」**。ブリーフの O1（週 1 本以上）と「予定の無い週が分かる」から、データに無い「週」を対象として導出し、最初の画面（計画）を**週ごとのタイムライン**にした。空き週は「⚠ 予定がありません」＋破線ボタン「この週に予定を入れる」、遅れは「予定日を N 日過ぎています」と文で出す。
- 画面は **計画（ワークベンチ）／投稿一覧（照会テーブル）／書く人（集計テーブル）＋投稿の詳細**、登録・編集はドロワー。上部ナビ 3 項目、2 階層。
- **ハーネスで効いたのは docs/spec 配下の設計パターン文書**（ワークベンチ・ナビゲーション・データ一覧・詳細・フィードバック・空・例外）。ホームをワークベンチにして役割で右列を出し分ける、詳細を共有用に独立ページにする、パンくずを置かない、主ボタン 1 つ、状態は Badge・分類は Tag、などはここから決まった。
- **効かなかったのは「何を主役にするか」**。週を主役にする判断、カレンダーを採らない判断、利用者と頻度の仮定はハーネスに手がかりが無く、ブリーフと事前知識で決めた。CLI・スキル・MCP（AI が自動で使う経路）には画面設計の記述が無く、spec へは llms.txt を自分で辿って着いた。
- **既定トークンのままでは WCAG AA を満たさなかった**（補助文字・リンク・状態色・Tag）。design.md の注意書きどおりトークンで既定パレットの濃い段に寄せ、axe 違反 0 にした。
- 最終結果：**公式 lint 0 件、axe（WCAG 2.1 AA）違反 0、横はみ出し 0（45 状態 × 1440/390）**。

## 画面構成

| 画面 | URL | 主役 | 主ボタン |
| --- | --- | --- | --- |
| 計画（最初の画面） | `/` | 週ごとの計画（Timeline）。上に遅れ・空き週の Alert。右列は役割別：要対応（編集担当）／あなたの担当（ログイン中）／ログイン案内（未ログイン）。下に日付未定のアイデア | 投稿予定を登録 |
| 投稿一覧 | `/posts` | 期間・状態・カテゴリ・書く人・自分の担当・遅れで絞り込める表 | 投稿予定を登録 |
| 書く人 | `/members` | 書く人ごとの公開数・予定数・遅れ・次の予定日の表＋要約 | 投稿予定を登録 |
| 投稿の詳細 | `/posts/:id` | 進み具合（Steps）と詳細（Descriptions）。編集・状態を変更・削除 | 編集 |
| 登録・編集 | 任意の画面に `?new=1`／`?edit=<id>` | ドロワーのフォーム | 登録する／保存する |
| 公開を記録 | 詳細に `?publish=1` | 公開日・記事 URL のモーダル | 公開済みにする |
| 404 | それ以外 | Result 404＋「計画に戻る」 | 計画に戻る |

情報構造の詳細は [docs/information-architecture.md](docs/information-architecture.md)、目標との対応は [docs/design-decisions.md](docs/design-decisions.md)。

## 部品の対応

| 用途 | 部品 |
| --- | --- |
| 全体 | `ConfigProvider`（jaJP、トークン）、`App`（message・modal）、`Layout`（Header・Content・Footer）、`Menu`（横）、`Grid.useBreakpoint`、`Flex`、`Row`/`Col` |
| 週ごとの計画 | `Timeline`、`Card`、`Button`（破線＝この週に予定を入れる） |
| 知らせ・権限の説明 | `Alert`（warning／info／success／error） |
| 状態 | `Badge`（status：default／processing／warning／success） |
| カテゴリ・役割 | `Tag`（blue／purple／magenta／geekblue、役割は既定色） |
| 一覧・集計 | `Table`、`DatePicker.RangePicker`（presets）、`Select`（multiple）、`Checkbox`、`Statistic` |
| 詳細 | `Steps`、`Descriptions`、`Dropdown`（状態を変更）、`Popconfirm`（削除の確認） |
| 入力 | `Drawer`、`Form`、`Input`、`Input.TextArea`、`Radio.Group`、`Select`、`DatePicker`、`Modal` |
| 状態 | `Skeleton`（読み込み中）、`Result`（読み込み失敗・403・404）、`Empty`（空） |

`npx antd usage ./src` の結果：32 部品・78 import（`harness-logs/16-cli-usage.txt`）。

## 自前のスタイル

- CSS ファイルは書いていない。読み込んでいるのは公式の `antd/dist/reset.css` だけ（body の既定 margin 8px による横はみ出し 8px を消すため）。
- テーマの変更（`src/main.tsx`）：WCAG AA のための色トークン（`colorPrimary`・`colorInfo` #0958d9、`colorError` #cf1322、`colorSuccess` #237804、`colorTextDescription`・`colorTextTertiary` 0.65、`colorTextPlaceholder` 0.55）、`Layout.headerBg`（明るい面、ロゴが暗色のため）・`headerPadding`（390px で 16px）、`Typography` の見出しサイズ（h1 24／h2 16／h3 14）と見出しの上下余白 0（余白は Flex の gap で取る）。
- インライン `style` 6 か所：横 Menu を残りの幅いっぱいに広げて「…」に畳まれないようにする（`flex:1; minWidth:0; borderBottom:none`）、ヘッダー内の Flex の高さ 100%、Content の余白（トークン `paddingLG`／`padding` の値を使用）、一覧の絞り込み Select の最小幅 180px ×3（未選択時に幅が縮んでプレースホルダーが読めなくなるため）。

## 状態の直開き

`states.json` に 45 状態を並べた（主要 4 画面 × 一般／未ログイン／編集担当、読み込み中・失敗・空、登録・編集・権限なし・保存失敗、公開の記録、削除の確認・成功・失敗、ログイン、404）。

| クエリ | 意味 |
| --- | --- |
| `as=guest\|member\|editor` | 未ログイン／一般メンバー（id=1、既定）／編集担当（id=2） |
| `state=loading\|error\|empty` | 読み込み中のまま／読み込み失敗／データが無い |
| `new=1`（`&date=YYYY-MM-DD`）、`edit=<id>` | 登録・編集ドロワー |
| `fail=save\|delete` | 保存・削除を失敗させる（実際の操作で） |
| `preview=save-failed` | 保存失敗の表示を直接出す |
| `flash=saved\|created\|deleted\|status\|login\|delete-failed` | 結果の通知を直接出す |
| `confirm=delete`、`publish=1` | 削除の確認・公開を記録を開いた状態 |
| `from=`、`to=`、`status=`、`cat=`、`author=`、`mine=1`、`overdue=1`、`undated=0` | 期間・絞り込み |

## 検査結果

- 公式 lint：`npx antd lint ./src` → No issues found（`harness-logs/12-lint-final.txt`）。
- 撮影・axe・横はみ出し：`screenshots/report.json`（`harness-logs/18-capture-final.txt`）。90 件すべて overflow 0、axe 違反なし。初回（既定トークン）の結果は `harness-logs/14-capture-first-report.json`。
- 操作の通し確認：`scripts/smoke.mjs`（登録・保存・公開の記録・削除・保存失敗・削除失敗・権限・ログイン）→ `harness-logs/17-smoke.txt`。

## 依存とサイズ

| パッケージ | 版 |
| --- | --- |
| antd | 6.7.0 |
| @ant-design/icons | 6.3.4 |
| dayjs | 1.11.23 |
| react / react-dom | 19.3.1 |
| （開発）@ant-design/cli 6.7.0、@axe-core/playwright 4.14.0、vite 8.3.6、typescript 7.0.2 | |

ルーターは入れず、History API の小さな実装（`src/lib/router.ts`）にした。

本番ビルド（`npx vite build`）：JS 1,295.87 kB（gzip 410.82 kB）、CSS 2.98 kB（reset.css、gzip 1.13 kB）、ロゴ SVG 11.38 kB。コード分割はしていない。ソースは `src/` で約 1,700 行。

## 動かし方

```sh
cd antd-blog-on
npm install
npm run dev            # http://localhost:5173
npx antd lint ./src    # 公式 lint
# 撮影・検査（開発サーバーを起動したまま。Playwright はプリインストール版）
NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json
NODE_PATH=$(npm root -g) node scripts/smoke.mjs
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` の無変更の写し（ESM の import が `NODE_PATH` を見ないため、`@axe-core/playwright` を入れたこのフォルダから実行する）。`scripts/axe-detail.mjs` はコントラスト違反を色の組で集計する調査用。

## 文書

- [docs/information-architecture.md](docs/information-architecture.md)：情報構造（実装前）
- [docs/design-decisions.md](docs/design-decisions.md)：目標 O1〜O4 と画面要素（実装前＋実装後の追記）
- [docs/goal-evaluation.md](docs/goal-evaluation.md)：目標の評価
- [docs/decision-checklist.md](docs/decision-checklist.md)：判断チェックリスト I01〜I20
- [docs/harness-report.md](docs/harness-report.md)：ハーネス報告
- [harness-logs/](harness-logs/README.md)：使ったコマンド・ページと出力

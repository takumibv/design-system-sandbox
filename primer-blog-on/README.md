# 社内ブログ投稿計画（Primer／GitHub、ハーネスあり）

ブリーフ（`../brief/`）だけを入力に、Primer（`@primer/react` 38.45、`@primer/primitives` 11.10、`@primer/octicons-react` 19.42）と公式ハーネス（MCP `@primer/mcp` 1.1.2・primer.style 文書・公式 lint）を使って、情報構造から設計・実装したもの。

## 結論の要約

- **最初に開く画面は「計画」**。主役は**週の列**で、期間内の週を 0 件でも 1 行として出し、空いた週に「予定なし」と「この週に投稿予定を登録」を置く（O1）。最上部の Banner（warning）に遅れと予定の無い週をまとめる（O4）。
- 同じ投稿予定の集まりを**週・自分・人**の 3 つの切り口でタブ（UnderlineNav）に分けた。「自分の担当」（O3）、「書く人ごと」の表で予定も公開も無い人を先頭に出す（O2）。
- 登録・編集は専用ページ、公開の記録だけダイアログ、削除は ConfirmationDialog、取りやめは確認なしの状態変更。
- **ハーネスは「部品と画面の移り方」には強く効き、「何を主役にするか・画面をいくつにするか」にはほぼ効かなかった**。時間軸（計画・予定・期日）を扱うパターンが Primer に無いため（`docs/harness-report.md`）。
- ハーネスの誤りを 1 つ確認：`get_component_usage_guidelines` が 15 部品でエラーを出さず primer.style のトップページ本文を返す。
- 45 状態 × 1440／390px で axe（WCAG 2.1 AA）違反 0・横はみ出し 0。公式 lint（eslint-plugin-primer-react recommended、@primer/stylelint-config）も 0 件。

## 文書

| ファイル | 中身 |
| --- | --- |
| `harness-logs/` | ハーネスの導入・実行記録と全出力（パターン 19 本、部品の使い方 27 本ほか） |
| `docs/information-architecture.md` | 利用者の仮定、オブジェクト、画面一覧と呼び出し関係、ナビゲーション、主役（実装前に作成） |
| `docs/design-decisions.md` | O1〜O4 を満たす画面・要素と根拠（実装前に作成、末尾に実装中の変更） |
| `docs/goal-evaluation.md` | 評価の方法・目標ごとの論証・限界 |
| `docs/decision-checklist.md` | I01〜I20 |
| `docs/harness-report.md` | ハーネスの効き方・誤り・lint 結果 |
| `docs/evidence/` | 撮影・axe の結果（1 回目・2 回目・最終）、操作確認、lint 結果 |
| `states.json`／`screenshots/` | 状態の一覧と撮影結果 |

## 画面構成

| 画面 | URL | 主役 |
| --- | --- | --- |
| 計画（タブ） | `/` | 週の列＋要対応 Banner。期間（前／次・4／8／12 週）、書く人・カテゴリで絞り込み、日付未定のアイデア |
| 自分の担当（タブ） | `/mine` | 自分の投稿：予定日あり（遅れ先頭）→ 日付未定 → 公開済み・取りやめ |
| 書く人ごと（タブ） | `/authors` | 全メンバーの表：期間内の公開／これからの予定／遅れ／最後の公開日／次の予定日 |
| 投稿予定の詳細 | `/posts/:id` | 全項目と状態。編集・状態を変更・削除（できる人にだけ表示） |
| 登録／編集 | `/posts/new`（`?date=` で予定日を初期入力）、`/posts/:id/edit` | フォーム |
| 公開を記録（ダイアログ） | `/posts/:id?dialog=publish` | 公開日・記事 URL |
| 削除の確認（ダイアログ） | `/posts/:id?dialog=delete` | 削除する対象と「投稿予定を削除」 |
| 404 | その他 | Blankslate と「計画を見る」 |

デモ用の URL：`?as=guest|member|editor`（既定は member＝佐藤 美咲。editor＝高橋 健太）、`?state=loading|error|empty`、`?error=save|delete|validation`（その状態で開く）、`?fail=save|delete`（操作すると失敗する）、`?result=created|saved|published|status|deleted|loggedin|loggedout`。全状態は `states.json`。

## 部品の対応

| 用途 | 部品 |
| --- | --- |
| ページの骨組み・見出し | PageLayout、PageHeader（Title／Actions／Navigation／ParentLink） |
| タブ | UnderlineNav（`counter` 付き） |
| 状態・遅れ・担当・予定なし | Label（secondary／accent／attention／done／default、danger、primary） |
| 要対応・操作の結果・保存/削除の失敗 | Banner（warning／success／info／critical） |
| 空・失敗・権限なし・404 | Blankslate（experimental） |
| 読み込み中 | SkeletonText、Table.Skeleton |
| 期間 | Button、SegmentedControl |
| 絞り込み・状態の変更 | ActionMenu＋ActionList（single select） |
| 書く人ごとの表 | DataTable、Table.Container／Title／Subtitle、ScrollableRegion |
| フォーム | FormControl、TextInput、Select、CheckboxGroup＋Checkbox、Textarea、FormControl.Validation |
| 公開の記録・削除の確認・破棄の確認 | Dialog、ConfirmationDialog |
| 配置 | Stack |
| アイコン | @primer/octicons-react |

自前の CSS は 3 ファイル（アプリ見出し・週の箱と行・詳細の項目一覧）。理由は `docs/harness-report.md` §6。

## 依存とサイズ

- 実行時：`@primer/react` 38.45.0、`@primer/primitives` 11.10.0、`@primer/octicons-react` 19.42.0、`react`／`react-dom` 18.3.1、`react-router-dom` 6.30.6。
- 開発：vite 8.3.6、typescript 5.9.3、eslint 9＋typescript-eslint＋eslint-plugin-primer-react 9.4.0、stylelint 16＋@primer/stylelint-config 13.6.0、@axe-core/playwright 4.14.0、@primer/mcp 1.1.2、@modelcontextprotocol/sdk 1.32.2。
- `vite build` の出力：JS 885.35 kB（gzip 223.11 kB）、CSS 318.74 kB（gzip 45.58 kB）、ロゴ SVG 11.38 kB。コード分割はしていない。

## 動かし方

```sh
cd primer-blog-on
npm install
npm run dev            # http://localhost:5173
npm run lint           # eslint-plugin-primer-react
npm run lint:css       # @primer/stylelint-config
npm run capture        # dev サーバー起動中に。states.json を 1440/390px で撮影し axe・横はみ出しを検査 → screenshots/
NODE_PATH=$(npm root -g) node scripts/smoke.cjs   # 登録・状態変更・公開・削除・権限の操作確認
node harness-logs/scripts/mcp-call.mjs list       # Primer MCP のツール一覧（get_pattern 等はネットワークが要る）
```

データは画面内の状態だけで持ち、再読み込みで fixtures に戻る（ブリーフ「データの保存は実装しなくてよい」）。

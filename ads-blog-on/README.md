# 社内ブログ投稿計画（Atlassian Design System 版・ハーネスあり）

ブリーフ（`../brief/`）の要望・目標・機能要件だけから、Atlassian Design System（ADS）の部品 `@atlaskit/*` を使って白紙から設計・実装したもの。ADS の AI 向けハーネス（llms.txt・公式 CLI・公式 MCP・atlassian.design の文書）を、情報構造を決める前に読んだ。

## 結論の要約

- **最初の画面は「投稿計画」：週ごとの区画を縦に並べ、予定の無い週も「空いた枠」として出す。** その上に「遅れ 1 件・予定の無い週 3 週」と「あなたの次の締切」をまとめた。これで O1（週 1 本）と O4（遅れ・抜けに早く気づく）に答える。
- 「自分の担当」（O3）と「書く人ごと」（O2、表）を別の画面にし、side nav で切り替える。登録・編集は専用画面、削除の確認と公開日の記録はダイアログ。
- **ハーネスは情報構造（画面の分け方・主役・ナビの項目）にはほとんど効かなかった。** 該当する文書が公開されていない（side nav の資料は Atlassian 社内限定、patterns のセットも無い）。効いたのは「入力はモーダルか専用画面」「タブで画面を移らない」「1 画面 1 見出し・主ボタン 1 つ」といった制約。
- **部品・状態・文言の判断にはよく効いた**：状態＝Lozenge／分類＝Tag、遅れ＝DateLabel danger、成否＝Flag（失敗は自動で消さない）、ボタンを無効化しない、「すみません」を書かない。
- 検査：46 状態 × 1440px／390px で axe（WCAG 2.1 AA）違反 0、横はみ出し 0。公式 lint 0 errors / 0 warnings。
- ハーネスの誤り・不足：CLI の `docs navigation` が日付の文書を返す、MCP `ads_plan` の必須引数が説明と違う、lint の文面と型が食い違う、React 18 限定・StrictMode で Modal が空になる、Layout が内部スクロールで全画面撮影が切れる（詳細は `docs/harness-report.md`）。

## 文書

| ファイル | 中身 |
| --- | --- |
| `harness-logs/README.md` | ハーネスで何を何のために使ったか（出力はすべて保存） |
| `docs/information-architecture.md` | 情報構造（実装前に記述） |
| `docs/design-decisions.md` | 目標 O1〜O4 と画面・要素の対応、実装中の変更 |
| `docs/decision-checklist.md` | 判断チェックリスト I01〜I20 |
| `docs/goal-evaluation.md` | 目標の評価（方法・論証・限界） |
| `docs/harness-report.md` | ハーネスの効き方の報告、公式 lint の最終結果 |
| `states.json` | 直接開ける状態の一覧（46 件） |

## 画面構成

```
top nav : [メニュー開閉] [Gaji-Labo ロゴ → gaji.jp を新しいタブ]          [Slack でログイン | 名前▼(役割の切替・ログアウト)]
side nav: 投稿計画 / 自分の担当 / 書く人ごと
main    :
  /                 投稿計画      要対応（遅れ・予定の無い週・次の締切）＋ 週ごとの予定 ＋ 日付未定
  /me               自分の担当    これから公開（遅れ→近い順→未定）／公開済み／取りやめ
  /members          書く人ごと    メンバー × 公開済み・予定・最後の公開・次の予定・超過 の表
  /members/:id      メンバーの投稿
  /posts/:id        投稿の詳細    状態の変更（Lozenge のドロップダウン）・編集・削除
  /posts/new        登録（専用画面）   /posts/:id/edit 編集
  それ以外          見つからない
ダイアログ: 削除の確認（?dialog=delete）、公開の記録（?dialog=publish）
```

URL のクエリ：`as=guest|member|editor`（未ログイン／佐藤 美咲 id=1／高橋 健太 id=2）、`state=loading|error|empty`、`flag=created|saved|deleted|save-error|delete-error|login|logout|published`、`dialog=delete|publish`、`from`・`to`（期間）、`date`（登録時の公開予定日）、`validate=1`（入力の誤りを表示）、`fail=save|delete`（次の保存／削除を 1 回失敗させる）。

## 部品の対応

| 用途 | ADS の部品 |
| --- | --- |
| 外枠・ナビ | `@atlaskit/navigation-system`（Root・TopNav・SideNav・Main・LogIn）、`@atlaskit/side-nav-items`（LinkMenuItem・MenuList） |
| 画面の頭 | `@atlaskit/page-header`、`@atlaskit/breadcrumbs` |
| 状態 | `@atlaskit/lozenge`（Lozenge・LozengeDropdownTrigger） |
| カテゴリ | `@atlaskit/tag`（SimpleTag） |
| 予定日・遅れ・近い | `@atlaskit/date-label` |
| 書く人ごとの表 | `@atlaskit/dynamic-table` |
| 遅れ・抜け・閲覧のみ・読み込み失敗・入力誤りの要約 | `@atlaskit/section-message` |
| 成否・ログイン | `@atlaskit/flag`（Flag・AutoDismissFlag・FlagGroup） |
| 削除確認・公開の記録 | `@atlaskit/modal-dialog` |
| 空・404・権限なし | `@atlaskit/empty-state` |
| 読み込み中 | `@atlaskit/skeleton`、`@atlaskit/spinner` |
| 入力 | `@atlaskit/form`（Label・Fieldset・HelperMessage・ErrorMessage・FormFooter）、`textfield`、`textarea`、`select`、`radio`、`datetime-picker` |
| ボタン・リンク | `@atlaskit/button`（Button・LinkButton・ButtonGroup）、`@atlaskit/link`、`@atlaskit/dropdown-menu` |
| レイアウト・文字 | `@atlaskit/primitives/compiled`（Box・Stack・Inline・Text）、`@atlaskit/heading`、`@atlaskit/css`（cssMap）、`@atlaskit/tokens`、`@atlaskit/image` |

自前の CSS：`cssMap` だけで 5 ファイル・12 個のスタイル（色・余白はすべてトークン。トークンでない値は最大幅 1296px／864px と dl の列幅だけ）。CSS ファイル・style 属性は無し。理由は `docs/design-decisions.md`「実装中の変更」。

## 依存とサイズ

- 直接の依存：`@atlaskit/*` 37 パッケージ＋`react`／`react-dom` 18.3.1（`@atlaskit/navigation-system` が React 18 のみ対応）＋`react-router-dom` 6＋`@compiled/react`。
- 開発用：Vite 6、TypeScript 5.8、`@compiled/vite-plugin`・`@compiled/babel-plugin`（cssMap のビルド時変換）、ESLint 9＋`@atlaskit/eslint-plugin-design-system`、`@axe-core/playwright`。
- `node_modules`：約 414MB（250 項目）。
- 本番ビルド（`npx vite build`）：`dist` 1.8MB。JS 合計約 1.56MB（主チャンク 1,251KB／gzip 360KB）、CSS 約 119KB（gzip 約 26KB）。コード分割はしていない。

## 動かし方

```bash
cd ads-blog-on
npm install
npm run dev          # http://localhost:5173
npx tsc -b           # 型検査
npm run lint         # 公式 lint（recommended）

# 撮影と検査（別の端末で dev を起動しておく）
APP_URL=http://localhost:5173 NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json       # ブリーフのスクリプト（同内容のコピー）
APP_URL=http://localhost:5173 NODE_PATH=$(npm root -g) node scripts/capture-full.mjs states.json  # 補助：内容の全体を撮る
```

- `scripts/capture.mjs` は `brief/scripts/capture.mjs` と同じ内容（`cmp` で一致を確認）。`brief/` の場所から実行すると `@axe-core/playwright` を解決できないため、ここに置いた。
- 結果は `screenshots/report.json`（axe・横はみ出し）、画像は `screenshots/*.png`（上から 900px）と `screenshots/full/*.png`（全体）。
- データは画面内の状態だけで、再読み込みで固定データに戻る。

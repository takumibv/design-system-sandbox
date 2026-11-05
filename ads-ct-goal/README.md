# CTスケジュール — Atlassian Design System（ADS）版

`brief/` のブリーフから、Atlassian Design System（`@atlaskit/*`）で白紙から設計・実装したもの。あわせて、ADS の AI エージェント向けハーネス（llms.txt・公式 CLI・公式 MCP・公式 lint）が設計にどこまで効くかを調べた。

## 結論の要約

- **主役は「今週のあなたの相手」カード 1 枚。** 相手の名前とページ唯一の primary ボタン「ハドルを始める」が、1440px でも 390px でもスクロールなしで見える（名前の下端 281px／365px、ボタン 375px／459px）。ハドル開始はクリック 1 回。
- **ハーネスは部品レベルの判断によく効き、画面構成には効かなかった。** 通知の使い分け（Flag／SectionMessage／EmptyState／Modal、Banner は使わない）、フォームの作法、Lozenge の色＋文字、別タブリンクの扱い、アイコンの選択はハーネスの指示どおり。主役の選定と画面の分け方は自分の判断で、ハーネスに出典は無い。
- **ハーネスの記述と実際のパッケージがずれている箇所が多い**（`button/new` の非推奨化、React 19 対応、Avatar の頭文字、lint の修正案と型の不一致、公式 lint 設定がそのままでは起動しないなど）。最終的な正しさは型定義と実行で確かめた。
- 検査：axe（WCAG 2.1 AA）は 18 状態 × 2 幅の 36 画面すべて違反 0、横はみ出し 0。ADS 公式 lint は推奨設定 0 件、全ルールで警告 4 件（理由つきで保留）。
- 目標の自己評価：G1・G2・G7 ◎、G3〜G6 ○（`docs/goal-evaluation.md`）。

## ドキュメント

| ファイル | 内容 |
| --- | --- |
| [docs/harness-report.md](docs/harness-report.md) | **主目的**：使ったハーネス、導入手順とつまずき、設計判断ごとの出典、答えてくれなかったこと・誤り、ADS らしさ |
| [docs/design-decisions.md](docs/design-decisions.md) | 設計の意図（実装前の下書き＋実装後の追記）：主役、画面ごとの判断、通知の使い分け、色、文言、決まっていないことの決め方、自前 CSS、妥協点 |
| [docs/goal-evaluation.md](docs/goal-evaluation.md) | 目標 G1〜G7 の評価方法・論証・限界 |
| [docs/measurements.json](docs/measurements.json) | 操作回数・位置・スクロール量の計測値（`scripts/measure.cjs`） |
| [states.json](states.json) | 状態 S01〜S18 を開く URL |
| `screenshots/` | `Sxx-1440.png`／`Sxx-390.png` と axe・はみ出しの結果 `report.json` |
| `harness-logs/` | llms.txt、CLI、MCP、lint の生の出力 |

## 画面構成

画面は 3 つと 404。月曜に数十秒だけ見る用途が中心なので、画面は少なく、トップに主役を置いた。

| 画面 | URL | 内容 |
| --- | --- | --- |
| 組み合わせ（トップ） | `/` | ① 今週のあなたの相手（主役カード：相手・14:00・「ハドルを始める」・ハドルの場所）② あなたの今後の予定（4 週分を 1 週 1 行、次のお休み）③ 今週の全ペア（各ペアにハドル導線、お休みの人）④ 今後の予定（週ごと、「予定」と組み直しの注記、祝日は「CT なし」と祝日名）。未ログイン時は主役の場所にログインの案内 |
| メンバー | `/members` | 社員番号順の一覧（参加／不参加／初回設定が未完了を Lozenge で）、参加・不参加の人数、自分の行に「設定を変更」、他の人に「削除」→ 確認 Modal → 結果の Flag |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・CT に参加する。参加を変えると保存前に警告。初回ログインした人はトップの代わりに「はじめての設定」 |
| 404 | その他 | EmptyState と「組み合わせを見る」 |

共通ヘッダー：Gaji-Labo のロゴ（別タブで開くことをアイコンと読み上げ文で示す）、サービス名、ナビ（今いる画面を選択状態と `aria-current` で表示）、ログイン中の人のアバターと名前・ログアウト、または「Slack でログイン」。

### 状態 S01〜S18

`?state=Sxx` で直接開ける（一覧は `states.json`）。例：`/?state=S03`（自分が今週お休み）、`/members?state=S13`（削除の確認中）、`/settings?state=S16`（初回設定で未入力のまま送信）。

## 部品の対応

| 用途 | ADS の部品 |
| --- | --- |
| レイアウト・文字 | `@atlaskit/primitives/compiled`（Box、Stack、Inline、Flex、Text、Anchor）、`@atlaskit/heading`、`@atlaskit/css`（cssMap）、`@atlaskit/tokens` |
| ボタン・リンク | `@atlaskit/button/default/button`、`@atlaskit/button/link`（ナビ・画面内の移動）、`@atlaskit/link` |
| 人 | `@atlaskit/avatar`（`AvatarContent` を頭文字＋accent 色に差し替え） |
| 状態 | `@atlaskit/lozenge` |
| 通知 | `@atlaskit/section-message`、`@atlaskit/flag`（FlagGroup、AutoDismissFlag）、`@atlaskit/modal-dialog`、`@atlaskit/empty-state`、`@atlaskit/spinner` |
| フォーム | `@atlaskit/form`（Field、CheckboxField、HelperMessage、ErrorMessage、RequiredAsterisk）、`@atlaskit/textfield`、`@atlaskit/select`、`@atlaskit/checkbox` |
| アイコン | `@atlaskit/icon/core/*`（headphones、log-in、link-external、status-*） |
| 画像 | `@atlaskit/image` |

## ADS の制約（この実装で確かめたもの）

- **React 18 が必要**：上位部品は React 19 対応をうたうが、内部の `@atlaskit/analytics-next`・`@atlaskit/portal` が `react-dom ^18.2.0` を要求し、React 19 では実行時エラーになった。`@atlaskit/navigation-system`（ADS のアプリ外枠）も React 18 のみ。
- **ビルド時の変換が必要**：`@atlaskit/css` の `cssMap`／`xcss` は Compiled の babel 変換が必須。Vite 8 では `@rolldown/plugin-babel` ＋ `@babel/core` 7 ＋ `@atlaskit/tokens/babel-plugin` ＋ `@compiled/babel-plugin@2` で通した。メディアクエリのキーに `media.above.*` を使えず文字列で直書き。
- **アイコンの CJS**：`@atlaskit/icon/core/*` は CJS のみで、Vite 8 では `legacy.inconsistentCjsInterop: true` が必要だった。
- **アプリの外枠**：トップナビの部品は `navigation-system`（React 18・カタログ外）なので、primitives でヘッダーを自作した。
- **頭文字のアバター**：Avatar は画像が無いと人型アイコンになる。頭文字は自作。
- **英語の固定文言**：Modal の閉じるボタン・SectionMessage のアイコンは差し替えた。`RequiredAsterisk` の title、フォームのエラーアイコン、Select の "open" は差し替えられない。
- **StrictMode**：開発時、初回描画から開いている Modal／Flag が表示されなかったため外した。

## 依存とサイズ

- 実行時の依存：`react`／`react-dom` 18.3.1 と `@atlaskit/*` 20 パッケージ（`package.json`）。ハーネス用（`@atlaskit/ads-cli`、`@modelcontextprotocol/sdk`）は `tools/` に分けた（ADS MCP が独自の Playwright を持ち込み、撮影用の Playwright と衝突したため）。
- 本番ビルド（`vite build`）：メインの JS 881.9 kB（gzip 256.7 kB）、CSS 107.7 kB（gzip 22.4 kB）。ほかにテーマ（ライト／ダーク／高コントラスト等）の JS が遅延読み込みで約 20 kB ずつ。`dist/` 全体 1.4 MB。画面 3 つのアプリとしては大きい。

## 動かし方

```bash
cd ads-ct-goal
npm install
npm run dev                     # http://localhost:5173/?state=S01
npm run build && npx vite preview --port 4173

# 検査
npm run lint                    # ADS 推奨 lint（0 件）
npm run lint:all                # ADS 全ルール（警告 4 件）
APP_URL=http://localhost:4173 npm run capture   # 撮影・axe・横はみ出し（ブリーフの capture.mjs の無改変コピー）
APP_URL=http://localhost:4173 npm run measure   # G1〜G6 の計測

# ハーネス
(cd tools && npm install)
npx --prefix tools ads-cli component Button
node tools/mcp-client.mjs list
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` と同一（`cmp` で確認）。ESM の import 解決のため、`@axe-core/playwright` を入れたこのディレクトリに置いた。Playwright はプリインストール版（`NODE_PATH=$(npm root -g)`）を使う。

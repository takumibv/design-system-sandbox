# CTスケジュール（Atlassian Design System・ハーネスなし版）

`brief/` のブリーフから、Atlassian Design System（ADS、`@atlaskit/*`）で白紙から設計・実装した版です。**ADS の AI 向けハーネス（llms.txt・ads-cli・ADS MCP・atlassian.design の文書・公式 lint）を使わずに**作りました。判断材料はブリーフ、`node_modules` の型定義と同梱 README、自分の事前知識だけです（公式 lint は実装確定後の事後計測にだけ使用）。

## 結論の要約

- トップの最初の 1 画面に「今週のあなたの相手」カードと唯一の主ボタン「#u-kenta でハドルを始める」を置いた。1440px・390px とも**スクロール 0、相手の確認は操作 0 回、ハドル開始は 1 回**。
- ハドルは「ペアごとに 1 か所（社員番号が後ろの人の uチャンネル）」に決め、2 人のすれ違いを防いだ。
- 状態 S01〜S18 はすべて URL で開ける（`states.json`）。axe（WCAG 2.1 AA）と横はみ出しは 36 件すべて 0。
- 「何を出すか」はほぼブリーフで決まり、「どの部品・見た目で出すか」は ADS の事前知識（主ボタン 1 つ、トークンの意味、EmptyState、SectionMessage、Lozenge など）と型定義で決めた（`docs/decision-checklist.md`）。
- 事後計測の ADS lint では 14 件（エラー 1・警告 13）。大半（10 件）は SectionMessage の見出しレベルで、axe では見つからない ADS 固有の規約だった（`docs/post-hoc-lint.md`）。
- 想定外の手戻り：`@atlaskit/navigation-system` のレイアウトがこの環境で崩れ、型と README の範囲では原因を追えず、primitives で上部の帯を自作した。StrictMode ではモーダル・フラグが出なかったため外した。

## 画面構成

| 画面 | URL | 内容 |
| --- | --- | --- |
| 組み合わせ（トップ） | `/` | 見出し・CT の時刻・参加者数 → 今週のあなたの相手（主役）＋あなたの今後の予定 → 今週の全ペア → 来週以降の予定（縦に並べる） |
| メンバー | `/members` | 参加／不参加の人数、社員番号順のリスト、削除（確認モーダル） |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・CT への参加 |
| はじめての設定 | `/setup` | 自分の設定と同じフォームを初回用の見出し・説明で |
| 404 | それ以外 | 「組み合わせに戻る」 |

上部の帯：Gaji-Labo のロゴ（別タブで gaji.jp）・「CTスケジュール」・ログイン／自分（アバター＋名前、メニューに自分の設定・ログアウト）、2 段目に画面の切り替え。

## 部品の対応

| 用途 | 部品 |
| --- | --- |
| レイアウト | `@atlaskit/primitives`（Box / Stack / Inline / Text / Anchor / xcss）、`@atlaskit/heading` |
| 色・余白・文字 | `@atlaskit/tokens`（`setGlobalTheme`、`token`）、`@atlaskit/css-reset` |
| ボタン・画面の切り替え | `@atlaskit/button`（`default/button`、`link`） |
| 自分のメニュー | `@atlaskit/dropdown-menu` |
| 人の表示 | `@atlaskit/avatar`（`AvatarContent` で頭文字＋固定色） |
| 状態の文字ラベル | `@atlaskit/lozenge` |
| 状況の説明・エラー | `@atlaskit/section-message` |
| 成功の通知 | `@atlaskit/flag`（FlagsProvider / useFlags） |
| 削除の確認 | `@atlaskit/modal-dialog` |
| 空・404 | `@atlaskit/empty-state` |
| 読み込み中 | `@atlaskit/spinner` |
| フォーム | `@atlaskit/form`（Label / RequiredAsterisk / HelperMessage / ErrorMessage）、`@atlaskit/textfield`、`@atlaskit/select`、`@atlaskit/radio` |
| 文中のリンク | `@atlaskit/link` |
| アイコン | `@atlaskit/icon`（core：headphones / chevron-down / status-*） |

自前の CSS ファイルはありません。トークン以外の値を使った箇所は `docs/design-decisions.md`「自前の CSS について」に記録しています。

## 依存とサイズ

- React 18.3 / Vite 6 / TypeScript 5.9（事後計測の lint のため 7.0 から変更）
- `@atlaskit/*` の実行時の直接依存 19 パッケージ（`package.json` の dependencies）。`node_modules` 全体で約 225MB（事後計測の lint を入れる前の値。`@atlaskit` 配下は推移的依存を含め 53）。
- 本番ビルド：アプリ本体の JS 974kB（gzip 280kB）、テーマ切り替え用に分割された JS を含む合計 1.3MB、CSS 108kB。

## 動かし方

```sh
cd ads-ct-noharness
npm install
npm run dev            # http://localhost:5173
```

状態を直接開く URL は `states.json` にあります（例：`/?state=guest`、`/?as=9`、`/members?state=confirm-delete`）。

撮影と検査：

```sh
APP_URL=http://localhost:5173 NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` の写しです（ESM の import が実行ファイルの場所から解決されるため、`@axe-core/playwright` を入れたこのフォルダに置いています）。

事後計測の lint：`npx eslint -c eslint.posthoc.config.mjs src`

## 文書

- `docs/design-decisions.md`：設計判断（画面構成前の下書き＋実装後の追記）
- `docs/goal-evaluation.md`：目標 G1〜G7 の自己評価と計測
- `docs/decision-checklist.md`：判断チェックリスト D01〜D30
- `docs/post-hoc-lint.md`：ADS 公式 lint の事後計測
- `screenshots/`：18 状態 × 1440px／390px と `report.json`

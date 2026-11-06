# 事後計測：ADS 公式 lint（@atlaskit/eslint-plugin-design-system）

## 目的と条件

- 「ハーネスの検査があれば何が見つかったか」を測る。**実装を確定してコミットした後**（コミット `ce20b06`）に導入・実行した。
- **コードは直していない**。この文書は記録だけ。
- 使ったもの：`@atlaskit/eslint-plugin-design-system@16.16.0` の `recommended/flat`（59 ルール）、`eslint@9`、パーサーは `typescript-eslint`。設定は `eslint.posthoc.config.mjs`。
- 導入のための変更：`typescript-eslint` が TypeScript 6.1 未満を要求するため、devDependencies の TypeScript を 7.0 → 5.9 に下げた（アプリのコードは変えていない。`tsc -b` は通る）。
- 実行：`npx eslint -c eslint.posthoc.config.mjs src`

## 結果：14 件（エラー 1・警告 13）

| ルール | 件数 | 種類 | 場所 | 指摘の内容 |
| --- | --- | --- | --- | --- |
| `use-heading-level-in-section-message` | 10 | 警告 | App.tsx:30、HomePage.tsx:86/107/127/160/217、MembersPage.tsx:179、SettingsPage.tsx:159/165/261 | SectionMessage の `headingLevel` を、ページの見出し構造に合った値で明示する |
| `consistent-css-prop-usage` | 1 | エラー | PersonAvatar.tsx:35 | `xcss={[fillBase, fill]}` のように JSX の中でスタイルを組み立てず、モジュール先頭の定数にする |
| `no-html-image` | 1 | 警告 | Shell.tsx:56 | ロゴの `<img>` を `@atlaskit/image` の Image に置き換える |
| `use-should-render-to-parent` | 1 | 警告 | Shell.tsx:65 | DropdownMenu に `shouldRenderToParent` を指定しないとアクセシビリティ上の問題が出る |
| `no-placeholder` | 1 | 警告 | SettingsPage.tsx:227 | uチャンネルの Select の placeholder をやめ、常に見える補足文にして aria-describedby で結ぶ |

## 読み取れること（自分の解釈）

- **見つからなかったもの**：トークン以外の色・余白の直書き、非推奨 API の使用、自前 CSS ファイル。いずれも 0 件。
  - ただし `maxWidth: '960px'`・`'560px'`、`height: '24px'` のような寸法の直書きは指摘されなかった（recommended では対象外とみられる。推測）。
  - `@atlaskit/button/new` は型定義の `@deprecated` を見て実装中に避けていた。避けていなければ `no-deprecated-apis` などで指摘された可能性がある（未検証）。
- **ハーネスがあれば最初から避けられた可能性が高いもの**：
  - SectionMessage の見出しレベル（10 件）。axe（WCAG 2.1 AA）は heading-order を「ベストプラクティス」扱いにしているため、共通の検査では見つからなかった。ADS 独自の「見出し構造」の規約。
  - `shouldRenderToParent`。型定義には prop があるが、既定値を変えるべきという判断は型からは読み取れなかった。axe でも検出されなかった。
  - placeholder の禁止。私は「補足文（HelperMessage）もあるので placeholder は例示」と考えていたが、ADS は placeholder 自体を避ける方針らしい。
  - `@atlaskit/image` の存在を知らなかった（`<img>` で済ませた）。
- **書き方の流儀**（`consistent-css-prop-usage`）は見た目・使い勝手には影響しないが、ADS の推奨する書き方からは外れていた。
- axe と横はみ出しは全 36 件（18 状態 × 2 幅）で 0 件だったので、lint の指摘はすべて「共通の検査では見つからない、ADS 固有の規約」に当たる。

# 事後計測：Primer 公式 lint（ハーネスなし版）

実装を確定させてコミット（`6bf8705`）した**後に**、Primer 公式の lint を導入して流しました。「ハーネスの検査があれば何が見つかったか」を測るためのもので、**コードは直していません**（下の指摘はすべて残ったままです）。

## 導入のしかた

| 道具 | 版 | 設定 |
| --- | --- | --- |
| `eslint-plugin-primer-react` | 9.4.0 | `plugin:primer-react/recommended` だけ（`lint/eslint.config.mjs`。eslintrc 形式の設定を `@eslint/eslintrc` の `FlatCompat` で読み込み） |
| `eslint` | 9.39.5 | — |
| `@primer/stylelint-config` | 13.6.0 | `extends: ["@primer/stylelint-config"]` だけ（`lint/stylelint.config.mjs`） |
| `stylelint` | 16.26.1（`@primer/stylelint-config` の依存として入った版） | — |
| `typescript-eslint`（パーサーのみ） | 8.72.1 | TS／TSX の構文解析だけに使用。型情報を使う規則は無し |

- **アプリ本体とは別の `lint/` パッケージに入れました。** アプリは TypeScript 7.0.2 で作っており、`typescript-eslint` は TypeScript 7 に対応していません（`--legacy-peer-deps` で本体に入れると、実行時に「typescript-eslint does not support TS 7.0.」で止まりました）。そこで `lint/` だけ TypeScript 5.9 を使い、アプリ本体の `package.json` は実装確定時のまま戻しました。
- 実行：`primer-ct-noharness/` で
  - `lint/node_modules/.bin/eslint --config lint/eslint.config.mjs "src/**/*.{ts,tsx}"`
  - `lint/node_modules/.bin/stylelint --config lint/stylelint.config.mjs "src/**/*.css"`
- 生の出力：`lint/eslint-result.txt`、`lint/stylelint-result.txt`。

## 結果の件数

| 道具 | エラー | 警告 | 計 | うち Primer 固有の規則 |
| --- | --- | --- | --- | --- |
| ESLint（primer-react recommended） | 3 | 3 | 6 | 4（残り 2 は自分のコメントが原因の設定上の誤検出） |
| stylelint（@primer/stylelint-config） | 17 | 0 | 17 | 10（残り 7 は stylelint-config-standard の書式） |
| **計** | **20** | **3** | **23** | **14** |

## ESLint の指摘（6 件）

| # | 規則 | 重さ | 場所 | 内容 |
| --- | --- | --- | --- | --- |
| 1〜3 | `primer-react/no-deprecated-props` | 警告 | `src/components/Layout.tsx:128, 133, 143` | `UnderlineNav.Item` の `icon` は非推奨。`leadingVisual` を使う |
| 4 | `primer-react/no-use-responsive-value` | エラー | `src/pages/MembersPage.tsx:2` | `useResponsiveValue` は使わない（SSR で表示がずれるため。代わりに `getResponsiveAttributes` と CSS のメディアクエリ） |
| 5〜6 | `react-hooks/exhaustive-deps`（定義が見つからない） | エラー | `src/pages/MembersPage.tsx:35`、`src/pages/SettingsPage.tsx:103` | 自分で書いた `// eslint-disable-next-line react-hooks/exhaustive-deps` が、読み込んでいない規則を指していた。**Primer の指摘ではない**（設定上の誤検出） |

## stylelint の指摘（17 件）

| 規則 | 件数 | 場所 | 内容 |
| --- | --- | --- | --- |
| `primer/no-display-colors` | 8 | `src/styles.css:17〜20` | 頭文字アバターに使った `--display-{blue,green,purple,orange}-bgColor-muted`・`-fgColor` は「alpha 段階で、Primer チームの承認のうえ慎重に使うべき」 |
| `primer/typography` | 1 | `src/styles.css:14` | `line-height: 1` ではなく Primer の文字のトークンを使う |
| `primer/box-shadow` | 1 | `src/styles.css:49` | 自分のペアの行の左の線を `box-shadow: inset …` で書いたが、Primer の影のトークンを使うべき |
| `declaration-block-single-line-max-declarations` | 4 | `src/styles.css:17〜20` | 1 行に 2 つの宣言（書式） |
| `rule-empty-line-before` | 3 | `src/styles.css:41, 44, 47` | 規則の前に空行が無い（書式） |

## 何が見つかったか（判断への影響）

Primer 固有の 14 件を、判断チェックリストの項目に対応させると次のとおりです。

| 判断 | 指摘 | ハーネスがあれば変わったと思われること |
| --- | --- | --- |
| D11 人の表示（頭文字アバターの色） | `primer/no-display-colors` 8 件 | display 色を避け、別の手段（例：意味色の muted、または色に頼らない頭文字だけ）を検討した可能性が高い。ブリーフの「人ごとに固定の色」を Primer の安定したトークンでどう満たすかは、ハーネスあり版との比較点 |
| D12 ナビゲーション | `no-deprecated-props` 3 件 | `UnderlineNav.Item` に `icon` ではなく `leadingVisual` を使った |
| D13 メンバー一覧の 390px での扱い | `no-use-responsive-value` 1 件 | 列の組み替えを JavaScript ではなく CSS（メディアクエリ）で行う形になった |
| D06 自分のペアの強調 | `primer/box-shadow` 1 件 | 左の線を `box-shadow` でなく `border` のトークンで描いた |
| 頭文字アバターの行の高さ | `primer/typography` 1 件 | `line-height` に文字のトークンを使った |

### 型定義を読んでいれば気づけたもの

非推奨の 2 種類（`UnderlineNav.Item` の `icon`、`useResponsiveValue`）は、**許されていた情報源である `.d.ts` に `@deprecated` として書かれていました**：

- `@primer/react/dist/UnderlineNav/UnderlineNavItemsRegistry.d.ts`：`icon` に「@deprecated Use the `leadingVisual` prop instead」
- `@primer/react/dist/hooks/useResponsiveValue.d.ts`：「@deprecated Prefer responsive data attributes with `getResponsiveAttributes` and CSS media queries instead.」

実装中は型定義を「必要な prop の名前」だけ grep して読んでいたため、この注記を見落としました。`tsc` は `@deprecated` を報告しないので、型検査が通っても気づけません（エディタなら取り消し線で見えたはず）。つまりこの 2 件は「ハーネスにしかない知識」ではなく、「情報はあったが、検査が無いと見落とす」種類のものです。

一方、`primer/no-display-colors`（display 色は alpha）、`primer/box-shadow`、`primer/typography` は、`.d.ts` と README には書かれておらず（README は CSS ファイルの読み込み方だけ）、ハーネス（lint）が無ければ知り得なかった指摘です。

### 見つからなかったもの

- lint は文言、画面構成、主ボタンの数、部品の選び方（`Checkbox` か `ToggleSwitch` か、`Banner` か別のものか）には何も言いませんでした。判断チェックリストの 30 項目のうち、lint の指摘が触れたのは 4 項目（D06・D11・D12・D13）だけです。
- TSX 内のインラインの `style`（頭文字アバターの幅・高さ・文字サイズ）は、どちらの lint も調べませんでした。

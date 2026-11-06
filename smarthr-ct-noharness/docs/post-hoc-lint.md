# 事後計測：SmartHR 公式 lint（ハーネスなし版）

実装を確定させてコミット（`dfe1ada`、文書は `b975b54`）した**後で**、SmartHR 公式の lint を導入・実行した。**結果を記録しただけで、コードも文書も直していない。**「ハーネスの検査があれば何が見つかったか」を測るためのもの。

## 導入のしかた

- プロジェクトの依存は増やさず、作業用ディレクトリ（スクラッチパッド）に入れて `src/` の複写に対して実行した。
- ESLint：`eslint@9.39.5` ＋ `eslint-config-smarthr@14.14.2`（SmartHR の共有設定。中で `eslint-plugin-smarthr@6.29.2` を有効にする）。`eslint-plugin-smarthr` 単体の `recommended` はすべてのルールを `off` にする設定だったため、共有設定のほうを使った。
  - 共有設定は `typescript` 5 以下を peer に要求する（このプロジェクトは 7）ため、作業用ディレクトリに `typescript@5.9.3` を入れた。
  - プラグインは `tsconfig.json` と `compilerOptions.paths` の `"@/*"` が無いと起動しなかったので、作業用の `tsconfig.json` を置いた。
  - 設定は `eslint.config.mjs`（`...smarthr` ＋ React のバージョン指定のみ）。
- textlint：`textlint@15.8.0` ＋ `textlint-rule-preset-smarthr@1.38.3`（`{"rules":{"preset-smarthr":true}}`）。
  - TSX は直接かけられないため、TypeScript の構文木から日本語を含む JSX テキスト・文字列リテラルを抜き出した `ui-strings.md`（147 件）にかけた。あわせて文書（README と `docs/*.md`）にもかけた。
- 使った設定・抽出スクリプト・生の結果は `docs/post-hoc-lint/` に置いた（`eslint.json` などのパスは作業用ディレクトリのもの）。

## ESLint の結果：エラー 86・警告 85（計 171）

| ルール | 件数 | 重さ | 内容（このアプリでの具体例） |
| --- | --- | --- | --- |
| `smarthr/require-i18n-text` | 83 | 警告 | 文字列を直接書いている（翻訳関数を使っていない）。例：`alt="Gaji-Labo（新しいタブで開きます）"`、子要素の「さん」 |
| `smarthr/best-practice-for-default-props` | 22 | エラー | 既定値と同じ prop を書いている。`Stack gap={1}`、`Cluster gap={0.5}`、`StatusLabel type="grey"`、`InformationPanel type="info"`、`Heading type="sectionTitle"`、`AccordionPanel expandableMultiply` |
| `import/order` | 19 | エラー | import の並び順 |
| `smarthr/best-practice-for-text-component` | 17 | エラー | 属性の無い `Text`、`as="p"` だけの `Text` は素の要素にする |
| `smarthr/a11y-heading-in-sectioning-content` | 6 | エラー | ①`PageHeading` が 1 ファイルに複数（読み込み中・失敗・通常で早期 return しているため。実行時に h1 が 2 つ出ることはない）②`Heading` が `Section` などで囲まれておらず、見出しの範囲（アウトライン）が曖昧（主役の枠・お休みの枠・祝日の枠の `Heading`） |
| `sort-imports` | 4 | エラー | import 内の並び順 |
| `smarthr/a11y-anchor-has-href-attribute` | 3 | エラー | `AppNaviAnchor` に href が無い。**誤検知と思われる**：href は `{...link('/')}` のスプレッドで渡しており、DOM には href がある（Playwright で `/`・`/members`・`/settings` を確認）。ルールがスプレッドを読めていない |
| `smarthr/best-practice-for-lazy-variable` | 3 | エラー | 早期 return の前に宣言した変数を、使う直前に移す |
| `eqeqeq` | 2 | エラー | `==`／`!=` の使用（null 判定） |
| `smarthr/best-practice-for-layouts` | 2 | エラー | ①`Stack gap={0}`（ページ全体の外枠）は誤用の可能性 ②中央寄せに `Cluster justify="center"` ではなく `Center` を使う（読み込み中の Loader） |
| `smarthr/best-practice-for-reduce-redundant-calls` | 2 | エラー | 分岐の両方で `StatusLabel` を呼んでいる（参加／不参加、CT なし／予定） |
| `smarthr/design-system-guideline-prohibit-information-panel-in-white-bg` | 2 | エラー | `InformationPanel` を白い背景（`Base`）の上に置いている：S09 の「この画面からはハドルを始められません」、設定の「保存すると、全員の組み合わせが変わります」。`BaseColumn`／`Groupbox` で包むよう指示 |
| `smarthr/a11y-image-has-alt-attribute` | 1 | エラー | アバター画像の `alt=""`（装飾なら背景画像にする）。fixtures に画像のある人はいないので実際には描画されない分岐 |
| `smarthr/a11y-prohibit-overflow-hidden` | 1 | エラー | メンバー表を包む `Base overflow="hidden"` |
| `smarthr/a11y-scroller-has-tabindex` | 1 | エラー | エラーのまとめへフォーカスを移すため `div` に `tabIndex={-1}` を付けた |
| `@typescript-eslint/no-shadow` | 1 | エラー | `fixtures.ts`（ブリーフの複写）内の変数名の重なり |
| `smarthr/best-practice-for-object-props` | 1 | 警告 | `closeButton={{ text: 'キャンセル' }}` は `closeButton="キャンセル"` と書ける |
| `react-hooks/exhaustive-deps` | 1 | 警告 | `useEffect` の依存配列 |

### ESLint の結果の読み方（分類は自分の判断）

- **デザイン・ガイドラインに関わる指摘（ハーネスがあれば設計時に避けられた可能性が高いもの）**：
  - `prohibit-information-panel-in-white-bg`（2）：白い `Base` の中に `InformationPanel` を入れていた。事前知識には無かった決まり。
  - `a11y-heading-in-sectioning-content` の②（3）：見出しを `Section` 等で囲む流儀。主役の枠の一部だけ `Section` で囲み、他は囲んでいなかった。
  - `best-practice-for-layouts`（2）：中央寄せは `Center`、`gap={0}` の `Stack` は誤用の疑い。
  - `a11y-prohibit-overflow-hidden`（1）：角丸のための `overflow="hidden"`。
- **書き方の流儀（見た目・使い勝手は変わらないもの）**：`default-props`（22）、`text-component`（17）、`reduce-redundant-calls`（2）、`lazy-variable`（3）、`object-props`（1）、import 順（23）、`eqeqeq`（2）。
- **このアプリの前提とずれるもの**：`require-i18n-text`（83）は多言語化が前提。ブリーフは「文言は日本語」なので、対応しないのが妥当と考える。
- **誤検知と思われるもの**：`a11y-anchor-has-href-attribute`（3）。
- **意図して書いたもの**：`a11y-scroller-has-tabindex`（1）はエラーのまとめへのフォーカス移動のため。lint はこれを避けるべき書き方としている。

## textlint の結果

### UI 文言（`ui-strings.md`、147 件の文字列）：47 件

| ルール | 件数 | 内容 |
| --- | --- | --- |
| `ja-space-between-half-and-full-width` | 40 | 全角と半角の間にスペースを入れない。例：「Slack でログイン」「参加者 9 人」「14:00 から」「CT なし」「#u-kenta で始まります」 |
| `ja-no-space-around-parentheses` | 4 | かっこの内外にスペースを入れない。例：「（○ 件）」。うち「さん）」「○（月）」は抜き出し方による断片で、誤検知の可能性がある |
| `prh-rules` | 2 | 「？」の後に全角スペース（「○さんを削除しますか？」）、「既に → すでに」 |
| `no-unmatched-pair` | 1 | 「ハドル（#」：JSX で式をはさんだための断片。抜き出し方による誤検知 |

主な指摘は「全角と半角の間にスペースを入れる」書き方（40 件）。自分は和欧間にスペースを入れる書き方を一貫して採っていたが、SmartHR の表記ルールとは逆だった。事前知識（D28）には無かった点。

### 文書（README・docs）：277 件

`ja-space-between-half-and-full-width` 227、`prh-rules` 37（「無い → ない」「ダイアログ → 画面」など）、`ja-no-space-between-full-width` 7、`sentence-length` 5、`ja-no-redundant-expression` 1。文書は利用者向けの UI ではないので参考値。

## まとめ

- ESLint 171 件のうち、画面の設計判断に直接かかわるのは約 8 件（白背景の InformationPanel 2、見出しのアウトライン 3、レイアウト部品の選び方 2、overflow hidden 1）。残りの多くは書き方の流儀（約 70 件）と多言語化（83 件）。
- textlint は UI 文言で 47 件、ほとんどが和欧間スペースの表記ルール。
- 判断チェックリストとの対応：D09／D18（InformationPanel の置き方）、D03（主役の枠の見出し構造）、D22（Loader の中央寄せ部品）、D28（文言の表記）が、ハーネスの検査があれば変わっていた可能性が高い。

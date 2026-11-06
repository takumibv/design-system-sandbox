# CTスケジュール（Primer・ハーネスなし版）

`brief/` のブリーフから、GitHub の Primer（`@primer/react`・`@primer/primitives`・`@primer/octicons-react`）で白紙から設計・実装した版です。**Primer の AI 向けハーネス（MCP、llms.txt、公式サイト・ガイドライン、公式 lint）を使わず**、ブリーフ、npm パッケージの型定義（`.d.ts`）と README、自分の事前知識だけで判断しました。ハーネスあり版と突き合わせるための対照実験です。

## 結論の要約

- **画面は 3 つ＋404**（組み合わせ／メンバー／自分の設定〈初回設定は `/setup`〉）。トップの主役は「あなたの今週の相手」の `Card` と、ページで唯一の主ボタン「ハドルを始める」。
- **G1・G2**：1440px・390px とも、開いてから相手の名前が見えるまでスクロール 0、ハドル開始までクリック 1 回・スクロール 0（未ログインならログインを含めて 2 回）。Tab なら 7 回。
- **ハドルの場所（未決事項）**は「ペアのうち社員番号が若い人の uチャンネルに 2 人とも集まる」と決め、場所をボタンの下に明記した（2 人が別々のチャンネルでハドルを始める行き違いを防ぐため）。
- **axe（WCAG 2.1 AA）違反 0・横はみ出し 0**（18 状態 × 2 幅）。ただし 390px のメンバー表の見切れなど、検査では見つからず撮影を目で見て直した問題が 6 件あった。
- **判断の根拠**（30 項目の主な根拠）：ブリーフ 14、自分の判断 5、Primer の事前知識 5、型定義 3、一般知識 3、検査 0。Primer の事前知識に頼った判断は、ほぼすべて確信度「中」で出典を確かめられていない。型定義のコメントが実質のガイドラインとして効いたのは 2 か所（`ConfirmationDialog` の初期フォーカス、`Spinner` の `srText`）。
- **自前の CSS は 5 つ**（頭文字アバター、ロゴの高さ、一覧の点の除去、ペアの行と自分の強調、補足の文字色）。値はすべて primitives のトークン。
- **事後計測の lint**（実装確定後に導入、コードは直さない）：23 件、うち Primer 固有 14 件。display 色が alpha 扱い（8）、`UnderlineNav.Item` の `icon` 非推奨（3）、`useResponsiveValue` 禁止（1）、box-shadow・line-height のトークン（各 1）。非推奨の 2 種類は `.d.ts` に `@deprecated` と書かれていたのに見落としたもの。詳細は `docs/post-hoc-lint.md`。

## 画面構成

| パス | 画面 | 中身 |
| --- | --- | --- |
| `/` | 組み合わせ（トップ） | 見出し「今週の組み合わせ」・日時・参加者数／「あなたの今週の相手」の `Card`＋「ハドルを始める」／全員のペア（自分の行を強調、各行に集合場所のボタン）／お休みの人。右の欄（390px では下）に「これからの予定」：次のお休み、各週の日付・「予定」・あなたの相手・全員のペア（開閉） |
| `/members` | メンバー | 説明／参加・不参加の人数／`DataTable`（メンバー・参加状況・操作）／削除の確認ダイアログ／結果の `Banner` |
| `/settings` | 自分の設定 | 名前・社員番号・uチャンネル・CT に参加する／参加を変えたときの注意／保存の結果 |
| `/setup` | 初回設定 | 同じフォームを「はじめに、3 つの項目を設定してください」の見出しで |
| その他 | 404 | `Blankslate`＋「組み合わせに戻る」 |

全画面共通のヘッダー：Gaji-Labo のロゴ（別タブで https://www.gaji.jp/）・サービス名・ログイン状態（アイコンと名前のメニュー、または「Slack でログイン」）・`UnderlineNav`。

## 部品の対応

| 用途 | 部品 |
| --- | --- |
| ページの骨組み | `PageLayout`（Header／Content／Pane）、`Stack` |
| 画面の切り替え | `UnderlineNav`（`aria-current="page"`） |
| ログイン中の人・ログアウト | `ActionMenu`＋`ActionList` |
| 自分の相手・先の週 | `Card`（experimental）、`Heading`、`Text`、`Label` |
| 人の表示 | `Avatar`（画像あり）／自前の頭文字アバター（画像なし） |
| ハドル・保存などの操作 | `Button`（primary は 1 画面 1 つ）、`Link` |
| 全員のペアの開閉 | `Details`＋`Button as="summary"` |
| メンバー一覧 | `Table.Container`／`Table.Title`／`Table.Subtitle`＋`DataTable`（experimental）、`useResponsiveValue` |
| 削除の確認 | `ConfirmationDialog`（`danger`、初期フォーカスはキャンセル） |
| お知らせ・成功・失敗 | `Banner`（info／success／warning／critical） |
| 項目のそばの注意 | `InlineMessage`（experimental） |
| 空の状態・404 | `Blankslate`（experimental） |
| 読み込み中 | `Spinner` |
| フォーム | `FormControl`、`TextInput`、`Select`、`Checkbox` |
| 読み上げだけの補足 | `VisuallyHidden` |
| アイコン | `@primer/octicons-react`（Calendar, People, Unmute, SignIn, SignOut, Gear, Trash, ChevronDown, Person, Question） |

## 状態（S01〜S18）

`states.json` に一覧があります。`?state=S01` のようにクエリで開きます（S10・S17 は `/settings`、S11〜S14 は `/members`、S15・S16 は `/setup`、S18 は `/no-such-page`）。画面を移るとクエリは外れ、以後はデモとして操作できます。

## 依存とサイズ

| パッケージ | 版 | `node_modules` での大きさ |
| --- | --- | --- |
| `@primer/react` | 38.44.0 | 6.7 MB |
| `@primer/primitives` | 11.10.0 | 57 MB（全テーマのトークン。使うのは light など一部） |
| `@primer/octicons-react` | 19.42.0 | 4.0 MB |
| `react`・`react-dom`・`react-is` | 19.3.1 | — |
| 開発用：`vite` 8.3.6、`@vitejs/plugin-react` 6.2.1、`typescript` 7.0.2、`@axe-core/playwright` 4.14.0 | | |

本番ビルド（`npm run build`）：

| ファイル | 大きさ | gzip |
| --- | --- | --- |
| JS | 632.62 kB | 203.77 kB |
| CSS | 288.37 kB | 42.72 kB |
| ロゴ SVG | 11.38 kB | 3.66 kB |

CSS が大きいのは、`@primer/react` の全部品の CSS と primitives のトークン（light テーマ、サイズ、文字、余白、動き）を読み込んでいるため。テーマは light だけ読み込み、`<html data-color-mode="light">` に固定しています（撮影を安定させるため）。

## 動かし方

```sh
cd primer-ct-noharness
npm install
npm run dev            # http://localhost:5173/?state=S01

# 撮影と検査（ブリーフの共通スクリプトを scripts/ に複製。中身は同じ）
npm run build && npx vite preview --port 5173 --strictPort &
npm run capture        # screenshots/*.png と screenshots/report.json
NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs   # screenshots/g1g2-measure.json
```

`brief/scripts/capture.mjs` をそのまま実行すると、ESM の解決がスクリプトの場所から行われるため `@axe-core/playwright` が見つかりません。そのため同じ内容を `scripts/capture.mjs` に複製して使っています。

## 文書

- `docs/design-decisions.md`：設計判断（画面構成前の下書き＋実装後の追記、自前の CSS の理由）
- `docs/goal-evaluation.md`：目標 G1〜G7 の自己評価と計測
- `docs/decision-checklist.md`：判断チェックリスト D01〜D30
- `docs/post-hoc-lint.md`：事後計測（Primer 公式 lint）の結果。lint の道具はアプリ本体と分けて `lint/` に置いた（typescript-eslint が TypeScript 7 に未対応のため）
- `screenshots/`：18 状態 × 1440px／390px、`report.json`（axe・横はみ出し）、`g1g2-measure.json`

## 固定データについて

`src/fixtures.ts` は `brief/fixtures.ts` の複製です。社員番号が無いため、id の順を社員番号の順とみなし、デモの社員番号を `1000 + id` としました（仮定）。

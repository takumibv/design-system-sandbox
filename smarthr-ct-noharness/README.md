# CTスケジュール（SmartHR Design System・ハーネスなし版）

SmartHR Design System の部品（npm の `smarthr-ui@102.1.0`）で、CTスケジュールを白紙から設計・実装した対照実験の版です。**AI 向けハーネス（公式プラグイン・スキル、llms.txt）、公式ドキュメントサイト、公式 lint を使わず**、ブリーフ・パッケージの型定義と同梱 README・自分の事前知識だけで判断しました（公式 lint は実装を確定させた後の事後計測でだけ使用）。

## 結論の要約

- トップ（組み合わせ）の最初の要素を「今週のあなたの相手」にし、相手の名前を画面最大の文字で、画面で唯一の主ボタン「ハドルを始める」をその横に置いた。1440px・390px とも、相手の確認は操作 0 回・スクロール 0、ハドル開始は 1 回・スクロール 0（`docs/goal-evaluation.md`）。
- ハドルは「ペアのうち社員番号が後の人の uチャンネル」で始める規則にし、チャンネル名をボタンの下に出した。
- 先の週は同じ画面に縦に並べ、閉じたままで「予定」ラベルと自分の相手が読めるようにした。
- 状態 S01〜S18 はすべて URL で開ける（`states.json`）。axe（WCAG 2.1 AA）違反 0、横はみ出し 0（36 枚）。
- 自前のスタイルはアバター（smarthr-ui に部品が無い）と body の余白・背景だけ。
- 判断の多くは「ブリーフ」と「一般的な UI の知識」から来ており、SmartHR 固有の慣習に頼った判断（primary 1 つ、必須ラベル、通知バー、danger の確認ダイアログ、文言）は確信度 中以下の事前知識だった（`docs/decision-checklist.md`）。
- 事後計測の公式 lint の結果は `docs/post-hoc-lint.md`。

## 画面構成

| 画面 | URL | 内容 |
| --- | --- | --- |
| 組み合わせ | `/` | 今週のあなたの相手とハドル／今週のペア一覧／これからの予定（4 週、開閉） |
| メンバー | `/members` | 参加・不参加の人数、社員番号順の一覧（390px はリスト）、削除 |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・CT に参加する |
| 初回設定 | `/setup` | 必須項目が未入力の人の専用画面 |
| 404 | その他 | 「組み合わせへ戻る」 |

共通：`Header`（Gaji-Labo ロゴ＝別タブで gaji.jp、右端にログイン／ログイン中の人のメニュー）、`AppNavi`（現在地つき）、ページ上部の通知。

## 部品の対応

| 用途 | smarthr-ui の部品 |
| --- | --- |
| ヘッダー・ログイン中の人 | `Header`、`DropdownMenuButton`、`Button` |
| 画面の切り替え | `AppNavi`、`AppNaviAnchor`、`Scroller` |
| 見出し・文字 | `PageHeading`、`Heading`、`Text`、`TextLink` |
| 枠・並べ方 | `Base`、`Stack`、`Cluster`、`Container`、`Section` |
| 主役・ペア・予定 | `Base`、`Button`（primary／secondary）、`StatusLabel`、`AccordionPanel` 一式 |
| 人の表示 | 自作 `Avatar`（`CHART_COLORS` を使用）＋ `Text`、`StatusLabel`（あなた） |
| メンバー一覧 | `Table`、`Th`、`Td`、`StatusLabel`、`VisuallyHiddenText` |
| 削除の確認 | `ControlledActionDialog`（danger、`responseStatus`） |
| フォーム | `FormControl`、`Fieldset`、`Input`、`Select`、`Checkbox`、`RequiredLabel` |
| 状態・結果 | `NotificationBar`、`InformationPanel`、`Loader` |

## 依存とサイズ

- 依存：`react@19.3.1`、`react-dom@19.3.1`、`smarthr-ui@102.1.0`、`react-intl@10.2.2`（smarthr-ui の peer）。開発用に `vite@8`、`typescript`、`@axe-core/playwright`。
- ビルド（`npm run build`）：JS 561.45 kB（gzip 164.29 kB）、CSS 128.09 kB（gzip 18.84 kB）。
- `node_modules/smarthr-ui` は 21 MB。

## 動かし方

```sh
cd smarthr-ct-noharness
npm install
npm run dev            # http://localhost:5173
# 撮影と検査（別の端末で dev を動かしたまま）
NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json
```

状態は `states.json` の URL で開けます（例：`/?state=rest`、`/members?state=delete-confirm`、`/setup?state=setup-error`）。固定データは `src/fixtures.ts`（`brief/fixtures.ts` の無変更の複写）。社員番号は fixtures に無いため、デモでは `1000 + id` を表示しています。

## 文書

- `docs/design-decisions.md`：画面構成前の下書きと、実装後の追記・自前スタイルの記録
- `docs/goal-evaluation.md`：目標ごとの自己評価と G1・G2 の計測
- `docs/decision-checklist.md`：判断チェックリスト D01〜D30
- `docs/post-hoc-lint.md`：公式 lint による事後計測
- `screenshots/`：S01〜S18 × 1440px／390px、`report.json`

# CTスケジュール UI × SmartHR Design System 再現検証

[takumibv/digital-go-design-system `codex/ct-schedule-ui`](https://github.com/takumibv/digital-go-design-system/tree/codex/ct-schedule-ui) に、デジタル庁デザインシステム（DADS）で作った画面があります。この画面を SmartHR Design System（`smarthr-ui`）で作り直しました。その際、SmartHR が配布している AI エージェント向けのプラグイン（スキル `component-guidelines`／`design-pattern-guidelines`）と、公式の lint を実際に使い、デザインの意図がどこまで実装に効くかを調べました。手順と成果物の形は [ADS 版](../ads-ct-schedule/) に揃えています。

- 原本：`src/pages/CTApp.tsx`（1,094 行）＋ `styles.css`（1,282 行）＋ DADS サンプル部品 5 種
- SmartHR 版：[`src/CTApp.tsx`](src/CTApp.tsx)（1 ファイル）。**自前の CSS は 0 行**です。スタイルは smarthr-ui の部品と、smarthr-ui が配布する Tailwind プリセット（`shr-*` のトークン）だけで指定しています（`src/index.css` は `@tailwind utilities;` の 1 行のみ）
- **ハーネスの評価（この調査の主目的）**：[docs/harness-report.md](docs/harness-report.md)
- デザイン判断の言語化：[docs/design-decisions.md](docs/design-decisions.md)
- ハーネスの使用ログ（どのファイルを何回、何のために読んだか、lint の出力）：[harness-logs/](harness-logs/)
- 原本の props、状態、固定データ（[`src/fixtures.ts`](src/fixtures.ts)）、文言はそのまま使いました。

> **原本リポジトリについて**：このセッションでは原本リポジトリの追加・clone が許可されませんでした。そのため、ADS 版に入っている原本由来のもの（`fixtures.ts`、原本 Storybook のスクリーンショット 32 枚、ADS 版の文言）と、原本のスクリーンショットに写っている文言を使っています。原本のスクリーンショットは撮り直しておらず、ADS 検証時のものを `screenshots/original/` にコピーしました。

## 結論（要約）

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 機能・情報構造 | ◎ ほぼ 100% | 16 状態すべてを再現できた。Avatar とスキップリンクは部品がなく、トークンで自作した |
| 見た目の再現度 | △ 約 6 割 | SmartHR らしい落ち着いた業務画面に寄る。グレーの背景に白い Panel、見出しは 24px・標準の太さ。原本より縦が 2〜3 割短い。色付きの頭文字アバターは残せた |
| アクセシビリティ | ◎ | axe（WCAG 2.1 AA）の違反は原本・SmartHR 版とも **0 件**。1440／390px とも横はみ出しなし（SmartHR 版 32 ケース） |
| SmartHR 準拠度 | ○ | 公式 lint（`eslint-config-smarthr`）で 134 件から **88 件**。残りは多言語化の警告 87 件と、原本からコピーした `fixtures.ts` の 1 件。使った部品の `[must]` は文言に関するものを除いて満たした |
| 日本語 UI | ◎（ただし原本と衝突） | ライティング規則と表記辞書がある。原本の文言とは、スキルの規則で 14 か所、textlint で 2 か所ぶつかった（原本を優先して残した） |
| 依存とサイズ | ○ | 本体 JS は gzip **167KB**＋CSS 19KB（原本 JS 55KB＋CSS 115KB、ADS 版 285KB）。実行時の依存は 112 パッケージ |

**ハーネスの効き方**：主要なデザイン判断 30 件のうち 21 件は、スキルのファイルを読んで決めました。そのうち 6 件は ADS 版と逆の結論です（画面遷移はボタンではなく TextLink、成功通知は自動で消さない、保存失敗はボタンの横に出す、など）。ADS 版では CLI が使い方の指針を返さず、判断の多くが事前知識からでした。**SmartHR のスキルは「部品をどう使い分けるか」を、出典を示せる形で AI に届けてくれます。** 一方で、SmartHR 製品の外で使うときの情報（ヘッダー、アバター、パンくず、lint やプロバイダーの初期設定）と、原本のようなやわらかい文言を許す条件は書かれていません。詳しくは [docs/harness-report.md](docs/harness-report.md) を読んでください。

## SmartHR ハーネスの使用感

**良かった点**

- **SKILL.md の指示が強く、具体的。** 「事前知識で答えず必ず読む」「部品が決まっていなければ component-selector.md を先に」「import 名 = ファイル名」。読む順番に迷わなかった。
- **`[must]`/`[should]`/`[avoid]` で優先度が分かる。** 例：Button の「`[must]` Primary は 1 画面に 1 つ」「`[must]` 他の画面へ移動するなら TextLink」「`[avoid]` 無効状態のボタン」。迷ったときにどれを守るべきかが明確。
- **パターンが通知の使い分けまで決めてくれる。** feedback.mdx の「操作部の近くでフィードバック」「画面が切り替わるなら NotificationBar[bold]」「ActionDialog なら responseStatus」で、ADS 版より細かく正しい使い分けになった。
- **lint の指摘とスキルの記述が同じ言葉。** Do/Don't が eslint-plugin-smarthr の README から生成されているので、書く前に避けられた（少なくとも 7 ルールは一度も指摘されなかった）。
- **版のずれへの備えがある。** ガイドは smarthr-ui v100.1.0 基準、実装は 102.1.0。`disabledReason` の props が 1 件ずれていたが、「型定義を正とせよ」と書かれていたので迷わず直せた。

**気になった点**

- **スキルが認識されるのは .tsx を書いた後。** `paths: ["**/*.tsx", "**/*.jsx"]` のため、部品を選ぶ段階（書く前）には自動で読み込まれない。
- **導入でつまずきが多い。** `/plugin` が使えない環境では手動コピーが必要で、パターンはシンボリックリンク（`cp -rL` が必要）。eslint-plugin-smarthr の `recommended` は全ルール off で、本当の推奨は `eslint-config-smarthr`。しかもそれは tsconfig の `paths` に `"@/*"` がないと起動しない。
- **SmartHR 製品の外の話題がない。** Avatar・パンくず・スキップリンクの部品も代替案もない。AppHeader は SmartHR のテナントやヘルプ導線が前提で使えず、代わりの Header／AppNavi にはチェックリストがない（AppNavi は 390px ではみ出した）。
- **書かれていない初期設定。** `useEnvironment` には `EnvironmentProvider` が必要だが、スキルにもパターンにもない。
- **規則どうしの食い違い。** 削除ダイアログのパターンはボタン名を「削除」としているが、Button のチェックリストは「動詞の終止形」を `[must]` にしている。
- **llms.txt・MCP・DESIGN.md はない。** スキル（Claude Code／Cursor／Codex）以外の AI からは使いにくい。

## 部品の対応表

| 原本（DADS／自作） | SmartHR 版 | 再現度・メモ |
| --- | --- | --- |
| DADS `Button`（solid-fill／outline／text） | `Button` variant=primary／secondary／text | ○ Primary は画面に 1 つ。Text ボタンは必ずアイコン付き |
| 削除ボタン（`danger-button` を独自定義） | 一覧：`Button variant="text"`＋ゴミ箱アイコン、ダイアログ：`actionButton theme="danger"` | ◎ |
| 週送り ‹ › | `Button` ＋ `FaChevronLeft/RightIcon alt` ＋ `disabledReason` | ○ 無効時は理由の ⓘ が付く |
| 遷移するボタン・リンク | `TextLink`／`AnchorButton` | ◎ ADS 版では一部ボタンだった |
| 自作 `Avatar`（色付き＋頭文字） | 自作（トークン色の透過＋頭文字） | ○ smarthr-ui に Avatar はない。紫・橙のトークンがなく近い色で代用 |
| 自作 `Notice`（status／alert） | `ResponseMessage`（ボタンの横）、`NotificationBar`（画面全体）、`InformationPanel`（続く状態） | ◎ パターン「フィードバック」どおりに 3 つへ分けた |
| `<dialog>` ＋自前のフォーカストラップ | `ControlledActionDialog`（S、`responseStatus`） | ○ 最初のフォーカスを「キャンセル」に置けない |
| パンくず | `UpwardLink`「CT組み合わせ表に戻る」 | △ Breadcrumb がない。文言も変わった |
| DADS `Input`／`Select`（native） | `FormControl` ＋ `Input`／`Select`（native）＋ `RequiredLabel` | ◎ ヘルプ文の位置（ラベルの直下）も原本と同じ |
| DADS `Checkbox` | `Fieldset` ＋ `Checkbox` | ○ Fieldset は「入力 2 つ以上」が `[must]` だが、ほかに legend を付ける手段がない |
| タグ（今週・祝日・参加状況） | `StatusLabel` blue／grey／green／warning | ◎ |
| タグ（あなた） | `Chip` | ◎ 状態ではなく属性なので StatusLabel にしない |
| タグ（設定未完了） | 文字＋`WarningIcon` | ○ 1 つの対象に StatusLabel は 1 つまで |
| メンバー表（自作 grid） | PC：`Table`／`Th`／`Td`、モバイル：リスト（`useEnvironment` で切り替え） | ◎ パターン「よくあるテーブル」のモバイル指針どおり。原本のモバイル表示に近い |
| 空・失敗状態 | `Panel` 内の見出し・説明・ボタン | ○ EmptyState 相当の部品はない。パターンの「初期表示」に従った |
| 読み込み中 | `Loader` | ◎ |
| 404 | `Panel` ＋ `AnchorButton` | △ `NotFoundErrorScreen` は全画面用でヘッダーと共存できない |
| 自作 SVG アイコン 4 種 | `FaCommentsIcon`、`FaCalendarDaysIcon`、`FaUsersIcon`、`OpenInNewTabIcon` など | ◎ |
| ヘッダー（ブランドバー＋サービスバー） | `Header`（ロゴ）＋ `AppNavi`（画面切り替え） | △ AppHeader は SmartHR 製品用。AppNavi はモバイルで別の行に逃がした |
| 2 カラム | `Sidebar` | ◎ 幅が足りないと自動で縦に積む |
| スキップリンク | 自作（素の `<a>` ＋ Tailwind の `sr-only`） | △ 部品がない |

## 画面比較

`screenshots/compare/` に 16 状態 × 2 幅（1440／390px）の比較画像（左：原本、右：SmartHR 版）があります。

- 今週（PC）：[compare/schedule-default-1440.png](screenshots/compare/schedule-default-1440.png)
- 今週（SP）：[compare/schedule-default-390.png](screenshots/compare/schedule-default-390.png)
- メンバー一覧（PC）：[compare/members-default-1440.png](screenshots/compare/members-default-1440.png)
- メンバー一覧（SP、リスト表示）：[compare/members-default-390.png](screenshots/compare/members-default-390.png)
- 削除の失敗：[compare/members-delete-error-1440.png](screenshots/compare/members-delete-error-1440.png)
- 入力エラー：[compare/settings-validation-1440.png](screenshots/compare/settings-validation-1440.png)
- 保存しました（NotificationBar）：[compare/schedule-saved-1440.png](screenshots/compare/schedule-saved-1440.png)

見た目で大きく違うところ：

1. **背景と面**：原本は白地に濃い青のアクセント。SmartHR 版は薄いグレーの背景に白い Panel を重ね、面で区切る。罫線で強調しない。
2. **文字**：本文は原本と同じ 16px だが、画面タイトルは 24px・標準の太さ（原本は 32px・太字）。全体に軽く見える。ページの縦の長さは原本より 2〜3 割短い（ADS 版とほぼ同じ）。
3. **アクセント色**：SmartHR のメインカラー（`#0077c7`）は DADS の濃紺（`#0017c1`）より明るい。ヘッダーはブランドカラー（シアン）になる。
4. **通知**：保存・削除の成功は画面上部に色付きの帯（NotificationBar）で出て、閉じるまで残る。ハドルのデモ通知はボタンのすぐ横に出る。
5. **和文フォント**：smarthr-ui の CSS は `system-ui, sans-serif` で、和文は OS 依存（実測）。原本は Noto Sans JP をローカル配信している。

## SmartHR Design System の制約として分かったこと

- **部品の範囲は SmartHR 製品向け。** Avatar、Breadcrumb、EmptyState、スキップリンク、トースト（自動で消える通知）がない。AppHeader と NotFoundErrorScreen は全画面・SmartHR 前提の作り。
- **スタイルの逃げ道は Tailwind。** プリセットで色・余白はトークンに限られるが、`shr-basis-[20rem]` のような任意値は書ける。ADS の xcss のように型で拒否はされない。今回、任意値は補足欄の幅（`shr-basis-[20rem]`）と人数カードの最小幅（`shr-min-w-[10em]`）など 5 か所で使った。
- **リセット CSS がない。** プリセットは preflight を無効にしており、`smarthr-normalize-css` は styled-components 前提で使えなかった。`body` の余白は `index.html` の `class="shr-m-0"` で消した。
- **`statusLabels` に単体の要素を渡すと React の key 警告が出る**（ライブラリ内部で key なしの配列に包むため）。`[<RequiredLabel key="required" />]` で回避した。
- **`ControlledActionDialog` の閉じるボタンに ref を渡せない**ため、最初のフォーカスを指定できない。
- **lint はプロジェクト構成を前提にする。** `eslint-config-smarthr` は tsconfig の `paths`（`"@/*"`）がないと起動しない。全ルールを有効にすると `format-translate-component` が options なしで落ちる。

### 公式 lint の結果

| 計測 | 初回 | 最終 |
| --- | --- | --- |
| `eslint-config-smarthr`（公式の共有設定） | 134 件（エラー 46、警告 88） | **88 件**（エラー 1、警告 87） |
| `eslint-plugin-smarthr` 全ルール（補助） | — | 98 件 |
| textlint（SmartHR リポジトリと同じ設定） | — | 4 件 |
| textlint（preset-smarthr の既定） | — | 11 件 |

残した警告の理由は [docs/harness-report.md](docs/harness-report.md) の 5 章・6 章にあります。要点は次のとおりです。

| ルール | 件数 | 残した理由 |
| --- | --- | --- |
| `smarthr/require-i18n-text` | 87 | 多言語化しないデモ。原本・ADS 版も文言を直書き |
| `@typescript-eslint/no-shadow` | 1 | 原本の `fixtures.ts` をそのままコピーしたため |
| 抑止 1 件：`a11y-scroller-has-tabindex`（`main`） | — | 画面切り替え後に本文へフォーカスを戻すために必要 |
| textlint「ひとり → 1人」「初めて → はじめて」 | 2 | 原本の文言を優先（後者は直すのが妥当と考える） |

## 動かし方

```sh
npm ci
npm run harness:install   # SmartHR のスキルを .claude/skills/ に取り込む（任意）
npm run dev               # http://localhost:6011/?screen=members&state=loading&signedIn=0&dialog=1
npm run build             # 型チェックとビルド
npm run lint:smarthr      # 公式 lint（eslint-config-smarthr）
LINT_ALL=1 npx eslint src # eslint-plugin-smarthr の全ルール（補助）
npm run lint:text         # UI 文言を抜き出して textlint（preset-smarthr の既定）
npx textlint --config .textlintrc.sds.json harness-logs/ui-text.md  # SmartHR リポジトリと同じ設定
```

比較スクリーンショットと axe・横はみ出しの検査：

```sh
npm run dev &
SMARTHR_URL=http://localhost:6011 npm run screenshots
# 原本の Storybook を 6008 番で配信できる場合は ORIGINAL_URL=http://localhost:6008 も付けると原本も撮り直す
```

`screenshots/report.json` に、各ケースの axe 違反と横はみ出し量が出力されます。今回の結果は SmartHR 版 32 ケースすべて 0 件です（原本の 32 ケースも ADS 検証時に 0 件）。

## 次に試すとよさそうなこと

- AGENTS.md に「smarthr-ui の作業ではファイルを作る前にスキルを読む」と書き、指示なしでも AI がスキルを先に読むか確かめる。
- 文言の例外（どこまでライティング規則に従うか）をプロジェクトで決め、textlint の allowlist に反映する。
- `/plugin install` が使える環境でプラグインとして導入し、手動コピーとの違い（認識のタイミング）を比べる。

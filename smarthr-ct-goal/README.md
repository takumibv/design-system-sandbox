# CTスケジュール（SmartHR Design System 版）

`brief/` のブリーフから、SmartHR Design System（smarthr-ui v102.1.0）で白紙から設計・実装した CTスケジュールと、
SmartHR Design System の AI エージェント向けハーネス（公式プラグインのスキル・lint）がデザイン意図にどこまで効くかの調査結果。

- 設計の意図：[docs/design-decisions.md](docs/design-decisions.md)
- 目標の自己評価：[docs/goal-evaluation.md](docs/goal-evaluation.md)
- **ハーネスの調査（主目的）**：[docs/harness-report.md](docs/harness-report.md)
- ハーネスの実行ログ：[harness-logs/](harness-logs/)
- 状態一覧：[states.json](states.json)、スクリーンショット：[screenshots/](screenshots/)

公平な比較のため、元の DADS 版（takumibv/digital-go-design-system）と、このリポジトリの他のブランチ（既存の再現版や、並行して作られている他のデザインシステムの `claude/*-ct-goal`）は参照していない。入力は `brief/`（`claude/ct-schedule-brief`）と SmartHR Design System の公式ハーネス・公式ドキュメントだけ。

## 結論の要約

- ハーネスの実体は公式プラグインのスキル 2 つ（`component-guidelines`／`design-pattern-guidelines`）と lint（`eslint-plugin-smarthr`＋`eslint-config-smarthr`、`textlint-rule-preset-smarthr`）。MCP・llms.txt・DESIGN.md は無かった。
- **部品の選び方・通知の使い分け・削除ダイアログ・フォーム検証には非常によく効いた**（`feedback.mdx` と `delete-dialog.mdx` はほぼそのまま設計になった）。
- **画面構成・主役の決め方には部分的**。骨格と「重要な情報は上」は決まるが、パターンは業務オブジェクトの一覧・詳細が前提で、「今週の自分の相手」を主役にする判断は自分で行った。主役を 1 つに絞れたのは「Primary は 1 画面に 1 つ」の [must] のおかげ。
- 文言ガイドはスキルに無く、表記ルール（全角と半角の間にスペースを入れない）は textlint で初めて分かった。読むハーネスより検査するハーネスの方が確実に効いた。
- SmartHR 以外のブランドで使う想定は薄く、ヘッダー・エラー画面で回避策が要った。
- 結果：状態 S01〜S18 を 1440px／390px で撮影し、axe（WCAG 2.1 AA）違反 0、横はみ出し 0。eslint はエラー 0（多言語化の警告 90 は残した）、textlint は抽出上の誤検知 2 件のみ。ログイン中なら、相手の確認は操作 0 回、ハドル開始はクリック 1 回、どちらもスクロール 0（1440px・390px）。

## 画面構成

| 画面 | URL | 内容 |
| --- | --- | --- |
| 組み合わせ | `/` | **最上部に「今週のあなたの相手」**（相手を大きく、画面で唯一の Primary「ハドルを始める」と場所のチャンネル、あなたの今後 4 週の予定）。その下に「週ごとの組み合わせ」（TabBar で今週・来週・以降の予定を切り替え、ペアごとにハドルの導線、お休みの人、参加者数とメンバーへのリンク）。未ログインでは最上部が「ログインすると何ができるか」の案内と「Slackでログイン」になる |
| メンバー | `/members` | 社員番号順のメンバー。参加／不参加（文字つきラベル）、人数、初回設定が未完了の印、自分の行から設定へ。ログイン中は他の人を削除できる（確認ダイアログ）。デスクトップはテーブル、スマートフォンはリスト |
| 自分の設定（初回設定） | `/settings` | 名前・社員番号・uチャンネル・CTへの参加。参加を変えると影響（全員の組み合わせが組み直される）を表示。初回設定が済んでいない人はどの画面からもここへ誘導 |
| 存在しないページ | それ以外 | 戻るリンクつきのエラー画面 |

共通：Header（Gaji-Labo ロゴ＝別タブで gaji.jp、ログイン中の人のアイコンと名前・自分の設定・ログアウト、未ログインは「Slackでログイン」）＋AppNavi（現在地の表示）＋ヘッダー直下の通知。

### 状態の開き方

`states.json` のとおり、`?state=S01`〜`S17` で開く（S18 は存在しない URL）。例：`/?state=S03`（id=9 として今週お休み）、`/?state=S04&week=2026-10-12`（祝日の週）、`/members?state=S13`（削除の確認中）、`/settings?state=S15`（初回設定）。
`?state=` を付けない場合は S01 と同じ状態から、ログアウト・削除・保存などを実際に操作できる。

## 部品の対応（ブリーフの要素 → smarthr-ui）

| 要素 | 部品 |
| --- | --- |
| ヘッダー・ロゴ・ログイン中の人 | `Header`（`logo`／`logoHref`）、`HeaderDropdownMenuButton`、自前の `Avatar` |
| 現在地・ナビゲーション | `AppNavi`＋`AppNaviCustomTag` |
| 画面タイトル・リード文 | `PageHeading`、`p` |
| セクション | `Section`＋`Heading`＋`Panel`、`Stack`／`Cluster`、`Container`（設定は `NARROW`） |
| 今週の相手 | `Text`（XL・bold）＋`Avatar`、`Button`（primary） |
| 今後の予定 | `DefinitionList`／`DefinitionListItem` |
| 週の切り替え | `TabBar`（`bordered`）＋`TabItem`、`Reel` |
| 「予定」「CTなし」「参加／不参加」 | `StatusLabel` |
| メンバー（デスクトップ） | `Table`／`Th`／`Td`／`EmptyTableBody` |
| メンバー（モバイル） | `Panel` 内のリスト、アイコンボタン（`FaTrashCanIcon`） |
| 削除の確認 | `ControlledActionDialog`（`actionButton={{ text: '削除', theme: 'danger' }}`、`responseStatus`） |
| 設定フォーム | `FormControl`＋`Input`／`Select`、`Fieldset`＋`RadioButton`、`Button`（submit） |
| 操作の結果（近く） | `ResponseMessage` |
| 画面全体・要素の結果 | `NotificationBar`（`bold`、`animate`、`paneled`） |
| 未ログインの案内 | `InformationPanel` |
| 読み込み中 | `Loader`、`Center` |
| 404 | `ErrorScreen` |
| 注意の印 | `Text` の `icon`＋`WarningIcon` |

## SmartHR Design System の制約（今回ぶつかったもの）

- アバター部品が無い → 頭文字＋色の円を自前 CSS（`src/components/person.css`）。
- 区別用の色（purple など）がトークンに無い → primitive の色を借りた。
- Header／AppHeader のロゴリンクに `target` を指定できない → 描画後に属性を付けた。
- AppHeader は SmartHR 固有の項目（「個人設定」が別タブ、モバイルの「アプリ一覧」など）が固定 → Header＋AppNavi で組んだ。
- AuthErrorScreen／NotFoundErrorScreen は SmartHR のロゴ・文言が固定 → NotificationBar と ErrorScreen で代替。
- Header 背景（BRAND `#00c4cc`）上の白文字はコントラスト 2.14:1 → 名前を `TEXT_BLACK` にした。
- `useEnvironment` には `EnvironmentProvider` が必要（README の使用例に無い）。
- `eslint-config-smarthr` は `tsconfig.json` の `paths` に `@/*` が無いと動かない。
- 詳しくは [docs/harness-report.md](docs/harness-report.md) §5。

## 依存とサイズ

| 種類 | パッケージ |
| --- | --- |
| 実行時 | `react` 19.3.1、`react-dom` 19.3.1、`smarthr-ui` 102.1.0、`react-intl` 10.2.2（smarthr-ui の peer）、`react-router-dom` 7.18.5 |
| 開発 | `vite` 8.3.6、`typescript` 5.9.3、`eslint` 9.39.5＋`eslint-config-smarthr` 14.14.0＋`eslint-plugin-smarthr` 6.29.0、`textlint` 15.8.0＋`textlint-rule-preset-smarthr` 1.38.3＋`textlint-rule-prh`、`@axe-core/playwright` 4.14.0 |

`npm run build` の結果（`harness-logs/50-build.txt`）：

| ファイル | サイズ | gzip |
| --- | --- | --- |
| JS | 611.52 kB | 182.34 kB |
| CSS | 128.95 kB | 19.09 kB |

コード分割はしていない（Vite の 500 kB 警告が出る）。`node_modules/smarthr-ui` は 21 MB。

## 動かし方

```sh
cd smarthr-ct-goal
npm install
npm run dev            # http://localhost:5173

# 検査
npm run lint           # eslint-config-smarthr（eslint-plugin-smarthr を含む）
npm run lint:text      # UI 文言を抜き出して textlint（SmartHR プリセット）
npx tsc -b             # 型検査

# 撮影・axe・横はみ出し（開発サーバーを起動した状態で。プリインストールの Playwright を使う）
npm run capture        # = NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json → screenshots/
```

- `scripts/capture.mjs` は `brief/scripts/capture.mjs` の写し（変更なし）。
- `src/data/fixtures.ts` は `brief/fixtures.ts` の写し（変更なし。eslint の対象外）。
- SmartHR Design System のスキルはリポジトリ直下の `.claude/skills/` にある（公式リポジトリ `kufu/smarthr-design-system` の `plugins/smarthr-design-system/skills/` を、commit `ed07a77` 時点でコピー）。

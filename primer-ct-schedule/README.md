# CTスケジュール UI × Primer（GitHub）再現検証

[takumibv/digital-go-design-system `codex/ct-schedule-ui`](https://github.com/takumibv/digital-go-design-system/tree/codex/ct-schedule-ui) の、デジタル庁デザインシステム（DADS）で作った画面を、GitHub の Primer で作り直しました。その際、Primer が AI エージェント向けに公開している MCP サーバー `@primer/mcp`（v1.1.2）を実装の前後で使い、**デザインの意図がどこまで実装に効くか**を調べています。同じ調査を Atlassian Design System で行った [ads-ct-schedule](../ads-ct-schedule/) と、手順と成果物の形を揃えました。

- Primer 版：[`src/CTApp.tsx`](src/CTApp.tsx)（1 ファイル）＋ [`src/CTApp.module.css`](src/CTApp.module.css)（256 行、トークンのみ）
- 原本の props、状態、文言、固定データ（[`src/fixtures.ts`](src/fixtures.ts)）はそのまま使いました。
- **ハーネスの評価（この調査の主目的）**：[docs/harness-report.md](docs/harness-report.md)
- デザイン判断の言語化：[docs/design-decisions.md](docs/design-decisions.md)
- MCP の呼び出しと出力（101 回）：[harness-logs/](harness-logs/)

## 結論（要約）

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 機能・情報構造 | ◎ ほぼ 100% | 16 状態すべてを Primer の部品で表現できた。390px のメンバー表は横スクロールにした |
| 見た目の再現度 | ○ 約 7 割（目視） | 太い上ボーダー、色付きイニシャル、上部の通知など、ADS 版で落ちた表現を戻せた。主ボタンが緑になる、横並びのカードが縦の一覧になる、などは Primer らしさが残る |
| アクセシビリティ | ◎ | axe（WCAG 2.1 AA）の違反は 32 ケースすべて **0 件**、横はみ出しも 0。削除後のフォーカス移動や読み上げなど、ハーネスの指示で ADS 版より手厚くなった |
| Primer 準拠度 | ◎ | 公式 ESLint（全 23 ルール）は 58 件 → **0 件**。公式 stylelint は 7 件 → **1 件**（理由付きで許容）。MCP の `lint_css` も通過 |
| 日本語 UI | △ | 和文フォントの指定がない（Mona Sans＋システムフォント）。ハーネスにも日本語の話題はない。Avatar がイニシャルを出せないため自作した |
| 依存・サイズ | △ | 本体 JS は gzip で **197KB**、CSS は **42KB**（原本は JS 55KB＋CSS 115KB、ADS 版は JS 285KB）。本番の依存ツリーは 49 行（ADS 版は約 1,000 行） |

DADS は「市民向け・読みやすさ優先」、Primer は「開発者向けの道具・GitHub の一貫性優先」です。ADS と同じく、**同じ機能を Primer の流儀で作り直すことはできますが、同じ見た目にはなりません**。ADS との違いは、Primer が「部品で表せない部分はトークンだけの CSS Modules で書け」と明示していることで、見た目を寄せる逃げ道が ADS より広くあります。

**ハーネスについて**：Primer の MCP は「部品の使い方」「a11y」「画面パターン」「色」「文字」「トークン」がツールごとに分かれていて、特に**パターン（Delete、Forms、Notification message、Saving）が画面の振る舞いまで具体的に決めてくれました**。判断 30 件のうち 23 件の出典がハーネスにあります。一方で、指針のない部品ではエラーではなくトップページを返す（30 部品中 16 部品）、`lint_css` が理由を返さない、起動条件が明文化されていない、といった弱点があります。詳しくは [harness-report.md](docs/harness-report.md)。

## 部品の対応表

| 原本（DADS／自作） | Primer 版 | 再現度・メモ |
| --- | --- | --- |
| DADS `Button`（solid-fill／outline／text） | `Button` variant=primary／default／invisible | ○ primary は緑（Primer の標準） |
| 削除の実行ボタン | `ConfirmationDialog` の `confirmButtonType="danger"` | ◎ |
| 週送り ‹ › | `IconButton` ＋ `ChevronLeft/RightIcon` | ◎ aria-label がツールチップにもなる |
| 自作 `Avatar`（色付き＋イニシャル） | 自作（CSS Modules＋トークン） | ○ Primer の `Avatar`／`AvatarStack` は画像専用 |
| 自作 `Notice`（status／alert） | `Banner`（success／info／critical）＋ `AriaStatus` | ◎ 原本と同じ「ページ上部の通知」。トーストはない |
| `<dialog>` ＋自前のフォーカストラップ | `ConfirmationDialog` | ◎ danger のとき初期フォーカスがキャンセルになる |
| パンくず | `Breadcrumbs` | ◎ |
| DADS `Input`／`Select`（native） | `TextInput`／`Select`（native） | ◎ Select もネイティブ |
| DADS `Checkbox` | `CheckboxGroup` ＋ `Checkbox` | ◎ |
| 必須ラベル・補足文・エラー | `FormControl`（Label／Caption／Validation、`required`） | ◎ 必須は「*」で表示 |
| タグ（今週・祝日・設定未完了・参加状況） | `Label` variant=accent／attention／success／secondary | ◎ |
| メンバー表（自作 grid） | `DataTable`（experimental）＋ `ScrollableRegion` | ○ 狭い画面では横スクロール |
| 空・失敗状態、404 | `Blankslate`（experimental） | ◎ |
| 読み込み中 | `Spinner` ＋ `AriaStatus` | ◎ |
| この先の CT（カード 3 枚） | `ActionList` | △ 縦の一覧になった（ADS 版と同じ判断） |
| 自作 SVG アイコン 4 種 | `@primer/octicons-react` | ◎ |
| ブランドバー | `Header`（GitHub の暗いヘッダー） | ◎ |
| ページの 2 カラム | `PageLayout`（Header／Content／Pane） | ◎ |
| スキップリンク | 自作（`--zIndex-skipLink` トークン） | △ 単体の部品がない |

## 画面比較

`screenshots/compare/` に 16 状態 × 2 幅（1440／390px）の比較画像（左：原本、右：Primer）があります。

- 今週（PC）：[compare/schedule-default-1440.png](screenshots/compare/schedule-default-1440.png)
- 今週（SP）：[compare/schedule-default-390.png](screenshots/compare/schedule-default-390.png)
- メンバー一覧（SP）：[compare/members-default-390.png](screenshots/compare/members-default-390.png)
- 削除確認：[compare/members-delete-confirm-1440.png](screenshots/compare/members-delete-confirm-1440.png)
- 入力エラー：[compare/settings-validation-1440.png](screenshots/compare/settings-validation-1440.png)
- 保存の成功：[compare/schedule-saved-1440.png](screenshots/compare/schedule-saved-1440.png)

見た目で大きく違うところ：

1. **主ボタンの色**：原本は濃い青、Primer は緑。
2. **文字**：`BaseStyles` は文字サイズを指定しないので、本文はブラウザ既定の 16px（原本と同じ）。小さい文字は Primer の 12px（原本は 14px 前後）で、補足が小さく見える。書体は Mona Sans とシステムフォントで、和文は OS 依存。
3. **幅**：原本の本文幅は約 1,184px、Primer の `PageLayout` は 1,280px。
4. **この先の CT**：原本は横並びのカード、Primer は縦の一覧。
5. **フォーム**：原本は補足文を入力欄の上、Primer は下（Caption）。必須は「必須」の文字ではなく「*」。

## Primer の制約として分かったこと

- `primer_coding_guidelines` は **`sx` prop と `Box` を使うなと明示**している。部品の props で表せないものは CSS Modules に書く前提で、ADS の `xcss` のように型でトークンを強制する仕組みはない。代わりに stylelint（`@primer/stylelint-config`）でトークンの使用を検査する。
- `Avatar` と `AvatarStack` は画像専用で、イニシャルを出せない。
- `Text` に色の prop がない（muted な文字色にも CSS が要る）。
- `BaseStyles` は `p` の margin と文字サイズをリセットしない。
- Blankslate、DataTable、ScrollableRegion などよく使う部品が `@primer/react/experimental` にある。
- `DataTable` に狭い画面用の表示がない。390px では列が切れて「操作」列が見えなくなった（ページの横はみ出しは 0 なので axe と横はみ出し検査では見つからない）。
- `init` の手順（テーマ CSS だけを読み込む）では、サイズ・文字・z-index のトークンが未定義になる。`@primer/primitives/dist/css/primitives.css` も読み込む必要がある。
- メディアクエリにトークンを使うには `@custom-media` 用の PostCSS プラグインが要る。今回は同じ値を直接書いた。

### 公式 lint の結果

| ツール | 初回 | 最終 | 残した理由 |
| --- | --- | --- | --- |
| ESLint `eslint-plugin-primer-react`（全 23 ルール、warn） | 58 件（すべて `enforce-css-module-identifier-casing`：CSS Modules のクラス名は PascalCase） | **0 件** | — |
| stylelint `@primer/stylelint-config` | 7 件（型セレクター 3、box-shadow 2、spacing 1、未知のカスタムプロパティ 1） | **1 件** | `--zIndex-skipLink` を「未知のカスタムプロパティ」と警告。トークンは `@primer/primitives` に実在し、MCP の `get_design_token_specs` が「スキップリンクにはこれを使え」と指示しているもの（ハーネス同士の食い違い） |
| MCP `lint_css` | — | 通過 | 中身は上の stylelint と同じ |

ログ：`harness-logs/30〜33-*.txt`、`harness-logs/40-lint_css-*.md`

## 動かし方

```sh
npm ci
npm run dev           # http://localhost:6011/?screen=members&state=loading&signedIn=0&dialog=1
npm run build         # 型チェックとビルド
npm run lint:primer   # Primer 公式 ESLint
npm run lint:css      # Primer 公式 stylelint
npm run harness -- list                                   # @primer/mcp のツール一覧
npm run harness -- call get_pattern '{"name":"Delete"}'   # 任意のツールを呼んで harness-logs/ に保存
```

比較スクリーンショットを撮るには、原本の Storybook を静的ビルドして 6008 番ポートで配信してから実行します。

```sh
ORIGINAL_URL=http://localhost:6008 PRIMER_URL=http://localhost:6011 npm run screenshots
```

今回は原本リポジトリをこのセッションに追加できなかったため、`ORIGINAL_URL=skip` とし、ADS 版が同じ Story・同じ幅で撮影済みの原本画像（`screenshots/original/`）を再利用しました。`screenshots/report.json` に Primer 版の各ケースの axe 違反と横はみ出し量が出力されます（32 ケースすべて 0 件）。

## 次に試すとよさそうなこと

- MCP をエディターに登録した状態で、指示なしで AI に同じ画面を作らせ、**パターンを自発的に読むか**を確かめる（今回は依頼文がツールを名指ししていた）。
- `init` の指示どおりに AGENTS.md（Primer を優先する旨とパターンの読み方）を置いた場合と比べる。
- sampling 対応のクライアントで `review_alt_text` を動かす。
- PostCSS の `@custom-media` を導入し、メディアクエリもトークン化する。

# CTスケジュール UI × Atlassian Design System 再現検証

[takumibv/digital-go-design-system `codex/ct-schedule-ui`](https://github.com/takumibv/digital-go-design-system/tree/codex/ct-schedule-ui) で、デジタル庁デザインシステム（DADS）を使って作った画面があります。この画面を Atlassian Design System（ADS）でどこまで再現できるかを調べました。その際、Atlassian が公開した AI エージェント向け CLI `npx @atlaskit/ads-cli`（v0.11.1）を使っています。

- 参考記事：[Giving AI agents design system context from the terminal](https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli)
- 原本：`src/pages/CTApp.tsx`（1,094行）＋ `styles.css`（1,282行）＋ DADS サンプル部品 5 種
- ADS 版：[`src/CTApp.tsx`](src/CTApp.tsx)（1 ファイル、**自前 CSS 0 行**。レイアウトはすべて `xcss` とトークンで指定）
- デザイン判断の言語化：[docs/design-decisions.md](docs/design-decisions.md)
- 原本の props、状態、固定データ（[`src/fixtures.ts`](src/fixtures.ts)）はそのまま使いました。見た目だけを ADS に置き換えています。

## 結論（要約）

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 機能・情報構造 | ◎ ほぼ 100% | 16 状態すべてを ADS 部品で表現できた。足りない部品は primitives で組めた |
| 見た目の再現度 | △ 約 6 割 | 「ADS らしい」密度の高い業務 UI に寄る。DADS のゆったりした余白・大きい文字・強いアクセントは再現しない |
| アクセシビリティ | ◎ | axe（WCAG 2.1 AA）の違反は原本・ADS 版とも **0 件**。1440／390px とも横はみ出しなし（64 ケース） |
| ADS 準拠度 | ○ | 公式 ESLint プラグインの全ルールで 18 件から **6 件**に減らした（残りは理由付きで許容） |
| 日本語 UI | △ | 和文フォントの指定がない。Avatar がイニシャルを出せない。字間・行間が欧文前提 |
| 依存・サイズ | × | 本体 JS は gzip で **285KB**（原本は JS 55KB ＋ CSS 115KB）。`@atlaskit/*` 50 以上、依存ツリーは約 1,000 行 |

DADS の画面は「市民向け・読みやすさ優先」、ADS は「プロダクト内・情報密度優先」で、トーンがそもそも違います。部品の対応は簡単に取れますが、見た目を寄せようとするほど ADS のトークン制約（`xcss` は任意の px や色を受け付けない）とぶつかります。**「同じ機能を ADS の流儀で作り直す」ことはできますが、「同じ見た目を ADS で作る」ことは向いていない**というのが結論です。

## ads-cli の使用感

`cli-logs/` に実行したコマンドと出力をすべて残しています（59 ファイル）。

**良かった点**

- `search <要素名> --type component` を UI 要素ごとに投げるだけで、対応表のたたき台ができた。22 要素を検索し、`date`（DateLabel）と `navigation`（Pagination）を除いて、目的のパッケージが 1〜2 位に出た（例：`section message`→`SectionMessage`、`empty state`→`EmptyState`、`page header`→`PageHeader`）。
- `component <Name>` で props と型、実例コードが手に入る。`npm` パッケージの d.ts を読みに行く手間がかなり減る。
- **学習データが古いことの補正に効いた**。`border.radius.200` のような古いトークン名を書いて型エラーになったとき、`search radius --type token` で現行の `radius.small/medium/large…` がすぐに分かった。
- `lint-rules` で公式 ESLint ルール 117 件の説明と、正しい例・誤った例が読める。AI が先回りして準拠コードを書く材料になる。

**気になった点**

- アイコン検索はノイズが多い。`search button` のアイコン結果が `LayoutOneColumnIcon` と `TakeoutContainerIcon` になった。`chat` は `ChatWidgetIcon` が出たが、実際に使うべきは `CommentIcon` だった。
- サンプルの import パスが実装とずれることがある。例：`@atlaskit/button/default/button` は旧ボタン。新ボタンは `@atlaskit/button/new` から読み込む。
- **lint ルールの説明と型が食い違う**。`use-heading-level-in-section-message` は「`headingLevel={2}` を指定せよ」と案内するが、実際の型は `"h2"` で、数値を渡すと型エラーになる。
- `setGlobalTheme` などテーマ関連の docs は検索で見つかるが、正しいエントリーポイント（`@atlaskit/tokens/set-global-theme`）は d.ts を読まないと分からなかった。
- 和文フォント、スキップリンク、ロゴ表示のような「Atlassian 製品の外で使う」ときの話題は、検索してもヒットしない。

## 部品の対応表

| 原本（DADS／自作） | ADS 版 | 再現度・メモ |
| --- | --- | --- |
| DADS `Button`（solid-fill／outline／text） | `Button` appearance=primary／default／subtle | ○ サイズは ADS 固定（DADS の lg 56px 相当はない） |
| 削除ボタン（`danger-button` を独自定義） | `Button appearance="danger"` | ◎ 標準で用意されている |
| 週送り ‹ › | `IconButton` ＋ `ChevronLeft/RightIcon` | ◎ |
| 自作 `Avatar`（色付き＋イニシャル） | `Avatar name=…` | × 画像がないと人型アイコンになり、イニシャル表示や色分けができない |
| 自作 `Notice`（status／alert） | `SectionMessage`（inline）＋ `Flag`（一時通知） | ◎ 保存・削除の成功やハドルのデモ通知は `Flag` に置き換えた |
| `<dialog>` ＋自前のフォーカストラップ | `Modal` ＋ `ModalHeader/Title/Body/Footer` | ◎ フォーカス管理が不要になった。390px ではフルスクリーンになる |
| パンくず | `Breadcrumbs` | ○ 先頭の項目がリンクに見えにくい（ADS の標準スタイル） |
| DADS `Input`／`Select`（native） | `Textfield`／`Select`（react-select 系） | ○ Select はネイティブではない。`no-placeholder` に警告される |
| DADS `Checkbox` | `Checkbox` | ◎ |
| 必須ラベル・補足文 | `Label`／`HelperMessage`／`ErrorMessage` | ○ 項目ごとのエラー文は ADS 版で増やした |
| タグ（今週・祝日・設定未完了・参加状況） | `Lozenge` appearance=information／warning／success | ◎ |
| メンバー表（自作 grid） | `DynamicTable` | △ レスポンシブ表示がなく、390px では列が窮屈 |
| 空・失敗状態 | `EmptyState` | ◎ |
| 読み込み中 | `Spinner` | ◎ |
| 自作 SVG アイコン 4 種 | `@atlaskit/icon/core/*` | ◎ |
| ヘッダー（ブランドバー＋サービスバー） | primitives で自作 | △ ADS のナビゲーション（`navigation-system`）は Atlassian 製品用で重いため使わなかった |
| スキップリンク | 自作（素の `<a>`） | △ 単体で使える部品がない |

## 画面比較

`screenshots/compare/` に 16 状態 × 2 幅（1440／390px）の比較画像（左：原本、右：ADS）があります。

- 今週（PC）：[compare/schedule-default-1440.png](screenshots/compare/schedule-default-1440.png)
- 今週（SP）：[compare/schedule-default-390.png](screenshots/compare/schedule-default-390.png)
- メンバー一覧：[compare/members-default-1440.png](screenshots/compare/members-default-1440.png)
- 削除確認：[compare/members-delete-confirm-1440.png](screenshots/compare/members-delete-confirm-1440.png)
- 入力エラー：[compare/settings-validation-1440.png](screenshots/compare/settings-validation-1440.png)

見た目で大きく違うところ：

1. **文字サイズと余白**：DADS は本文 16px、見出し 32px で余白が広い。ADS は本文 14px が基本で、全体に詰まって見える。ページの縦の長さは ADS 版が 2 割前後短い。
2. **アクセント**：DADS の濃い青（#0017c1）、太い上ボーダー、大きな主ボタンは ADS のトークンでは表せない。`color.background.accent.blue.subtlest` などで近い雰囲気にとどめた。
3. **アバター**：原本は色付きのイニシャルで人を見分けられる。ADS 版では全員が同じ人型アイコンになり、ペア表示の楽しさが落ちる。
4. **和文フォント**：ADS は欧文のシステムフォントを指定しており、和文は OS 依存。原本は Noto Sans JP をローカル配信している。

## ADS の制約として分かったこと

- `Stack` や `Inline` の `as` に `section` や `aside` を指定できない（型で拒否される）。外側をネイティブ要素で包む必要がある。`Heading` の `as` に `p` も指定できない。
- `xcss` はトークン以外の値を型で拒否する。任意の px は `maxWidth` など一部のプロパティでしか書けない。「デザインを寄せる」ほど逃げ道が減る。
- `SectionMessage` は `headingLevel` を指定するとき `title` が必須。
- 公式 lint（`no-emotion-primitives`）は `@atlaskit/primitives/compiled` の使用を推奨している。ただ compiled 版は `xcss` ではなく `cssMap` と Compiled のビルドプラグインを前提とするため、Vite にそのまま載せた今回の構成では emotion 版を使った。**完全に準拠するにはビルド基盤ごと Atlassian に合わせる必要がある。**
- `@atlaskit/link` は `target="_blank"` で外部リンクアイコンを自動で付ける。`@atlaskit/image` は幅を指定しない SVG が 0px に潰れた。どちらもロゴでは使えず、素の `a` と `img` に戻した。

### 公式 ESLint（`@atlaskit/eslint-plugin-design-system` 全ルール）の結果

初回は 18 件。`headingLevel`、アイコンの `color`、Lozenge の新しい appearance、`Text` 化を直して **6 件**になった。残りは次のとおり。

| ルール | 件数 | 残した理由 |
| --- | --- | --- |
| `no-emotion-primitives` | 1 | 上記のとおり Compiled のビルド基盤が必要 |
| `no-html-anchor` | 2 | スキップリンクとロゴ |
| `no-html-image` | 1 | ロゴ（`@atlaskit/image` で表示されないため） |
| `use-visually-hidden` | 1 | スキップリンクはフォーカス時に表示する必要があり、`VisuallyHidden` では実現できない |
| `no-placeholder` | 1 | Select の未選択時の文言（原本と同じ挙動） |

## 動かし方

```sh
npm ci
npm run dev           # http://localhost:6010/?screen=members&state=loading&signedIn=0&dialog=1
npm run build         # 型チェックとビルド
npm run lint:ads      # ADS 公式 lint
```

比較スクリーンショットを撮るには、原本の Storybook を静的ビルドして 6008 番ポートで配信してから実行します。

```sh
ORIGINAL_URL=http://localhost:6008 ADS_URL=http://localhost:6010 npm run screenshots
```

`screenshots/report.json` に、各ケースの axe 違反と横はみ出し量が出力されます。今回の結果は 64 ケースすべて 0 件です。

## 次に試すとよさそうなこと

- `npx @atlaskit/ads-cli init` でスキル（ADS／UI Styling Standard／Accessibility Foundation）をリポジトリに入れ、CLI ありとなしで AI に同じ画面を作らせて比べる（今回はリポジトリを汚さないため `init` は実行していない）。
- Avatar の代わりに `AvatarContent` で独自のイニシャル描画ができるか確認する。
- Compiled（`@compiled/babel-plugin`）を Vite に導入し、`no-emotion-primitives` まで解消できるか試す。

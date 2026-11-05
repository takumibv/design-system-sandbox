# ハーネス使用ログ

SmartHR Design System のハーネス（AI エージェント向けの仕組み）を、いつ・何のために・何回使ったかの記録です。時系列順に並べています。日付はすべて 2026-11-05 です。

## 0. 前提として失敗したこと

| # | 操作 | 結果 | 対応 |
| --- | --- | --- | --- |
| 0-1 | `add_repo takumibv/digital-go-design-system`（原本の追加） | **拒否**（このセッションの自動許可判定で拒否された） | 原本は clone できなかった。代わりに ADS 版に入っている原本由来のもの（`fixtures.ts`、原本 Storybook のスクリーンショット 32 枚、ADS 版 `CTApp.tsx` の文言）を使った |
| 0-2 | `git clone https://github.com/takumibv/digital-go-design-system`（認証なし） | 失敗（`could not read Username`）。非公開リポジトリと思われる | 同上 |
| 0-3 | `claude plugin marketplace add kufu/smarthr-design-system` | **拒否**（同じ自動許可判定で拒否された） | 指示どおり、リポジトリを clone して skills を `.claude/skills/` にコピーした |

## 1. 導入

| # | コマンド | 目的 | 結果 |
| --- | --- | --- | --- |
| 1-1 | `git clone --depth 1 https://github.com/kufu/smarthr-design-system.git` | プラグイン本体の取得 | 成功。コミット `ed07a77`（2026-11-04） |
| 1-2 | `cp -rL plugins/smarthr-design-system/skills/* smarthr-ct-schedule/.claude/skills/` | スキル 2 つを取り込む | 成功。`patterns/*.mdx` はサイト記事へのシンボリックリンクなので `-L` で実体をコピーした（`-L` を付けないとリンク切れになる） |
| 1-3 | `scripts/install-harness.sh` | 1-1〜1-2 を再現できるように | スクリプトとして保存。`.claude/skills/` は再配布を避けるためコミットしていない |
| 1-4 | `curl https://smarthr.design/llms.txt`、`/llms-full.txt` | llms.txt の有無を確認 | どちらも **404** |
| 1-5 | リポジトリ内の `DESIGN.md`、`*.mcp*`、`llms*.txt` を検索 | 他の配布経路の有無を確認 | **なし**。AGENTS.md / CLAUDE.md はあるが、ドキュメントサイトを編集する人向け |

## 2. スキルの読み込み（実装前）

SKILL.md の「事前知識で答えず、必ず読む」に従い、**実装の前に**次のファイルを読みました。この時点ではスキルはまだセッションに認識されておらず（後述 2-6）、ファイルを直接開いて読んでいます。

| # | 読んだファイル | 目的 | 得たもの（抜粋） |
| --- | --- | --- | --- |
| 2-1 | `component-guidelines/SKILL.md`、`design-pattern-guidelines/SKILL.md` | 使い方の確認 | 「部品が決まっていなければ component-selector.md を先に」「ガイドは smarthr-ui v100.1.0 基準。版が違えば型定義を正とする」 |
| 2-2 | `component-guidelines/component-selector.md`（106 部品） | 部品の対応表づくり | **Avatar、Breadcrumb、スキップリンクがない**ことが分かった。パンくずの代わりは UpwardLink |
| 2-3 | `design-pattern-guidelines/pattern-selector.md` | どのパターンを読むか決める | 削除ダイアログ、フィードバック、よくあるテーブル、余白、視覚的グルーピング、モバイル |
| 2-4 | `components/*.md` 39 件：Button、ActionDialog、ControlledActionDialog、NotificationBar、ResponseMessage、InformationPanel、Panel、Groupbox、Stack、Cluster、Sidebar、Center、Container、Heading、PageHeading、SectioningContent、Text、TextLink、UpwardLink、StatusLabel、Chip、Badge、Table、Th、Td、EmptyTableBody、FormControl、Fieldset、Select、Checkbox、RequiredLabel、Loader、NotFoundErrorScreen、AppHeader、Header、AppNavi、VisuallyHiddenText、DefinitionList、Base | 各部品の props と [must]/[should]/[avoid] | 詳細は [docs/harness-report.md](../docs/harness-report.md) の出典表 |
| 2-5 | `patterns/*.mdx` 8 件：delete-dialog、feedback、empty-data、spacing-layout-pattern、visual-grouping、page-layout（基本の考え方・構成・シングル 2 カラム）、smarthr-table（構成・初期表示・モバイル）、mobile-friendly-layout（定義・実装上の注意） | 画面の型と通知の使い分け | 「操作部の近くでフィードバック」「画面が切り替わるなら NotificationBar[bold]」「モバイルではテーブルではなくリスト」「余白 2/1.5/1」 |
| 2-6 | （自動）`src/CTApp.tsx` を書いた直後に「New skills discovered in smarthr-ct-schedule/.claude/skills」と通知 | — | スキルの `paths: ["**/*.tsx", "**/*.jsx"]` により、**その配下に .tsx ができた時点で初めてスキルとして認識された**。それまでは Skill ツールから呼べなかった |
| 2-7 | `Skill component-guidelines`（1 回） | スキルとして起動したときの挙動を確認 | SKILL.md の本文がそのまま返るだけ。部品ガイドは自分で開く必要がある（Progressive Disclosure の設計どおり） |

## 3. 実装中に型と照合した回数

SKILL.md の「版が違えば実際の型定義を正とする」に従い、smarthr-ui 102.1.0 の `.d.ts` を直接読んだもの：

| # | 対象 | 理由 | 結果 |
| --- | --- | --- | --- |
| 3-1 | `Button/types.d.ts` | `tsc` が `disabledReason={{ message }}` を拒否 | ガイド（v100.1.0）は `{ icon?, message }`、実装（v102.1.0）は `{ icon?, text }`。**ガイドが古かった** |
| 3-2 | `ControlledActionDialog.d.ts`、`ActionDialogContent.d.ts` | 開閉をアプリ側で持つため | ガイドの ActionDialog.md は RemoteDialogTrigger 版の props。`actionButton={{ text, theme }}`、`responseStatus={{ status, text }}` を d.ts で確認 |
| 3-3 | `hooks/client/useEnvironment.js` | `useEnvironment` が例外を投げた | `EnvironmentProvider` で囲む必要がある。**スキルのどこにも書かれていない** |
| 3-4 | `Header.d.ts`、`AppNavi.d.ts`、`AppHeader/types.d.ts` | ヘッダーの構成 | Header の `featureName` は `enableNew`（社内用）と合わせないと表示されない |
| 3-5 | `FormGroup.js` | `statusLabels={<RequiredLabel />}` で React の key 警告 | 単体の要素を key なしの配列に包んでいた。`[<RequiredLabel key="required" />]` で回避 |
| 3-6 | `smarthr-ui-preset`（Tailwind） | トークンの値を確認 | 色 21、余白 0〜8（16px=1）、角丸、影。`prefix: "shr-"`、preflight 無効 |

## 4. 検査

| # | コマンド | 結果 | ログ |
| --- | --- | --- | --- |
| 4-1 | `eslint-plugin-smarthr` の `recommended` を確認 | **全ルールを off にするだけの設定**だった（`index.js` の `generateRecommendedConfig`）。実際の推奨は共有設定 `eslint-config-smarthr` 側にある | — |
| 4-2 | `npx eslint src`（`eslint-config-smarthr` 14.14.0）初回 | **起動しない**：「tsconfig.json の compilerOptions.paths に `"@/*"` を指定してください」 | — |
| 4-3 | 同上（paths 追加後） | **134 件**（エラー 46、警告 88） | [eslint-initial.txt](eslint-initial.txt)、[summary](eslint-initial-summary.txt) |
| 4-4 | `npx eslint --fix` → 手修正 → 再実行（計 4 回） | **88 件**（エラー 1、警告 87） | [eslint-final.txt](eslint-final.txt)、[summary](eslint-final-summary.txt) |
| 4-5 | `LINT_ALL=1 npx eslint src`（プラグインの全 64 ルール） | 1 回目は `format-translate-component` が options 必須で起動せず。除外して 98 件（新規は 10 件） | [eslint-all-rules-summary.txt](eslint-all-rules-summary.txt) |
| 4-6 | `node scripts/extract-ui-text.mjs` | UI 文言 86 件を抽出 | [ui-text.md](ui-text.md) |
| 4-7 | `textlint`（`textlint-rule-preset-smarthr` の既定） | 11 件 | [textlint-preset-smarthr.txt](textlint-preset-smarthr.txt) |
| 4-8 | `textlint`（SmartHR Design System リポジトリの `.textlintrc` と同じ設定） | 4 件 | [textlint-sds-config.txt](textlint-sds-config.txt) |
| 4-9 | `node scripts/screenshots.mjs`（axe WCAG 2.1 AA、横はみ出し） | 3 回実行。最終は 32 ケースすべて 0 件 | [../screenshots/report.json](../screenshots/report.json) |

## 集計

| 種類 | 回数・件数 |
| --- | --- |
| スキルのファイルを読んだ数 | SKILL.md 2、選定表 2、部品ガイド 39、パターン 8（うち 3 件は一部のみ） |
| Skill ツールでの起動 | 1 回（自動認識後） |
| MCP | 0（SmartHR は MCP を提供していない） |
| llms.txt / DESIGN.md | 0（どちらも存在しない） |
| smarthr-ui の d.ts を読んで照合 | 6 回 |
| ESLint 実行 | 7 回（公式設定 5、全ルール 2） |
| textlint 実行 | 2 回 |

# ハーネス報告

## 1. 使ったハーネスと導入手順・つまずき

| ハーネス | 導入 | 使い方 | つまずき |
| --- | --- | --- | --- |
| `@ant-design/cli` 6.7.0 | `npm i -D @ant-design/cli`（`npx antd …`） | `--help`、`design.md`、`list`、`doc`、`info`（`--detail --format json` で非推奨 props を抽出）、`token`、`usage`、`lint` | 特になし。オフラインで速い。画面設計・パターンを返すコマンドは無い |
| スキル（`skills/antd/SKILL.md`） | `npx antd setup --client claude --mode both` で登録する想定 | 登録は**実行環境の権限設定で拒否**（`.mcp.json`・`CLAUDE.md`・`.claude/skills` への書き込み＝エージェント自身の設定変更と判定）。`--dry-run` で書き込み先を確認し、パッケージ内の SKILL.md を直接読んだ | スキルとして自動で読み込まれる状態は作れなかった。内容は「API を推測せず `antd info` を先に」「変更後に `antd lint`」で、私はこの 2 つを手で実行した |
| antd MCP（`npx antd mcp`） | 同上で登録できず | stdio で起動し `tools/list`・`prompts/list`・`prompts/get` を直接呼んだ（`harness-logs/11-mcp-probe.json`） | ツール 8 個は CLI と同じ中身。`antd-page-generator` プロンプトも部品文書の取り方だけで、画面構成の指針は無い |
| DESIGN.md（https://ant.design/design.md） | `curl` | 全文 | CLI の `design.md` と末尾の改行以外同一 |
| llms.txt | `curl` | 目次として使い、spec 29 本を取得 | `llms-full.txt` は使わなかった（spec 個別の .md で足りた） |
| docs/spec 配下 | `curl https://ant.design/docs/spec/<name>.md` | navigation、research-navigation、research-workbench、data-display、data-list、research-list、detail-page、feedback、research-message-and-feedback、research-empty、research-exception、research-result、research-form、data-entry、buttons、copywriting、stay ほか | 図は画像 URL だけで、テキストからは見えない（「下図のように」の部分は読めない）。research 系は “skip: true” の探索中の文書 |
| 公式 lint | `npx antd lint ./src` | 実装中と最後 | 初回 2 件（Select `optionFilterProp` が v6 で非推奨 → `showSearch.optionFilterProp`）。修正後 0 件 |
| 撮影・axe（ブリーフ付属） | `brief/scripts/capture.mjs` | 1440/390 × 45 状態 | ESM の import は `NODE_PATH` を見ないため、ブリーフの場所から実行すると `@axe-core/playwright` が見つからない。スクリプトを無変更のまま `antd-blog-on/scripts/` に写して実行した |

## 2. 情報構造（画面の分け方・主役・ナビゲーション）にハーネスが効いたか

**結論：効いた。ただし「骨組みの型」と「規則」までで、「この業務で何を主役にするか」は答えてくれない。** 効いたのは CLI・スキル・MCP ではなく、llms.txt から辿った **docs/spec 配下の文書**だけだった。

### 効いた記述
- **ホームの性格**：`spec/research-workbench.md` 9行 “The workbench is often used as the homepage of an application … presents information that the user currently needs to focus on, shortening the path to key information; and allows users to directly perform some high-frequency tasks”、57行 “Provide role-based differentiated views”。→ 最初の画面を「計画」ワークベンチにし、右列を役割（編集担当＝要対応／一般＝あなたの担当／未ログイン＝ログイン案内）で出し分けた。役割で出し分けるのは、読む前には考えていなかった。
- **階層の浅さ・画面の数**：`spec/research-navigation.md` 44行 “shallow, flat, and wide”、`spec/navigation.md` 13行 “Minimize page transitions”。→ 2 階層・グローバル 3 画面に収め、登録・編集は遷移させずドロワーに。
- **グローバルナビの形**：`spec/research-navigation.md` 122行「トップは 2〜7 項目」と 108–112行「サイドは 6 項目超・業務系」。→ 3 項目なので上部。業務系＝サイドという思い込みを、項目数の基準で上部に倒せた。
- **詳細を独立ページにするか**：`spec/data-list.md` 121–126行（同ページ展開／ドロワー／独立ページ／2 列）。“Details need to be shared with others separately … jump to independent page” → Slack に URL を貼る場面を想定して独立ページに。判断基準として具体的で一番役に立った。
- **パンくず不要**：`spec/research-navigation.md` 259行 “fewer than three levels, there is no need to display breadcrumbs”。
- **詳細の主役に Steps**：`spec/detail-page.md` 106–110行「公開プロセス」テンプレート。
- **空き週に破線ボタン**：`spec/buttons.md` 72行 “Guide users to add content in an area”。計画の「穴」に直接置く形はここから。

### 効かなかった点
- **何を主役にするか**：週を中心の対象として導出し、週単位のタイムラインを主役にする判断は、ブリーフ（O1「週 1 本以上」、「投稿予定が入っていない週が分かる」）から自分で決めた。ハーネスにはドメインのオブジェクトを洗い出す手順（オブジェクト指向の UI 設計のようなもの）が無い。
- **カレンダーか一覧かタイムラインか**：`components/Calendar.md` は「スケジュールのような日付データ」に Calendar を勧めており、素直に従えば月カレンダーを主役にしていた可能性がある。週単位の粗い計画では空き週が読みにくいという判断は事前知識から。
- **利用者と頻度**：ハーネスは利用者像・利用頻度を立てる手順を持たない（workbench の “Reduce Memory Load … users returning to the site” が近いが、仮定の置き方までは無い）。
- **ロゴの扱いの衝突**：spec は「ロゴ＝ホームへの脱出口」（33行）。ブリーフはロゴ＝外部サイト。解決（アプリ名をホームリンクに）は自分の判断。
- **図が読めない**：spec の多くの説明は画像に依存しており、テキスト（.md）だけでは「下図の A/B/C/D」等の中身が分からない。

## 3. 部品・状態の判断への効き方

- **よく効いた**：design.md の「主ボタンは画面に 1 つ」（288・306行）、「状態は機能色、プリセット色は Tag・分類」（229行）、「重大な状態に Tag を使わない」（297行）、「点は文字の代わりにならない」（299行）。状態＝Badge、カテゴリ＝Tag、遅れ＝文＋アイコンという分け方はここから直接決まった。
- **状態の伝え方**：feedback／research-message-and-feedback／research-empty／research-exception が、成功＝message、重要な失敗＝ダイアログ、フォームの失敗＝その場の Alert、読み込み失敗＝再試行付き、空＝理由＋次の行動、403/404 テンプレート、と一通り答えてくれた。I16・I17・I18 はほぼこれで決まった。
- **部品の「When To Use」**：Drawer（フォームの作成・編集、複数箇所から同じフォーム）、Timeline、Statistic、Result、Empty の選択に効いた。`antd doc List` で **List が v6.7 で非推奨（Listy へ）**と分かり、使わなかった。
- **API の正しさ**：`antd info --detail` で v6 の非推奨 props（Alert `message`→`title`、Space `direction`、Card `bordered`、Modal `destroyOnClose` ほか）を先に確認でき、記憶の v5 API を書かずに済んだ。それでも Select `optionFilterProp` は記憶で書いてしまい、lint が拾った。

## 4. 答えてくれなかったこと・誤り

- **既定トークンがアクセシビリティ基準を満たさない**：design.md 225行自身が “Some brand-color pairs … are below WCAG AA’s 4.5:1” と注意書きしているが、既定のまま組むと axe で 1 画面あたり数十件の color-contrast 違反が出た（初回：S01 で 58 件）。補助文字 `#8c8c8c`（3.36）、`#1677ff`（4.1）、`#ff4d4f`（3.26）、`#52c41a`（2.26）、プレースホルダー `#bfbfbf`（1.83）、Tag の green/orange（約 3.3）。注意書きは primary の組だけに触れており、補助文字・状態色・Tag には触れていない（不足）。
- **リンク色の派生元**：`colorPrimary` を濃くしてもリンクは `#1677ff` のままだった。リンクは `colorInfo` から派生する。ハーネスの記述からは分からず、検査で分かった。
- **アイコンの読み上げ名が英語**：`@ant-design/icons` は `aria-label` にアイコン名（`plus`・`login` 等）を入れるため、ボタンの読み上げ名が「plus 投稿予定を登録」「login Slack でログイン」になる（Playwright の `getByRole` で判明、`harness-logs/17-smoke.txt` を作る過程）。axe は違反にしないが、日本語の画面では雑音になる。ハーネスに注意は無い。今回は直していない（評価の限界として記録）。
- **日本語のトーン**：copywriting は英語・中国語前提（大文字・句読点）。です・ます等は事前知識で決めた。
- **レスポンシブの情報構造**：390px で何を上にするか（「あなたの担当」を計画より上に）について指針は無い。
- **スキル・MCP は情報構造に何も言わない**：AI 向けハーネスのうち、AI が自動で読み込む経路（スキル・MCP プロンプト）には設計パターンへの導線が無い。spec に辿り着いたのは llms.txt を自分で読みに行ったから。

## 5. AI が自発的に使ったか

- 指示で「ハーネスを使う」と決められていたので、導入・起動・spec の読み込みは指示に従った結果であり、自発的とは言えない。
- 実装中の自発的な利用：①書く前に `antd info --detail` で非推奨 props を一括確認、②v6 の Typography／Layout のトークン名を `antd token` で確認、③lint を 2 回（途中と最後）、④`antd usage` で部品の使用一覧を出した。④以外は SKILL.md の “Always query before writing” “Lint after changes” どおり。
- spec を読み返したのは、主ボタンの重複（空状態）と、Tag で遅れを示しかけたとき（design.md 297行）の 2 回。

## 6. 「Ant Design らしさ」

- 守ったもの：白い Card を `bg-layout` の上に置く 3 層、Header＋横 Menu、14px 基準、主ボタン 1 つ、Badge の状態点、Tag の分類色、Result／Empty／Skeleton の標準形、message・Popconfirm・Drawer。独自の色・影・角丸は作っていない。
- 外したもの：ヘッダーを暗い既定（`#001529`）でなく明るい面にした（ロゴが暗色のため。`headerBg` トークンで変更）。見出しの大きさを Typography のコンポーネントトークンで詰めた（h1 24／h2 16／h3 14）。色をアクセシビリティのため 1 段濃くした（`#1677ff` → `#0958d9`）ため、見た目は既定よりやや落ち着いた青になる。
- 自前の CSS ファイルは書いていない。`antd/dist/reset.css`（公式のリセット）を読み込んだだけ。インライン style は 6 か所（README の「自前のスタイル」参照）。

## 7. 公式 lint の最終結果

```
$ npx antd lint ./src
Scanned 14 files. No issues found.
```
（初回は 2 件の deprecated。`harness-logs/12-lint-first.txt` → `12-lint-final.txt`）

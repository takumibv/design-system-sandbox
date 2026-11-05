# Ant Design のハーネス検証レポート

Ant Design が公開している「AI エージェント向けの仕組み（ハーネス）」を、CTスケジュール画面の実装で実際に使い、デザイン意図がどこまで実装に効くかを調べました。ADS 版の評価（[ads-ct-schedule/docs/ai-design-intent-mechanisms.md](../../ads-ct-schedule/docs/ai-design-intent-mechanisms.md)）と比べられるようにしています。

- 対象：antd 6.7.0、`@ant-design/cli` 6.7.0、`@ant-design/icons` 6.3.4、`@google/design.md` 0.4.0（2026-11-05 時点）
- 実行したコマンドと出力はすべて [`harness-logs/`](../harness-logs/) にあります。索引は [commands.md](../harness-logs/commands.md) です。
- この文書では、**自分で確認した事実**と**推測**を分けて書きます。推測には「（推測）」と付けます。

## 結論

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 全体の意図（DESIGN.md） | ◎ | 「primary は 1 つ」「アクセント色を作らない」「3 層の面」など、画面全体の判断に直接効いた。ADS にはない層 |
| 部品の使い分け | ○ | 部品文書の When To Use と設計仕様（spec）は役に立つが、短く、CLI の既定の出力にも出てこない |
| API の正確さ | ◎ | 学習データにない `Listy`（v6.6）や、非推奨になった props（Alert の `message` など）を正しく教えてくれた |
| 機械での強制 | △ | `antd lint` は非推奨 API の検出が中心。デザインの規則（primary の数、直書きの色、Tag の誤用）は何も検出しない |
| アクセシビリティ | △ | DESIGN.md の通りに既定のテーマを使うと、axe のコントラスト違反が 1 画面に 5〜33 件。DESIGN.md が注記しているのは主色だけ |
| 起動のしやすさ | ○ | すべてオフラインで動き、スキル・MCP・指示文を 1 コマンドで入れられる。ただし DESIGN.md を読むきっかけは弱い |

**DESIGN.md は「この画面をどう見せるか」の判断に、ADS の部品単位の指針よりも強く効きました。** 一方で、DESIGN.md が示すのは Ant Design の既定（業務用の管理画面）の意図です。この画面の主役が何かは書かれていないので、プロジェクト側で補う必要があります。今回はその補いとして、公式 DESIGN.md との差分だけを書いた [プロジェクト用 DESIGN.md](../DESIGN.md) を作りました。

---

## 1. 使ったハーネスの一覧

| 種類 | 名前 | 使った回数 | 何に使ったか |
| --- | --- | --- | --- |
| CLI | `npx antd info <部品>` | 47 回（`--detail --format json` を 16 回含む） | props・型・既定値。非推奨の確認は `--detail --format json` でしか出ない |
| CLI | `npx antd doc <部品>` | 34 回 | When To Use と API の全文。部品の選定 |
| CLI | `npx antd demo <部品> [名前]` | 4 回 | App（message をフックで使う例）、Table（列を隠す例） |
| CLI | `npx antd token [部品]` | 4 回 | トークン名と説明（既定値は出なかった） |
| CLI | `npx antd design.md` | 1 回 | 実装前に DESIGN.md を読む |
| CLI | `npx antd list` | 1 回 | 部品の候補（対応表のたたき台） |
| CLI | `npx antd lint ./src` | 3 回（本体 1、検出範囲の確認 1、ヘルプ 1） | 実装後の検査 |
| CLI | `npx antd doctor`、`npx antd usage` | 各 1 回 | 設定の診断、使った部品の集計 |
| CLI | `npx antd setup --client claude --mode both` | dry-run 2 回、本実行 1 回（拒否） | スキルと MCP の導入 |
| CLI | `npx antd -V`、`--help` | 各 1 回 | 版とコマンド一覧 |
| スキル | `antd`（CLI 同梱の `skills/antd/SKILL.md`） | 手で読んで手順に従った | 「書く前に必ず調べる」「info → demo → 実装」「変更後に lint」 |
| MCP | `antd mcp`（ツール 8、プロンプト 2） | 2 回（stdio で直接呼んだ） | ツールとプロンプトの中身を確認 |
| 文書 | `https://ant.design/llms.txt` | 1 回 | 索引。設計仕様と React 文書を探した |
| 文書 | `https://ant.design/design.md` | 1 回 | CLI 同梱版と同じことを確認（末尾の空行のみ違う） |
| 文書 | `https://ant.design/docs/spec/*.md`、`docs/react/*.md` | 16 本 | ボタン、フィードバック、フォント、色、文言、空状態、例外ページ、フォーム、For Agents、MCP、テーマ、i18n、compatible-style |
| 検査 | `npx design.md lint`（`@google/design.md`） | 2 回 | 公式 DESIGN.md と、プロジェクト用 DESIGN.md |
| 検査 | axe（`@axe-core/playwright`、WCAG 2.1 AA） | 32 ケース（16 状態 × 2 幅）× 5 回 | コントラスト違反の発見 |

### 導入手順とつまずき

1. **`npm i -D @ant-design/cli`** でプロジェクトに入れ、`npx antd` で呼びました。スキルは `npm install -g` を勧めますが、版を固定するためローカルに入れました。
2. **`antd --version` は CLI の版ではありません。** 「対象にする antd の版を指定する」オプションで、引数がないとエラーになります。CLI の版は `-V`（`--cli-version`）です（[00](../harness-logs/00-cli-version.txt)、[02](../harness-logs/02-cli-version-V.txt)）。
3. **スキルの導入（`npx skills add ant-design/ant-design-cli`）は実行できませんでした。** このセッションの自動権限判定が「外部コードの実行」として拒否しました。Ant Design 側の問題ではありません。
4. **`antd setup --client claude --mode both` も拒否されました。** `.mcp.json`、`.claude/skills/antd/`、`CLAUDE.md` を書き込むため、「エージェント自身の設定の書き換え」と判定されました。代わりに次の 2 つで代用しました。
   - スキル：同梱の `SKILL.md` を読み、その手順どおりに作業した（[skill-antd-SKILL.md](../harness-logs/skill-antd-SKILL.md)）。**したがって「スキルが自動で読み込まれるか」は今回検証できていません。**
   - MCP：`antd mcp` を子プロセスで起動し、JSON-RPC を直接送る小さなスクリプト（[scripts/mcp-probe.mjs](../scripts/mcp-probe.mjs)）で、ツールとプロンプトの中身を確かめた。
5. `setup` が `CLAUDE.md` に書く指示文は、CLI のソースで確認しました。「この repo で Ant Design を扱うときは、コードを書く前に `antd` MCP を使う。props は `antd_info`、テーマとデザイン言語は `antd_token` と `antd_design_md`…」という内容です。
6. **`antd token` は既定値を出しませんでした。** テキストでも JSON でも `default` が空です。値は `theme.getDesignToken()` を node から呼んで確かめました（[18](../harness-logs/18-runtime-token-values.txt)）。
7. **`antd info` のテキスト出力には非推奨の印がありません。** 表の幅で列も切れます。非推奨は `--detail --format json` にして初めて分かりました（スキルは「常に `--format json`」と書いているので、指示どおりなら気づけます）。
8. **原本の Storybook を静的ビルドすることも拒否されました**（同じく「外部コードの実行」）。原本リポジトリは ADS 版の撮影（2026-11-01）以降更新されていない（`c6ee7a6`、2026-10-10）ので、ADS 版で撮った原本画像と、原本の axe 結果（64 ケース中 32 ケースが原本で、すべて 0 件）を流用しました。

---

## 2. 判断の出典

「ハーネス」は Ant Design が配っているもの（DESIGN.md、CLI、部品文書、設計仕様、lint）を指します。「原本」は原本の `docs/design-decisions.md` や画面、「自分」は事前知識や自分の判断です。axe は自分で用意した検査道具なので「自分（検査）」としました。

| 判断 | 出典 | 具体的にどこで知ったか |
| --- | --- | --- |
| primary は 1 画面に 1 つ | **ハーネス**（原本・事前知識とも一致） | DESIGN.md の Colors「primary は各画面で最も重要な 1 つの操作に」、Components、Do's and Don'ts。Button の When To Use「1 セクションに最大 1 つ」。設計仕様 buttons。原本も同じ判断で、事前知識としても知っていた |
| 未ログイン時、ヘッダーのログインは default にする | 原本＋自分 | DADS の「ヘッダーのログインよりフローを進めるボタンが重要」（ADS 版の調査で読んだ） |
| 主役を色で強調しない | **ハーネス** | DESIGN.md「1 回限りのアクセント色を作らない。必要に見えるならレイアウトを見直す」「強調は行動のためだけ（Meaningful）」 |
| 主役をアバターの大きさと配置で示す | 原本＋自分 | 原本の構成を引き継いだ |
| ページ背景を灰色、内容を白いカードにする | **ハーネス** | DESIGN.md の Layout「3 層モデル」 |
| 自分のペアの行に `colorPrimaryBg` を敷く | **ハーネス**（解釈は自分） | DESIGN.md「Menu の選択色が『現在地』を示す唯一の合図」を一覧の行に当てはめた |
| ハドルボタンのアイコンを 1 つにする | **ハーネス** | 設計仕様 buttons の Don't「1 つのボタンにアイコンを 2 つ置かない」（ADS 版は 2 つ付けていた） |
| アイコンだけのボタンに Tooltip を付ける | **ハーネス** | 設計仕様 buttons「アイコンだけのボタンは Tooltip で意味を示す」 |
| アイコンだけのボタンに `aria-label` を付ける | 自分（事前知識） | antd lint の a11y ルールは「クリックできるアイコン」だけが対象で、Button は対象外 |
| 続く状態は Alert、操作の結果は message | **ハーネス**（ADS 版の判断とも一致） | 設計仕様 feedback、Alert／Message の When To Use |
| message を `App.useApp()` から呼ぶ | **ハーネス** | DESIGN.md の Customization 4、`antd demo App basic`、lint の usage ルール |
| 削除確認は Modal（Popconfirm にしない） | 原本＋自分 | 設計仕様 feedback は Popconfirm も示すが、説明文とエラー表示が要るため |
| 削除確認の最初のフォーカスをキャンセルに | 原本 | ハーネスには記述なし（設計仕様 buttons に「削除を勧めないならキャンセルを primary にしてもよい」はある） |
| 参加状況は Tag ではなく Badge（点＋文字） | **ハーネス**＋自分 | DESIGN.md「状態には機能色」「Tag を重大な状態に使わない。Alert か Badge を」。参加状況は重大ではないが、分類と状態を分ける根拠にした |
| アバターの色をプリセット色にする | **ハーネス** | DESIGN.md「プリセット色はタグ・グラフ・分類表示専用」 |
| `List` ではなく `Listy` を使う | **ハーネス** | `antd doc List` の非推奨の注記と `antd lint`。**事前知識になかった部品**（v6.6.0 で追加） |
| Alert は `title`、Space は `orientation` | **ハーネス** | `antd info --detail --format json` の非推奨情報。事前知識では `message`／`direction` だった |
| 390px で社員番号の列を隠す | **ハーネス** | `antd demo Table responsive` |
| 参加の切り替えは Checkbox（Switch にしない） | **ハーネス**（原本とも一致） | Checkbox／Switch の When To Use |
| 404 は Result の 404 イラスト | **ハーネス** | 設計仕様「例外ページ」の 404 テンプレート |
| 空状態に理由と次の行動を出す | 原本（ハーネスと一致） | 設計仕様「空状態」の Provide Invitation |
| `colorPrimary` を blue-7 に暗くする | **ハーネス** | DESIGN.md の Colors の注記 |
| 状態色・補足文の灰色を暗くする | 自分（検査）＋ハーネスの方針 | 違反は axe で発見。直し方（独自色を作らず同じパレットの段を使う、`ConfigProvider` で変える）は DESIGN.md に従った |
| `colorWarningBg` を明示する | 自分（検査） | 濃い seed から派生した背景が濁った。ハーネスに記述なし |
| 太さを 400／600 だけにする | **ハーネス** | DESIGN.md の Typography（設計仕様 font とは食い違う。後述） |
| 和文フォント（Noto Sans JP）を足す | 原本＋自分 | DESIGN.md・設計仕様 font とも和文に触れていない |
| 見出しのレベルと大きさを分ける | 自分 | 方法（`components.Typography` で部品単位に上書き）は DESIGN.md の Customization 3 から |
| `locale={jaJP}` | **ハーネス**＋事前知識 | i18n 文書の言語一覧（`ja_JP`）。使い方は事前知識 |
| `reset.css` を読み込む | **ハーネス**（きっかけは自分の検査） | 横はみ出しを検査で発見し、llms.txt から compatible-style 文書を読んで reset.css を知った |
| スキップリンク | 原本＋自分 | ハーネスに記述なし |
| 本文の最大幅を `screenXL` にする | 自分 | トークンにある値を選んだ |

**31 件の判断のうち、ハーネスが主な出典なのは 19 件**です（ハーネスの方針に従ったもの・ハーネスと一致したものを含めると 21 件）。ADS 版では CLI が使い方の指針を出さなかったため、判断の多くが事前知識と後からの lint でした。Ant Design では、実装の前に判断の根拠を得られた点が大きく違います。

### 「primary は 1 画面 1 つ」をどこで知ったか

- 最初に読んだのは DESIGN.md（`antd design.md`、[06](../harness-logs/06-design-md.txt)）で、3 か所に書かれていました。
- 次に `antd doc Button` の When To Use で「1 セクションに最大 1 つ」を確認しました（[13-doc-Button](../harness-logs/13-doc-Button.txt)）。DESIGN.md は「画面」、部品文書は「セクション」、設計仕様 buttons は「ボタングループ」と、**単位が文書ごとに違います。**
- この規則自体は事前に知っていました。原本（DADS）にも同じ規則があります。したがって、この判断は「ハーネスで新しく知った」のではなく「ハーネスで裏付けた」ものです。

---

## 3. ハーネスに従った結果、ADS 版より良くなった点・悪くなった点

### 良くなった点

| 点 | ADS 版 | Ant Design 版 | ハーネスとの関係 |
| --- | --- | --- | --- |
| アバター | 全員が同じ人型アイコン | 色付きのイニシャル（原本と同じ） | 部品の性質（antd の Avatar は文字を出せる）。色の選び方は DESIGN.md |
| 和文フォント | OS 依存 | Noto Sans JP（原本と同じ） | ハーネスではなく `fontFamily` トークンで素直に入った |
| 公式 lint | 6 件残った | 0 件 | ただし lint の検出範囲が狭いため（4 章） |
| ボタンのアイコン | 2 つ（吹き出し＋外部リンク） | 1 つ | 設計仕様 buttons |
| アイコンボタン | aria-label のみ | aria-label ＋ Tooltip | 設計仕様 buttons |
| 意味のある要素 | `Stack` が `section`／`aside` になれない | `Flex` の `component` で指定できる | 部品の性質 |
| 依存 | `@atlaskit/*` 50 以上、依存ツリー約 1,000 行 | 依存ツリー 279 行 | 部品の性質 |
| 判断の根拠 | 実装後の lint と事前知識が中心 | 実装前に DESIGN.md と仕様で根拠を得た | ハーネス |

### 悪くなった点

| 点 | 内容 | ハーネスとの関係 |
| --- | --- | --- |
| 主役の目立ち方 | 色を足さなかったため、原本・ADS 版より弱い | **DESIGN.md に従った結果。** 画面固有の主役については DESIGN.md は何も言わない |
| 原本との見た目の距離 | 灰色の背景にカード、本文 14px。原本の「白くてゆったり」から最も遠い | DESIGN.md（3 層モデル、14px）に従った結果 |
| 既定のアクセシビリティ | axe のコントラスト違反が初回 1 画面 5〜33 件。トークンを 7 つ変えて 0 件にした（ADS 版は既定で 0 件） | DESIGN.md が注記するのは主色だけ |
| JS のサイズ | gzip で 347KB（ADS 版 285KB） | 部品の性質 |
| style の規律 | `style` は任意の値を受け付ける。17 か所すべてトークンで書いたが、型は守ってくれない（ADS の `xcss` は型で拒否） | lint にも検出ルールがない |
| 見出し | `level` が要素と大きさを同時に決める。部品単位でトークンを上書きする必要があった | 回避方法は DESIGN.md から得た |
| 通知が消える | message は約 3 秒で消える（ADS 版の Flag は手動で閉じるまで残った） | 設計仕様 feedback に従った結果 |

---

## 4. ハーネスが答えてくれなかったこと、誤っていた／古かったこと

### 答えてくれなかったこと

- **この画面の主役。** DESIGN.md は「primary は 1 つ」とは言いますが、「どの操作を primary にするか」「画面のどこを目立たせるか」は画面ごとの判断です。原本の `design-decisions.md` と同じ層（ADS 版の調査でいう ③ 画面の意図）は、どのハーネスにもありません。
- **和文。** DESIGN.md と設計仕様 font の書体は欧文のシステムフォントだけで、日本語・中国語の書体には触れていません（中国語版の文書もあるのに CJK の書体の記述がないのは意外でした）。字間・行間・文字の大きさの扱いもありません。i18n 文書は `locale` の一覧だけです。
- **余白の量。** 「4px グリッド、6 段のスケール」はありますが、「セクションの間はどの段か」はありません。
- **アクセシビリティの手段。** スキップリンク、視覚的に隠すテキスト、見出しのレベルと大きさを分ける方法は書かれていません。lint の a11y ルールは 2 つだけです（画像の `alt`、クリックできるアイコンの `aria-label`）。
- **トークンの既定値。** `antd token` は名前と説明だけで、値を返しませんでした。
- **部品によっては When To Use がない。** `antd doc` の When To Use が空だったのは Layout、Avatar、Form、Grid、ConfigProvider です（[when-to-use-summary.md](../harness-logs/when-to-use-summary.md)）。
- **MCP にはデザイン意図の専用ツールがありません。** 8 ツールのうち意図に関わるのは `antd_design_md`（DESIGN.md をそのまま返す）だけです。MCP の初期化応答に AI への指示文（`instructions`）はありませんでした。プロンプト `antd-page-generator` は「必要な部品の文書と例をすべて取得してから書け」と言いますが、**DESIGN.md を読めとは言っていません**（[11-mcp-prompts.json](../harness-logs/11-mcp-prompts.json)）。

### 誤っていた・食い違っていたこと

| 項目 | 内容 | 確認方法 |
| --- | --- | --- |
| 文字の太さ | DESIGN.md は「製品 UI の太さは 400 と 600 の 2 つだけ」。設計仕様 font は「ほとんどは 400 と 500 で足りる。英語の太字には 600」。**ハーネスの中で食い違っている** | [06](../harness-logs/06-design-md.txt)、[web/spec-font.md](../harness-logs/web/spec-font.md) |
| 余白のスケール | DESIGN.md は「6 段（4／4／8／16／24／32）ですべての余白をまかなう」。実際のトークンには `marginSM`＝12、`marginMD`＝20 もある | [18](../harness-logs/18-runtime-token-values.txt) |
| アクセシビリティの注記 | DESIGN.md は主色（白文字 × #1677FF、選択色の上の主色の文字）だけを AA 未満としている。実際には補足文の灰色（3.29:1）、Tag の warning（1.82:1）、processing（3.66:1）、エラー文（3.26:1）も AA 未満だった | axe の初回結果 [30](../harness-logs/30-axe-initial-report.json) |
| seed を暗くする方法 | DESIGN.md は「`ConfigProvider` で seed を変えれば派生色も追従する」とするが、warning を暗くすると背景が #C7C2B3 と濁った。背景のトークンを別に指定する必要があった | 実行時のトークン |
| primary の単位 | DESIGN.md は「画面」、Button 文書は「セクション」、設計仕様は「ボタングループ」 | 2 章 |
| `antd lint` の検出範囲 | スキルは lint を「非推奨や問題のある使い方を見つける」と説明するが、実際の検出は非推奨がほぼすべて。わざと違反を入れたファイルでは、非推奨 6 件だけを検出し、primary 2 つ、直書きの色（`#FFFFFF`）、マジックナンバー（`padding: 11`）、Tag の誤用、ラベルのないアイコンボタン、v4 の `visible` はどれも検出しなかった | [23-lint-probe](../harness-logs/23-lint-probe.txt)、[lint-probe/Bad.tsx](../harness-logs/lint-probe/Bad.tsx) |

### 古かったこと

- 古い情報は見つかりませんでした。逆に、CLI のデータは antd 6.7.0 と一致しており、**AI の事前知識の古さ（`List`、Alert の `message`、Space の `direction`）を正してくれました。**

### 公式 DESIGN.md を DESIGN.md 形式で検査した結果

`npx design.md lint` を公式の DESIGN.md にかけると、エラー 0、警告 19 件でした（[24](../harness-logs/24-designmd-lint.txt)）。

- コントラスト 2 件：`button-primary`（4.10:1）、`menu-item-selected`（3.66:1）。DESIGN.md 自身の注記と一致します。
- 未参照のトークン 17 件：プリセット色や `success` などが、どの部品からも参照されていない。形式上の警告で、実害はありません。

プロジェクト用 DESIGN.md（公式との差分だけを書いたもの）は、エラー 0、警告 0 でした（[25](../harness-logs/25-designmd-lint-project.txt)）。

---

## 5. AI は自発的にハーネスを使ったか

### 今回の事実

- 今回は依頼文で「実装の前にハーネスを導入・起動する」「DESIGN.md を読む」と指示されていたため、**自発的に使ったかどうかは、この作業からは判断できません。**
- スキルを `.claude/skills/` に置けなかったので、「スキルの説明文によって自動で起動するか」も検証できていません。
- 指示がなかった部分で、自分から追加でハーネスを使った場面は次の 3 つです。
  1. `antd doc List` で非推奨の注記を見て、`antd doc Listy` を追加で引いた。
  2. `antd info` のテキストに非推奨が出ないことに気づき、スキルの「常に `--format json`」に従って `--detail --format json` で引き直した。
  3. 横はみ出しの原因を調べるとき、llms.txt から compatible-style 文書を探し、`reset.css` を見つけた。

### 起動条件は明確か

| ハーネス | 起動条件の書き方 | 評価 |
| --- | --- | --- |
| スキル `antd` | 「antd のコードを書く、antd の API を調べる、`antd` からの import がある」 | ◎ 明確。antd を使う作業なら必ず当てはまる |
| スキル内の手順 | 「コードを書く前に `antd info` で API を調べる。記憶に頼らない」「変更後に `antd lint`」 | ◎ 明確 |
| DESIGN.md | スキルでは「シナリオ 1：部品のコードを書く」の 5 つ目に `antd design.md` があるだけ。MCP の指示文では「テーマ・トークン・デザイン言語の作業のとき」 | △ **画面を作るときに読む、とは書かれていない** |
| MCP のプロンプト | `antd-page-generator` は部品の文書と例を集めよと言うが、DESIGN.md には触れない | × |
| `setup` が書く CLAUDE.md の指示文 | 「コードを書く前に `antd` MCP を使う」。DESIGN.md は「テーマ・トークン・デザイン言語の作業」に限定 | △ |

（推測）指示がなければ、AI は `antd info`／`antd demo` までは使い、DESIGN.md は読まずに画面を作る可能性が高いと考えます。起動条件の書き方が「API を調べるとき」に偏っており、「画面の見た目を決めるとき」に DESIGN.md を読ませる条件がないためです。SUPER STUDIO の報告にある「MCP を配っても AI が起動しない」問題のうち、API 側は Ant Design のスキルで解決していますが、意図側は解決していないと言えます。

---

## 6. DESIGN.md の「全体の意図」はどこまで効いたか

| 画面の判断 | 効いたか | 内容 |
| --- | --- | --- |
| 主役（何を目立たせるか） | △ | 「primary は 1 つ」「強調は行動のためだけ」は効いた。何を主役にするかは原本から |
| 主役の見せ方 | ◎ | 「アクセント色を作らず、レイアウトで解決する」がそのまま判断になった |
| 色の意味 | ◎ | 主色・機能色・プリセット色の役割分担がはっきりしていて、Tag、Badge、アバター、選択行の色を迷わず決められた |
| 面の構成 | ◎ | 3 層モデルで「灰色の背景＋白いカード」が決まった |
| 余白 | △ | 「4px グリッド」と「Card の内側 24px」以外は決まらない |
| 文字 | ○ | 14px・太さ 2 つは効いた。和文は何もない |
| アクセシビリティ | △ | 主色の注記は効いたが、他の違反は検査で見つけた |
| 日本語 UI | × | 記述なし |

ADS の部品データ（`usageGuidelines`）は「この部品をどう使うか」の単位で、画面全体のトーンは扱っていませんでした。DESIGN.md は逆に、**画面全体のトーンと色の役割を 1 枚で渡せる**ことが強みです。ただし、そのトーンは「業務用の管理画面」のもので、原本の「やさしい案内」とは合いません。DESIGN.md に従うほど、原本からは遠ざかりました。

---

## 7. ADS との比較

ADS 版の評価（[ai-design-intent-mechanisms.md](../../ads-ct-schedule/docs/ai-design-intent-mechanisms.md)）と同じ観点で並べます。

| | ADS | Ant Design |
| --- | --- | --- |
| 意図の置き場所 | 部品ごとの構造化データ（usage／content／a11y） | **DESIGN.md（画面全体の意図）**＋部品文書の When To Use＋設計仕様の Markdown |
| AI が読める形で配っているか | ◎ llms.txt 8 種、ホスト型 MCP、CLI | ◎ llms.txt、DESIGN.md、オフライン CLI（MCP 兼用）、スキル |
| 今回の CLI で使い方の指針が出たか | × `component` は props と例だけ | ○ `doc` で When To Use が出る（`info` には出ない） |
| API の正確さ | ○ 古いトークン名を直せた。lint の説明と型の食い違いがあった | ◎ 版ごとのデータ。非推奨を正確に教えてくれた |
| 機械での強制 | ◎ ESLint 117 ルール＋型でトークン以外を拒否 | △ lint はほぼ非推奨のみ。`style` は型で守られない |
| 既定のアクセシビリティ | ◎ 既定のままで axe 0 件 | △ 既定のままで 1 画面 5〜33 件 |
| スキルの公開 | △ 社内のみ | ◎ 公開。1 コマンドで導入 |
| オフライン | × MCP はネットワーク | ◎ すべて同梱 |

3 つの層（ADS 版の調査の「示唆」）に当てはめると次のとおりです。

| 層 | ADS | Ant Design |
| --- | --- | --- |
| ① 部品の使い分け | ◎ データ＋配布＋lint | ○ 文書はあるが短い。lint は使い分けを検査しない |
| ② プロダクトのトーン | ○ content standards | ◎ **DESIGN.md** |
| ③ 画面の意図 | × | × → プロジェクト用 DESIGN.md で補った |

**ADS は「部品を正しく使わせる」仕組みが強く、Ant Design は「画面全体の見せ方を揃えさせる」仕組みが強い**、という違いがはっきりしました。

---

## 8. このプロジェクトで次にできること

1. **プロジェクト用 DESIGN.md を正にする。** [DESIGN.md](../DESIGN.md) を AGENTS.md／CLAUDE.md から参照させ、「画面を作る前に、公式 `antd design.md` とこのファイルを読む」と起動条件を書く。5 章の「DESIGN.md を読むきっかけが弱い」問題を補える。
2. **`design.md lint` を CI に入れる。** プロジェクト用 DESIGN.md を変えたときに、コントラストの劣化を検出できる（今は 0 件）。
3. **lint を補う。** 「primary の数」「`style` にトークン以外の値」「Tag の状態色」は `antd lint` では検出されない。ESLint の独自ルールで足す。
4. **スキルを実際に入れて、指示なしで AI に同じ画面を作らせる。** DESIGN.md を自発的に読むかどうかを確かめる（今回は権限の都合で検証できなかった）。

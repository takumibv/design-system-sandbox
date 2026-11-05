# デザイン意図を AI に届けているデザインシステムの調査

[ADS と DADS の比較](ai-design-intent-mechanisms.md)に続いて、他のデザインシステムが「部品の使い分け・禁止事項・トーン」をどう AI コーディングエージェントに渡しているかを調べました（2026-11-05 時点）。

調べ方は 2 通りです。SmartHR と Primer は、リポジトリとパッケージを取得して中身を確認しました。それ以外は、公式ドキュメントと記事を読んでいます。

## 結論

- **意図まで届けられている代表例は SmartHR（日本）、Primer（GitHub）、Serendie（三菱電機）、Carbon（IBM）。** どれも「部品の API」だけでなく「いつ使う／使わない」「書き方」を AI が引ける形にしています。
- 中でも **SmartHR は日本語の UI 規約を AI 向けにした最良の例**です。部品ごとに `[must]` `[should]` `[avoid]` 付きのチェックリストとライティングのルールがあり、lint ルールから Do/Don't を自動生成しています。
- 共通する成功パターンは次の 4 つです。
  1. 意図を**部品ごとの構造化された文書**にする
  2. **lint のルールから**ガイドを自動生成し、文書が古くならないようにする
  3. **MCP（引く）とスキル（手順を渡す）を組み合わせる**
  4. 作った後に**検査する道具**（監査・lint）を用意する
- 実務の報告では「MCP を配っただけでは AI が使わない」「既定のバリアントを誤解する」という失敗が繰り返し出ています。**「いつこの道具を使うか」と「判断のルール」を明文化したチームほど精度が上がった**、という点で各報告は一致しています。

---

## 1. デザインシステムごとの仕組み

### 一覧

| デザインシステム | MCP | スキル／プラグイン | llms.txt | 意図の渡し方 | 機械的な検査 |
| --- | --- | --- | --- | --- | --- |
| **SmartHR**（日本） | なし | ◎ Claude Code／Cursor／Codex 用プラグイン（スキル 2 つ） | なし | ◎ 部品ごとの must/should/avoid チェックリスト、ライティング規則、画面パターン 24 件 | ◎ eslint-plugin-smarthr、textlint（日本語表記） |
| **Primer**（GitHub） | ◎ `@primer/mcp`（20 ツール） | — | なし | ◎ 用途・アクセシビリティの指針、色とタイポの使い方、パターンを専用ツールで返す | ◎ `lint_css`、`review_alt_text` |
| **Serendie**（三菱電機） | ◎ リモート MCP | ○ `serendie-overview` | ◎ llms.txt と llms-full.txt | ○ llms.txt の説明文に使い分けを書く。ガイドラインを MCP で取得 | ○ Figma プラグインでトークン違反を検査 |
| **Carbon**（IBM） | ◎ ホスト型（IBMid 必須） | ◎ `carbon-builder`（参照文書 13 本） | — | ○ ドキュメント検索＋スキルのガードレール・よくある失敗集 | ◎ `code_audit`（トークン・用途・a11y・レイアウトを監査） |
| **PatternFly**（Red Hat） | ○ 2 ツール | — | — | ○ ガイドライン検索と部品の全文書（props の JSON スキーマ付き） | — |
| ADS（参考） | ◎ | △ 社内のみ | ◎ 8 種 | ◎ 部品ごとの usage/content/a11y | ◎ ESLint 117 ルール |
| DADS（参考） | なし | 開発者向けのみ | なし | Web サイトの文章のみ | 汎用 lint のみ |

Material、Fluent、Spectrum、Polaris は、公式に意図まで渡す仕組みを確認できませんでした。

- Polaris：Shopify Dev MCP で使えますが、公式ページにはツールの中身や設計ガイダンスの記載がありません。
- Fluent：見つかった MCP サーバーはコミュニティ製です。

### SmartHR Design System ── 日本語の規約を AI 向けにした例

- **配布**：[kufu/smarthr-design-system](https://github.com/kufu/smarthr-design-system) を Claude Code／Cursor／Codex のプラグインとして配っています（2026 年 5 月〜）。

  ```
  /plugin marketplace add kufu/smarthr-design-system
  /plugin install smarthr-design-system@smarthr-design-system
  ```

- **スキル `component-guidelines`**（部品 106 件）
  - 冒頭で強く指示しています。「事前知識のみで答えず、必ず下記の該当ドキュメントを実際に読んでから回答すること」
  - 部品が決まっていなければ、先に選定表（`component-selector.md`）を読ませます。非推奨の部品には「⚠️ 非推奨」と代わりの部品を明記しています。
  - 各部品のガイドは 3 層です。
    1. Props（`metadata.json` から自動生成）
    2. 実装ルールの Do/Don't（`eslint-plugin-smarthr` のルール README から自動生成）
    3. 使い分けのチェックリスト（人がレビューした `checklist.yaml`）
  - Button のチェックリストの例：
    - `[must]` 1 つの画面で Primary ボタンは最大 1 つまでにする。主要な操作が複数あるなら情報設計を見直す
    - `[avoid]` 注目を集めることだけを目的に Primary を使わない
    - `[should]` Danger は主に削除ダイアログで使う。警告色に頼らず、配置やラベルでも伝わるようにする
    - `[must]` 他の画面へ移動するなら TextLink を使う
    - ライティング：`[must]` ボタンラベルには動詞の終止形を使う
- **スキル `design-pattern-guidelines`**：画面レイアウトや UI パターンの記事 24 件。サイトの記事へのシンボリックリンクなので、サイトを更新すればスキルにも反映されます。
- **古くならない工夫**：ガイドは「直接編集せず、入力ソースを更新して再生成」する運用です。生成と検証のスクリプトもあります。
- **文章の検査**：textlint と表記ゆれ辞書（prh）で、日本語の表記ルールを機械的に検査しています。

### Primer（GitHub）── 意図の種類ごとに専用ツールを用意

[`@primer/mcp`](https://primer.style/product/getting-started/foundations/mcp)（v1.1.2）のツールを、パッケージで確認しました。

| 意図の種類 | ツール |
| --- | --- |
| 部品の使い分け | `get_component_usage_guidelines`、`get_component_accessibility_guidelines` |
| 画面パターン | `list_patterns`、`get_pattern` |
| 色・文字の使い方 | `get_color_usage`、`get_typography_usage`、`get_token_usage_patterns` |
| トークンの検索（意図からも引ける） | `find_tokens`、`get_design_token_specs` |
| コーディング規約 | `primer_coding_guidelines` |
| 作った後の検査 | `lint_css`（トークンの使用を検査）、`review_alt_text`（代替テキストの妥当性） |

ADS の CLI では props と実例しか出ませんでした。Primer は「用途」「色の使い方」をツール名の段階で分けているので、AI が意図を取りに行きやすい設計です。

### Serendie（三菱電機）── 4 つの経路をそろえ、Figma 側でも検査

[serendie.design/ai](https://serendie.design/en/ai/mcp-server/)

- **リモート MCP**（`https://serendie.design/mcp`）：部品、トークン、アイコン、ガイドラインを取得できます。
- **スキル `serendie-overview`**：最初に読み込むスキルです。「MCP は道具を、スキルはその使い方を渡す」と役割を分けています。
- **llms.txt**：一覧の説明文そのものに使い分けを書いています。
  - Select「選択肢ではなくアクションを表示する場合は、DropdownMenu を使用してください」
  - Text Field「複数行には TextArea を使用してください」
- **Figma プラグイン**：選択した要素がカラーロールやタイポグラフィロールに従っているかを検査し、一括で直します。デザイナー側にも同じ規則を効かせる仕組みです。

### Carbon（IBM）── 監査ツールとスキルでガードレールを張る

[Carbon MCP](https://carbondesignsystem.com/developing/carbon-mcp/overview/)

- **ホスト型 MCP**：IBMid で認証します（社外の人は IBMid の作成が必要）。ツールは 5 つです。
  - `code_audit`：トークン、部品の用途、アクセシビリティ、レイアウトの観点でコードを検査
  - `docs_search`：用途やアクセシビリティの文書を検索
  - `code_search`、`get_charts`、`labs_search`
- **スキル `carbon-builder`**（Apache-2.0）：参照文書 13 本を持ちます。実装のガードレール、よくある失敗、アクセシビリティ規則（WCAG 2.2 AA）、グリッド、結果の検証、エラーからの回復などです。
- **プロンプトの見本集**：「Mandatory: Use the carbon-builder skill and Carbon MCP」で始まり、「存在しない部品や props を受け入れない」「先に質問させる」と指示する例を公式に載せています。

### PatternFly（Red Hat）

- MCP のツールは 2 つです。ガイドラインの検索（`searchPatternFlyDocs`）と、部品の全文書の取得（`usePatternFlyDocs`、props の JSON スキーマ付き）。
- 公式の作業ドラフトに「**AI がツールを呼ばないことがある**」と課題として書かれており、正直な記録です。

---

## 2. 仕組みを支える汎用の道具

| 道具 | 意図をどう載せるか |
| --- | --- |
| **[DESIGN.md](https://github.com/google-labs-code/design.md)**（Google、2026-04 公開、alpha） | 先頭の YAML にトークン（色・文字・角丸・余白・部品）、本文に「なぜその値か」を書く 1 ファイル形式。章立ては Overview → Colors → … → Do's and Don'ts。`npx @google/design.md lint` で参照切れやコントラスト不足（WCAG AA）を検査し、`diff` で変更による劣化を検出する |
| **[Storybook MCP](https://storybook.js.org/docs/ai/mcp)**（10.x、preview） | 部品の props・ストーリー・文書を AI に渡す。公式の推奨は「ストーリーや JSDoc に**なぜ使うか**を書く」（例：「主ボタンは 1 ビューに 1 つまで」「遷移なら Link を使う」）。アンチパターンは `tags: ['!manifest']` で AI から隠す。`test-run` で a11y も検査できる |
| **v0 Design Systems 2.0**（2026-06） | 自社のデザインシステムを登録すると、v0 用のスキルとして保存される。「確認できない部品・props・トークンは使わない」という方針をとる |
| **Meta Astryx**（2026-06 OSS） | 意図を「届ける」より「測る」側。同じ依頼を Astryx、shadcn/ui、素の HTML で生成して採点する。会話が長くなるとデザインシステムから外れていくか（劣化モード）も検査する |

---

## 3. 実務の報告から分かった落とし穴

| 報告 | 内容 |
| --- | --- |
| [SUPER STUDIO（albers）登壇資料](https://speakerdeck.com/superstudio/2026-dot-07-dot-22-deng-tan-zi-liao)（2026-07） | 「デザインシステム MCP は配って終わりじゃなかった」。起きた問題：<br>・AI が MCP を起動せず独自実装を始める<br>・AI は primary を主要色だと思い込むが、実際の既定は basic<br>・Figma MCP と自社 MCP でカラートークンの指定方法が違う<br>・class の上書きで崩れる<br>対策は「部品の利用規約」「詳細仕様」「上書き禁止」「MCP の起動条件をスキルに明記」。**「ルールを明確にしたチームほど精度が上がった」「精度の正体は、モデルの賢さよりも、判断とプロセスをどれだけ明確に渡せるか」** |
| [Ubie UI MCP](https://zenn.dev/ubie_dev/articles/f927aaff02d618)（2025-04） | Cursor Rules や node_modules を読ませるだけでは足りず、MCP にした。存在しない部品（Stepper）を求めると精度が落ちる |
| [ハシゴダカ](https://zenn.dev/hashigodaka/articles/design-system-remote-mcp)（2026-08） | `read_guideline` で「構図・情報階層・伝え方」の Markdown を最初に読ませ、次に `get_tokens` で値を取る順序を推奨。トークンの `description` にも「主役のグラフィックに限定して使う」と書く。スライド生成では AI 特有の癖が残り、追加ルールが必要だった |
| [James Ives](https://jamesiv.es/blog/your-design-system-needs-an-mcp-server/)（2026-05） | 「ghost バリアントはコントラストが低いのでフォームの主ボタンに使わない」のように、**避けるべき組み合わせの理由**を書く。「文書が意見を持つほど、AI の出力も意見を持つ」。Slack にしかない回避策は AI から見えない |
| PatternFly、arXiv の調査（HN の議論） | AI がツールを呼ばないことがある。AGENTS.md の効果は平均で小さい（+4%）という研究もある。置くだけでなく、起動条件と検査を組み合わせる必要がある |

---

## 4. 共通する成功パターン

1. **意図を部品ごとの構造化文書にする。**
   - 例：SmartHR の must/should/avoid、ADS の usage/content/a11y、Primer の usage と color_usage
   - 散文のサイトより、「この部品について読むべき 1 ファイル」があるほうが AI は確実に読みます。
2. **ガイドを正本から自動生成する。**
   - SmartHR は lint ルールの README とチェックリストからガイドを生成し、ADS は 1 つの正本から CLI・MCP・llms.txt を出しています。
   - 人が AI 向け文書を別に書くと、すぐに古くなります。
3. **「引く道具」と「手順」を分ける。**
   - MCP や llms.txt は情報、スキルは「いつ、何を、どの順で引くか」を渡します。Serendie と Carbon は役割を明言しています。
   - スキルの冒頭で「事前知識で答えず必ず読め」と指示するのも効きます（SmartHR）。
4. **作った後に検査する。**
   - 例：Carbon の `code_audit`、Primer の `lint_css`、ADS の ESLint、SmartHR の eslint と textlint、Serendie の Figma 検査、DESIGN.md の lint
   - 「やってはいけないこと」は文章より lint のほうが確実です。
5. **選び方の索引を先に渡す。**
   - SmartHR の選定表、Serendie の llms.txt の説明文が該当します。
   - 「A ではなく B のときは C を使う」を一覧の段階で書いておくと、部品の選び間違いが減ります。

---

## 5. このプロジェクト（DADS × CTスケジュール）に取り入れるなら

優先度の高い順に並べます。

1. **SmartHR 方式のスキルを作る（効果が最も大きい）。**
   - DADS サイトの「使い方」（例：ボタンの重要度、配置）を部品ごとに `[must]` `[should]` `[avoid]` のチェックリストにまとめ、`.agents/skills/dads-component-guidelines/` に置く。
   - 冒頭に「事前知識で答えず、必ず該当ファイルを読む」と書く。
2. **選定表を 1 枚作る。** 「選択肢なら Select、操作なら Dropdown」のように、DADS の部品の使い分けを一覧にする。
3. **トークンの使い道を書く。** DADS のトークンには説明がないので、DESIGN.md 形式（YAML のトークン＋本文の理由）で、このプロダクトの色・文字・余白の意図を書く。lint でコントラストも検査できる。
4. **検査を足す。** 「Tailwind の標準色を使わない」「主ボタンは 1 画面 1 つ」を lint や Playwright の検査にする。原本の `ui-review-harness.md` の「次に追加する候補 3」の具体化にあたる。
5. **AGENTS.md で起動条件を明記する。** 「UI を作るときは上のスキルと `docs/design-decisions.md` を必ず読む」と書く（SUPER STUDIO の教訓）。

## 出典

- 横断記事：[クラスメソッド：AI エージェント対応を進めるデザインシステムの動向（2026-07）](https://dev.classmethod.jp/articles/design-system-ai-agent-roundup/)、[Supernova: AI Design Guidelines（2026-10 再確認版）](https://www.supernova.io/blog/top-6-examples-of-ai-guidelines-in-design-systems)
- SmartHR：[smarthr.design](https://smarthr.design/)、[kufu/smarthr-design-system](https://github.com/kufu/smarthr-design-system)
- Primer：[Primer MCP](https://primer.style/product/getting-started/foundations/mcp)、[packages/mcp README](https://raw.githubusercontent.com/primer/react/HEAD/packages/mcp/README.md)
- Serendie：[Serendie MCP](https://serendie.design/en/ai/mcp-server/)、[Agent Skills](https://serendie.design/en/ai/agent-skills)、[Figma プラグイン](https://serendie.design/en/ai/serendie-ui-plugin)、[llms.txt](https://serendie.design/llms.txt)
- Carbon：[Overview](https://carbondesignsystem.com/developing/carbon-mcp/overview/)、[Setup](https://carbondesignsystem.com/developing/carbon-mcp/onboarding-and-setup/)、[Prompts](https://carbondesignsystem.com/developing/carbon-mcp/prompts/)
- PatternFly：[PatternFly MCP](https://www.patternfly.org/ai/patternfly-mcp)
- Shopify：[Use Polaris with the Shopify dev MCP server](https://shopify.dev/docs/api/app-ui/using-mcp)
- DESIGN.md：[Google ブログ](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)、[google-labs-code/design.md](https://github.com/google-labs-code/design.md)
- Storybook：[Storybook MCP](https://storybook.js.org/docs/ai/mcp)、[AI best practices](https://storybook.js.org/docs/ai/best-practices)
- 実践記事：[SUPER STUDIO 登壇資料](https://speakerdeck.com/superstudio/2026-dot-07-dot-22-deng-tan-zi-liao)、[Ubie](https://zenn.dev/ubie_dev/articles/f927aaff02d618)、[ハシゴダカ](https://zenn.dev/hashigodaka/articles/design-system-remote-mcp)、[James Ives](https://jamesiv.es/blog/your-design-system-needs-an-mcp-server/)、[Evaluating AGENTS.md（HN）](https://news.ycombinator.com/item?id=47034087)

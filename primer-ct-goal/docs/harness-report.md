# Primer ハーネス調査レポート（harness-report）

この調査の主目的：Primer（GitHub）が AI エージェント向けに用意している仕組み（ハーネス）を実際に使い、**デザイン意図（いつ何を使うか、何を主役にするか、文言の書き方など）が設計にどこまで効くか**を確かめる。

書き方の約束：自分で確かめた事実だけを書く。推測には「（推測）」と付ける。呼び出しの出力はすべて `harness-logs/` に保存した（`calls.log` に 100 回分の呼び出し記録）。

---

## 1. 結論（先に）

- **効いたところ**：部品を選ぶ場面の判断。特に **19 個の pattern**（Delete、Saving、Notification message、Empty States、Loading、Degraded Experiences、Forms、Feature Onboarding、View、Navigation）は「この場面ではどの部品を、どこに、どんな文言で」をかなり具体的に教えてくれた。通知の使い分けの表（design-decisions 第 2 部）は、ほぼ全行がパターンの記述から来ている。
- **効かなかったところ**：**画面構成と主役の決め方**。何画面に分けるか、どこを主役にするか、主役をどれだけ大きくするかは、ハーネスのどこにも書かれていない。パターンは「場面ごとの部品の選び方」で、アプリ全体の情報設計は扱っていない。主役（今週の相手とハドル開始ボタン）はブリーフから自分で決めた。ハーネスが効いたのは、決めた主役を**どう見せるか**（primary は success 色を 1 つ、essentials first、色だけで区別しない）のほう。
- **道具としての完成度にはむらがある**。部品ガイドライン取得の 52 回のうち 16 回は、中身の代わりに primer.style のトップページが返った（エラーにならない）。`lint_css` は stylelint と設定が手元にないと理由を出さずに失敗し、設定を入れた後も違反メッセージを返さない。`review_alt_text` は判定せず、呼び出し元の LLM に 1 文の質問を投げ返すだけだった。
- **llms.txt / DESIGN.md はサイト全体にはない**。部品ごとの llms.txt（`/product/components/<slug>/llms.txt`）はあり、`get_component(_batch)` がそれを読んでいる。

---

## 2. 使ったハーネスの一覧

| 種類 | 名前 | 版 | 何のために使ったか | 結果 |
| --- | --- | --- | --- | --- |
| MCP サーバー | `@primer/mcp` | 1.1.2 | 全体 | ツール 20 個。prompts / resources はない（`listPrompts` / `listResources` が Method not found） |
| MCP ツール | `primer_coding_guidelines` | | 最初に、全体の書き方の規則 | 使えた。sx と Box を使わず CSS Modules、部品・パターンを優先 |
| MCP ツール | `list_patterns` / `get_pattern` ×19 | | 画面構成の前に、全パターンを読んだ | 使えた。最も有用 |
| MCP ツール | `get_color_usage` / `get_typography_usage` | | 色・文字の考え方 | 使えた（後述のプロキシ対応の後） |
| MCP ツール | `init` | | 導入手順 | 使えた。一部古い（後述） |
| MCP ツール | `list_components` / `get_component_batch` ×3 | | 部品の API（props） | 使えた。部品ごとの llms.txt を読んでいる |
| MCP ツール | `get_component_usage_guidelines` ×26 / `get_component_accessibility_guidelines` ×26 | | 部品を選ぶとき | **16 回は中身が primer.style のトップページ**（後述） |
| MCP ツール | `get_design_token_specs` / `find_tokens` ×2 | | 人ごとの色に使うトークン探し | 使えた。lint と食い違い（後述） |
| MCP ツール | `list_icons` | | アイコン選び | 使えた（XML 風の長い一覧） |
| MCP ツール | `lint_css` ×12 | | 自前 CSS の検査 | 手元に stylelint と設定を入れるまで動かない。入れた後も違反メッセージを返さない（後述） |
| MCP ツール | `review_alt_text` | | ロゴの alt | 判定はサーバー側ではなく、呼び出し元の LLM に任せる仕組み（後述） |
| 使わなかった MCP ツール | `get_component`（単体）、`get_component_examples`、`get_icon`、`get_token_group_bundle`、`get_token_usage_patterns` | | — | batch で足りた／アイコンは名前だけで足りた／トークンは find_tokens で足りた |
| lint | `@primer/stylelint-config` | 13.6.0 | `lint_css` を動かすため。直接も実行 | 最初 11 件 → 修正と理由つき無効化で 0 件 |
| lint | `eslint-plugin-primer-react` | 9.4.0 | TSX の検査 | 最初 55 件 → 0 件 |
| ドキュメント | `https://primer.style/llms.txt` ほか | — | 有無の確認 | なし（404 またはトップへリダイレクト。`harness-logs/06-llms-txt-design-md.md`） |
| ドキュメント | 部品ごとの llms.txt | — | `get_component_batch` 経由 | あり |
| DESIGN.md | — | — | 有無の確認 | サイトにも npm パッケージにもない。ただし `@primer/primitives/dist/css/primitives.css` 冒頭に「`@spec See /DESIGN_TOKENS_SPEC.md`」「`@rule Never use raw values`」という AI 向けと思われるコメントがある（そのファイルはパッケージに含まれていない） |

### 導入手順（実際にやったこと）

1. `npm i -D @primer/mcp@latest @modelcontextprotocol/sdk`
2. このセッションの MCP 設定にはあとから stdio サーバーを足せないため、`harness/mcp-call.mjs`（SDK の `Client`＋`StdioClientTransport`）を書き、`node harness/mcp-call.mjs call <tool> '<json>'` で 1 回ずつ呼んで `harness-logs/` に保存した。
3. CSS の lint を動かすため `npm i -D stylelint @primer/stylelint-config` と `stylelint.config.mjs`。
4. `npm i -D eslint@9 typescript-eslint eslint-plugin-primer-react` と flat config の `eslint.config.js`。
5. `init` の指示（エージェント向け指示を置く）に従い `AGENTS.md` を追加。

### つまずき（起きた順）

| # | 何が起きたか | 原因（確認できた範囲） | 対処 |
| --- | --- | --- | --- |
| 1 | README どおり `npx @primer/mcp@latest` を SDK の Client から起動すると、`listTools` が 60 秒でタイムアウト | 不明。同じコマンドに初期化メッセージを手で流し込むと応答した。npx の起動と SDK の stdio の組み合わせの問題と思われる（推測） | `node node_modules/@primer/mcp/bin/mcp.js` を直接起動（同じ 1.1.2） |
| 2 | `get_color_usage` / `get_typography_usage` / `init` が `fetch failed` | サーバーは primer.style から HTML を取ってくる。Node の組み込み fetch はこの環境のプロキシ（HTTPS_PROXY）を既定では使わない。**この実行環境固有**の問題 | 子プロセスに `NODE_USE_ENV_PROXY=1` を渡す |
| 3 | `get_component_usage_guidelines` / `get_component_accessibility_guidelines` の 52 回中 16 回が、部品の説明ではなく primer.style のトップページ（「Build UI at GitHub with Primer Product UI」）を返した。`isError` は false | サーバーは `/product/components/<slug>/guidelines`（または `/accessibility`）を取る。そのページがない部品ではトップへリダイレクトされ、そのまま Markdown 化して返している（コードを読んで確認） | `get_component_batch`（部品ごとの llms.txt）で代わりに取った。**AI はエラーと気づかずにトップページを「ガイドライン」として読む恐れがある** |
| 4 | `Skeleton` は「存在しない部品」。エラー文は「`get_components` tool を使え」 | 部品名は `SkeletonText` / `SkeletonAvatar` / `SkeletonBox`。`get_components` というツールはない（正しくは `list_components`） | 名前を直して batch で取得 |
| 5 | `Header` の llms.txt は `fetch-error` | 不明（Header に llms.txt がないと思われる＝推測） | Header は使わず自作の枠にした |
| 6 | `lint_css` が「❌ Errors without autofix remaining:」だけを返し、理由が空 | 実装は `npx stylelint --stdin --fix` を cwd で実行する。stylelint も設定もプロジェクトになく「No configuration provided」で終了していたが、そのメッセージ（stderr）は捨てられていた | `stylelint` と `@primer/stylelint-config` を入れ、設定ファイルを置いた |
| 7 | 設定を入れても `lint_css` の出力は「修正後の CSS」だけで、どのルールに何件違反したかは出ない | 違反の一覧は stderr に出るが、ツールは stdout しか返さない（コードで確認） | `npx stylelint "src/**/*.css"` を直接実行して違反を読んだ（`harness-logs/71`・`72`・`76`） |
| 8 | `review_alt_text` が「クライアントが sampling の capability を宣言していない」で失敗 | このツールは新しい MCP の「input required」で、**呼び出し元の LLM に** 1 文の質問を返して答えさせる実装。SDK 1.32.2 の Client はこれに応えられない。プロンプトに Primer 固有の判定基準は含まれていない | 同じ質問に自分で答え、ロゴの alt を「Gaji-Labo のサイト（新しいタブで開く）」に直した（`harness-logs/77-review_alt_text-logo.md`） |
| 9 | `eslint-plugin-primer-react` の README は `extends: ["plugin:primer-react/recommended"]`（旧形式）しか書いていない | recommended は eslintrc 形式で、`eslint-plugin-github` も前提にしている。ESLint 9 の flat config 向けの説明はない | flat config で plugin を直接読み、recommended のルールを写した |
| 10 | `typescript-eslint` が入らない | Vite のテンプレートが TypeScript 7 を入れており、typescript-eslint は 6.1 未満までしか対応していない（Primer の問題ではない） | TypeScript を 5.9 に固定 |

---

## 3. 設計判断ごとの出典

「H」＝ハーネスの出力に書かれていた、「B」＝ブリーフ、「自」＝自分の判断・事前知識。

### 3.1 画面構成・主役（この調査でいちばん知りたかったところ）

| 判断 | 出典 | ハーネスに書かれていたこと／いなかったこと |
| --- | --- | --- |
| 主役を「今週のあなたの相手」と「ハドルを始める」にする | B＋自 | **書かれていない**。どのパターンも「画面で何を主役にするか」は扱っていない |
| 主役を画面の最上部に、最も大きい文字で置く | 自 | 書かれていない。typography usage は「色で強調しない」「見出しの順序を崩さない」程度 |
| 必要なものだけを先に見せ、詳細はあとで | H（View「Show the essentials first」） | 一般原則として書かれている。何が essentials かは決めてくれない |
| 今週と先の週を同じ画面に置く（別ページにしない） | H（View「Avoid unnecessary navigation」）＋自 | 「移動を避ける」原則はあり。Pane に分けたのは自分 |
| 画面を 組み合わせ／メンバー／自分の設定 の 3 つにする | 自（ブリーフの機能要件の区切り） | 書かれていない |
| 画面の切り替えを UnderlineNav にする | H（Navigation「Use UnderlineNav when activating a tab changes the URL」） | 具体的に書かれていた |
| 選択中の状態を URL に持たせる（S01〜S18 を URL で開ける） | B＋H（View「Encode meaningful state … in the URL」） | 書かれていた（ブリーフの要求と一致） |
| 初回設定はどの URL でも出す、ナビは残す | 自＋H（Degraded「Never suppress rendering of the global navigation header」） | 「ナビを消さない」は書かれていた |
| PageLayout（Content＋Pane） | 自（Primer の部品知識） | 部品の API は llms.txt にあるが、「いつ Pane を使うか」は usage が取れなかった（トップページが返った部品の 1 つ） |

**画面構成・主役へのハーネスの効き**：「決めたものをどう表すか」には効いたが、「何を主役にし、画面をどう分けるか」には効かなかった。View パターンの原則（essentials first・移動を避ける・現在地を色だけで示さない・URL に状態を持つ）は判断の確認には使えたが、主役を決める根拠にはならなかった。

### 3.2 部品・通知・文言

| 判断 | 出典 |
| --- | --- |
| 削除は ConfirmationDialog、確定ボタンは danger で「削除する」、「はい／OK」にしない | H（Delete） |
| 削除失敗はダイアログを閉じず、中に Banner critical | H（Delete・Notification message「Inside a Dialog」） |
| 削除成功は live region で伝える（目に見える Banner は既定で出さない） | H（Delete）。ただしブリーフに合わせ控えめな InlineMessage を足した（B） |
| 確認ダイアログの初期フォーカスをキャンセルに | 自 |
| 「削除」と「外す」の使い分け（Remove／Delete） | H（Delete）。どちらにするかの判断は自 |
| 参加の切り替えは Checkbox（ToggleSwitch にしない） | H（Saving「never mix save patterns」「ToggleSwitch は自動保存」） |
| 保存ボタンを無効化しない | H（Saving） |
| 保存成功は保存ボタンの横の InlineMessage、画面移動後は Banner | H（Saving・Notification message のフローチャート） |
| 保存失敗は入力を保持してフォーム上部に Banner critical | H（Saving「the user's data should be preserved」） |
| 必須の印、Caption で用途、エラー時は Caption を Validation に置き換え | H（Forms） |
| 未入力エラーの件数と項目リンクを Banner に | 自（Forms の validation 詳細ページは MCP で取れる形になかった） |
| 読み込み中は内容の位置に Skeleton、読み上げは 1 回 | H（Loading「Scoping」「Avoid over-announcing」） |
| 読み込み失敗は Blankslate、AlertIcon、アイコン色は fgColor-muted | H（Degraded Experiences「Blankslate guidance」） |
| 空状態は Blankslate（何が起きたか＋どうすればよいか＋1 つの行動） | H（Empty States） |
| ログイン失敗はページ上部の Banner critical | H（Notification message のエラーフローチャート） |
| uチャンネル未設定ではボタンを消し、理由と代わりの手段をその場で | B（ボタンを出さない）＋H（Degraded「消すなら理由を」） |
| 初回設定の完了を Banner success で伝える | H（Feature Onboarding「End: Celebrate the finish」） |
| Toast を使わない | H（Saving「avoid using a toast」） |
| 文言をです・ます、技術用語を避ける、具体的に | H（Empty States「For errors」）＋自（日本語の調子はハーネスの対象外） |

### 3.3 色

| 判断 | 出典 |
| --- | --- |
| primary ボタン＝success（緑）、自分・現在地＝accent、注意＝attention、削除・エラー＝danger | H（get_color_usage の Color roles 表） |
| 色だけで区別しない（参加／不参加・自分・予定を Label の文字で） | H（View・get_color_usage） |
| 人ごとの識別色に display-* トークン | H（find_tokens が返した）。**ただし lint は alpha として警告**し、get_design_token_specs は blue→accent など semantic 色への置き換えを勧める。3 つのハーネスの言うことが食い違った。最終判断は自（意味を持たない色が他にないので display-* を使い、理由つきで警告を無効化） |
| 自分の行の面を accent-muted に | 自。メンバー画面では Label success と重ねると 4.46:1 になり axe に引っかかったので外した（ハーネスはこの組み合わせを止めなかった） |

---

## 4. ハーネスが答えてくれなかったこと

1. **何を主役にするか、画面をいくつに分けるか**（上記）。
2. **頭文字のアバター**：Avatar は画像が必須。画像がない人の表示（頭文字＋固定色）は扱っていない。
3. **外部ブランドのロゴをヘッダーに置く方法**：Header は GitHub 自身のダークなヘッダー用。代わりに何を使えばよいかは書かれていない。
4. **日本語の文言**：文言ガイドラインは英語前提（sentence case、3 語以内のラベルなど）。日本語での語調・長さの目安はない。
5. **CSS Modules でのメディアクエリ**：「生の値を使わない」とあるが、ブレークポイントを CSS 変数でメディアクエリに書く方法はない（primitives の breakpoints.css は値を持つが `@media` では使えない）。
6. **「表示専用の人の一覧」に当たる部品**：ActionList は操作の一覧、DataTable は狭い幅で溢れる。どれを使うべきかの案内はない。
7. **トークンの組み合わせのコントラスト**：fgColor-success（Label）を bgColor-accent-muted の上に置くと 4.5:1 を下回る。どの面の上にどの Label を置けるかの表はない。
8. **ハドル（外部サービス）を開く導線の扱い**：外部アプリを開く primary ボタンの書き方（「別アプリで開く」の示し方など）はパターンにない。

## 5. 誤っていた／古かった／食い違っていたこと

| 内容 | 詳細 |
| --- | --- |
| `init` の peer dependencies | 「react 17.x 以上」とあるが、実際の `@primer/react@38.44.0` の peer は `18.x || 19.x`（`npm view` で確認） |
| `init` の CSS 読み込み | テーマ CSS（`themes/light.css`）だけを示すが、余白・文字・角丸のトークン（`--stack-gap-*`、`--text-*`、`--borderRadius-*` など）は `primitives.css` 側にある。Primer React の部品は CSS 変数に既定値を持つので見た目は崩れないが、自前 CSS でトークンを使うには `primitives.css` も読み込む必要がある |
| 部品ガイドラインの 16 件 | 中身がトップページ（エラー扱いにならない）。PageLayout、Avatar、InlineMessage、Blankslate（a11y）、FormControl、Checkbox、Label、StateLabel、CounterLabel、Spinner、Timeline、Heading、Stack、NavList など |
| エラー文のツール名 | 「`get_components` tool を使え」とあるが、そのツールはない（`list_components`） |
| InlineMessage の props | llms.txt の variant に `'unvailable'`（綴り違い） |
| `lint_css` の説明 | 「REQUIRED FINAL STEP … You cannot complete a task involving CSS without a successful run」と強く指示するが、動かすのに必要な stylelint と設定の導入はどこにも書かれていない。成功しても違反内容は返さない |
| トークン指示と lint の食い違い | `find_tokens` は display-* を注意書きなしで返す。stylelint（primer/no-display-colors）は「alpha。Primer チームの承認が必要」と警告する |
| `get_design_token_specs` の強い指示 | 「Every interactive state change MUST include a transition」「NEVER raw values」など。自前 CSS は状態変化を持たないので該当しなかったが、`line-height: 1` は primer/typography に指摘された（指示どおり） |
| eslint-plugin-primer-react の README | eslintrc 形式の説明だけ。ESLint 9（flat config が既定）での使い方がない |
| カスタム lint ルールの粒度 | `enforce-css-module-identifier-casing`（recommended 外）はクラス名を PascalCase に強制する。今回の違反 55 件中 54 件がこれ。デザイン意図とは無関係 |

## 6. AI が自発的にハーネスを使ったか（起動条件は明確だったか）

- **今回は自発性を測れない**。タスクの指示で「画面構成を決める前に list_patterns / get_pattern … を使う」と明示されていたため、その順に使った。以下は、指示がなかった場合に起動のきっかけになりうる手がかりの観察。
- **起動条件が明確だったもの**：トークンと CSS。ツールの説明文が命令形で強い（`get_design_token_specs`「CRITICAL: CALL THIS FIRST」、`lint_css`「REQUIRED FINAL STEP」、`find_tokens`「you MUST validate the result using lint_css」）。CSS を書く場面では、説明文を読んだ AI は呼ぶ可能性が高い（推測）。
- **起動条件があいまいだったもの**：パターン。`list_patterns` の説明は「Prefer a scenario pattern when one fits the task」で、**いつ呼ぶか**は書いていない。呼ぶきっかけは `primer_coding_guidelines` の 1 行（「Follow patterns from Primer … Use the list_patterns tool」）だけ。設計の価値はパターンにいちばんあったのに、起動の強さはトークン系よりずっと弱い。
- **画面構成を決める前に呼ぶべきもの**がどれかは、ハーネス自身は示さない（`init` は導入、`primer_coding_guidelines` はコードの書き方）。「設計の最初に読む」入口になるツールはない。
- 自分の行動として正直に書くと：`get_component_examples`、`get_icon`、`get_token_group_bundle`、`get_token_usage_patterns` は呼ばなかった（必要と感じなかった）。`get_component_usage_guidelines` は 26 部品分呼んだが、16 件がトップページだったため、多くの部品は llms.txt（API 中心）と自分の知識で使い方を判断した。

## 7. ハーネスがあることで「Primer らしい」設計になったと言える点・言えない点

### 言える点

- **通知の部品と置き場所**：Banner と InlineMessage の使い分け、ダイアログ内の Banner、保存成功を InlineMessage にする、Toast を使わない――これらは GitHub.com の流儀そのもので、パターンから直接来た。ハーネスなしなら Toast やモーダルのエラーにしていた可能性がある（推測）。
- **削除の作法**：ConfirmationDialog、対象名の入った質問、動詞のボタン、失敗時にダイアログを閉じない。
- **フォーム**：保存ボタンを無効化しない、Checkbox と ToggleSwitch の使い分け、Caption と Validation の入れ替え。
- **劣化・空状態**：Blankslate の構成、AlertIcon を muted で、ナビを消さない。
- **色の役割**：primary＝緑、自分＝accent。
- **自前 CSS を CSS Modules とトークンに限定**：lint で強制され、生の値は 4 か所（メディアクエリ 2・最大幅 1・最小高さ 1）だけになった。

### 言えない点

- **画面の骨格と主役**：PageLayout の Content＋Pane、主役 Card、ペア一覧の形は自分の判断。GitHub らしい「一覧＋詳細」の骨格に見えるのは、ハーネスより自分の Primer の事前知識による部分が大きい。
- **部品の細かい使い方**：16 部品分のガイドラインが取れなかったため、PageLayout、Avatar、Label、Heading、Stack などの「いつ使うか」は事前知識で補った。
- **日本語の文言**：調子・長さは自分の判断。
- **独自部分**（頭文字アバター、ロゴつきヘッダー、人の一覧）：Primer に該当する部品がなく、トークンで「それらしく」作っただけ。

---

## 付録：ログの対応

| ファイル | 内容 |
| --- | --- |
| `harness-logs/calls.log` | MCP 呼び出し 100 回の記録（時刻・ツール・引数・保存先） |
| `00-list-tools.json` / `.txt` | ツール一覧 |
| `01`〜`05` | coding guidelines、パターン一覧、色、文字、init |
| `06-llms-txt-design-md.md` | llms.txt / DESIGN.md の有無 |
| `10`〜`28` | 19 パターン |
| `30`〜`55` | 部品ごとの usage / a11y ガイドライン（16 件はトップページ） |
| `60`〜`66` | `get_component_batch`、トークン、アイコン |
| `70`〜`76` | `lint_css`、stylelint・eslint の直接実行（前後） |
| `77-review_alt_text-logo.md` | alt の確認（仕組みの補足つき） |
| `80-capture-result.txt` | 撮影・axe・はみ出しの結果 |
| `81-g1g2-measure.txt` | G1・G2 の位置の計測 |

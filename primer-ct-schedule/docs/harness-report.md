# Primer のハーネスはデザイン意図をどこまで実装に届けたか

この調査の主目的です。Primer（GitHub）が AI エージェント向けに用意している仕組み（以下「ハーネス」）を実装の前後で実際に使い、どの判断がハーネスから来たのか、どこで役に立たなかったのかを記録しました。ADS 版の評価（[`ads-ct-schedule/docs/ai-design-intent-mechanisms.md`](../../ads-ct-schedule/docs/ai-design-intent-mechanisms.md)）と同じ観点で比べています。確認した日付は 2026-11-05 です。

## 結論

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 意図の具体性 | ◎ | パターン（Delete、Forms、Notification message、Saving）が「どの部品を、どの状態で、フォーカスをどこへ」まで書いている。ADS の部品ごとの usageGuidelines より一段具体的で、画面の振る舞いまで決められた |
| 意図の種類ごとのツール分け | ○ | 「部品の使い方」「a11y」「パターン」「色」「文字」「トークン」「規約」がツール名で分かれていて、引く順番を迷わない。ただし中身の多くは primer.style の HTML を Markdown にしただけで、構造化データではない |
| 網羅性 | △ | 30 部品のうち **16 部品で「使い方」が返らず、6 部品で a11y が返らなかった**。しかもエラーにならず、Primer のトップページが「usage guidelines」として返る |
| 作った後の検査 | △ | `lint_css` は中身が `stylelint --fix` で、プロジェクトに設定がないと動かず、違反の理由も返さない。`review_alt_text` は sampling 対応のクライアントでないと動かない |
| 起動条件 | △ | MCP サーバーの instructions は空。「CALL THIS FIRST」「REQUIRED FINAL STEP」といった起動条件がツールの説明文に散らばっているだけ |
| 日本語 UI | × | 和文フォント、日本語の文言、縦書きなどへの言及は一切ない |

**ハーネスは「どう振る舞うべきか」（削除の後のフォーカス、通知を出すか出さないか、エラーのときに補足文を消すか）を決めるのに強く効きました。** 今回の判断 30 件のうち 23 件は、出典をハーネスに求められます（うち 5 件は事前知識とも一致）。ADS 版では CLI から使い方の指針が出なかったため、同じ種類の判断の多くが事前知識か作った後の lint に頼っていました。一方で、ハーネスが黙って誤った答えを返す場面（ガイドラインがない部品）があり、**AI が「指針は読んだ」と思い込む危険**があります。

---

## 1. 使ったハーネスの一覧と導入手順

| 種類 | 名前 | 使ったか | 内容 |
| --- | --- | --- | --- |
| MCP サーバー | `@primer/mcp` v1.1.2（`npx @primer/mcp@latest`、stdio） | ◎ 101 回 | 20 ツール。prompts／resources なし。instructions は空 |
| MCP ツール（基礎） | `init`、`primer_coding_guidelines`、`get_design_token_specs`、`get_token_usage_patterns`、`get_color_usage`、`get_typography_usage` | 各 1 回 | 導入手順、規約、トークンの論理、色と文字の使い方 |
| MCP ツール（部品） | `list_components`、`get_component_batch`、`get_component_examples`、`get_component_usage_guidelines`、`get_component_accessibility_guidelines` | 1＋3＋4＋30＋30 回 | props と実例（部品ごとの llms.txt）、使い方とアクセシビリティ（primer.style の HTML） |
| MCP ツール（パターン） | `list_patterns`、`get_pattern` | 1＋11 回 | シナリオ 9 件、UI パターン 10 件 |
| MCP ツール（トークン） | `find_tokens`、`get_token_group_bundle` | 7＋1 回 | トークンの検索。用途（U）とルール（R）付き |
| MCP ツール（アイコン） | `list_icons`、`get_icon` | 1＋2 回 | Octicons |
| MCP ツール（検査） | `lint_css`、`review_alt_text` | 2＋2 回 | `lint_css` は成功、`review_alt_text` は 2 回とも失敗 |
| 部品ごとの llms.txt | `primer.style/product/components/<slug>/llms.txt` | MCP 経由 | `get_component` の中身。サイト全体の `llms.txt` は 404 |
| トークンの文書 | `@primer/primitives` 同梱の `DESIGN_TOKENS_GUIDE.md`、`DESIGN_TOKENS_SPEC.md` | MCP 経由 | `get_design_token_specs` と `find_tokens` の中身。CSS ファイルの先頭にも「@spec See /DESIGN_TOKENS_SPEC.md」「@rule Never use raw values」とある |
| DESIGN.md | なし | — | `primer.style/DESIGN.md`、`design.md` はトップへリダイレクト |
| ESLint | `eslint-plugin-primer-react` v9.4.0（23 ルール） | ◎ | 初回 58 件 → 0 件 |
| stylelint | `@primer/stylelint-config` v13.6.0 | ◎ | 初回 7 件 → 1 件 |
| スキル／プラグイン | なし | — | Primer が配布する Claude Code 用のスキルは見つからなかった |

### 導入手順とつまずき

1. **このセッションの MCP 設定に `@primer/mcp` を追加できなかった。** クラウドのセッションで、途中から MCP サーバーを足す手段がない。代わりに `@modelcontextprotocol/sdk` の `Client` で stdio 接続する小さなスクリプト（[`scripts/mcp-client.mjs`](../scripts/mcp-client.mjs)）を書き、全呼び出しを `harness-logs/` に保存した。
2. **プロキシ越しに primer.style を取得させるため、子プロセスに `NODE_USE_ENV_PROXY=1` を渡した。** `@primer/mcp` は多くのツールで、呼ばれるたびに primer.style の HTML や llms.txt を `fetch` する（ネットワークがないと使い方・a11y・パターン・色・文字のツールは動かない）。Node の `fetch` は既定では `HTTPS_PROXY` を読まない。
3. **パッケージの依存が大きい。** `@primer/mcp` は `@primer/react` 本体、cheerio、turndown などに依存する。`npx` で毎回入れるより、devDependencies に入れて `--no-install` で起動した。
4. `review_alt_text` は MCP の「sampling」（サーバーがクライアントの LLM に問い合わせる機能）を使う。今回のクライアントは対応していないため、「the client … did not declare the required capability」で失敗した。ツールの中身は 1 文の問いを LLM に投げるだけなので、その問いに沿って手作業で評価した（[harness-logs/README.md](../harness-logs/README.md)）。
5. 原本リポジトリ（takumibv/digital-go-design-system）は、このセッションでは追加・clone できなかった（権限の確認で拒否された）。原本の Storybook を静的ビルドする代わりに、ADS 版が同じ Story・同じ幅で撮影済みの原本スクリーンショットを再利用した。原本側の axe 結果は ADS 版の `report.json`（原本も 0 件）による。

---

## 2. 判断ごとの出典

「ハーネス」は MCP のどのツールの出力に書いてあったか、「事前知識」は Primer についてもともと知っていたこと、「自分で確認」は型定義・CSS・画面を見て決めたことです。ハーネスに書いてあり、かつ事前に知っていたものは「両方」としました。

| # | 判断 | 出典 | 具体的な出どころ |
| --- | --- | --- | --- |
| 1 | primary ボタンは 1 画面 1 つ（主役のハドルだけ） | 両方 | `get_component_usage_guidelines Button`「Only use one primary Button on a page」。事前にも知っていた |
| 2 | sx と Box を使わず CSS Modules で書く | ハーネス | `primer_coding_guidelines`「Do not use the sx prop… Do not use the Box component… use CSS Modules」。v38 で sx が非推奨になったことは知っていたが、Box まで避けよとは知らなかった |
| 3 | ThemeProvider＋BaseStyles＋テーマ CSS をルートに置く | 両方 | `init` |
| 4 | `primitives.css`（サイズ・文字・z-index のトークン）も読み込む | 事前知識 | `init` はテーマ CSS だけを指示している。テーマ CSS には `--stack-*`、`--base-size-*`、`--text-*-shorthand-*`、`--zIndex-*` が入っておらず、手順どおりだと今回の CSS のトークンは未定義になる（ファイルで確認） |
| 5 | トーストを使わず Banner／InlineMessage で通知する | ハーネス | `get_pattern Notification message`（部品は Banner と InlineMessage のみ。トーストの代わりの使い方へのリンク） |
| 6 | 保存の成功はページ上部の success Banner | ハーネス | 同パターンの「Success messaging flowchart」 |
| 7 | 削除の成功は見える通知を出さず、ライブリージョンで読み上げる | ハーネス | `get_pattern Delete`「Don't add a visible success banner by default… Always announce the result to screen readers」 |
| 8 | 削除後、消えたボタンの代わりに一覧の見出しへフォーカス | ハーネス | `get_pattern Delete`「move focus to the grouping container, list heading…」 |
| 9 | 削除確認は ConfirmationDialog、danger、ボタン名は「削除する」 | ハーネス | `get_pattern Delete`、`get_component_usage_guidelines ConfirmationDialog`（「Yes／OK を使わない」） |
| 10 | 削除確認の初期フォーカスはキャンセル | ハーネス | `get_component_accessibility_guidelines ConfirmationDialog`「For dangerous actions… focus is placed on the Cancel button」。部品の標準動作で、コードは不要だった |
| 11 | 削除の失敗はダイアログ内の critical Banner | ハーネス | `get_pattern Delete`、`Notification message`「Inside a Dialog」 |
| 12 | Banner は 1 ページに 1 つ（未ログインの案内を Banner にしない） | ハーネス | `get_component_usage_guidelines Banner`「Do not display more than one banner… on a single page」 |
| 13 | ログイン失敗の critical Banner は閉じられない | ハーネス | 同「Critical banners communicate an error which the user must resolve」 |
| 14 | 誤りがある項目は Caption を消して Validation だけ出す | ハーネス | `get_pattern Forms`「Hide a caption that is redundant with the validation message」 |
| 15 | 送信失敗時は最初の不正な入力欄にフォーカス（ライブリージョンは使わない） | ハーネス | `get_pattern Forms`「Live regions should not be used for form validation」 |
| 16 | 必須を見た目とコードの両方で示す（`FormControl required`） | ハーネス | `get_pattern Forms`「Required field indicator」 |
| 17 | 「CTへの参加」は CheckboxGroup にし、個別の検証を付けない | ハーネス | `get_pattern Forms`「An individual checkbox… cannot be marked as required」 |
| 18 | ボタンの並びは「キャンセル → 保存（primary）」、保存は無効にしない | 両方 | `get_component_usage_guidelines Button`「place primary buttons at the end」、`get_pattern Saving`。DADS の配置規則とも一致 |
| 19 | 画面遷移は Link、操作は Button | 両方 | `get_component_usage_guidelines Link`「Do not use links for triggering an action」 |
| 20 | エラーの空状態は alert アイコン | ハーネス | `get_pattern Empty States`「Default to using the alert icon」 |
| 21 | 色の役割（accent＝選択・現在、success、attention、danger）と muted 面＋同じ役割の前景 | 両方 | `get_color_usage`「Color roles」、`get_design_token_specs`「Logic Matrix」 |
| 22 | 文字は `font: var(--text-*-shorthand-*)` で指定する | ハーネス | `get_design_token_specs`「MUST use shorthand」 |
| 23 | スキップリンクの z-index は `--zIndex-skipLink` | ハーネス | `get_design_token_specs`「Use skipLink only for accessibility skip-navigation links」 |
| 24 | Avatar ではイニシャルを出せないので自作する | 自分で確認 | `get_component Avatar` の props（`src`、`alt`、`size`、`square` のみ）で分かった。自作するという判断は自分 |
| 25 | Blankslate・DataTable は `@primer/react/experimental` から読み込む | ハーネス | `get_component_batch` の import 例 |
| 26 | `PageLayout`（Header／Content／Pane）で 2 カラムにする | 自分で確認 | props は `get_component` で確認。`PageLayout.Header` を `main` の中に置く、Content を `as="div"` にする、という構成は自分で決めた |
| 27 | 週送りのボタンは disabled のまま | 自分で確認（ハーネスに逆らった） | `get_component_usage_guidelines Button` は inactive を勧め、押したときの説明 Dialog まで求めている。原本・ADS 版に合わせた |
| 28 | 390px の表を ScrollableRegion で横スクロールさせる | 自分で確認 | スクリーンショットで列が切れているのを見て気付いた。ハーネスは何も言わない |
| 29 | CSS Modules のクラス名を PascalCase にする | 作った後の lint | ESLint `enforce-css-module-identifier-casing`（58 件）。MCP の規約には書かれていない |
| 30 | 和文フォントを指定しない | 自分で確認 | ハーネスに情報がない。ADS 版と揃えた |

**集計：ハーネスのみ 18 件、両方 5 件、事前知識 1 件、自分で確認 5 件（うち 1 件はハーネスに逆らった）、作った後の lint 1 件。** ハーネスに出典がある判断は 23 件です。

特に #7・#8・#11・#15 は、事前知識だけでは決めなかったものです（ADS 版では成功を Flag で出し、削除後のフォーカスや失敗時の表示は扱っていなかった）。#10 は ADS 版でも同じ結果でしたが、ADS 版は自分で `autoFocus` を付けた安全側の判断で、ADS の指針とは食い違っていました。「Primary は 1 画面 1 つ」（#1）は、今回は Button の使い方ガイドで確認しました。ADS 版では事前知識と ADS の MCP データ（後から照合）、原本では DADS のサイトの文章が出典でした。

---

## 3. ハーネスに従った結果、ADS 版より良くなった点・悪くなった点

### 良くなった点

- **削除の流れがアクセシブルになった。** 初期フォーカスがキャンセル、失敗はダイアログ内、成功は読み上げ＋フォーカス移動。ADS 版は Flag で成功を出し、フォーカス移動は扱っていなかった。
- **フォームの誤りの扱いが一貫した。** Caption と Validation の切り替え、最初の不正な入力欄へのフォーカス、必須の「*」。ADS 版も近い形だったが、根拠は ADS の標準部品の振る舞いと事前知識だった。
- **通知が原本に近づいた。** トーストを使わないという Primer の考え方の結果、成功の通知がページ上部の Banner になり、原本の Notice と同じ位置・同じ見え方になった（ADS 版は画面隅の Flag）。
- **原本の表現を取り戻せた。** トークンだけの CSS Modules が許されているので、太い上ボーダーや色付きのイニシャルを再現できた（ADS 版では型で拒否された）。
- **公式 lint の残りが少ない。** ESLint 0 件、stylelint 1 件（ADS 版は 6 件残った）。

### 悪くなった点

- **自前の CSS が 256 行になった**（ADS 版は 0 行）。Primer の流儀としては正しいが、「部品とトークンだけで作る」という比較の条件からは外れる。CSS の中身がトークンだけであることは、stylelint と `lint_css` で確認した。
- **削除の成功が目に見えなくなった。** 原本の「デモの一覧のみ変更しています」という注意書きは、読み上げでしか伝わらない。
- **主ボタンが緑になり、原本の印象から離れた。**
- **ハーネスの量が多い。** 使い方・a11y・パターンだけで約 44 万文字、props と実例を含めると約 87 万文字（`harness-logs/` の合計）。画像の alt や Figma へのリンクも Markdown にそのまま残っていて、AI のコンテキストを大きく使う。

---

## 4. ハーネスが答えてくれなかったこと、誤っていた／古かったこと

### 誤っていた・誤解を招いた

1. **ガイドラインのない部品で、エラーではなくトップページを返す。** 30 部品中、使い方 16 件・a11y 6 件が該当した（Avatar、Checkbox、FormControl、Heading、Text、Stack、PageLayout、Spinner、Label、StateLabel など、よく使う部品が多い）。primer.style が存在しないページをトップに 308 リダイレクトし、Node の `fetch` がそれを追ってしまうためで、サーバーのコードにある「3xx なら『ガイドラインはありません』と返す」分岐は実行されない。さらに使い方ツールのその文言は「accessibility guidelines はありません」になっていて、コピーの誤りがある。**AI は「指針を読んだ」と思い込み、トップページの宣伝文から何かを読み取ろうとする危険がある。**
2. **`find_tokens` は複数語を AND で探すため、自然な問い方で 0 件になる。** 「accent background」は 0 件、「accent」＋group `bgColor` なら 2 件。「breakpoint」は 0 件だが、`--breakpoint-*` トークンは実在する。
3. **トークンの用途（U）とルール（R）はほとんど空。** `find_tokens` の結果の多くが「U: (none)、R: (none)」。`DESIGN_TOKENS_SPEC.md` で用途が書かれているのは 83 件で、light テーマの 576 トークンの一部にとどまる。CSS ファイルには 193 件の説明コメントがあるが、MCP はそれを使っていない。ADS のトークンは 1 つずつ説明を持っていた。
4. **`init` の手順だけではトークンが足りない**（判断 #4）。
5. **stylelint 設定が、トークン仕様の推奨するトークンを知らない。** `get_design_token_specs` は `--zIndex-skipLink` を使えと言うが、`@primer/stylelint-config` はそれを「未知のカスタムプロパティ」と警告する（残った 1 件）。
6. **`lint_css` は黙って値を変える。** `margin: 13px` を `var(--base-size-12)` に置き換え、その旨を返さない（`harness-logs/44-lint_css-internals.md`）。違反の理由（stderr）も返さないので、AI は何が直されたかを差分で確かめるしかない。
7. **`list_components` に重複がある**（Tooltip、Dialog、UnderlineNav、SelectPanel が 2 回）。experimental かどうかも一覧では分からない（`get_component` の import 例には正しく出る）。
8. `get_token_usage_patterns` の「Primary Button」の見本は `control-bgColor-rest`（灰色）を使っていて、実際の Primer の primary（緑）とは違う。名前が誤解を招く。

### 答えてくれなかった

- **和文フォント、日本語の文言の調子、全角・半角の扱い。** 一切ない。
- **レスポンシブな表。** DataTable が狭い画面でどうなるか、どうすべきかの指針がない（判断 #28）。
- **ブランドバーやロゴの置き方、スキップリンクの部品。** GitHub 製品の外で使う場面の話は出てこない（ADS も同じだった）。
- **メディアクエリの書き方。** `@custom-media --viewportRange-*` を使うのに PostCSS のプラグインが要ることは書かれていない。
- **画面の意図（何を主役にするか）。** これはどのデザインシステムも持たない層で、プロジェクトの `design-decisions.md` で補った（ADS 版の評価と同じ結論）。

---

## 5. AI は自発的にハーネスを使ったか（起動条件は明確だったか）

**今回は自発的ではありません。** 依頼文で「実装前に使うツール」が名指しされていたので、それに従って最初にまとめて呼びました。そのうえで、ハーネス自身が持つ起動条件を確認しました。

- **MCP サーバーの instructions が空**で、「UI を作る前にこのサーバーを使え」という入口の指示がない。ADS の MCP は「ADS の部品を優先せよ」「a11y の専門家としてふるまえ」といった指示を持っていた。
- 起動条件は**ツールの説明文に散らばっている**。
  - `get_design_token_specs`：「CRITICAL: CALL THIS FIRST」
  - `lint_css`：「REQUIRED FINAL STEP… You cannot complete a task involving CSS without a successful run of this tool」
  - `find_tokens`：「After identifying tokens and writing CSS, you MUST validate the result using lint_css」
  - `primer_coding_guidelines`：「Get the guidelines when writing code that uses Primer」
- これらは「トークンと CSS」の手順としては明確で、実際に `lint_css` は CSS を書くたびに呼ぶべきものだと分かった。一方で、**部品の使い方・パターンを「いつ」読むべきかは書かれていない**。`get_pattern` の説明に「シナリオに合うならシナリオのパターンを優先」とあるだけで、「削除の UI を作るなら Delete を読め」という結び付けは AI に任されている。今回 Delete と Forms のパターンを読んだのは、依頼文が `list_patterns`／`get_pattern` を名指ししていたからである。
- `init` は「プロジェクトに AI 向けの指示（Copilot など）を追加せよ」と言う。これはリポジトリの AGENTS.md などに「Primer を優先せよ」と書かせて、次からの起動条件を作る仕組みと読める。今回は ADS 版と同じく、比較の条件を揃えるため AGENTS.md は追加していない。

**示唆**：ツール名が意図の種類ごとに分かれているので、「何を引けばよいか」は分かりやすい。しかし「いつ引くか」はほぼ AI 任せです。SmartHR のスキルの「事前知識で答えず、必ず該当ドキュメントを読め」のような強い入口がないと、パターンのような最も効く情報が読まれないまま実装が進む可能性が高いと考えます（推測）。

---

## 6. ツールが意図の種類ごとに分かれていることは、判断にどう効いたか

| ツール | 判断への効き方 | 例 |
| --- | --- | --- |
| `get_pattern` | **最も効いた。** 画面の振る舞い（いつ通知するか、フォーカスをどこへ）を決められた | 判断 #5〜#8、#11、#14〜#17、#20 |
| `get_component_usage_guidelines` | 部品の選び分けと数の制限 | Banner は 1 つ、primary は 1 つ、Link と Button |
| `get_component_accessibility_guidelines` | 部品が自動でやってくれることが分かり、余計なコードを書かずに済んだ | ConfirmationDialog の初期フォーカス |
| `get_color_usage`／`get_design_token_specs` | 色を役割で選ぶ。muted 面と前景色の組み合わせ | 判断 #21 |
| `get_typography_usage` | 効きは弱い。見出しの順序を見た目で変えない、程度 | — |
| `primer_coding_guidelines` | 実装方式を決めた（CSS Modules） | 判断 #2 |
| `get_component(_batch)` | props と import 先。ADS の CLI の `component` に相当 | 判断 #24、#25 |

ADS の MCP は、同じ「使い方」の情報を部品ごとの 1 つのデータ（usage／content／a11y）として持っていました。Primer は**部品の指針とは別に「パターン」という画面単位の文書を持ち、そこに複数の部品をまたぐ振る舞いが書かれている**のが大きな違いです。今回の判断の多くはパターンから来ています。

### ガイドラインの具体性：ADS の usageGuidelines との比較

| 観点 | ADS（usageGuidelines、MCP のデータ） | Primer（usage／a11y／pattern） |
| --- | --- | --- |
| 形式 | 部品ごとの短い箇条書き（構造化データ） | サイトの HTML を Markdown にしたもの（Do／Don't の画像の説明文や Figma へのリンクを含む） |
| 量 | 1 部品あたり数行〜十数行 | Button 8 千字、Dialog 1.5 万字、Forms パターン 1.6 万字 |
| 網羅性 | 150 部品中 144 部品に usage あり | 今回の 30 部品中 14 部品のみ（残りはトップページ） |
| 具体性の例：通知 | SectionMessage「対応まで残る情報」、Flag「出来事の後」 | 成功を通知すべきかのフローチャート（別画面に移るか、成功が見た目で分かるか…） |
| 具体性の例：削除 | Modal「1 モーダル 1 タスク」「主ボタンは右」 | 部品、ボタンの文言、初期フォーカス、失敗時の表示、成功時に通知しないこと、削除後のフォーカス |
| 具体性の例：フォーム | 部品ごとのラベル・ヘルパーの説明 | Caption と Validation の関係、誤りが 3 件以上なら要約、ライブリージョンを使わない |
| 機械で強制 | ESLint 117 ルール＋型（`xcss`） | ESLint 23 ルール（主に非推奨 API と a11y）＋stylelint（トークンの使用） |

**Primer の指針は、ある部品・ある場面については ADS より明らかに具体的**です。ただし「ある部品」に偏りがあり、基本的な部品（Text、Stack、Heading、Checkbox）ほど指針がありません。

---

## 7. ADS の評価との比較

ADS の評価（`ai-design-intent-mechanisms.md`）は「意図をデータとして持ち、配り、lint で強制する」3 段がそろっている、というものでした。同じ枠で Primer を見ると次のとおりです。

| 段 | ADS | Primer |
| --- | --- | --- |
| ① 意図を持つ | ◎ 部品カタログに usage／content／a11y を構造化して持つ | ○ サイトの文章（部品・パターン・基礎）。トークンは `DESIGN_TOKENS_SPEC.md` に一部だけ用途とルール |
| ② 配る | ◎ llms.txt 8 種、ホスト型 MCP、CLI、（社内のみ）スキル | ○ MCP（stdio、毎回サイトを取得）、部品ごとの llms.txt。サイト全体の llms.txt、DESIGN.md、スキルはない |
| ③ 強制する | ◎ ESLint 117 ルール＋型でトークン以外を拒否 | ○ ESLint 23 ルール＋stylelint（トークンの使用を検査・自動修正）。`lint_css` は MCP から stylelint を呼ぶ |
| 文言のトーン | ○ `llms-content.txt` | × パターンの中に英語の書き方が少しあるだけ |
| 起動条件 | ○ MCP の instructions、`ads-cli init` が AGENTS.md に追記 | △ instructions は空。ツールの説明文と `init` の「AI 向けの指示を追加せよ」 |

**まとめ**：ADS は「部品の使い分け」を広く浅く確実に届け、Primer は「画面の振る舞い」を狭く深く届けます。Primer のパターンは、ADS にも DADS にもなかった「層 ①と層 ③の間」（複数の部品をまたぐ振る舞い）を埋めていました。一方で、届け方の信頼性（存在しない指針を正しく「ない」と言う、検査の理由を返す）は ADS の方が上です。

### 実装の精度を上げるなら（このプロジェクトでできること）

1. AGENTS.md に「UI の状態（削除・保存・エラー・空・読み込み）を作るときは、先に `get_pattern` で該当パターンを読む」と書く。今回いちばん効いた情報を、確実に読ませるため。
2. `get_component_usage_guidelines` の結果が「The design system for GitHub」で始まったら「指針なし」と扱う、と書いておく（ハーネスの不具合の回避）。
3. stylelint の設定をリポジトリに置く（`lint_css` が動く前提条件）。`--zIndex-skipLink` の警告は既知のものとして記録する。
4. 和文フォントと日本語の文言の規則は、Primer からは来ないので、プロジェクトの `design-decisions.md` に書く。

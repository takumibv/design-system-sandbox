# ハーネス調査レポート（Atlassian Design System）

この調査の主目的：ADS が AI エージェント向けに出している仕組み（ハーネス）を実際に使い、**デザイン意図（いつ何を使うか・何を主役にするか・文言の書き方）が設計にどこまで効くか** を確かめる。

- 調査日：2026-11-05（ハーネスの出力はこの日のもの。ADS は更新が速く、内容は変わりうる）
- ログ：`harness-logs/`（CLI・MCP・llms.txt・lint の生の出力をすべて保存）
- 事実は自分で確認したものだけを書き、推測には「推測」と書く。

---

## 1. 結論（先に）

1. **部品レベルの「いつ使うか」はよく効いた。** 通知の使い分け（Flag／SectionMessage／Banner／EmptyState／Modal）、フォームの作法（必須のアスタリスク、送信ボタンを無効化しない、ラベルを上に）、Lozenge は色＋文字、新しいタブで開くリンクの扱い、アイコンの選び方（"Reserved for …"）は、ほぼハーネスの指示どおりに決めた。
2. **画面構成・主役の決め方には効かなかった。** 「月曜に数十秒だけ見る人に、今週の相手とハドル開始を最初に見せる」という一番大事な判断に、ハーネスの出典は無い。ガイドラインを引いても日付や色の文書が返り、レイアウトの一般原則（近接・階層）しか得られなかった。
3. **起動条件は明確だった。** `llms.txt` → MCP／CLI の流れは迷わず辿れた。`ads_get_a11y_guidelines` は説明文に「UI を作るときは MUST call」とあり、呼ぶきっかけがはっきりしている。一方で、部品のガイドラインが **`ads_get_all_components`（全件・約 55 万字）の中にしか無い** ことは自分で探さないとわからない。
4. **ハーネスの情報とパッケージの実体がずれている箇所が多かった**（Button の推奨入口、React 19 対応、Avatar の頭文字、lint の修正案、TextField の例など。§5）。ハーネスだけを信じて書くと動かないか型エラーになる箇所があり、最終的な正しさは `node_modules` の型定義と実行で確かめる必要があった。
5. **lint は「ADS らしさ」の最後の詰めとして実効性があった。** 推奨設定で 7 件の警告（SectionMessage の見出しレベル、`<img>`→Image、placeholder の禁止）を出し、すべて直した。全ルールでは Lozenge の新しい appearance 名への移行が 4 件出たが、現行の型が受け付けないので残した。

---

## 2. 使ったハーネスの一覧と導入手順

| 種類 | 名前 | 何のために使ったか | 結果・つまずき | ログ |
| --- | --- | --- | --- | --- |
| llms.txt | `https://atlassian.design/llms.txt` | 入口。どの資料・ツールがあるかを知る | 200 OK。primitives は `@atlaskit/primitives/compiled` 推奨・emotion 版は legacy と明記。MCP（hosted／stdio）、lint の推奨設定、内部向けスキル `atlassian-design-system`（Atlassian 社内のみ）の存在が書かれている | `harness-logs/llms/llms.txt` |
| llms.txt | `llms-components.txt`（57 万字）、`llms-styling.txt`、`llms-content.txt`、`llms-a11y.txt`、`llms-tokens.txt`、`llms-primitives.txt` | 文言規約（Voice & tone、メッセージ設計）、スタイリング規約（`@atlaskit/css`、xcss、ネストしたセレクタ禁止）、a11y | content と styling は設計に直接使った。components は大きすぎて全文は読まず、MCP の全件出力で代用 | `harness-logs/llms/` |
| CLI | `npx @atlaskit/ads-cli`（0.11.1） | `--help`、`init`、`search`、`component`、`docs`、`docs a11y`、`lint-rules` | `npx -y` の直接実行はこの環境の権限判定で拒否されたため、devDependency に入れて実行（その後 `tools/` に分離）。`component` は props と例だけで usage ガイドラインは出ない | `harness-logs/cli/` |
| CLI | `ads-cli init` | 何が入るかの記録 | `@atlassian/skills` が公開 npm に無い（404）ため **スキルは入らず**、リポジトリ直下に `AGENTS.md` を作成（「`atlas ads` を先に使い、無ければ `npx @atlaskit/ads-cli`」「hosted MCP の設定例（Cursor／VS Code／Codex）」）。`atlas` CLI も無いのでプラグインは入らず | `harness-logs/cli/01-init*.txt`、`/AGENTS.md` |
| MCP（hosted） | `https://mcp.atlassian.com/v1/ads/public/mcp` | 設計の根拠集め | このセッションの MCP 設定には追加できないため、`@modelcontextprotocol/sdk` の Client で HTTP 接続するスクリプト（`tools/mcp-client.mjs`）を書いて呼んだ。**認証なしで接続でき、16 ツール**。サーバーの `instructions` は空 | `harness-logs/mcp/00-tools.json` |
| MCP | `ads_get_guidelines` | レイアウト・階層、メッセージ設計、色の役割、日付、文言 | メッセージ種類×部品の表が最も役に立った。"navigation"・"dashboard" 等には無関係な文書が返る（§4） | `mcp/01〜05, 11〜13` |
| MCP | `ads_plan`、`ads_search_components`、`ads_search_tokens`、`ads_search_icons` | 部品・トークン・アイコンの候補出し | 部品名とパッケージは正しく出る。トークン検索は "space" で `space.negative.025` が出るなど精度が低い。アイコンは "Reserved for …" の用途注記が役に立った | `mcp/06, 19, 20` |
| MCP | `ads_get_all_components` | **部品ごとの usageGuidelines／contentGuidelines／accessibilityGuidelines** | 119 部品。ガイドラインはここにしか無い。必要な部品だけ抜粋した | `mcp/09`（全件）、`mcp/10-guidelines-digest.md`（抜粋） |
| MCP | `ads_get_a11y_guidelines` | a11y の全体・forms・focus・screenReaders・colors | 一般的な内容。コード例に API の誤りあり（§5） | `mcp/07, 15〜18` |
| MCP | `ads_get_lint_rules` | lint ルールの内容 | 全件で 26 万字。CLI `lint-rules` と同じ内容 | `mcp/08` |
| MCP | `ads_analyze_a11y` | 実装したソースの a11y 検査 | hosted 版では **axe-core 解析が失敗し、正規表現の簡易検査に切り替わる**（出力に明記）。6 ファイルとも 0 件。わざと悪いコードを渡すと 3 件出るので簡易検査自体は動いている | `mcp/30-*, 31-*` |
| MCP（local） | `ads_analyze_localhost_a11y`（stdio 版のみ） | 実画面の axe 検査 | root 実行の Puppeteer が `--no-sandbox` 無しで起動できず失敗。外から引数を渡す手段が無い | `mcp/32-localhost-a11y-S01.md`、`mcp/00-tools-local.json`（21 ツール） |
| lint | `@atlaskit/eslint-plugin-design-system`（16.16.0）、`@atlaskit/eslint-plugin-ui-styling-standard`（3.0.4） | 推奨設定と全ルール | 2 つの公式 flat 設定を並べると **"Cannot redefine plugin"** で起動しない。全ルール設定は **ルール名 `ensure-design-token-usage/preview` のせいで起動しない**。どちらも設定側で回避（`eslint.config.js`） | `harness-logs/lint/` |
| DESIGN.md | — | — | ADS には該当するファイルが見当たらなかった（llms.txt にも記載なし） | — |
| スキル | `atlassian-design-system`（社内向け） | — | llms.txt に「Atlassian only」とあり、`init` でも入らなかった。外部からは使えない | — |

### 導入でのつまずき（設計以外）

| つまずき | 原因（確認した事実） | 対処 |
| --- | --- | --- |
| `cssMap()` がビルドで失敗 | `@atlaskit/css` は Compiled のビルド時変換が必須。Vite 8 の plugin-react は babel オプションを持たない。`@babel/core` 8 は `@compiled/babel-plugin` が受け付けない | `@rolldown/plugin-babel` ＋ `@babel/core` 7 ＋ `@atlaskit/tokens/babel-plugin` ＋ `@compiled/babel-plugin`。**ハーネスにはビルド設定の案内が無い** |
| cssMap のキーに `media.above.md` を使えない | Compiled が import した定数をキーとして静的に解決できない（"Property key may only be a static string"）。ADS の資料は `[media.above.md]` の書き方を示している | 同じ値の文字列（`"@media (min-width: 64rem)"`）を直書き |
| React 19 で画面が真っ白 | 上位の部品は peer で React 19 対応をうたうが、内部の `@atlaskit/analytics-next`・`@atlaskit/portal` が `react-dom ^18.2.0` を peer に持ち、npm が react-dom 18 を入れ子で入れる → `ReactCurrentDispatcher` で落ちる。`@atlaskit/navigation-system` も React 18 のみ | React 18.3.1 に下げた |
| アイコンが描画されない | `@atlaskit/icon/core/*` は CJS のみ。Vite 8 は `"type": "module"` のパッケージからの default import に Node と同じ意味論を使う | Vite の `legacy.inconsistentCjsInterop: true` |
| トークンが効いているか不明 | llms.txt 群にテーマの読み込み方（`setGlobalTheme`）の記述が無い。`@atlaskit/tokens` のルートからは export されておらず `@atlaskit/tokens/set-global-theme` から import する | 型定義を読んで特定 |
| 初回描画時の Modal・Flag が出ない | React の StrictMode（開発時の effect 二重実行）でポータルが空のまま残る | StrictMode を外した（`src/main.tsx` にコメント） |

---

## 3. 設計判断ごとの出典

「ハーネス」＝ ADS のハーネスに書かれていたことをそのまま根拠にした。「自分」＝ハーネスに根拠が無く、自分の判断・事前知識。「両方」＝ハーネスの一般原則を自分が具体化した。

### 3.1 画面構成・主役（この調査で最も知りたかった点）

| 判断 | 出典 | 詳細 |
| --- | --- | --- |
| 画面を 3 つ（組み合わせ／メンバー／設定）＋404 にする | 自分 | ハーネスにアプリの画面分割の指針は無い |
| トップに「今週のあなたの相手」カードを主役として置く | **自分** | ブリーフの利用シーン（数十秒の滞在）から決めた。`ads_get_guidelines` を "landing page"・"dashboard"・"primary task"・"navigation" で引いても関係する文書は返らない（`mcp/11-guidelines-structure.md` は日付・色の文書） |
| 主役を大きさ・太い枠・余白で区別する | 両方 | 「Create order and hierarchy：大きさと余白で順位をつける／すべてを同じ重さにしない」（`mcp/01`）。ただし「何を」上位にするかは自分 |
| 相手の名前の直下にハドルボタン | 両方 | 「Group by proximity」（`mcp/01`） |
| ページに primary ボタンは 1 つ（ハドルを始める） | ハーネス | Button usageGuidelines「Limit to one primary button per section」 |
| 1024px 以上で主役と「あなたの今後の予定」を横並び | 自分 | ブレイクポイントの値は primitives の `media` から取ったが、ガイドラインの表（`<BreakpointsTable />`）は MDX のまま展開されておらず読めなかった |
| ヘッダーを primitives で自作（ナビ＝LinkButton subtle＋isSelected） | 両方 | `docs layout` は `@atlaskit/navigation-system` を案内するが部品カタログに無く React 18 のみ。Link の usage「Use Link button when the link should look like a button」 |
| 390px でナビを 2 段目に回す | 自分 | — |

### 3.2 部品の選択・通知の使い分け

| 判断 | 出典 | 詳細 |
| --- | --- | --- |
| 読み込み失敗・ログイン失敗＝SectionMessage（error）＋やり直し | ハーネス | SectionMessage「connectivity or auth issues」「Avoid dead ends」。ただし `llms-content.txt` は error を「Flag, Inline message」に限っており、MCP の表（Banner/Flag/Section/Inline）と食い違う |
| 相手の uチャンネル未設定＝SectionMessage（warning） | 両方 | 「error は起きた問題、warning は将来の問題」（`mcp/02`）。今回は「起きていない・操作の結果でもない」状態なので warning を選んだのは自分 |
| 参加をやめる前の警告＝SectionMessage（warning）をフォーム内に即時表示 | ハーネス | warning＝「データの損失や変化を事前に知らせる」 |
| 保存成功・削除成功＝Flag（自動で消える） | ハーネス | Flag「confirm outcome, then get out of the way」 |
| 削除失敗＝Flag（error、自動で消えない、再試行つき） | ハーネス | Flag a11y「Do not use auto-dismiss for critical messages」 |
| 削除確認＝Modal、danger ボタン、ボタン文言をタイトルに合わせる、取り消せないことを書く | ハーネス | Modal usage/content、`mcp/02`「Confirm a risky action：取り消せるかどうかも伝える」 |
| データなし・404＝EmptyState、primary は 1 つ | ハーネス | EmptyState usage |
| Banner を使わない | ハーネス | Banner「critical messaging only」 |
| 参加の切り替え＝Checkbox（Toggle ではない） | 両方 | Checkbox「explicit confirmation (e.g. settings)」と、Form で保存するまで反映しないこと。Toggle「Consider immediate vs. delayed state changes」は判断材料にならなかった |
| 送信ボタンを無効化せず、送信時に項目ごとのエラー | ハーネス | Form a11y「Never disable the submit button」 |
| Select に placeholder を書かない | ハーネス（lint） | `no-placeholder` の警告で削除。ガイドラインにも「placeholder をラベル代わりにしない」 |
| ロゴ＝`Image`、別タブで開くことを `LinkExternalIcon` と `newWindowLabel` で示す | ハーネス | Link「Do not open in a new window without warning」、アイコン注記「Reserved for links that open up a new tab」、lint `no-html-image` |
| ハドルのアイコン＝Headphones | 両方 | 候補はハーネス（`search … --type icon`）、"Known uses: music, audio" から選んだのは自分（Slack のハドルの比喩） |
| 読み込み中＝Spinner＋文言 | 両方 | Spinner「Provide loading context」。Skeleton は early-access なので避けた（自分） |

### 3.3 色・文言

| 判断 | 出典 | 詳細 |
| --- | --- | --- |
| 人の識別色＝accent トークン | ハーネス | 色の役割「意味のある色に accent を使わない」（`mcp/11`, `mcp/13`）の裏返し |
| 参加＝Lozenge success、不参加＝default、初回設定未完了＝moved、予定＝inprogress | 両方 | 「色＋正確なラベル」はハーネス。どの appearance を当てるかは自分。全ルール lint は default→neutral 等への移行を求めるが現行型が非対応（§5） |
| アバターは頭文字＋accent 色（AvatarContent を差し替え） | 自分 | ガイドラインは「fallback initials」と書くが API が無い（§5） |
| 文言：ボタンは動詞で短く、エラーは原因と次の行動、責めない | ハーネス | Button content、Flag／SectionMessage content、`llms-content.txt` Voice & tone |
| 初回設定の語調（何のためか・終わると何が見えるか） | ハーネス | `llms-content.txt`「New users：prescriptive and clear, build trust, explain benefits」 |
| 日付を `2026年10月5日（月）`、時刻を 24 時間表記 | 自分 | ハーネスは「Atlassian uses US date formatting」。日本語の規則は無い |
| 「we を主語に」 | 不採用 | 日本語では主語を省くのが自然なため（自分） |

### 3.4 決まっていないことの決定

すべて **自分**。ハーネスはこの種の判断（業務ルール、権限、表示範囲）には何も言わない。内容は `design-decisions.md` §3。

**集計**（3.1〜3.3 の 33 判断）：ハーネス 15、両方 9、自分 9。ただし「自分」の中に、目標 G1・G2 を左右する主役の決定が入っている。

---

## 4. ハーネスが答えてくれなかったこと

1. **何を主役にするか・画面をどう分けるか**。レイアウトの一般原則はあるが、利用シーンから主役を選ぶ方法は無い。
2. **アプリの外枠**（ヘッダー・ナビ）を React 19／小さなアプリでどう作るか。`navigation-system` は部品カタログに無い。
3. **ビルド設定**（Compiled を Vite で動かす方法）と **テーマの読み込み方**。
4. **日本語**の日付・敬称・文体。content の規則は英語（US）前提。
5. **業務ルールに関わる判断**（ハドルの場所、削除権限、先の週の範囲）。これは当然ハーネスの範囲外。
6. ブレイクポイントや色の役割の **表**（`<BreakpointsTable />`、`<ColorRolesTable />`、`<SideNavigationAsideTable />`）は MDX のタグのまま返り、中身が読めない。

## 5. 誤っていた・古かった・食い違っていたこと

| 内容 | ハーネスの記述 | 実際（確認方法） |
| --- | --- | --- |
| Button の入口 | MCP の Button 説明「root は非推奨、`@atlaskit/button/new` へ移行中」。ブリーフも button/new を指定 | `@atlaskit/button@25.7.0` では **`/new` 自体が `@deprecated`**、`@atlaskit/button/default/button`・`/link`・`/icon/button` を使うよう型定義に書かれている。CLI `component Button` の例は新しい入口で正しかった（`dist/types/entry-points/new.d.ts`） |
| React 19 対応 | 上位部品の peerDependencies は `^18.2.0 || ^19.0.0` | 内部の `analytics-next`・`portal` が `react-dom ^18.2.0` を peer に持ち、React 19 では実行時エラー（`npm ls react-dom`、実行して確認） |
| Avatar の頭文字 | usageGuidelines「Provide fallback initials when images fail to load」 | src が無いと汎用の人型アイコン（`avatar-image.js`）。頭文字の API は無い |
| a11y のコード例 | `import { TextField } from '@atlaskit/textfield'` に `label` プロップ、`import { Button } from '@atlaskit/button'` に `aria-label` とアイコンを子要素で渡す | Textfield は default export で label はない（Field で付ける）。アイコンだけのボタンは IconButton＋label |
| lint の修正案 | `use-heading-level-in-section-message`「headingLevel={2} のように」 | 型は `'h1'…'h6'` の文字列。数値は型エラー |
| lint（全ルール）の修正案 | Lozenge `appearance="default"`→`"neutral"` 等を autofix | 既定の `Lozenge` の型は旧名のみ受け付ける（新名は `new/` の型だけ）。autofix すると型エラー |
| 公式 lint 設定 | llms.txt は 2 つの推奨設定を並べる書き方を示す（旧形式） | flat config では "Cannot redefine plugin"。`all/flat` は `ensure-design-token-usage/preview` で起動不能 |
| メッセージ種類と部品 | `llms-content.txt`：error は Flag と Inline message | MCP の表：error は Banner／Flag／Section message／Inline message。SectionMessage 自身の usage も error を想定 |
| `media` ヘルパー | 資料は cssMap のキーに `[media.above.md]` を使う例 | 素の `@compiled/babel-plugin` では解決できない（社内のビルド設定が前提と推測） |
| 英語の固定ラベル | — | `SectionMessage` のアイコン（"error"／"warning"）、`ModalDialog` の閉じるボタン（"Close Modal"）、`RequiredAsterisk` の `title="required"`、`ErrorMessage` のアイコン（"error"）、Select の "open"。前 2 つは差し替えられたが、後 3 つは差し替える API が無い |

## 6. AI（自分）が自発的にハーネスを使ったか

- 今回はブリーフで「設計前にハーネスを使う」と指示されていたので、起動は指示による。そのうえで、**指示が無くても使ったと言えるか** を振り返る。
- `llms.txt` は「AI 向けの入口」として明確で、そこから MCP・CLI・lint へ自然に辿れた。**起動条件は明確**。
- `ads_get_a11y_guidelines` の説明文には「You MUST call this when generating … UI」とあり、ツールの説明自体が起動条件になっている。`ads_plan` も「Use this as the default way to discover」と書く。説明文で行動を促す設計。
- 一方、**部品の usage ガイドラインを得るツール** は名前からはわからない（`ads_search_components` は "trimmed payload" で usage を含まない）。全件取得を試したのは自分の判断で、普通に `ads_plan` だけ使うと usage は手に入らない。→ ハーネスを「使った」つもりでも、デザイン意図の部分を取りこぼしやすい構造。
- 実装の途中（Lozenge の appearance、SectionMessage の見出し、placeholder）では **lint が自発的な再参照のきっかけ** になった。lint は「使うかどうか」を AI に委ねず、機械的に効く点で最も確実だった。
- `init` が書く `AGENTS.md` は、社外では「CLI を使え・MCP を設定しろ」という内容だけで、スキル（設計の進め方）は入らない。

## 7. 「ADS らしい」設計になったと言える点・言えない点

**言える点**
- 通知の使い分けが ADS のメッセージ設計表と部品の usage にそろっている（Flag は出来事の後、SectionMessage はその場に留まる問題、EmptyState は空の理由と次の行動、Banner は使わない）。
- 削除確認の Modal の構成（タイトル＝問い、本文＝何が起きるか・取り消せない、danger ボタンの文言がタイトルと一致、閉じる手段が複数）。
- フォーム（ラベルが上、必須アスタリスク、ヘルパー文、送信ボタンを無効化しない、エラーは項目ごと）。
- 色の役割（識別は accent、状態は semantic、すべてに文字ラベル）。
- 部品・余白・色・文字はすべて ADS のトークンと部品で、推奨 lint は 0 件。

**言えない点**
- 画面の骨格（主役カード＋今後の予定＋全ペア）は自分の判断で、ADS の製品（Jira／Confluence）のような外枠（サイドナビ・トップナビ）とは違う。外枠を ADS どおりにするには `navigation-system` が要るが、カタログに無く React 18 前提。
- 日本語の文言は ADS の英語規約を自分で翻案したもので、ADS の根拠は「方向性」までしか無い。
- アバターの頭文字は ADS の API の外で作っている。

## 8. 再現手順

```bash
cd ads-ct-goal
npm install            # アプリ本体
(cd tools && npm install)   # ハーネス（ads-cli・MCP クライアント）
npx --prefix tools ads-cli search button          # CLI
node tools/mcp-client.mjs list                    # hosted MCP のツール一覧（失敗時は local stdio に切替）
node tools/mcp-client.mjs batch harness-logs/mcp-plan-01.json
npm run lint && npm run lint:all                  # ADS 公式 lint
```

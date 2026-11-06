# Ant Design ハーネス調査報告

この調査の主目的は「Ant Design が AI エージェント向けに用意した仕組み（ハーネス）が、デザインの意図（いつ何を使うか、何を主役にするか、文言の書き方）にどこまで効くか」を確かめることです。記載は、このセッションで実際に実行・確認したことだけです。推測には「推測」と書きます。ログは `harness-logs/` にあります（索引は `harness-logs/README.md`）。

## 結論

1. **ハーネスが最も効いたのは「部品の正しい使い方」と「1 画面 1 つの primary」**。`antd info`（非推奨 props）、`antd lint`、DESIGN.md の Do's and Don'ts、spec の buttons / feedback / research-* により、部品の選択と通知の使い分けはほぼハーネスの記述から決められた。
2. **「画面構成・主役」はハーネスからは決まらなかった。** 直接の手がかりは spec の research-workbench（「最も使う内容を最初の画面に」）と DESIGN.md の「primary は最重要の 1 操作だけ」の 2 つ。これは「主役は 1 つに絞れ」とは言うが、「何を主役にするか」「どこに置くか」は言わない。今週の相手を最上部のカードにまとめる構成は自分の判断。DESIGN.md は antd を「高密度の業務コンソール」向けと位置づけており、数十秒で終わる確認用アプリには前提が合わない部分があった。
3. **既定のままでは WCAG 2.1 AA を満たせなかった。** 1 回目の撮影では 36 枚すべてで axe 違反（color-contrast 375 ノード）。主因は antd の既定値（`Typography type="secondary"` の 3.36:1、状態色の Tag 文字 2.2:1 など）。DESIGN.md は primary ボタンの対比不足だけを注記しており、他は書かれていない。`antd lint` はこれらを 1 件も検出しなかった（0 件）。
4. **`antd lint` は API の検査で、デザインの検査ではない。** わざと誤った例で試すと、非推奨 API 8 件・画像の alt 1 件・静的 message 1 件は検出したが、DESIGN.md の Don'ts（primary の 2 つ並び、16 進数の直書き、4px 格子外の余白）とアイコンだけのボタンのラベル欠落は検出しなかった。
5. **導入はこの実行環境では半分しかできなかった。** スキルの導入（`npx skills add`）と `antd setup`（.mcp.json / .claude/skills / CLAUDE.md の書き込み）は、実行環境の権限分類器に拒否された。そのため「AI がスキルや MCP を自発的に呼ぶか」は検証できていない。CLI と MCP（stdio で直接）は動いた。

## 1. 使ったハーネスの一覧

| 種類 | 名前・コマンド | 何に使ったか | 結果 | ログ |
| --- | --- | --- | --- | --- |
| CLI | `@ant-design/cli` 6.7.0（`npx antd`） | 以下のサブコマンドの土台。devDependencies に入れて `npx` で実行（グローバル導入はしていない） | 動作 | 00, 01 |
| CLI | `antd design.md` | DESIGN.md を読む（画面構成の前） | Web 版と同一（末尾の空行 1 つだけ違う） | 07, 08 |
| CLI | `antd info <C> --detail --format json` | 部品 42 種の whenToUse、23 種の props と非推奨 props | whenToUse が空の部品あり（Layout, Avatar, Form, Grid） | 10, 12 |
| CLI | `antd list` | 部品一覧。List が非推奨で Listy が新設と判明 | 動作 | 11 |
| CLI | `antd demo Listy` / `antd demo Listy rich` | Listy の使い方、頭文字アバターの色の付け方 | 公式デモでも Avatar の背景色は `style` で渡していた | （実装時） |
| CLI | `antd token Layout --format json` | ヘッダー背景などの component token | token 名と説明は出るが `default` が空文字 | （実装時） |
| CLI | `antd lint ./src`（`--format json`） | 実装の検査 | 0 件 | 13 |
| CLI | `antd lint`（誤りを仕込んだ例） | lint が何を検出できるかの確認 | 10 件検出、Don'ts 系は未検出 | 14 |
| CLI | `antd usage ./src` / `antd doctor` | 使用部品の集計、環境の診断 | 26 部品・57 import／14 項目すべて合格 | 18, 19 |
| CLI | `antd setup --client claude --mode both --dry-run` | 公式セットアップが何を書くかの確認 | `.mcp.json`、`.claude/skills/antd`、`CLAUDE.md` を書く予定と表示 | 02 |
| CLI | `antd setup --client claude --mode both --write-instructions` | スキルと MCP の導入 | **実行環境が拒否**（エージェント自身の設定の書き換え） | 04 |
| スキル | `npx skills add ant-design/ant-design-cli` | スキルの導入 | **実行環境が拒否**（外部コードの実行） | 03 |
| スキル | 同梱 `skills/antd/SKILL.md` | 作業者が直接読んで手順に従った（`.claude/skills/` には置けていない） | — | 05 |
| MCP | `antd mcp`（stdio に JSON-RPC を直接送信） | initialize / tools/list / prompts/list / prompts/get | ツール 8 個（antd_list, antd_info, antd_doc, antd_demo, antd_token, antd_design_md, antd_semantic, antd_changelog）、プロンプト 2 個（antd-expert, antd-page-generator） | 06 |
| 文書 | https://ant.design/llms.txt | 文書の索引 | 537 行。DESIGN.md、llms-full.txt、spec の .md への入口 | 09 |
| 文書 | https://ant.design/docs/spec/*.md（29 本＋react 系 3 本） | 価値、フィードバック、文言、ボタン、ナビゲーション、空・例外・結果・フォーム・ワークベンチの各テンプレート | 本文の多くが画像（後述） | spec/ |
| 検査 | `npx design.md lint`（`@google/design.md` 0.4.0） | antd 公式 DESIGN.md と、このアプリの DESIGN.md の検査 | 公式：エラー 0・警告 19（対比 2、未参照 token 17）／このアプリ：エラー 0・警告 15（対比 0、未参照 token 15） | 15, 16, 17 |
| 検査（ハーネス外） | `brief/scripts/capture.mjs`（Playwright＋axe） | 撮影、WCAG 2.1 AA、横はみ出し | 1 回目：36 枚すべて違反／最終：0 | `docs/capture-*.json`, `docs/capture-result.txt` |

## 2. 導入手順とつまずき

1. `npm view @ant-design/cli` で最新版（6.7.0）と bin 名（`antd`）を確認 → `npm i -D @ant-design/cli`。
2. **`npx antd --version` が失敗**：`--version` は「対象の antd のバージョン」を指定するオプションで、CLI 自身のバージョンは `-V`。慣習と違うので最初につまずいた。
3. `npx skills add ant-design/ant-design-cli` → **拒否**。この実行環境（Claude Code の自動許可モード）の分類器が「外部から取得したコードの実行」と判断した。ブリーフの代替手順（同梱 SKILL.md を `.claude/skills/` に置く）も、次の項と同じ理由で行っていない。
4. `npx antd setup --client claude --mode both` → **拒否**（エージェントが自分の設定ファイルを書き換える操作として）。dry-run の出力から、`.mcp.json`・`.claude/skills/antd`・`CLAUDE.md` を書く設計だとわかる。**回避はしていない。** 利用者側で許可すれば導入できるはず（推測）。
5. MCP はクライアントに登録できないため、`npx antd mcp` を起動して stdio で JSON-RPC を送り、ツールとプロンプトの一覧・中身を確認した。CLI と同じ知識を返すことは確認したが、**会話の中で AI が MCP ツールとして呼ぶ形では使っていない**。
6. SKILL.md の手順は「`which antd || npm install -g @ant-design/cli`」。グローバル導入を前提にしており、プロジェクトの devDependencies に入れて `npx` で呼ぶ形は書かれていない（動作には問題なし）。
7. `@google/design.md` は npm から導入できた。アプリのコードではなく **DESIGN.md ファイルの構造と対比**を検査する道具で、`antd lint` とは対象が違う。

## 3. 設計判断ごとの出典

「効き方」は、◎＝ハーネスの記述でほぼ決まった、○＝ハーネスが方向を示し細部は自分で決めた、△＝ハーネスの一般論を自分で当てはめた、—＝ハーネスは関係なく自分の判断（事前知識を含む）。

| 判断 | 出典 | 効き方 |
| --- | --- | --- |
| **主役を「今週のあなたの相手」の 1 枚にする** | spec research-workbench「最も使う内容を最初の画面に」「戻ってきた人への最短経路」 | △ |
| **主役の置き方（相手の名前を見出し、ボタンを直下、2 列の左上）** | なし | — |
| 画面の primary は「ハドルを始める」1 つ | DESIGN.md「primary はその画面の最重要の 1 操作」「primary を 2 つ並べない」、spec buttons「primary はボタン群に最大 1 つ」「CTA は 1 画面に 1 つ」 | ◎ |
| ボタン文言を「〇〇さんとハドルを始める」「削除する」など動詞にする | spec buttons「Label：動詞で、押した結果を表す」「否定的な主操作は結果を強調」 | ◎ |
| 上部の横並びナビ（2〜3 項目） | spec navigation「トップナビは 2〜7 項目」 | ○ |
| 390px でヘッダーを 2 段にする | なし（横並び Menu が「…」に畳まれるのを避けるため） | — |
| 2 列（左：今週、右：予定）／390px で縦積み | なし | — |
| 先の週を Collapse で畳む | whenToUse Collapse、spec stay（ページ遷移を減らす） | ○ |
| 予定・CT なし・あなたのペアを Tag で示す | whenToUse Tag「分類に使う」、DESIGN.md「Tag は分類用。重大な状態には使わない」 | ○ |
| 頭文字アバターにプリセット色を使う | DESIGN.md「プリセット色はタグ・チャート・分類表示に」、`antd demo Listy rich`（style で背景色） | ○ |
| メンバー一覧に Listy を使う（List を使わない） | `antd list` / `antd info List`（非推奨）。ただし Listy の whenToUse は「長いリストの仮想化」 | ○（食い違いあり） |
| 削除の確認を Modal にする（Popconfirm にしない） | whenToUse Popconfirm「簡素で小さな確認」、whenToUse Modal | ○ |
| 削除の成功は message、失敗はモーダル内 Alert | spec feedback「Message は短時間で消えるので重要な失敗には不向き」、spec research-message-and-feedback | ◎ |
| 保存失敗・ログイン失敗を消えない Alert で | 同上 | ◎ |
| 入力不備は項目ごとのエラー | spec feedback「Input feedback」、research-message-and-feedback「Form Validation」 | ◎ |
| 読み込み中は Skeleton | whenToUse Skeleton、spec research-exception「Loading State」 | ◎ |
| 読み込み失敗は Result＋「もう一度読み込む」 | spec research-exception「Load Failure：再試行と組み合わせる」 | ◎ |
| 空の状態は Empty＋理由＋次の行動 | spec research-empty「理由を明示」「Invitation（次の行動）」 | ◎ |
| 404 は Result＋戻る | spec research-exception「Template - 404」 | ◎ |
| 未ログインの人に「ログインすると何ができるか」を伝える | spec invitation（静的な Invitation） | △ |
| 設定画面はグループ化せず提出型 | spec research-form「Template - Settings：7 項目未満はグループ化しない」 | ◎ |
| 参加は Switch でなく Radio.Group | whenToUse Switch「即時反映の操作」、whenToUse Radio「見比べられる」 | ◎ |
| 参加状況変更の影響を保存前の Alert で伝える | なし（research-form の Security を拡大解釈） | △ |
| 初回設定に Steps を使わない | spec navigation「Steps は 2 より多く 5 未満の手順」 | ○ |
| 文言：利用者の立場、一貫、重要情報を目立たせる、責めない、感嘆符なし、ラベルに句点なし | spec copywriting | ◎ |
| 文言：日本語の「必須」表記、敬体、「〜さん」 | なし（spec copywriting は英語・中国語の例のみ） | — |
| primary を blue-7 に下げる | DESIGN.md の Accessibility note | ◎ |
| 状態色・secondary 文字色を下げる | axe の結果（ハーネスは指摘せず）。方法は DESIGN.md「独自色を作らず token で」に従った | △ |
| 状態色の背景・枠 token を既定値に固定 | なし（seed を下げたら派生背景が濁ったため。Tag のスタイル実装を読んで判断） | — |
| 背面を `inert` にする | なし（axe の結果と WAI-ARIA の作法） | — |
| `antd/dist/reset.css` を読み込む | react の compatible-style 文書に記述はあるが、Vite で使う手順（use-with-vite）には無い。8px のはみ出しの原因調査で判断 | △ |
| 見出し token を 24/20/16px に下げる | なし（DESIGN.md の customization が token 上書きを認めていることだけを根拠に） | — |
| 決まっていないこと 6 項目（ハドルの場所、削除権限、表示週数、スマホ、特定の人、人数の数え方） | なし（プロダクトの判断） | — |

### 画面構成・主役の決め方にハーネスは効いたか

- **効いた部分**：「primary は 1 つ」という制約が強く、主役の候補を「ハドル開始」に絞るきっかけになった。research-workbench の「最も使う内容を最初の画面に」も、主役を最上部に置く後押しになった。
- **効かなかった部分**：
  - 「何が最も使われるか」を決めるのはブリーフの利用シーンで、ハーネスではない。
  - 主役をどう見せるか（相手の名前を見出しに、アバターを大きく、ボタンを直下に、横幅いっぱいに）は、どの文書にも具体的な記述が無い。
  - ハーネスの前提は「業務コンソール・ワークベンチ」。DESIGN.md は「Enterprise consoles trade legibility headroom for information density」（14px 基準、h1 38px）と書き、research-workbench は「モジュールを 5〜9 個」と書く。このアプリ（モジュール 3 つ、数十秒の滞在、スマートフォンでも使う）には合わず、見出しを小さくし、主役だけを大きく見せる調整は自分で行った。
  - レスポンシブ（390px）についての指針は見つからなかった（読んだ範囲：DESIGN.md、spec 29 本、whenToUse 42 種）。Grid の whenToUse は空。

## 4. ハーネスが答えてくれなかったこと

- 主役の見せ方、2 列か 1 列か、スマートフォンでの並べ方（上記）。
- 横並び Menu が狭い幅で「…」に畳まれ、今いる画面が見えなくなることへの対処。
- 頭文字アバターの文字色と背景色の対比。公式デモ（`antd demo Listy rich`）は独自の 16 進数（#f56a00, #7265e6, #ffbf00, #00a2ae）の背景に白文字で、対比は 3.02 / 4.45 / 1.65 / 3.10:1 とすべて 4.5:1 未満（自分で計算）。DESIGN.md の「プリセット外の色を作らない」とも食い違う。
- モーダルを開いている間の背面の扱い（`inert`）。
- Vite で使うときに `reset.css` が要ること（use-with-vite の文書に記述なし）。
- 日本語の文言（「必須」の表記、敬体、全角・半角の扱い）。spec copywriting の大文字小文字や句読点の規則は英語向け。
- 同じ情報への導線が複数あるとき（ヘッダーのログインと主役カードのログイン）の優先度。
- component token の既定値（`antd token Layout` の `default` が空文字で、ヘッダーの既定の高さや色が CLI からはわからない）。

## 5. 誤っていた・古かった・食い違っていたこと

| 項目 | 内容 | 確認方法 |
| --- | --- | --- |
| secondary の文字色 | DESIGN.md は「0.65＝secondary text（#595959）、0.45＝tertiary / description」と書くが、`Typography type="secondary"` は `colorTextDescription`（0.45、白地で #8C8C8C 相当、3.36:1）で描かれる。AA を満たさない | axe（1 回目） |
| 状態色の Tag | DESIGN.md は Alert について「状態は低対比の色付き文字ではなくアイコンと色味で伝える」と書くが、Tag（success / warning）は状態色の文字で、success は淡い背景上で 2.2:1。DESIGN.md の対比の注記は primary ボタンと淡い選択背景だけ | axe（1 回目） |
| エラー色 | 既定の `colorError`（#FF4D4F）は白地で 3.27:1（WCAG の相対輝度の式で自分で計算）。Form のエラー文や danger ボタンの文字に使われる。red-7（#CF1322）なら 5.57:1 | 計算スクリプト |
| seed の変更 | DESIGN.md の Customization は「最小限の seed を変えよ」と書くが、`colorSuccess` などの seed を濃くすると派生する背景（`colorSuccessBg`）まで濁った灰緑になった。背景と枠の map token を既定値に固定する必要があった | 撮影（S11 の 1 回目の修正後） |
| List → Listy | List は「非推奨、Listy を使え」と出るが、Listy の whenToUse は「長いリストの仮想化・グループ化・スクロール制御」。11 人程度の普通の一覧に何を使うべきかが曖昧 | `antd info List` / `antd info Listy` |
| spec の状態 | research-* を含む 12 本の front-matter に `skip: true` がある。llms.txt には載っているが、サイト上での扱い（非公開・下書きか）は確認していない | spec/*.md |
| spec の本文が画像 | 例：copywriting は画像 75 枚に対し本文 64 行、buttons は画像 59 枚。research-message-and-feedback の「Feedback Methods」の表は画像だけ。Do / Don't の具体例が文字で読めず、AI には伝わらない | spec/*.md の集計 |
| MCP の範囲 | MCP は知識の 8 ツールだけで、lint・usage・doctor は無い（CLI にはある）。SKILL.md の MCP 例は `--version 5.20.0` で、v6 の例ではない | 06, 05 |
| `--version` | 慣習と違い「対象の antd のバージョン」。CLI のバージョンは `-V` | 01 |
| Modal の `visible` | 誤りを仕込んだ例で `<Modal visible />` を lint は検出しなかった（v5 以降は `open`）。v6 の実行時に受け付けるかは確認していない | 14 |

## 6. lint の効き方

| 対象 | 結果 |
| --- | --- |
| このアプリ（`antd lint ./src`） | 0 件（deprecated 0, a11y 0, usage 0, performance 0）。残した警告は無い |
| 誤りを仕込んだ例 | 検出 10 件：Space `direction`、Alert `message`、List（2 件）、Modal `destroyOnClose`、Tag `bordered`、Card `bordered` / `bodyStyle`（deprecated 8）、Image の alt 欠落（a11y 1）、静的 `message.success`（usage 1） |
| 同・検出されなかったもの | primary ボタンの 2 つ並び、`color: '#1677ff'` の直書き、`padding: 13` の格子外の値、アイコンだけのボタン（ラベル・Tooltip なし）、Avatar の alt、Modal の `visible` |
| 色の対比 | lint の a11y は対比を見ない。1 回目の撮影で axe が出した 375 ノードの対比違反に対して、lint は 0 件 |
| `design.md lint`（Google） | DESIGN.md の YAML 内の対比を検査できる。antd 公式 DESIGN.md で primary ボタン（4.10:1）と選択中メニュー（3.66:1）を警告。このアプリの DESIGN.md（上書き後の値）では対比の警告 0。ただし Typography や Tag の状態色は DESIGN.md の components に無いため、公式版では検出されない |

## 7. AI は自発的にハーネスを使ったか

- **今回は指示されて使った。** ブリーフが CLI・DESIGN.md・llms.txt・spec の利用を明示していたため、自発性の検証にはなっていない。スキルと MCP がセッションに組み込めなかったため、「スキルの説明文を見て AI が自分で起動するか」は確かめられていない。
- **実装中に自分から使ったもの**：部品を書く前の `antd info`（非推奨 props の一覧）、Listy の書き方を知るための `antd demo`、ヘッダー背景の token を探す `antd token Layout`、書いた後の `antd lint`。SKILL.md の「書く前に info、書いた後に lint」の手順は、指示が明確で従いやすかった。
- **使わなかったもの**：`antd semantic`、`antd changelog`、`antd migrate`、`antd doc`（whenToUse は info の `--detail` で足りた）。
- **起動条件の明確さ**：SKILL.md の description は「antd の部品を書く、デバッグする、API・props・token・デモを調べる、移行する、使用状況を分析する」ときに使え、と書く。**「画面構成を決める」「何を主役にするか決める」「文言を書く」は起動条件に含まれていない。** DESIGN.md も SKILL.md の中では「色・文字・余白・角丸と原則を知るため」とだけ紹介されている。MCP の antd-page-generator プロンプトも「部品の文書と例をすべて取ってからコードを書け」という API 中心の指示で、spec（設計パターン）には触れない。したがって、指示が無ければ AI は API の確認には自発的にハーネスを使うが、**設計判断のために spec を読みに行く動機はハーネスからは生まれにくい**（推測。今回の自分の行動では、spec はブリーフの指示で読んだ）。

## 8. ハーネスがあることで「Ant Design らしい」設計になったか

### 言える点

- 画面ごとに primary が 1 つだけ。他は default / text / link（DESIGN.md・spec buttons）。
- 3 層の面（灰色の `bg-layout` の上に白い Card、浮くものだけに影）。色は token からだけ読み、16 進数を書いていない（DESIGN.md の Do's and Don'ts）。
- 通知の使い分け（message／Alert／Form 検証／Modal／Result／Empty／Skeleton）が spec feedback・research-* の対応表どおり。
- 非推奨 API を使っていない（List ではなく Listy、Alert の `title`、Space ではなく Flex）。lint 0 件。
- 文言の原則（利用者の立場、一貫、結果を表す動詞のボタン、責めない、感嘆符なし）。

### 言えない点

- 主役の構成と見せ方、2 列のレイアウト、390px の 2 段ヘッダーは自分の判断で、ハーネスから導いたものではない。これらが「antd らしい」かどうかをハーネスで判定する手段は無い。
- AA を満たすために primary・状態色・secondary 文字を濃くしたので、見た目は既定の antd（明るい #1677FF）より暗い。**「antd の既定どおり」と「AA を満たす」は両立しなかった。**
- 見出しの大きさを DESIGN.md の値から変えた（h1 38px → 24px）。
- 「antd らしさ」の多くは部品そのもの（Card、Tag、Collapse、Result の見た目）から来ており、ハーネスの指示がなくても同じ部品を選んでいれば同じ見た目になった可能性が高い（推測）。ハーネスが独自に効いたのは、部品の**選び分け**（Popconfirm か Modal か、Switch か Radio か、message か Alert か）と **primary の数**。

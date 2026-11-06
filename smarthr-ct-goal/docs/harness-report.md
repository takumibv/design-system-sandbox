# SmartHR Design System ハーネス調査レポート

この調査の主目的は「SmartHR Design System が AI エージェント向けに用意している仕組み（ハーネス）が、デザイン意図（いつ何を使うか・何を主役にするか・文言）にどこまで効くか」を確かめること。
CTスケジュールを白紙から設計・実装しながら、ハーネスを使った記録をまとめる。

- 事実は自分で確認したものだけを書き、推測には「推測」と書いた。
- 出典の記法：`[H:…]` ハーネス（プラグインのスキル）、`[D:…]` ハーネス外の SmartHR 公式ドキュメント、`[L:…]` 公式の lint、`[自]` 自分の判断・事前知識。

## 1. 結論（要約）

1. **ハーネスの実体はスキル 2 つ（`component-guidelines`・`design-pattern-guidelines`）だけ**。MCP サーバー・llms.txt・DESIGN.md は見つからなかった（smarthr.design の `/llms.txt` `/llms-full.txt` `/DESIGN.md` はいずれも 404）。
2. **「どの部品をどう使うか」「状態ごとに何で知らせるか」には非常によく効いた**。特に `feedback.mdx`（成功・失敗・読み込み中・ページ／要素の失敗をどの部品で出すか）、`delete-dialog.mdx`（タイトル・本文の定型文・Danger ボタン）、`Button.md` の「Primary は 1 画面に 1 つ」、`FormControl.md` の「required ＋ onInvalid ＋ errorMessages」は、そのまま設計判断になった。
3. **「画面構成・主役の決め方」には部分的にしか効かなかった**。ページの骨格（ヘッダー → Container → 見出し領域 → セクション）と「重要な情報は上・左」は決まるが、パターンは業務オブジェクトの一覧・詳細（コレクション／シングル）を前提にしており、「ある人にとっての今週の答えを主役にする」型は無い。主役の発想はブリーフ（G1/G2）から自分で決め、ハーネスは「Primary を 1 つに絞る」ことで主役を**強制的に 1 つに決めさせる**形で効いた。
4. **文言のガイドはスキルに入っていない**。「全角と半角の間にスペースを入れない」という SmartHR の表記ルールは、スキルを読んでも分からず、textlint（`textlint-rule-preset-smarthr`）を通して初めて 50 件の違反として分かった。
5. **SmartHR 以外のサービスに使う前提が薄い**。Header／AppHeader／ErrorScreen 系は SmartHR のロゴ・文言・挙動が固定で、Gaji-Labo のサービスとして使うには回避策が要った。
6. 起動は自動ではなかった。プラグインはエージェントから `/plugin` で入れられず、手でコピーしたスキルは実行中のセッションに読み込まれなかった（`Unknown skill`）。今回は課題の指示に従って SKILL.md を自分で開いたので使えたが、指示が無ければ設計段階では使わなかった可能性が高い（推測）。

## 2. 使ったハーネスの一覧と導入手順

| 種類 | 名前 | 何に使ったか | 結果 |
| --- | --- | --- | --- |
| プラグイン | `kufu/smarthr-design-system`（plugin.json v0.6.0、commit `ed07a77`、2026-11-04） | スキルの配布元 | `/plugin` は使えず、clone して `.claude/skills/` にコピー |
| スキル | `design-pattern-guidelines`（`SKILL.md`、`pattern-selector.md`、`patterns/*.mdx` 24 件） | 画面構成・通知・削除・空状態・余白 | 設計の骨格に使用（§3） |
| スキル | `component-guidelines`（`SKILL.md`、`component-selector.md`、`components/*.md` 106 件） | 部品の選定・props・[must]/[should]/[avoid] | 部品選定と実装に使用（§3、付録） |
| lint | `eslint-plugin-smarthr` 6.29.0 | 実装ルールの検査 | `recommended` は全ルール off（§5）。実際の推奨値は下の共有設定から |
| lint | `eslint-config-smarthr` 14.14.0（内部に eslint-plugin-smarthr 6.28.0） | 推奨の強さで全ルールを実行 | 初回 68 エラー・93 警告 → 修正後 0 エラー・90 警告（すべて多言語化） |
| 文言検査 | `textlint` 15.8.0 ＋ `textlint-rule-preset-smarthr` 1.38.3 ＋ `textlint-rule-prh`（SmartHR Design System リポジトリの `dict/prh-books.yml`） | UI 文言の表記 | 初回 59 件（全角・半角間のスペース 50、括弧まわりのスペース 6〔多くは抽出形式による誤検知〕、全角どうしのスペース 1、括弧の対応 2）→ 修正後 2 件（JSX の分割による誤検知） |
| 公式ドキュメント（ハーネス外） | 同リポジトリ `src/content/articles/products/contents/`（`error-messages/overview`、`ui-text/app-writing`、`idiomatic-usage/symbol`） | 文言 | エラー文の型、ボタンは動詞、見出しは名詞、スペースを入れない根拠 |
| 探したが無かったもの | MCP サーバー、`llms.txt`、`llms-full.txt`、`DESIGN.md`、`/.well-known/mcp.json` | — | すべて 404／リポジトリにも無し（`harness-logs/02-other-harness-probe.txt`） |

### 導入手順とつまずき

1. `git clone --depth 1 https://github.com/kufu/smarthr-design-system.git`
2. `/plugin marketplace add kufu/smarthr-design-system` は、エージェントからスラッシュコマンドを実行できないこの環境では使えなかった。
3. `cp -rL plugins/smarthr-design-system/skills/* .claude/skills/`。**`patterns/*.mdx` はサイト記事へのシンボリックリンク**なので、`-L` で実体化しないと壊れる（README にも「シンボリックリンク」と書かれている）。
4. コピー直後に Skill ツールで `component-guidelines` を呼ぶと `Unknown skill: component-guidelines`。セッション開始後に置いたスキルは読み込まれない。→ SKILL.md の指示どおりにファイルを直接読んだ（`harness-logs/03-skill-activation-and-reading.md`）。
5. smarthr-ui は最新の **v102.1.0** を入れた。ガイドの基準は **v100.1.0**（component-selector の冒頭に明記）。今回使った範囲で props の食い違いで困った所は無かったが、型は `node_modules` の `.d.ts` で確認した。
6. smarthr-ui の README の使用例は `IntlProvider` ＋ `ThemeProvider` だけだが、`useEnvironment` を使うには **`EnvironmentProvider` が必要**（無いと実行時エラー「useEnvironment は EnvironmentProvider の内側で使用してください」）。モバイル判定に `useEnvironment` を使えと書いているのは `mobile-friendly-layout.mdx` だが、Provider の必要性はハーネスにもスキルにも書かれていなかった。
7. `eslint-config-smarthr` は `tsconfig.json` の `compilerOptions.paths` に `"@/*"` が無いと **ESLint ごと落ちる**（`tsconfig.json の compilerOptions.paths に "@/*": ["any_path/*"] 形式で…`）。Vite のテンプレートには無いので追加した。
8. `eslint-plugin-smarthr` の `recommended` 設定は**全ルールが `'off'`**（`index.js` の `generateRecommendedConfig`）。「推奨設定で全件実行」の指示に対し、実際に推奨の強さを決めている公式の共有設定 `eslint-config-smarthr` を使った。

## 3. 設計判断ごとの出典

| 設計判断 | 出典 | ハーネスが効いたか |
| --- | --- | --- |
| **主役を「今週のあなたの相手＋ハドルを始める」にし、組み合わせ画面の最上部に置く** | 発想は `[自]`（ブリーフ G1/G2）。位置は `[H:visual-guidance.mdx]`「重要な情報は上部・左側」。1 つに絞るのは `[H:components/Button.md]`「Primary は 1 画面に最大 1 つ。主要な操作が 1 つになるよう情報設計と画面構成を見直す」 | △：主役の**選び方**は教えてくれないが、Primary の制約が主役を 1 つに決めさせた |
| ページの骨格（ヘッダー → Container → PageHeading＋リード文 → セクション） | `[H:page-layout.mdx]` | ◎ |
| セクション＝見出し＋Panel、Panel は必要な所だけ、罫線は最終手段 | `[H:visual-grouping.mdx]` | ◎ |
| 週の切り替えを TabBar（下線つき、モバイルは Reel で横スクロール） | `[H:page-layout.mdx]`「長いページはナビゲーションで分割」、`[H:visual-grouping.mdx]`「見出し領域に TabBar を置き Panel を切り替える」、`[H:components/TabBar.md]` [must] 下線、[should] Reel | ◎ |
| メンバー：デスクトップはテーブル、モバイルはリスト | `[H:page-layout.mdx]`「テーブルはモバイル不適 → リスト」、`[H:smarthr-list.mdx]` | ◎ |
| モバイルのリストの操作は「アイコンボタン 1 つ」 | `[H:smarthr-list.mdx]` | ◎ |
| 0 件の文言「表示するデータはありません。」 | `[H:smarthr-list.mdx]`「人を指す名詞なら…」 | ◎ |
| 見出しに「一覧」をつけない（「メンバー」） | `[H:smarthr-list.mdx]`、`[D:ui-text/app-writing]` | ◎ |
| 参加／不参加を StatusLabel の文字で区別 | `[H:components/StatusLabel.md]` [must] 色のみで伝えない | ◎（ブリーフの要件とも一致） |
| 削除ダイアログの構成・文言・Danger ボタン「削除」／「キャンセル」 | `[H:delete-dialog.mdx]` | ◎ |
| 削除の注意事項（参加中なら組み合わせが組み直される） | `[H:delete-dialog.mdx]`「影響がある場合は必ず伝える」＋内容は `[自]` | ◎ |
| 通知の使い分け（ResponseMessage／NotificationBar／Loader／ErrorScreen） | `[H:feedback.mdx]` | ◎（下表） |
| 設定フォームの検証（required＋onInvalid で preventDefault＋errorMessages、解消したら消す） | `[H:components/FormControl.md]` [must] | ◎ |
| uチャンネルは Select、参加は RadioButton（2 択） | `[H:selection-component-usage.mdx]`、`[H:components/Checkbox.md]`「2 択は原則 RadioButton」 | ◎ |
| 設定画面は Container `NARROW` | `[H:components/Container.md]` [should] | ◎ |
| 入力例は `exampleMessage` | `[H:components/FormControl.md]` [must] | ◎ |
| モバイルでボタンを幅いっぱいに | `[H:components/Button.md]` [should] | ◎ |
| エラー文を「事象・原因・対処」で書く | `[D:error-messages/overview]`（スキル外） | — |
| ボタンは動詞の終止形、見出しは名詞 | `[H:Button.md][H:Heading.md]` [must]、詳細は `[D:ui-text/app-writing]` | ○ |
| 全角と半角の間にスペースを入れない | `[L:textlint-rule-preset-smarthr]` で発覚、根拠は `[D:idiomatic-usage/symbol]` | ×（スキルでは分からなかった） |
| 人のアイコン（頭文字＋固定色）を自前 CSS で作る | `[自]`。smarthr-ui にアバター部品が無い（component-selector の一覧に無い） | ×（答えが無い） |
| ヘッダーを AppHeader ではなく Header＋AppNavi で組む | `[H:components/Header.md]`「独自のヘッダー構成が必要なときのみ Header 単体」＋実物の確認 `[自]` | ○ |
| Slack ログイン失敗を AuthErrorScreen ではなく NotificationBar で知らせる | `[H:feedback.mdx]`。component-selector の推奨（AuthErrorScreen）は採らなかった（§5） | ○ |
| ハドルのチャンネル、削除の権限、先の週の範囲などブリーフの「決まっていないこと」 | すべて `[自]` | ×（業務判断なので当然） |

### 通知の使い分け（ほぼ `feedback.mdx` のとおり）

| 場面 | 使った部品 | feedback.mdx の該当 |
| --- | --- | --- |
| ハドルを始める（デモ） | ボタン直下の ResponseMessage(info) | 「操作部の近くでフィードバックする」 |
| 設定の保存 成功／失敗／未入力 | 保存ボタン直下の ResponseMessage(success/error)＋FormControl の errorMessages | 「同期的な処理が完了したとき」「フォームの送信時に値が不正」 |
| メンバー削除の失敗 | ActionDialog の `responseStatus`(error) | 同上（ActionDialog の場合） |
| メンバー削除の成功 | ヘッダー下の NotificationBar(success, bold) | 「Button の近くに表示するのが難しい場合」 |
| ログイン（デモ）・ログイン失敗 | ヘッダー下の NotificationBar(info / error, bold)＋「もう一度ログインする」 | 「画面全体の切り替えが発生する場合」 |
| 組み合わせの読み込み中 | 本来の場所に Loader（文言つき） | 「ページ・要素の読み込みを開始したとき」 |
| 組み合わせの読み込み失敗 | 本来の場所に NotificationBar(error, bold)＋「再読み込み」 | 「特定の要素の表示に失敗した場合」 |
| 存在しないページ | ErrorScreen | 「ページ全体の表示に失敗した場合」 |

## 4. 画面構成・主役の決め方にハーネスは効いたか

- **効いた点**
  - `pattern-selector.md` は「UI 要件 → 読むファイル」の対応表で、どこを読めばよいかで迷わなかった。
  - `page-layout.mdx` で骨格が決まり、`visual-guidance.mdx` の F 型（重要な情報は上・左）で「主役は最上部」が裏付けられた。
  - `Button.md` の「Primary は 1 画面に 1 つ」が、主役をハドル開始 1 つに絞る決め手になった。ハドルボタンは全ペアに出すので、Primary を自分のペアだけにし、他は Secondary にした。
  - `page-layout.mdx` の「ページが過度に長くなることを避ける → ナビゲーションで分割」で、5 週分を縦に並べず TabBar にした。
- **効かなかった点**
  - パターンは OOUI の「コレクション」「シングル」が前提で、**数十秒で答えだけ見て去る画面**（個人向けのダッシュボード的な画面）の型が無い。組み合わせ画面は「シングル（1 カラム）」を借りたが、何をシングルの対象オブジェクトとみなすかは自分で決めた。
  - 「誰の視点で何を主役にするか」（ログイン中なら自分の相手、未ログインならログインの価値）はブリーフからの判断で、ハーネスからは出てこなかった。
  - `mobile-friendly-layout.mdx` は「従業員向け機能では 1 画面で複数の操作をさせるべきでない」とするが、ペアごとのハドルボタンを全員分並べることとの折り合いは書かれていない（全ペアに導線を置くのはブリーフの要件）。

## 5. ハーネスが答えてくれなかったこと／誤っていた・古かったこと

### 答えてくれなかったこと

| 項目 | 内容 |
| --- | --- |
| アバター（人のアイコン） | smarthr-ui に部品が無く、ガイドにも代替の指示が無い。頭文字＋色の円を自前 CSS で作った |
| 区別用の色（カテゴリ色） | トークンは意味の色（MAIN、DANGER、WARNING など）とグレーだけ。purple は無い。ブリーフの `color`（blue/green/purple/orange）は primitive（`#0077c7`、preset の `green #0f7f85`・`orange #f56121`、AI グラデーションの `#6d00cc`）から借りた |
| 文言（ライティング） | スキルに文言ガイドが無い。表記ルール（スペース、句点、括弧）は textlint と公式サイトの記事で補った |
| SmartHR 以外のブランド | Header／AppHeader のロゴリンクは `target` を指定できない、ErrorScreen 系（NotFound／Auth／Unexpected）は SmartHR のロゴ・文言が固定、AppHeader は「個人設定」が別タブ固定でモバイルのメニューに「アプリ一覧」「リリースノート」「管理メニュー」が出る（実物のソースで確認）。他社サービスでの使い方は書かれていない |
| `EnvironmentProvider` | `useEnvironment` を使えという指示はあるが、Provider が必要なことは書かれていない |
| ペアのような「2 つのオブジェクトの組」の見せ方 | 該当するパターンが無い。リストの各項目に 2 人を並べた |

### 誤っていた・古かった・食い違っていたこと

| 項目 | 内容 | 確認方法 |
| --- | --- | --- |
| ガイドの基準バージョン | ガイドは smarthr-ui v100.1.0 基準、npm の最新は v102.1.0 | `component-selector.md` 冒頭、`npm view smarthr-ui version` |
| `eslint-plugin-smarthr` の `recommended` | 全ルール `'off'` を返す設定で、推奨として機能しない | `node_modules/eslint-plugin-smarthr/index.js` |
| 削除ダイアログの全角スペース | `delete-dialog.mdx` は「？の後に全角スペースを挿入」と指示するが、`eslint-config-smarthr` に含まれる `no-irregular-whitespace` が JSX テキスト中の全角スペースをエラーにする。文字列リテラル（`'…？　…'`）にして両立させた | eslint 実行結果（`harness-logs/10-eslint-before-summary.txt`） |
| `delete-dialog.mdx` の部品 | 本文は「ActionDialog を使って表示します」だが、実装例は `FormDialog`（チェックボックスを含むため）。今回は ActionDialog を使った | 記事の本文と実装例 |
| AuthErrorScreen の推奨 | component-selector は「SSO や OAuth などログイン処理に失敗したときに使います」とするが、実物は文言「認証で問題が発生しました」「SmartHR に戻る」で固定、props は `smarthrUrl` だけで「もう一度ログイン」を置けない。全画面のため未ログインでも見られる組み合わせが隠れる。→ 採らなかった | `node_modules/smarthr-ui/lib/components/ErrorScreen/AuthErrorScreen.{d.ts,js}` |
| Header 上の文字色 | Header の背景（BRAND `#00c4cc`）に白文字だとコントラスト 2.14:1 で WCAG AA 未達。smarthr-ui の AppHeader の UserInfo も `shr-text-white` を使っている。HeaderDropdownMenuButton のトリガー内の名前に `TEXT_BLACK` を明示して回避した | axe（color-contrast）、`AppHeader/components/desktop/UserInfo.js` |
| ResponseMessage の中のリンク | ResponseMessage は LiveRegion で内容を `aria-hidden` の複製と読み上げ用の複製に分けるため、中にリンクを置くと axe の `aria-hidden-focus` 違反になる。リンクを外に出した | axe（S10） |

## 6. AI が自発的にハーネスを使ったか（起動条件は明確だったか）

- **今回は課題の指示に従って使った**。指示が無い場合に自発的に使ったかは確かめられない（推測：設計段階では使わなかった可能性が高い）。理由：
  - スキルの `description` は「Use when writing or reviewing JSX/TSX that imports from smarthr-ui…」「Use when implementing collection (table/list) pages…」で、**実装時**を起動条件にしている。
  - frontmatter の `paths: ["**/*.tsx", "**/*.jsx"]` も tsx を触るまで条件を満たさない。**画面構成を決める段階（tsx がまだ無い）では起動しにくい**。
  - プラグインとして入れられなかったため、そもそもこのセッションではスキルとして一度も起動しなかった（`Unknown skill`）。
- 一方、読み始めてからの**中の導線は明確**だった。SKILL.md が「迷ったらまず selector を読む」「対象が決まったら `components/<Name>.md` を必ず読む」「非推奨なら代替を読む」と手順を決めており、selector の対応表から迷わず該当ファイルに行けた。
- lint は起動条件が明確（実行すれば必ず効く）。実際に、ハーネスを読んでも見落としていた点（Text の過剰使用、PageHeading の重複、href の無いリンク、Stack の `gap={0}`、全角と半角の間のスペース）は lint と textlint で見つかった。**「読む」ハーネスより「検査する」ハーネスの方が確実に効いた**。

## 7. 「SmartHR Design System らしい」設計になったと言える点・言えない点

**言える点**
- ページの骨格（Header＋AppNavi → Container → PageHeading＋リード文 → 見出し＋Panel のセクション）、余白（セクション間 2、見出しとコンテンツ 1、Panel の padding 1.5）。
- 通知の使い分けが `feedback.mdx` どおり（操作部の近く＝ResponseMessage、画面全体＝NotificationBar bold、要素の失敗＝NotificationBar error を本来の場所に）。
- 削除ダイアログの定型（タイトル「メンバーの削除」、本文、DefinitionList の削除対象、注意事項、Danger「削除」）。
- フォームの検証方法と文言、Primary は 1 画面に 1 つ、モバイルではテーブルをリストに。
- 文言の表記（スペースを入れない、ボタンは動詞、見出しは名詞、見出しに「一覧」をつけない）。
- 色はトークンの意味どおり（MAIN＝操作、DANGER＝エラー・削除）、StatusLabel は文字つき。

**言えない点**
- 主役（今週の相手を大きく出すセクション）の作り方は自分の判断。SmartHR のプロダクトに同じ型があるかは分からない。
- 人のアイコンは自前 CSS で、色も意味の無い区別用の色（SmartHR のトークン体系の外）。
- Header は SmartHR ブランド色（BRAND）のまま Gaji-Labo のロゴを載せており、SmartHR 共通ヘッダーの体裁を他社ロゴで使っている。
- ロゴリンクを別タブにするため、描画後に DOM の属性を書き換えている（部品の仕様外）。
- 404 は ErrorScreen を自分で組み立てた（NotFoundErrorScreen は SmartHR のロゴ固定）。

## 付録 A. 部品ごとの [must]／[should]／[avoid] への適合

`components/*.md` の「使い方チェックリスト」から、今回の実装に関係する項目を抜き出した。

| 部品 | 項目 | 適合 | メモ |
| --- | --- | --- | --- |
| Button | [must] Primary は 1 画面に最大 1 つ | ✓ | 組み合わせ（ログイン中）＝ハドル、未ログイン＝ログイン、設定＝保存 |
| Button | [must] form submit は `type="submit"` | ✓ | 保存 |
| Button | [must] ラベルは動詞の終止形・実行内容を示す | ✓ | 「ハドルを始める」「保存」「削除」「再読み込み」 |
| Button | [must] アイコンは左右どちらかのみ | ✓ | lint でも確認 |
| Button | [must] アイコンボタンは `alt` で操作内容 | ✓ | モバイルの削除ボタン |
| Button | [avoid] モバイルでサイズ小 | △ | 通知バーの「再読み込み」「もう一度ログインする」はサイズ小（NotificationBar の subActionArea のため） |
| Button | [should] モバイルではボタンを幅いっぱいに | △ | ハドルは幅いっぱい。設定の「保存」は幅いっぱいにしていない |
| Button | [should] Danger は主に削除ダイアログで | ✓ | |
| Button | [avoid] 明確な必要が無ければアイコンをつけない | ○ | ハドルはアイコン無し。削除・ログインは頻出操作としてつけた |
| PageHeading | [must] 1 画面に 1 度 | ✓ | lint でも確認（未ログイン時の設定画面を別ファイルに分けた） |
| Heading | [must] アウトラインに沿って順に、Section で囲む | ✓ | lint で 2 か所修正 |
| Heading | [must] 画面タイトル・項目名は名詞 | ✓ | |
| Panel | [avoid] Panel の上に InformationPanel を置かない | ✓ | 未ログインの案内はページ背景の上 |
| Container | [should] フォーム中心は `NARROW`、標準は `DEFAULT` | ✓ | |
| InformationPanel | [must] 見出しと内容をセットで | ✓ | |
| NotificationBar | [must] 画面全体ではシステムからの通知に限る | ✓ | |
| NotificationBar | [must] ページ全体の操作へのフィードバックはアニメーション有効 | ✓ | `animate` |
| NotificationBar | [avoid] 時間経過で閉じない | ✓ | 閉じるボタンのみ |
| NotificationBar | [should] 離れている場合は sticky | ✓ | |
| NotificationBar | [should] 単体で置くときは `paneled` | ✓ | 読み込み失敗 |
| ResponseMessage | [must] 直前に操作した要素の近く | ✓ | |
| StatusLabel | [must] 色のみで伝えない／[avoid] 1 オブジェクトに複数 | ✓ | 参加状況だけを StatusLabel、初回設定未完了は文字＋アイコン |
| StatusLabel | [avoid] インスタンスごとに異なる値を埋め込まない | ✓ | 「予定」「CTなし」「参加」「不参加」は固定 |
| ActionDialog | [should] サイズ S（要素が少なく縦並び） | ✓ | |
| ActionDialog | [avoid] 複数のモーダルを重ねない | ✓ | |
| DefinitionList | [must] `maxColumns` で列数を指定 | △ | 「今後の予定」は 4、削除対象は未指定（1 項目） |
| DefinitionList | [must] 見出しレベルに合わせ `blockTitle` | ✓ | 削除対象 |
| FormControl | [must] 入力要素が 1 つの場合のみ／複数は Fieldset | ✓ | 参加は Fieldset |
| FormControl | [must] required＋onInvalid で preventDefault＋errorMessages | ✓ | |
| FormControl | [must] 入力要素にも error 状態 | ✓ | `autoBindErrorInput` の既定で赤枠になることを撮影で確認 |
| FormControl | [must] 入力例は exampleMessage | ✓ | |
| FormControl | [should] 必須ラベル | － | すべて必須で、リード文に「3 つの項目を入力」と書いたため省略（[should] の省略条件に該当） |
| Select | [should] 6 個以上で使う、デフォルトは空 | ✓ | uチャンネル 11 個、空で開始（初回） |
| RadioButton | [must] 1 つをデフォルト値に | ✓ | 「参加する」 |
| RadioButton | [must] Fieldset でグループ化 | ✓ | |
| RadioButton | [should] モバイルでは縦並び | ✗ | 2 択で短いので横並びのまま |
| TabBar | [must] 影響範囲を下線で明確に | ✓ | `bordered` |
| TabBar | [should] 収まらないときは Reel | ✓ | |
| TextLink | [must] リンク先がわかる文言 | ✓ | 「メンバーを見る」「組み合わせを見る」 |
| TextLink | [avoid] ボタンとして使わない | ✓ | |
| Loader | [avoid] 1 秒未満なら使わない | ✓ | 再読み込みは 1.2 秒の想定 |
| Text | [must] 見出しには Heading | ✓ | 「今週、あなたはお休みです」などは見出しではなく状態の文として Text（XL・bold）にした |

## 付録 B. ログ一覧（`harness-logs/`）

| ファイル | 内容 |
| --- | --- |
| `01-install-skills.txt` | clone したコミット、plugin.json、コピーしたスキルのファイル一覧 |
| `02-other-harness-probe.txt` | llms.txt／DESIGN.md／MCP の探索結果（すべて 404・無し） |
| `03-skill-activation-and-reading.md` | スキルの起動の試み（Unknown skill）と、設計前に読んだ文書と要点 |
| `10-eslint-before*.{json,txt}` | eslint-config-smarthr の初回結果（68 エラー・93 警告） |
| `11-eslint-after*.{json,txt}` | 修正後（0 エラー・90 警告） |
| `20-textlint-before.txt`／`21-textlint-after.txt` | textlint の初回（59 件）と修正後（2 件） |
| `30-g1-g2-measure.json` | G1・G2 の位置の計測 |
| `31-interaction-check.txt` | 操作の自動確認 |
| `40-capture-report.json` | capture.mjs の結果（36 枚、axe 違反 0、はみ出し 0） |
| `50-build.txt` | ビルドサイズと依存 |

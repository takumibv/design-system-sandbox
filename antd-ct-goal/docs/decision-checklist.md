# 判断チェックリスト（D01〜D30）：ハーネスあり版

ハーネスなしの対照実験と比べるため、このアプリ（antd-ct-goal）の設計判断を 30 項目に分けて、決めたことと根拠を書きます。コードや画面は変えていません（このファイルを追加しただけです）。

## 凡例

**根拠の種類**
- **ハーネス**：Ant Design のハーネス（CLI・DESIGN.md・spec・whenToUse）の記述
- **ブリーフ**：`brief/README.md` の記述
- **事前知識（DS）**：Ant Design について、もともと知っていたこと（確信度 高／中／低）
- **事前知識（一般）**：デザインシステムに依らない、一般的な UI・アクセシビリティの知識
- **型定義・README**、**検査**（lint・axe の結果を受けて直したもの）、**その他の自分の判断**

**出典の書き方**：パスは `antd-ct-goal/harness-logs/` からの相対パスで、`ファイル名:行番号` の形です。主な出典は次のとおりです。
- `07-design-md-cli.md`：`antd design.md` の出力
- `spec/<名前>.md`：https://ant.design/docs/spec/<名前>.md
- `10-when-to-use.md`：`antd info <部品> --detail` の whenToUse の抜粋
- `11-antd-list.txt`：`antd list` の出力
- `12-deprecated-props.txt`：`antd info` の非推奨 props

**時系列**：作業は次の順で進めました（コミット `09156b0` で確認できます）。
1. ハーネス（SKILL.md、DESIGN.md、llms.txt、spec 29 本、whenToUse 42 種）を読む
2. `docs/design-decisions.md` の下書きを書く
3. 実装する
4. 撮影・axe・lint で検査し、直す

「時期」の列は次のどれかです。
- **読んだ後**：ハーネスを読んでから決めた
- **裏付け**：先に決めて、あとからハーネスを根拠として引いた
- **実装中**：ハーネスを読んだ後、実装中に決めた
- **検査後**：axe や lint の結果を受けて直した
- **不明**：どちらとも言えない

事前知識と一致していて、ハーネスが無くても同じ判断をした可能性が高いものは、その旨を書いています。

## チェックリスト

| # | 項目 | 決めたこと | 根拠 | 根拠の種類 | 時期 |
| --- | --- | --- | --- | --- | --- |
| D01 | 画面の数と分け方 | 3 画面＋404：組み合わせ（`/`）、メンバー（`/members`）、自分の設定（`/settings`。初回は同じフォームを `/setup` で「はじめての設定」として出す）。削除の確認はモーダルで、画面にはしない | ブリーフの機能要件の見出し「組み合わせの表示」「メンバー」「自分の設定（初回設定を含む）」をそのまま画面にした。設定画面を分けない判断は `spec/research-form.md:164`「Template - Settings」と `:183`「Number <7, grouping is not recommended」 | ブリーフ（主）、ハーネス（補） | 読んだ後（画面の分け方はブリーフでほぼ決まっていた） |
| D02 | トップ画面で何を主役にしたか | 「今週のあなたの相手」の 1 枚のカード（相手の名前＋ハドル開始） | ブリーフ「主な利用シーン：月曜の CT 前に『今週の相手は誰か』を確かめ、そのまま相手との通話（Slack ハドル）を始める。滞在は数十秒で終わる。」「ログイン中なら、自分のペア（またはお休みであること）を探さずにわかる。」。後押し：`spec/research-workbench.md:56`「Present the most frequently used content on the first screen whenever possible」、`:31`「provide the shortest navigation paths」 | ブリーフ（主）、ハーネス（補）、その他の自分の判断（1 枚にまとめる構成） | 読んだ後。ただし主役の中身はブリーフから決まり、workbench は「最初の画面に置く」の後押しだけ |
| D03 | 主役の置き場所と強調のしかた | ページ見出しの直下。1440px は 2 列の左上、390px は最上段。Card（既定の枠と白い面）。相手の名前は h2（token で 20px）、アバター 64px（390px では 48px）、開始時刻はカード右上。色による強調はせず、強調は primary ボタンの 1 つだけ | 色を使わない判断：`07-design-md-cli.md:216`「Visual emphasis is reserved for action.」。白い Card を灰色の背景に置く：`07-design-md-cli.md:243`「three-layer model」。大きさ・位置・2 列の配置はハーネスに記述が無い | その他の自分の判断（位置・大きさ・2 列）、ハーネス（色・面）、事前知識（一般）（重要なものを左上に） | 色・面は読んだ後。位置と大きさは実装中の自分の判断 |
| D04 | 主ボタン（primary）の数と、どの操作か | 1 画面に 1 つ。ホーム（ログイン中）は「〇〇さんとハドルを始める」、未ログインは「Slack でログイン」、設定は「保存する／設定を完了する」、失敗時は「もう一度読み込む」、404 は「組み合わせに戻る」。ペア一覧の「ハドル」は text ボタン、ヘッダーのログインは default ボタン | `07-design-md-cli.md:288`「Button (primary) — the single dominant action per screen」、`:306`「Don't stack two primary-colored buttons on the same surface.」、`spec/buttons.md:27`「at most one primary button per a button group」、`spec/buttons.md:31`（text ボタン）「Low emphasis and light-weight button type, such as actions in a table.」 | ハーネス、事前知識（DS）高（primary は 1 つという原則はもともと知っていた） | 読んだ後（事前知識と一致） |
| D05 | 全員のペアの見せ方 | Card「今週の組み合わせ」の中に、1 行 1 ペアの縦の一覧（Flex＋`role="list"`）。各行に 2 人のアバターと名前、右端に text ボタン「ハドル」。お休みの人は一覧の外に Tag「お休み」で出す | 表（Table）にしなかったのは列が 2 人＋操作しかなく、390px で横スクロールを避けたかったため。お休みを一覧から外したのは axe の `aria-required-children`（`role="list"` の中に listitem 以外があった）を受けて | その他の自分の判断、検査（axe `aria-required-children`） | 実装中、検査後 |
| D06 | 自分のペアの強調のしかた | 名前を太字にし、Tag「あなたのペア」（processing 色＋人のアイコン＋文字）を付ける。順番は社員番号順のままで、先頭に動かさない。強調の主役はヒーローカード側に任せる | ブリーフ「並び順は社員番号順」「参加と不参加は色だけに頼らず区別できる」（自分の強調にも同じ考えを適用）。Tag を目印に使う：`10-when-to-use.md:98`（Tag「It can be used to tag by dimension or property.」） | ブリーフ、ハーネス（補）、事前知識（一般）（色だけに頼らない） | 実装中 |
| D07 | 先の週の見せ方と範囲 | 別の Card「これからの予定」に、週ごとに Collapse の 1 行。1440px は右列、390px は 3 枚目。見出しの行に日付、Tag、「あなた：〇〇さん」を出し、全ペアは開いたときだけ見せる。範囲は固定データの全 4 週（今週を除く） | `10-when-to-use.md:261`（Collapse「Can be used to group or hide complex regions to keep the page clean.」）、`spec/stay.md`（ページ遷移を減らす）。範囲は自分の判断 | ハーネス（開閉）、その他の自分の判断（右列・範囲・見出し行の要約） | 読んだ後（下書きで決めた） |
| D08 | 「先の週は予定」の伝え方 | 各週に Tag「予定」（blue）＋カード上部の注記「先の週は予定です。参加する人が増えたり減ったりすると、その週以降の組み合わせは組み直しになります。」 | ブリーフ「先の週は『予定』であることが伝わる。」「参加者が増減すると、その週以降の組み合わせは組み直しになる。」 | ブリーフ、その他の自分の判断（Tag＋注記の組み合わせ） | 実装中 |
| D09 | お休み・祝日・参加者 2 人未満の週の伝え方 | 主役カードの同じ場所に、見出しで状態（「今週はお休みです」「今週は CT がありません」「今週の相手はいません」）、理由の一文、次の予定（日付と相手）を出す。祝日は祝日名の Tag。全ペアの欄は Empty で「〇〇の日のため、今週のペアはありません」、または 2 人未満の理由と「メンバーの参加状況を見る」 | ブリーフ「祝日の週は『CT なし』であることと祝日名を示し、ペアは出さない。」。Empty に理由と次の行動を付ける：`spec/research-empty.md:23`「Inform users of the specific reason for the empty state」、`:30`「Provide help text, suggested actions」 | ブリーフ、ハーネス（Empty の中身）、その他の自分の判断（主役カードの同じ場所に出す） | 読んだ後 |
| D10 | ハドルの導線 | 主役カードの primary ボタン「〇〇さんとハドルを始める」（電話のアイコン、390px では横幅いっぱい）。その上に「ハドルの場所：#u-kenta（2 人で共通）」。場所は**ペアのうち社員番号が大きい方の uチャンネル**。どちらかが未設定ならボタンを出さず、warning の Alert で理由と代わりの手段を出す。ペア一覧の各行にも text ボタン「ハドル」 | ブリーフ「ペアごとに、相手の uチャンネルでハドルを始める導線を置く。uチャンネル未設定の人とのペアでは出さない」。文言：`spec/buttons.md:194`「Should use verb」。どちらのチャンネルかはブリーフで未決 → 自分の判断（2 人が別々の場所で待つのを防ぐため、場所を 1 つに固定。id=1 から見て「相手の」になる方を選んだ） | ブリーフ、ハーネス（文言）、その他の自分の判断（チャンネルの決め方、未設定時の Alert） | 読んだ後（下書きで決めた） |
| D11 | 人の表示で使った部品 | Avatar（頭文字 1 文字）。fixtures の `color` を antd のプリセット色として使い、背景は 1 段目、文字は 8 段目（例 `token.green1` / `token.green8`）を `style` で渡す。画像があれば `src` | プリセット色を分類表示に使う：`07-design-md-cli.md:229`「The preset colors … are reserved for tags, charts, and categorical visualization」。`style` で背景色を渡すのは `antd demo Listy rich` の出力と同じ書き方（保存はしていない。要点は harness-report.md）。8 段目の文字にしたのは、白文字では対比が足りない色があるため | ハーネス、事前知識（一般）（文字と背景の対比 4.5:1）、型定義（`ColorPalettes` 型で `green8` などの token 名を確認） | 実装中 |
| D12 | ナビゲーションの部品 | 横並びの Menu（組み合わせ／メンバー／ログイン中のみ自分の設定）。選択中の項目で今いる画面を示す。390px ではヘッダーを 2 段（ロゴとログイン状態／Menu）にして、Menu が「…」に畳まれないようにした。ログイン中の人は Dropdown（自分の設定・ログアウト）。Breadcrumb は使わない | `spec/navigation.md:27`「Top navigation menu … suitable for landing pages and consumer facing web apps. The number of first level menu items should be between 2 and 7」。390px の 2 段化は事前知識（横並び Menu が狭い幅で畳まれる）からの判断で、ハーネスに記述は無い | ハーネス、事前知識（DS）中（Menu の畳み込み）、その他の自分の判断 | 読んだ後（Menu）、実装中（2 段化） |
| D13 | メンバー一覧の部品と 390px での扱い | Listy（List は非推奨）。1 行に「アバター／名前・社員番号・uチャンネル・状態の Tag（縦に積む）／右端に操作ボタン」。390px でも同じ構成で、左側の文字が折り返し、ボタンは右端に残る。表（Table）は使わない | `11-antd-list.txt` と `10-when-to-use.md:36`「List component has been deprecated. … Please use Listy instead.」。ただし Listy の whenToUse は長いリストの仮想化向けで、11 人の一覧への推奨は明示されていない。Table を避けたのは 390px で横スクロールさせないため | ハーネス、検査（`antd lint` は List を deprecated として検出する。`14-antd-lint-probe.txt`）、その他の自分の判断（Table を避ける） | 読んだ後（List の非推奨は `antd list` で初めて知った。事前知識では List を使うつもりだった） |
| D14 | 参加／不参加・初回設定未完了の表示部品 | Tag。参加＝success 色＋チェックのアイコン＋「参加」、不参加＝既定の灰色＋マイナスのアイコン＋「不参加」、初回設定未完了＝warning 色＋！のアイコン＋「初回設定が未完了」。人数は Statistic（参加・不参加・初回設定未完了） | ブリーフ「参加と不参加は色だけに頼らず区別できる。」。`07-design-md-cli.md:297`「Tag — small categorical label. … Never use a tag for a critical state — use Alert or Badge.」（参加状態は重大な状態ではないと判断）。状態色は axe の結果を受けて token を濃くした（D27） | ブリーフ、ハーネス、検査（axe `color-contrast`：success の Tag 文字が 2.2:1） | 読んだ後、検査後 |
| D15 | 削除の確認の部品・文言・ボタン・初期フォーカス | Modal。タイトル「〇〇さんをメンバーから削除しますか？」。本文に、相手のアバターと状態、「削除すると元に戻せません。メンバー一覧から消え、組み合わせにも入らなくなります。」（参加中なら「今週以降の組み合わせが組み直しになります」）、休職者は本人が「参加しない」にできる旨。ボタンは「キャンセル」（default）と「削除する」（primary＋danger）。**初期フォーカスは指定していない**（antd の既定のまま。S13 の撮影では右上の閉じる（×）ボタンにフォーカス枠が見える）。開いている間は背面に `inert` を付ける | Popconfirm ではなく Modal：`10-when-to-use.md:133`（Popconfirm「A simple and compact dialog」）と比べて、説明が 1 行に収まらないため。文言：`spec/buttons.md:203`「If primary action means negative, stress the consequences.」。ブリーフ「取り消せない操作として、誰を削除するかを確認してから実行し」。`inert` は axe の `color-contrast`（モーダルの背面の文字が違反になった）を受けて追加 | ハーネス、ブリーフ、事前知識（一般）（WAI-ARIA のモーダルの作法）、検査（axe） | 読んだ後（Modal）、検査後（`inert`）。初期フォーカスは検討していない |
| D16 | 削除の成功・失敗の伝え方 | 成功＝message（上中央、自動で消える）「〇〇さんを削除しました」。失敗＝Modal の中の上部に error の Alert「削除できませんでした」＋理由、ボタンを「もう一度削除する」に変える | `spec/feedback.md:124`（Message は「lightweight reminder」）、`:133`「for more important failure notifications, it is recommended to use a dialog box」。モーダルの中に出すのは `spec/stay.md`（文脈から出さない）と自分の判断 | ハーネス、その他の自分の判断（モーダル内に置く） | 読んだ後 |
| D17 | 参加の切り替えの入力部品と理由 | Radio.Group（「参加する」「参加しない（休職・繁忙期など）」）。Switch・Checkbox は使わない | `10-when-to-use.md:168`（Switch「will trigger a state change directly when you toggle it」）→ 保存してから反映するフォームには合わない。`:173`（Radio「visible to the user and can facilitate the comparison of choice」）→ 選択肢の意味を言葉で並べられる | ハーネス | 読んだ後（下書きで決めた） |
| D18 | 参加を変えたときの影響の伝え方 | 選択を変えた直後、保存する前に、選択肢のすぐ下に warning の Alert（「保存すると、組み合わせから外れます／戻ります」「今週以降の組み合わせが全員分組み直しになり、他の人の相手も変わります」「Slack に投稿済みの今週のペアとずれることがある…」）。保存後はホームの主役カードが「CT に参加していないため、今週の相手はいません」に変わる | ブリーフ「参加をやめる／戻ると全員の組み合わせが変わることが伝わる。」「毎週月曜 11:00 に、その週のペアが Slack チャンネルへ自動投稿される」。保存前に出す形はハーネスに直接の記述が無い（`spec/research-form.md` の原則 Security を拡大解釈） | ブリーフ、その他の自分の判断 | 読んだ後（下書き）。主役カードの「参加していない」表示は実装中に追加 |
| D19 | 初回設定の流れ | 専用の画面「はじめての設定」（`/setup`）。中身は自分の設定と同じフォームで、目的の一文と各項目の用途を添える。**自動で移す仕組みは無い**。初回設定が済んでいない人には、ホームの主役カードに warning の Alert「はじめての設定が済んでいません」＋「設定する」を出し、ヘッダーの「自分の設定」も同じフォームになる。完了したら組み合わせの画面へ戻す。Steps は使わない | ブリーフ「初回ログインした人には、必須項目が埋まるまで入力を求める。」。Steps を使わない：`spec/navigation.md:104`「Used for more than 2 but less than 5 steps.」（今回は 1 画面で終わる）。新規ユーザー向けの案内：`spec/research-workbench.md`「Template - New User Guide」 | ブリーフ、ハーネス、その他の自分の判断（自動で移さない） | 読んだ後 |
| D20 | フォームの必須表示とエラーの出し方 | ラベルの後ろに赤い文字「必須」（`requiredMark` を関数で指定。既定の「*」は使わない）。各項目の下に「何に使うか」の補足（`extra`）。エラーは項目の直下に「社員番号を入力してください」の形で、送信したときに出す（`scrollToFirstError`）。入力欄の中の例示（placeholder）は使わない | `spec/feedback.md:102`「The feedback text is followed by the block to be explained … and does not disappear automatically」。`spec/research-form.md:68`「Avoid filling hints with redundant correct statements」。「必須」を文字にしたのは日本語のフォームの慣習（ハーネスに記述は無い）。placeholder を外したのは axe の `color-contrast`（Select の placeholder が 1.83:1） | ハーネス、事前知識（一般）（日本語の「必須」）、検査（axe） | 読んだ後（エラーの位置）、実装中（「必須」）、検査後（placeholder） |
| D21 | 保存の成功・失敗の伝え方 | 成功＝message「設定を保存しました」（初回は「設定が完了しました。組み合わせの画面に戻ります」）。失敗＝フォームの上に消えない error の Alert「設定を保存できませんでした」「入力した内容はそのまま残っています。…もう一度『保存する』を押してください。」 | `spec/feedback.md:124`、`:133`、`spec/research-message-and-feedback.md:92`（Alert「Inform users of critical errors that require immediate attention.」）。ブリーフ「保存の成否を伝える。」 | ハーネス、ブリーフ | 読んだ後（下書き） |
| D22 | 読み込み中の表示 | カードの枠と見出しを先に出し、中身を Skeleton にする。上に「組み合わせを読み込んでいます」の一文（`role="status"`）。メンバー画面は Card の `loading`。取り消しの手段と時間の目安は無い | `spec/research-exception.md:125`「Loading State: Use Spin or Skeleton」、`10-when-to-use.md:122`（Skeleton「When the component contains lots of information, such as List or Card.」）。`spec/feedback.md:92`「If the loading time is long, a cancel operation should be provided.」は満たしていない | ハーネス、事前知識（一般）（`role="status"`） | 読んだ後 |
| D23 | 読み込み失敗・ログイン失敗の表示とやり直す手段 | 読み込み失敗＝Card の中に Result（error）「組み合わせを読み込めませんでした」＋原因の候補＋primary「もう一度読み込む」。ログイン失敗＝ページ上部に error の Alert「Slack でログインできませんでした」＋原因の候補＋「もう一度ログイン」 | `spec/research-exception.md:115`「Displayed when a page fails to load content … generally combined with retry options.」、`spec/research-message-and-feedback.md:92`（Alert）。ブリーフ「S07 読み込み失敗（やり直す手段つき）」「S08 Slack ログインに失敗（やり直す手段つき）」 | ハーネス、ブリーフ | 読んだ後 |
| D24 | メンバー 0 人の表示 | 人数（0／0／0）の下の一覧の Card に Empty「まだ誰もログインしていません」「Slack でログインした人が、ここに表示されます。最初の 1 人になってください。」＋primary「Slack でログイン」 | `spec/research-empty.md:23`（理由）、`:30`（次の行動）、`10-when-to-use.md:117`（Empty「User tutorial to create something in fresh new situation.」） | ハーネス | 読んだ後 |
| D25 | 404 の表示 | Card の中に Result（404 の図）、見出し「ページが見つかりません」（h1）、「URL が間違っているか、ページが移動した可能性があります。…」、primary「組み合わせに戻る」 | `spec/research-exception.md:53`「Template - 404」（When the page … the user requested is not found）。ブリーフ「S18 存在しないページ（戻る手段つき）」 | ハーネス、ブリーフ | 読んだ後 |
| D26 | 未ログインの人に「ログインすると何ができるか」を伝える方法 | 主役カードの中身を差し替える：「Slack でログインすると、今週の相手がここに表示され、そのままハドルを始められます。参加をやめる・戻るといった自分の設定も変えられます。」＋primary「Slack でログイン」＋「ログインしなくても、下の組み合わせとメンバーは見られます」。メンバー画面は info の Alert「ログインすると、自分の参加状況を変えたり、退職した人を外したりできます」。設定画面は Result（info）。ヘッダーにも default の「Slack でログイン」 | ブリーフ「ログインしていない人に、ログインすると何ができるかが伝わる。」「ログインしていなくても、組み合わせとメンバーは見られる。」。`spec/invitation.md:18`「Static Invitations」、`:36`「Call to Action Invitations」。主役カードの場所を使う判断は自分 | ブリーフ、ハーネス（補）、その他の自分の判断 | 読んだ後 |
| D27 | 色の使い方 | primary＝blue-7（#0958D9。既定の #1677FF から下げた）。状態色＝success は green-8、warning は gold-9、error は red-7（いずれも既定から下げた。背景と枠の token は既定の淡色のまま固定）。`Typography type="secondary"` の色を 0.45 → 0.65 の段に。自分の強調＝processing の Tag（淡い青）と太字。予定＝blue の Tag。不参加・CT なし・お休み＝既定の灰色の Tag。人の見分け＝プリセット色。すべて `ConfigProvider` の `theme.token` で指定し、16 進数は書かない | primary：`07-design-md-cli.md:225`「Accessibility note: … white text on #1677FF … are below WCAG AA's 4.5:1 … darken colorPrimary through ConfigProvider」。状態色と secondary：**検査**（1 回目の axe で `color-contrast` 375 ノード。secondary 文字 3.36:1、success の Tag 2.2:1、Select の placeholder 1.83:1、`docs/capture-report-round1.json`）。直し方は `07-design-md-cli.md` の Don't「mint accent colors outside the preset palette」に従い、プリセットの段から選んだ。背景の固定は Tag の実装（`node_modules/antd/es/tag/style/statusCmp.js`）を読んで判断 | ハーネス（primary）、検査（状態色・secondary）、型定義・実装（Tag のスタイル） | primary は読んだ後（下書きで決めた）。それ以外は検査後 |
| D28 | 文言の調子 | 説明文は「です・ます」。ボタンは「〜する」「〜を始める」「もう一度〜」の動詞の形（既定の OK は使わない）。見出し・ラベル・補足は句点なしで、2 文以上の説明だけ句点を付ける。感嘆符は使わない。人は「〇〇さん」。エラーは「何が起きたか」＋「次に何をするか」の 2 文で、責めない | `spec/buttons.md:194`「Should use verb」、`spec/copywriting.md:10`「Consider from the user's point of view」、`:51`「Express consistently」、`:66`「Place important information in a prominent position」、`:126`「Be friendly and respectful」、`:184`「Omit unnecessary punctuation」、`:206`「Use exclamation marks with caution」。敬体と「さん」は日本語の慣習で、ハーネスに記述は無い | ハーネス、事前知識（一般）（日本語の敬体・敬称） | 読んだ後（句読点の扱いは spec を読んで決めた。敬体は事前知識） |
| D29 | 削除の権限 | ログイン中の全員が削除できる。ただし自分自身は削除できない（自分の行には「設定を変える」だけ）。未ログインの人には削除ボタンを出さない | ブリーフ「ログイン中の人はメンバーを削除できる（退職者など）。」「決まっていないこと：メンバー削除をログイン中の全員に許すか。」→ 全員に許し、自分を消すとログイン中の本人が宙に浮くため、自分だけ除外 | ブリーフ、その他の自分の判断 | 読んだ後（ハーネスとは無関係） |
| D30 | 先の週の範囲、特定の人と次に当たる日、参加者数の数え方 | 範囲：固定データの全 5 週（今週＋4 週）。特定の人と次に当たる日：入れない（各週の「あなた：〇〇さん」で代替）。参加者数：参加している人だけを数える（ホームの「参加者 9 人」）。メンバー画面では参加・不参加・初回設定未完了を別々に出す | ブリーフの「決まっていないこと」の各項目。いずれも、主目的（今週の相手）から外れる機能を増やさない、組み合わせに関係するのは参加者だけ、という自分の判断。ハーネスで関係しそうなのは `07-design-md-cli.md:216`「Decoration that does not communicate is removed.」程度で、根拠としては弱い | その他の自分の判断、ブリーフ | 読んだ後（ハーネスとは無関係） |

## 集計（主な根拠の種類で数えた場合）

各項目の「主な根拠」（表の根拠の種類の最初に挙げたもの）で数えると、次のとおりです。

| 主な根拠 | 項目 |
| --- | --- |
| ハーネス | D04, D07, D11, D12, D13, D15, D16, D17, D20, D21, D22, D23, D24, D25, D27, D28（16 項目） |
| ブリーフ | D01, D02, D06, D08, D09, D10, D14, D18, D19, D26, D29（11 項目） |
| 自分の判断（一般的な知識・検査を含む） | D03, D05, D30（3 項目） |

**読み取れること**
- ハーネスが主な根拠になったのは、部品の選び方、通知の使い分け、primary の数、文言の規則、色の直し方です。
- 「何を主役にし、どこに、どう置くか」（D02・D03）は、ブリーフと自分の判断で決まりました。
- 次の 3 項目は、ハーネスを読んでも足りず、**検査（axe）で初めて直しました**。
  - D14：状態の Tag の文字色
  - D15：モーダルの背面の `inert`
  - D27：状態色と secondary の文字色
- **D04 と D17 は、ハーネスが無くても同じ判断をした可能性が高い**と考えます（primary を 1 つにすることと、Switch と Radio の使い分けは、もともと知っていました）。
- ハーネスで判断が変わったことが確かなのは、D13（List が非推奨だと知って Listy にした）です。
- D22 の Skeleton は事前知識でも選んだと考えます。ハーネスで加わったのは、「長いときは取り消しを」という基準を知り、満たしていないことを評価に書いた点です。

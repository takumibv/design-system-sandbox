# Primer 版のデザイン判断

原本（DADS 版）の判断は [digital-go-design-system `docs/design-decisions.md`](https://github.com/takumibv/digital-go-design-system/blob/codex/ct-schedule-ui/docs/design-decisions.md) にあります。ADS 版の判断は [`ads-ct-schedule/docs/design-decisions.md`](../../ads-ct-schedule/docs/design-decisions.md) です。ここでは Primer で作り直したときに、何を引き継ぎ、何を変えたか、その理由を記録します。判断の出典（Primer のハーネスか、事前知識か）は [harness-report.md](harness-report.md) の表にまとめています。

> 注：今回のセッションでは原本リポジトリを clone できませんでした（後述）。原本の文言と画面は、ADS 版に残っている原本のスクリーンショット（同じ Story・同じ幅）と、ADS 版のコード・固定データから確認しています。

## 基本方針

ADS 版と同じ 2 つを守りました。

1. **中身は原本と同じにする。** 画面構成、読む順序、16 状態、文言、固定データ（`fixtures.ts`）は変えていません。
2. **見た目は Primer の標準に任せる。** 色・余白・文字・角丸はすべて `@primer/primitives` のトークンで指定しました。

ADS 版との違いは「自前の CSS が 0 行ではない」ことです。Primer の MCP（`primer_coding_guidelines`）は、**「sx prop や Box でスタイルを付けず、CSS Modules を使え」**と明示しています。Primer の部品には ADS の `xcss` のような「トークンだけを受け付けるスタイル指定」がないので、部品で表せないレイアウトは CSS Modules に書くのが Primer の流儀です。そこで `src/CTApp.module.css`（256 行・38 ルール）に、**トークンだけを使い、公式 stylelint と MCP の `lint_css` を通す**という条件で書きました。

## 利用者と主役

原本・ADS 版と同じく、主な利用者は「月曜の CT 直前に相手を確認するメンバー」です。

- **「今週のあなたの CT」を主役にした。** 原本の「濃い青の上ボーダー＋薄い青の面」は、Primer では `borderColor-accent-emphasis`（太さ `borderWidth-thicker`）と `bgColor-accent-muted` でそのまま表せました。ADS ではこの太線を表すトークンがなく、面だけで代用していた部分です。
- 2 人のイニシャルを大きく（80px）並べ、その下にハドルを始めるボタンを置きました。「誰と」→「どこで」の順に目が動きます。
- **画面内の主ボタン（primary）は 1 つだけ**にしました。「Slack でハドルを始める」です。一覧の「ハドルを始める」は default にしています。Primer の Button の指針「primary は 1 ページに 1 つ」に従いました。
- Primer の primary ボタンは**緑**です（色の役割の表で `success` が「Primary buttons」に割り当てられている）。原本の濃い青のボタンとは印象が大きく変わりますが、Primer の標準なので変えていません。

## 画面ごとの判断

### CT組み合わせ表

- **レイアウト**：`PageLayout` の Content＋Pane（右・medium 幅）。狭い画面では Pane が本文の後ろに回り、原本と同じ順で縦に並びます。ページの見出しとリード文、通知は `PageLayout.Header` に置き、本文と補足欄の両方の上にかかるようにしました（原本と同じ）。
- **週の移動**：`IconButton`（前の週／次の週、aria-label 付き）と「今週」ボタン。今週を表示中は前と今週を押せなくしています。Primer は「disabled は避け、必要なら inactive を」と勧めていますが、inactive は押されたときに理由を説明する Dialog を出すことまで求めています。ここでは原本・ADS 版と揃えて disabled のままにしました（妥協点）。
- **みんなの組み合わせ**：1 ペア 1 行。自分のペアの行だけ `bgColor-accent-muted` と左の太線で示し、「あなた」は `Label variant="accent"` の文字でも示します（色だけに頼らない）。
- **この先の CT**：原本は 3 枚のカードを横に並べていました。Primer 版は ADS 版と同じく縦の一覧にし、`ActionList`（`variant="full"`、区切り線付き）で行全体を押せるようにしました。祝日の週は説明文「祝日のためお休み」と、右に `Label variant="attention"`「お休み」を出します。
- **補足欄**：「CT に参加する人」は枠付きの面＋大きな数字。「メンバー一覧を見る」「自分の参加設定を変更する」は**画面遷移なので `Link`** にしました（Primer の Link の指針「リンクは移動、操作にはボタン」）。ADS 版はボタンにしていた箇所です。
- **祝日・人数不足**：`Blankslate`（枠付き）にアイコン・見出し・説明・主操作を入れました。祝日の週は `Label variant="attention"`「祝日」を付けています。
- **未ログイン**：原本は青い面の案内でした。Primer では Banner が候補ですが、「1 ページに Banner は 1 つまで」という指針があり、ログイン失敗の状態では失敗の Banner と重なります。そのため Banner にせず、`bgColor-accent-muted` の面＋見出し＋ボタンで作りました。

### メンバー一覧

- 上部に「参加する／参加しない」の人数と説明をまとめました（原本と同じ、青い面＋上の太線）。
- 一覧は `DataTable`（experimental）。列は社員番号・メンバー・参加状況・操作。参加状況は `Label`（success／secondary）で示します。
- **390px で「操作」列が見えなくなる問題**がありました。表が画面幅に押し込まれ、右端の列が切れていました（ページ全体の横はみ出しは 0 なので、自動検査では見つかりません）。表に最小幅（`--breakpoint-small`）を付け、`ScrollableRegion`（キーボードでもスクロールできる領域）に入れて横スクロールさせました。原本のようなカード型への切り替えは、Primer の DataTable にはありません。
- 「設定」は画面遷移なので `Link`、「削除」は操作なので小さな `Button variant="invisible"` にしました。削除ボタンには「{名前}を削除」という aria-label を付けています。
- **削除の確認は `ConfirmationDialog`** にしました。Primer の Delete パターンが「ほとんどの削除確認は ConfirmationDialog」と指定しているためです。
  - 実行ボタンは `confirmButtonType="danger"` で「削除する」（「はい」「OK」にしない）。
  - **danger のときは最初のフォーカスが自動で「キャンセル」に置かれます**（ConfirmationDialog のアクセシビリティ指針に明記。画面でも確認した）。ADS 版では自分で `autoFocus` を付けて安全側に倒しましたが、Primer では部品の標準動作でした。
  - **削除に失敗したら、ダイアログを閉じずに中に critical の Banner を出す**（Delete パターンの指示どおり）。
  - **削除に成功しても、見える通知は出しません**。行が消えることで結果は分かる、というのが Delete パターンと通知パターンの考え方です。代わりにライブリージョン（`AriaStatus`）で「加藤 大輔を削除しました。…」と読み上げ、削除ボタンが消えてフォーカスの行き先がなくなるので、一覧の見出しにフォーカスを移します。原本・ADS 版は成功の通知を出していたので、ここは意図的に変えた点です。

### 自分の設定・初回設定

- 各項目は `FormControl`（Label → 入力 → Caption／Validation）。`required` を付けると、ラベルに「*」が付き、入力欄にも required が設定されます（Forms パターン「見た目とコードの両方で必須を示す」）。原本は「必須」という文字のラベルでした。
- **誤りがあるときは Caption を隠して Validation だけを出す**（Forms パターン「Caption の内容を誤りのメッセージで繰り返さない。誤りのときは Caption を消す」）。ADS 版は補足文とエラー文を切り替えていたので、結果は同じ形です。
- 上部の critical Banner に「入力内容を確認してください」をまとめ、各項目にも個別のメッセージを出します。送信に失敗したら、**最初の誤った入力欄にフォーカスを移します**（Forms パターン「要約に操作できる要素がないなら最初の不正な入力欄、ライブリージョンは使わない」）。原本は要約にフォーカスしていました。
- uチャンネルは Primer の `Select`（ネイティブの `<select>`）。ADS 版の react-select 系と違い、OS 標準の選択になります。
- 「CTへの参加」は `CheckboxGroup` で見出しと説明をまとめました。Forms パターンの「単独のチェックボックスは必須にできず、個別の検証メッセージも持たない」に従っています。
- **ボタンの並びは「キャンセル → 変更を保存する」**にしました。Button の指針「primary はボタン群の末尾」と、Saving パターン「保存は primary、キャンセルは secondary」に従っています。DADS の「進む操作は右、戻る・キャンセルは左」とも一致します。保存ボタンは、入力が不正でも無効にしません（Saving パターン）。
- フォームの幅は `PageLayout.Content width="medium"`（768px まで）に絞りました。最初は全幅で、入力欄が 1,000px 以上に伸びていました。

## 通知の使い分け

ADS 版は「続く状態は SectionMessage、一時的な結果は Flag（トースト）」と分けました。**Primer にはトーストの部品がなく、通知パターンもトーストを勧めていません。** Banner と InlineMessage、Dialog の中の Banner で表します。結果として、原本（すべて画面内の Notice）に近い形に戻りました。

| 種類 | Primer 版の部品 | 例 | 根拠（Notification message／Delete／Forms パターン） |
| --- | --- | --- | --- |
| 保存の成功（別の画面に移る） | ページ上部の success Banner（閉じられる） | 設定を保存しました。 | 「保存で別画面に移り、成功が見た目で分からないなら Banner」 |
| 削除の成功（その場で行が消える） | 見える通知なし＋ライブリージョン | 加藤 大輔を削除しました。 | 「消えたこと自体が合図。必ずスクリーンリーダーに伝える」 |
| 削除の失敗 | ダイアログ内の critical Banner | 削除に失敗しました。… | 「ダイアログを閉じずに中で伝える」 |
| 入力エラー | フォーム上部の critical Banner＋各項目の Validation | 入力内容を確認してください | Forms パターン |
| 保存・ログインの失敗 | critical Banner（ログイン失敗は閉じられない） | Slack にログインできませんでした。 | Banner の指針「解決が必要な critical は閉じられない」 |
| 不参加中の案内 | info Banner＋操作 1 つ | 現在、CTには参加していません。 | 「Awareness は info の Banner」 |
| デモの操作結果（ハドル、ログイン） | ページ上部の info Banner（閉じられる） | u-kenta でハドルを開始するデモです。… | 「Banner は 1 ページに 1 つ」なので、上部の 1 枠を入れ替える |

## 色の意味

Primer の「色の役割」（`get_color_usage`）と、トークンの Logic Matrix（`get_design_token_specs`：muted の面には同じ役割の前景色）に合わせました。

| 役割 | 使った場所 | 意味 |
| --- | --- | --- |
| accent（青） | 今週のラベル、あなた、主役の面、自分のペアの行、リンク | 選択中・現在・自分 |
| success（緑） | 参加する、primary ボタン | 良い状態。Primer では主ボタンの色でもある |
| attention（黄） | 祝日、お休み、初回設定が未完了 | 注意してほしいこと |
| secondary（灰） | 来週・予定、参加しない、今週のお休み | 中立 |
| danger（赤） | エラーの Banner、削除の実行ボタン | 失敗・破壊的な操作 |
| accent／success／done／severe の muted | イニシャルのアバター（原本の blue／green／purple／orange に対応） | 人を見分けるためだけの色。意味は持たせない |

## 自前で書いた CSS（`CTApp.module.css`）

| 書いたもの | 理由 |
| --- | --- |
| イニシャルのアバター | Primer の `Avatar` は画像（`src`）専用で、イニシャルを出せない。原本の「色付きイニシャルで人を見分ける」を残すため |
| 主役の面、未ログインの案内、人数まとめ、自分のペアの行 | 「面＋太線」を表す部品がない（Card は experimental で、太線の指定はない） |
| みんなの組み合わせの行（grid） | 「人 × 人 ＋ 右端のボタン」を 1 行に揃える部品がない |
| ヘッダー・フッターの内側の幅 | `PageLayout` の外にあるヘッダー・フッターを、本文と同じ幅・余白に揃えるため |
| スキップリンク | Primer に単体の部品がない（z-index には `--zIndex-skipLink` というトークンがある） |
| 文字色の補助（muted／accent） | `Text` に色を指定する prop がない |
| `p` の余白を 0 にするクラス | `BaseStyles` は `p` の margin をリセットしないため、Stack の gap と二重になった |
| 表の最小幅 | 390px で列が切れるのを防ぐ |

すべて Primer のトークンだけで書いています。メディアクエリの幅だけは、トークン（`--breakpoint-*`）を `@media` に書けないため、同じ値（48rem、63.25rem）を直接書きました。Primer は `@custom-media --viewportRange-*` を用意していますが、使うには PostCSS のプラグインが要ります。

## アクセシビリティ

- 「本文へ移動」のスキップリンクを置き、キーボードでフォーカスしたときだけ表示します。
- 見出しは h1 → h2 → h3 → h4 の順。`Heading` の `as`（レベル）と `variant`（大きさ）を分けて指定しました（タイポグラフィの指針「見た目のために見出しの順序を変えない」）。
- 読み込み中の見出しは `AriaStatus` に入れて読み上げます。
- アイコンだけのボタンには aria-label を付けました。Primer の `IconButton` は、aria-label をツールチップとしても表示します。
- axe（WCAG 2.1 AA）の検査は、16 状態 × 2 幅（32 ケース）すべてで違反 0 件、横はみ出し 0 でした。

## 再現できなかったこと（妥協点）

| 原本の意図 | Primer 版でどうなったか | 理由 |
| --- | --- | --- |
| 色付きのイニシャルで人を見分ける | 自作の小さな部品で再現した（ADS 版ではできなかった） | Avatar が画像専用のため。CSS は自前 |
| 濃い青の主ボタン | 緑の primary ボタン | Primer の primary は緑と決まっている |
| 「この先の CT」を横並びのカードで | 縦の ActionList | 行単位の一覧が Primer の基本で、モバイルでも同じ形で使える（ADS 版と同じ判断） |
| 参加者のアバターを重ねて見せる（補足欄） | 省略 | `AvatarStack` も画像専用 |
| Noto Sans JP で統一 | 和文は OS 標準のフォント | Primer の書体指定は Mona Sans とシステムフォントで、和文フォントを含まない |
| 削除の成功を通知で見せる | 読み上げだけにした | Primer の Delete パターンに従った |
| モバイルでメンバー表をカード型に | 横スクロールの表 | DataTable に狭い画面用の表示がない |
| 今週表示中に「前の週」を押せなくする | disabled のまま | Primer は disabled を避けるよう勧めるが、inactive にするには説明の Dialog まで要る |

## まとめ

**「何を主役にし、どの順に読ませるか」は Primer でも実現できました。** さらに、太い上ボーダーや色付きのイニシャルのように、ADS 版ではトークンや部品の制約で落ちた表現も、Primer では CSS Modules＋トークンで取り戻せました。一方で、主ボタンが緑になる、文字の印象が GitHub らしくなる、といった「Primer らしさ」は残ります。Primer 版は「GitHub の中のツール」に見えます。

# 設計判断（ハーネスなし版）

この文書は**画面構成を決める前に書いた下書き**を元にしています。実装後に変わった点は末尾の「実装後の追記」にまとめました（下書き部分は書き換えていません）。

## 前提（この版の条件）

- 使った材料：`brief/`、npm の `smarthr-ui@102.1.0` の型定義（`lib/**/*.d.ts`）と同梱 `README.md`、自分の事前知識。
- 使っていない材料：SmartHR Design System の公式サイト・ガイドライン、AI 向けハーネス（プラグイン・スキル・llms.txt）、公式 lint（事後計測を除く）。パッケージ同梱の `metadata.json` は「型定義・README」の範囲外のため開いていない。
- 型定義から分かったこと（抜粋）：Avatar 部品は無い。`Header`（`logo` を渡せる）、`AppNavi`/`AppNaviAnchor`（`current` で現在地）、`PageHeading`/`Heading`、`Base`/`Panel`、`Stack`/`Cluster`/`Container`、`StatusLabel`（grey/blue/green/red/warning/error）、`InformationPanel`、`NotificationBar`（`role`、`type`）、`ResponseMessage`、`ControlledActionDialog`（`actionButton.theme: 'danger'`、`responseStatus`、`firstFocusTarget`）、`FormControl`（`statusLabels`、`helpMessage`、`errorMessages`）、`RequiredLabel`、`Checkbox`、`Switch`、`Select`、`Table`/`Th`/`Td`（`reel`）、`AccordionPanel`、`Loader`、`ErrorScreen`/`NotFoundErrorScreen`、`DropdownMenuButton`。テーマ色は `MAIN`、`DANGER`、`WARNING_YELLOW`、`BRAND` などで、紫・緑・橙の汎用色は無い（グラフ用の `CHART_COLORS` にはある）。

## 画面の構成（下書き）

| 画面 | URL | 役割 |
| --- | --- | --- |
| 組み合わせ（トップ） | `/` | 今週の自分の相手とハドル、今週の全ペア、これからの予定 |
| メンバー | `/members` | 参加者の確認・削除 |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・参加の変更 |
| 初回設定 | `/setup` | 初回ログイン時、必須項目が埋まるまでの専用画面 |
| 404 | それ以外 | 戻る手段つき |

共通：上部に `Header`（Gaji-Labo ロゴ＝別タブで gaji.jp、右端にログイン／ログイン中の人）、その下に `AppNavi`（組み合わせ／メンバー／自分の設定、`current` で現在地）。

## 目標ごとに、どこで達成するか

### G1 開いてすぐ「今週、自分は誰と話すか」がわかる
- トップの最初の要素（ページ見出し直下）に「今週のあなたの相手」の `Base` を置く。相手のアバター（大きめ）と名前を、この画面でいちばん大きい文字で出す。日付と「14:00 開始」も同じ枠内に置く。
- 根拠：滞在が数十秒で、目的が 1 つ（相手の確認）なので、スクロールせずに 1 画面目で読めることを最優先する（一般的な UI の知識）。全ペアの一覧から自分を探させない（ブリーフ「自分のペア（またはお休みであること）を探さずにわかる」）。
- お休みの週は同じ枠で「今週はお休みです」と次の CT の相手を出す。

### G2 その相手との通話をすぐ始められる
- 上の枠の中、相手の名前のすぐ横（390px では下）に**主ボタン（primary）「ハドルを始める」**を 1 つだけ置く。画面内の primary はこれだけにする（事前知識（DS）：SmartHR では primary は 1 画面 1 つが原則、確信度 中）。
- 全ペアの一覧にも各ペアにハドルの導線を置くが、secondary にして主役と競合させない。
- どちらの uチャンネルか：**ペアのうち社員番号が後の人の uチャンネル**に決める。両方が別々にハドルを始めてしまう事故を防ぐため、ペアごとに 1 か所に決める必要がある。ブリーフ S09（「今週の相手（id=2）の uチャンネルが未設定」が問題になる＝id=1 と id=2 のペアでは id=2 の uチャンネルを使う）と矛盾しない規則として選んだ。ボタンの近くにチャンネル名（`#u-kenta`）を出して、どこで始まるかを明示する。
- uチャンネル未設定の人がいるペアではボタンを出さず、理由と代わりの行動（Slack で直接連絡）を書く。

### G3 先の週の予定を確かめられる
- トップの「これからの予定」に、来週以降の 4 週を**縦に並べる**。各週の行に「日付（曜日つき）」「予定 ラベル」「あなたの相手／お休み／CT なし（祝日名）」をまとめ、全ペアは開閉（`AccordionPanel`）の中に入れる。
- 「次にあなたがお休みになるのはいつか」を予定欄の冒頭に 1 行で出す（期間内に無ければ「表示中の期間にはありません」）。
- タブで 1 週ずつ切り替える案は、来週・再来週を比べるのに往復が要るので採らない。

### G4 誰が組み合わせに入っているかを確かめ、いなくなった人を安全に外せる
- メンバー画面に `Table`（社員番号順）。列は「メンバー」「uチャンネル」「参加」「操作」。先頭に「参加 9 人・不参加 2 人」。
- 削除は行ごとの「削除」ボタン（secondary の小さいボタン。破壊的操作を一覧で目立たせない）→ `ControlledActionDialog` で「〇〇さんを削除しますか？」、実行ボタンは danger、初期フォーカスはキャンセル側。
- 失敗はダイアログ内に残して（`responseStatus` error）やり直せるようにし、成功はダイアログを閉じて一覧の上に `NotificationBar`（success）。

### G5 自分の参加状況を変えられ、その影響が伝わる
- 自分の設定の「CT に参加する」を `Checkbox` にする。フォームの保存ボタンで確定する設計なので、即時反映を連想させる `Switch` は使わない（事前知識（一般））。
- 影響は 2 段で伝える：常時の補足（「変えると、今週以降の全員の組み合わせが組み直されます」）と、値を変えた時点でその直下に出る `InformationPanel`（warning、「保存すると参加者が 9 人 → 8 人になり…」）。

### G6 初めての人が迷わず必要な設定を終えられる
- 初回ログインで必須項目が欠けている人は `/setup` の専用画面へ。他の画面を開いても上部に warning の `NotificationBar` で「初回設定が済んでいません」と `/setup` への導線を出す。
- 項目は 4 つだけ、必須には `RequiredLabel`、各項目に何に使うかの補足（ブリーフの「何に使うか」をそのまま使う）。名前は Slack の表示名を初期値にする。uチャンネルは既存一覧から `Select` で選ぶ。

### G7 どんな状態でも何が起きていて次に何をすればよいかがわかる
- 読み込み中：本文の位置に `Loader`（文言つき）。ヘッダーとナビは出したまま。
- 読み込み失敗：本文に `InformationPanel`（error）＋「再読み込み」ボタン。
- ログイン失敗：上部に `NotificationBar`（error）＋「もう一度ログイン」。未ログインの表示はそのまま使える。
- 参加者 2 人未満：組み合わせの位置に「組み合わせはありません」と理由、メンバー画面への導線。
- 0 人：メンバー画面に空の状態の説明とログインの導線。
- 404：`ErrorScreen` 系で「組み合わせへ戻る」。

## まだ決めていないこと（下書き時点）

- 色：アバターの色は `fixtures.ts` の blue/green/purple/orange だが、テーマに汎用の紫・緑・橙が無い。`CHART_COLORS` の濃い色から白文字のコントラストを満たす 4 色を当てる予定（自前のスタイル指定になる）。
- 自分の強調：主役の枠とは別に、全ペア一覧の中で自分のペアに「あなた」ラベル（`StatusLabel` blue）を付ける。

---

## 実装後の追記（下書きから変わった点・決めた点）

| 項目 | 下書き | 実装 | 理由 |
| --- | --- | --- | --- |
| 削除ダイアログの初期フォーカス | キャンセルに置く | `ControlledActionDialog` の既定のまま（ダイアログ先頭のダミー要素 `smarthr-ui-Dialog-dummyFocus`。Playwright で確認） | `firstFocusTarget` は ref を要るが、キャンセルボタンは部品の内部にあり ref を渡せない。既定でも削除ボタンにはフォーカスが乗らない（Enter 一発で削除されない）ので、目的は満たすと判断 |
| メンバー一覧の 390px | `Table`（`reel` で横スクロール） | 390px（`useEnvironment().mobile`）では `Base` を縦に並べたリストに切り替え | 撮影で、表が名前を 1 文字ずつ折り返し、「参加」「操作」列が画面外に出たため |
| ナビの 390px | `AppNavi` | `Scroller` で横スクロール可能にし、mobile ではラベル「CTスケジュール」とアイコンを外す | 横はみ出し検査で 182px はみ出した |
| ロゴのリンク | `Header` の `logo` に `<a target="_blank">` を渡す | `logo` に `<img>`、`logoHref` に URL、`target="_blank"` は DOM に後付け | `Header` が `logo` を自前の `<a>` で包むため入れ子の `<a>` になった（React の警告）。`Header` に target を渡す口が無い |
| お休みの週の主役 | 「今週はお休みです」と次の相手 | 同じ。次回（祝日を飛ばした最初の CT）の相手を「（予定）」つきで出す | G1 の「誰と話すか」に答えるため |
| 404 | `ErrorScreen` 系 | ヘッダー・ナビを残したまま `Base` に見出し・説明・「組み合わせへ戻る」 | `NotFoundErrorScreen` は `homeUrl` しか取らず、文言と戻り先の文言を自分で決められないため（型定義からの推測。実際の見た目は試していない） |
| 一覧のマークアップ | `ul`/`li` | `role="list"`/`role="listitem"` の `div` | smarthr-ui の CSS は `ul` の黒丸・余白をリセットしないため（撮影で黒丸が出た）。CSS を書かずに意味を保つため |
| 参加の影響 | 値を変えたら warning | 初回設定では出さない | 初回は「参加する」が初期値で、変えたことにならないため |

## 自前のスタイル（CSS）を書いた箇所と理由

| 箇所 | 内容 | 理由 |
| --- | --- | --- |
| `src/Person.tsx` の `Avatar` | 丸・背景色・白文字の頭文字（インラインスタイル） | smarthr-ui にアバター部品が無い。背景色は fixtures の color を smarthr-ui の `CHART_COLORS` の濃い色に対応させた（blue→#1b4b90、green→#2d6c4b、purple→#1b2d5d、orange→#995700）。テーマに紫が無いので purple は濃紺で代用。どれも白文字とのコントラスト 4.5:1 以上で、axe でも違反なし |
| `src/main.tsx` | `body` の `margin: 0` と背景色（`theme.color.BACKGROUND`） | smarthr-ui の CSS は body を扱わず、ブラウザ既定の 8px の余白でヘッダーの帯が端まで届かなかった。背景を BACKGROUND にしたのは、白い `Base` を地の上に載せる SmartHR の画面の慣習（事前知識（DS）、確信度 中） |
| `<img width height>` | ロゴの大きさを HTML 属性で指定 | CSS ではないが記録 |

## 型定義・README について気づいたこと

- 同梱 README の使用例（`IntlProvider` と `ThemeProvider` だけ）のままでは、`AppNavi` などが「useEnvironment は EnvironmentProvider の内側で使用してください」で落ちた。`EnvironmentProvider` を足して解決。
- `Select` の `options` は型の上では `children` を受け付けるが、`children` に渡すと選択肢の文字が空になった。`label` で表示された。

# 設計判断（下書き：画面構成を決める前に書いたもの）

> この節は実装前に書いた下書きです。実装後の確定版は本文書の後半「確定版」にあります。
> 出典の略号：**DM**＝`antd design.md`（DESIGN.md）、**SP:xxx**＝https://ant.design/docs/spec/xxx.md、**WTU:X**＝`antd info X --detail` の whenToUse、**SK**＝同梱スキル SKILL.md、**自**＝自分の判断（事前知識を含む）。

## 読んだハーネス（この順で読んだ）

1. `antd --help` / SKILL.md（SK）… 何をいつ使うか（info → demo → 書く → lint）。
2. `antd mcp`（stdio で tools/list・prompts/list・prompts/get）… 8 ツールと 2 プロンプト。ツールは CLI と同内容。
3. `antd design.md`（DM）… 4 つの価値、色、文字、余白、Do's and Don'ts。
4. llms.txt → spec 配下 29 本（values, feedback, research-message-and-feedback, copywriting, buttons, navigation, research-empty, research-exception, research-result, research-workbench, research-form, stay, invitation ほか）。
5. 部品 42 種の whenToUse（`harness-logs/10-when-to-use.md`）。

## 主役の決め方

- 利用シーンは「月曜、数十秒の滞在で相手を確かめてハドルを始める」。ハーネスで最も近いのは **SP:research-workbench**（ワークベンチ＝アプリのホーム）の「Reduce Memory Load：戻ってきた人の中心目的への最短経路を出す」「最もよく使う内容を最初の画面に出す」。これをホーム画面の方針にする。
- **DM**「primary はその画面で最も重要な 1 つの操作だけ」「Meaningful：視覚的な強調は操作のために取っておく」、**SP:buttons**「primary はボタン群に最大 1 つ」「Call to Action は 1 画面に 1 つ」→ ホームの primary は「ハドルを始める」1 つだけ（未ログイン時は「Slack でログイン」）。
- ただし「今週の自分の相手を最上部のカードに出す」という**画面構成そのもの**はハーネスに直接の指示はなく、ワークベンチの原則からの**自分の解釈**。

## 目標ごとの達成手段（下書き）

| 目標 | どの画面・どの要素で | 根拠 |
| --- | --- | --- |
| G1 今週の相手がすぐわかる | ホーム最上部の Card「今週のあなたの相手」。相手のアバター（大）と名前、日付と 14:00 開始。1440px でも 390px でも最初の画面に入れる | SP:research-workbench（最頻出を最初の画面に）、SP:copywriting「重要な情報を目立つ位置に」、構成は自 |
| G2 すぐハドルを始める | 同じカード内の primary Button「ハドルを始める」（画面で唯一の primary）。相手の uチャンネル未設定なら出さず、Alert で理由と代わりの手段を示す | DM・SP:buttons（primary は 1 つ）、SP:buttons ラベルは動詞、未設定時の扱いは自 |
| G3 先の予定 | ホーム右列（390px では下）の Card「これからの予定」。週ごとに日付（曜日つき）、Tag「予定」/「CT なし」、ログイン中は「あなたの相手」と「次のお休み」を要約、全ペアは Collapse で開閉 | WTU:Collapse（複雑な領域を畳む）、WTU:Tag（分類）、SP:stay（ページ遷移させない）、要約は自 |
| G4 メンバー確認・削除 | 画面「メンバー」。参加／不参加を Tag（アイコン＋文字）で、未設定を warning Tag で示す一覧。削除は Modal で「誰を」「取り消せない」を示し、danger ボタンで実行。成功は message、失敗はモーダル内 Alert | SP:buttons（danger、否定的操作は結果を強調）、SP:feedback（重要な失敗は見落とさない形で）、WTU:Modal |
| G5 参加状況の変更と影響 | 画面「自分の設定」の Radio.Group「参加する／参加しない」。変更すると Alert で「今週以降の組み合わせが組み直しになり、他の人の相手も変わる」と保存前に伝える | WTU:Radio（選択肢を見比べられる）、SP:research-form（設定テンプレート：7 項目未満はグループ化しない、提出型）、影響の伝え方は自 |
| G6 初回設定 | 画面「はじめての設定」。目的の一文＋必須 3 項目のフォーム。必須項目にはそれぞれ「何に使うか」を補足。未入力で送信するとフィールドごとにエラー | SP:research-form、SP:research-workbench「新規ユーザーガイド」、SP:feedback「入力フィードバックは対象の直後に」 |
| G7 どんな状態でも次の一手 | 読み込み中＝Skeleton、失敗＝Result＋「もう一度読み込む」、空＝Empty＋次の行動、ログイン失敗＝Alert＋「もう一度ログイン」、404＝Result＋「組み合わせに戻る」 | SP:research-exception、SP:research-empty（理由と次の行動）、WTU:Skeleton/Result/Empty/Alert |

## 通知の使い分け（下書き）

| 場面 | 部品 | 根拠 |
| --- | --- | --- |
| 保存成功・削除成功・ログイン・ログアウト | message（自動で消える） | SP:feedback「Message は軽い結果通知」、SP:research-message-and-feedback「Global Message」 |
| 保存失敗・ログイン失敗・削除失敗 | Alert（消えない） | SP:feedback「重要な失敗は短時間で消える Message にしない」、SP:research-message-and-feedback「Alert：すぐ注意が要る重大なエラー」 |
| 入力の不備 | Form の検証メッセージ | SP:feedback（Input feedback）、SP:research-message-and-feedback（Form Validation） |
| 削除の確認 | Modal | WTU:Modal、SP:buttons |
| デモで Slack に繋がない旨 | message.info | 自 |

## 決まっていないことの決め方（下書き）

- **どちらの uチャンネルでハドルを始めるか**：ペアのうち社員番号が大きい方の uチャンネルに固定する（2 人が別々の場所で始めてしまうのを防ぐため、ペアで場所を 1 つにする）。画面に「ハドルの場所：u-xxx」と出す。自。
- **削除を誰に許すか**：ログイン中の全員。ただし自分自身は削除できない（自分を消すとログイン中の本人が宙に浮くため）。自。
- **先の週をどこまで**：固定データの全 5 週（今週＋4 週）。自。
- **スマートフォン**：ホームは 390px で G1・G2 を最初の画面で達成する。メンバー・設定も 390px で使える。自。
- **特定の人と次に当たる日**：入れない（主目的から外れる。予定の一覧で代替できる）。自。
- **参加者数**：参加者だけを数え、「参加 9 人・不参加 2 人」と併記する。自。

## 色（下書き）

- primary を DM 既定の `#1677FF` から `#0958D9`（blue-7）に変える。DM の Accessibility note「白文字と #1677FF は 4.5:1 未満。厳格な基準では ConfigProvider で colorPrimary を暗くする」に従う。
- 頭文字アバターの色は fixtures の `color`（blue/green/purple/orange）を antd のプリセット色として使う。DM「プリセット色はタグ・チャート・分類表示に使う」に該当する分類表示と判断。

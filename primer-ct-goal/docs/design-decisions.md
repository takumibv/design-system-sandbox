# 設計判断（design-decisions）

> この文書は 2 段階で書いた。
> **第 1 部**は画面構成を決める前（実装前）の下書きで、ハーネスの出力を読んだ直後に書いたものを手を入れずに残している。
> **第 2 部**は実装後に、実際にどういう意図でどういうデザインにしたかをまとめたもの。

出典の書き方：
- 【H:ツール名/節】… Primer MCP（`@primer/mcp` 1.1.2）の出力から来た判断。ログは `harness-logs/` にある
- 【B】… ブリーフの要件そのもの
- 【自】… 自分の判断（Primer の一般的な知識を含む事前知識も含む。ハーネスには書かれていなかったもの）

---

## 第 1 部：実装前の下書き（G1〜G7 をどこで達成するか）

### 前提として読んだハーネスの出力

| 順 | 呼んだもの | 主に効いた内容 |
| --- | --- | --- |
| 1 | `primer_coding_guidelines` | 部品・props を優先、sx と Box は使わず CSS Modules、パターンに従う |
| 2 | `list_patterns` | Scenario（View / Edit / Delete …）と UI パターン（Empty States / Loading / Degraded / Notification / Feature Onboarding / Forms / Saving / Navigation …） |
| 3 | `get_pattern` ×19 | 下表の各判断 |
| 4 | `get_color_usage` | 色は「役割」（accent / success / attention / danger / done …）で選ぶ。色だけで区別しない |
| 5 | `get_typography_usage` | 色で強調しない、見出しの順序を見た目のために崩さない、左揃え |
| 6 | `init` | ThemeProvider + BaseStyles、primitives のテーマ CSS の読み込み、エージェント向け指示の追加 |

### 主役は何か

- **主役は「今週の自分の相手」と「ハドルを始める」ボタン**。【B】の主な利用シーン（滞在数十秒）と G1/G2 から【自】。
- ハーネスで効いたのは View パターンの「Show the essentials first and let people reveal more on demand」「primary content … belongs inline」【H:get_pattern View】。
  ただし「何を主役にするか」自体をハーネスが決めてくれたわけではない。主役はブリーフから自分で決めた。

### 画面の分け方（案）

ナビゲーションは URL が変わるタブなので UnderlineNav【H:get_pattern Navigation「Use the UnderlineNav component when activating a tab changes the URL」】。

| 画面（URL） | 中身 |
| --- | --- |
| 組み合わせ `/` | ①今週のあなたの相手（Card）②今週の組み合わせ一覧 ③これからの予定（右の Pane。390px では下へ） |
| メンバー `/members` | 参加・不参加の数、メンバー一覧、削除（ConfirmationDialog） |
| 自分の設定 `/settings` | 名前・社員番号・uチャンネル・参加。初回設定も同じ画面で、見出しと説明だけ変える |
| それ以外 | 404（Blankslate と「組み合わせに戻る」） |

画面全体はヘッダー（ロゴ・アプリ名・ログイン／自分）＋ UnderlineNav ＋ PageLayout。

### G1〜G7 の達成方法（案）と根拠

| 目標 | どの画面・どの要素で | 根拠 |
| --- | --- | --- |
| G1 今週の相手がすぐわかる | `/` の最上部に Card「今週のあなたの相手」。大きめの Avatar と名前、日付（10月5日（月）14:00〜）。一覧の中の自分のペアにも Label「あなた」 | 主役の位置は【自】。essentials first は【H:View】。色だけに頼らず文字の Label で示すのは【H:View「clear cue that doesn't depend on color」】【H:get_color_usage】 |
| G2 すぐ通話を始められる | Card の中に primary Button「ハドルを始める」。ページ内で primary はこれ 1 つだけ | primary は success（緑）の役割【H:get_color_usage「success: Primary buttons」】。1 画面 1 primary は【自】（Primer の Button ガイドラインにもあると記憶しているが、今回の MCP 出力で確認したのは Saving の「primary は 1 つ」の文脈のみ） |
| G3 先の週を確かめられる | 右の Pane「これからの予定」に今週以降 4 週。各週の先頭に「あなたの相手」、続けてほかのペア。祝日は「CT なし（スポーツの日）」。各週に Label「予定」 | 位置（Pane）は【自】。「予定」の明示は【B】 |
| G4 誰が入っているか確かめ、安全に外す | `/members`：数の要約 → 一覧（Avatar・名前・社員番号・Label「参加」「不参加」「初回設定が未完了」）→ ゴミ箱の IconButton → ConfirmationDialog（「〇〇さんを削除しますか？」/ 確定ボタン「削除する」danger）。失敗はダイアログ内の Banner critical | Delete パターン：ConfirmationDialog、Button danger、文言は「Are you sure?」でなく対象と結果を書く、失敗はダイアログを閉じず中に Banner critical、成功はライブリージョンで伝える【H:get_pattern Delete】 |
| G5 参加状況を変え、影響が伝わる | `/settings` の Checkbox「CT に参加する」。値を変えた時点で、すぐ下に影響（参加者数がいくつになるか・今週以降の全員の組み合わせが組み直されること）を出す。保存は明示的な「保存する」ボタン | 明示保存のフォームでは Checkbox（ToggleSwitch は自動保存用なので混ぜない）【H:get_pattern Saving「never mix save patterns in a single form」「ToggleSwitch … automatic saving」】。影響の表示は【自】 |
| G6 初めての人が迷わない | 初回ログインした人は、どの画面でも設定フォームを出す（ヘッダーとナビは残す）。見出し「CTスケジュールへようこそ」、3 項目が必須であること、なぜ必要かを Caption で。必須未入力で送信したら上部に Banner critical（何件未入力か）＋各項目の Validation | Feature Onboarding の「beginning / middle / end」と「完了を明確に」【H:get_pattern Feature Onboarding】、必須表示・Caption・Validation の書き方【H:get_pattern Forms】、保存ボタンは無効化しない【H:get_pattern Saving】 |
| G7 どんな状態でも次に何をすべきかわかる | 読み込み中：Card と一覧の位置に Skeleton、読み上げは 1 回。失敗：その場所に Blankslate（AlertIcon・何が起きたか・再読み込み）。データなし：Blankslate（なぜ空か・どうすれば埋まるか）。ログイン失敗：ページ上部の Banner critical＋「もう一度ログインする」。404：Blankslate＋戻るリンク | Loading パターン（場所を限定、1 回だけ読み上げ）【H:get_pattern Loading】。Degraded（グローバルナビを消さない、AlertIcon、fgColor-muted）【H:get_pattern Degraded Experiences】。Empty States（Primary text / Secondary text / 1 つの action）【H:get_pattern Empty States】。Banner と InlineMessage の使い分け【H:get_pattern Notification message】 |

### 通知の使い分け（案）

【H:get_pattern Notification message / Saving / Delete】を下敷きに：

| 場面 | 部品 | variant |
| --- | --- | --- |
| 未ログインへの案内（ログインすると何ができるか） | Banner（ページ上部） | info |
| Slack ログイン失敗 | Banner（ページ上部、再試行ボタンつき） | critical |
| 設定の保存成功 | InlineMessage（保存ボタンのすぐ横） | success |
| 設定の保存失敗 | Banner（フォーム上部、入力は保持） | critical |
| 初回設定の未入力送信 | Banner（フォーム上部）＋各項目の FormControl.Validation | critical / error |
| 参加をやめる／戻るの影響 | InlineMessage（Checkbox のすぐ下） | warning |
| 今週の相手の uチャンネル未設定 | InlineMessage（Card 内、ボタンの代わり） | warning |
| メンバー削除の失敗 | Banner（ダイアログ内） | critical |
| メンバー削除の成功 | ライブリージョン（＋一覧上部の控えめな InlineMessage。ブリーフが「結果を伝える」を求めるため） | success |
| 読み込み失敗・データなし・404 | Blankslate | — |

Toast は使わない（Saving パターンに「avoid using a toast」）【H】。

### 色の意味（案）

- 色は役割で選ぶ【H:get_color_usage】：accent＝自分・現在地、success＝primary ボタン・参加、attention＝注意（未設定・影響）、danger＝削除・エラー。
- 人ごとの色（fixtures の blue/green/purple/orange）は `display-*` トークン（`--display-blue-bgColor-muted` / `--display-blue-fgColor` など）で頭文字アバターに使う【H:find_tokens group=display】。意味を持たない識別色なので、semantic 色とは別系統にする【自】。

### 決まっていないことの決め方（案）

| 項目 | 決め方 | 理由 |
| --- | --- | --- |
| どちらの uチャンネルでハドルを始めるか | 見ている人から見て「相手の uチャンネル」。ペアのどちらからも同じ場所になるよう、未ログイン時と他人のペアは「社員番号が大きい方」のチャンネルを表示 | 下書き段階の案。実装後に第 2 部で確定させる【自】 |
| 削除をログイン中の全員に許すか | 許す。ただし自分自身は削除できない（自分は設定で「参加しない」にする） | ブリーフの「ログイン中の人はメンバーを削除できる」に従い、事故を減らす【自】 |
| 先の週をどこまで見せるか | fixtures にある 5 週（今週＋4 週）すべて | 1 か月先までで十分、ラウンドロビンは参加者増減で組み直されるため遠い先は意味が薄い【自】 |
| スマホでの利用 | 390px で G1・G2 を 1 画面目で達成することを必須にする。管理（削除）も使えるが最適化はしない | 月曜に Slack アプリから開く想定【自】 |
| 「特定の人と次に当たるのはいつか」 | 入れない | 主役を薄めるため。これからの予定に「あなたの相手」が先頭に出るので代用できる【自】 |
| 参加者数の数え方 | 「参加者 9 人」は参加している人だけ。メンバー画面では「参加 9・不参加 2（うち初回設定未完了 1）」 | 組み合わせの対象人数として意味があるのは参加者だけ【自】 |

### ハーネスに書かれていなかったので自分で決めること

- 画面をいくつに分けるか、どこを主役にするか（パターンは「場面ごとの部品の選び方」で、アプリ全体の情報設計は扱っていない）。
- 頭文字アバター（Primer の Avatar は `src` 必須で、頭文字の代替表示がない）。→ CSS Modules で自作し、理由を記録する。
- ロゴの置き方（外部ブランドのロゴを Primer のヘッダーにどう置くか）。

---

## 第 2 部：実装後のまとめ（実際にどういう意図でどういうデザインにしたか）

### 主役

**「今週のあなたの相手」の Card と、その中の緑の「ハドルを始める」ボタン**を主役にした。

- 組み合わせ画面のいちばん上（見出し・CT の時刻・参加者数の直後）に置く。相手の名前は 48px のアイコンと title-large の文字で、画面の中でいちばん大きい文字にした。
- ページ内の primary（緑）ボタンはこれ 1 つだけ。各ペア行のハドルボタンは default（白）の small にして、主役と競わないようにした。
- 計測（`harness-logs/81-g1g2-measure.txt`）：390×667 でも相手の名前の下端は 381px、ボタンの下端は 437px で、スクロールなしで見える。

ハーネスとの関係：「主役を決める」こと自体はハーネスに書かれておらず、ブリーフの利用シーン（滞在数十秒）から決めた【B／自】。ハーネスが効いたのは「主役をどう見せるか」の部分だった：primary は success 色の役割【H:get_color_usage】、essentials first【H:View】、「あなた」を色だけでなく Label の文字で示す【H:View・get_color_usage】。

### 画面構成

| 画面 | URL | 構成 |
| --- | --- | --- |
| 共通ヘッダー | — | 左：Gaji-Labo ロゴ（別タブで gaji.jp）＋アプリ名「CTスケジュール」（組み合わせへのリンク）。右：未ログインなら「Slack でログイン」、ログイン中ならアイコン＋名前の ActionMenu（自分の設定／ログアウト）。その下に UnderlineNav（組み合わせ／メンバー（人数）／自分の設定）。現在地は UnderlineNav の `aria-current="page"` |
| 組み合わせ | `/` | PageLayout の Content：h1・CT の時刻・参加者数 → **今週のあなたの相手 Card**（未ログインならログイン案内の Banner info）→ 今週の組み合わせ（全ペアの一覧。自分の行は accent-muted の面＋Label「あなた」、各行にハドルボタン、最後にお休みの人）。Pane（1440px では右、390px では下）：これからの予定（次のあなたのお休み、各週の「あなた：〇〇 さん」と他のペア、祝日は Label「CT なし」＋祝日名、各週に Label「来週・予定」「予定」） |
| メンバー | `/members` | h1・説明 → 人数（参加／不参加／初回設定が未完了／全員）→ 社員番号順の一覧（アイコン・名前・社員番号・uチャンネル・Label「参加」「不参加」「初回設定が未完了」）。自分の行は「設定を変える」、他の人の行はゴミ箱の IconButton（ログイン中のみ）→ ConfirmationDialog |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル（Select）・CT に参加する（Checkbox）・保存ボタン |
| 初回設定 | どの URL でも（必須未入力の人） | 自分の設定と同じフォーム。見出し「CTスケジュールへようこそ」、説明「次の 3 つを設定してください。1 分ほどで終わります」、ボタン「設定を保存して始める」。完了すると組み合わせへ移り、Banner success「設定が終わりました」 |
| 404 | それ以外 | Blankslate と「組み合わせに戻る」 |

### 画面ごとの判断

- **組み合わせ**：今週と先の週を同じ画面に置いた（View パターン「Avoid unnecessary navigation」【H】）。先の週は Pane に分け、主役の邪魔をしないようにした【自】。先の週では「あなた：〇〇 さん」を各週の先頭に太字で出し、G3（来週は誰か・次のお休み）を探さずに読めるようにした【自】。
- **今週が祝日（S04）**：主役の Card を「今週は CT がありません」に変え、祝日名と「次の CT は 10月19日（月）14:00 から。鈴木 翔太 さんと話す予定です」を出す。CT がない週に来た人の次の疑問（次はいつ・誰と）に答えるため【自】。
- **自分がお休み（S03）**：Card を「今週のあなたはお休みです」にして、理由（奇数のため毎週 1 人がお休み・週ごとに入れ替わる）と次の CT の相手を出す【自】。
- **相手の uチャンネル未設定（S09）**：ボタンを出さず（ブリーフ）、その位置に InlineMessage warning で「ここからハドルを始められない理由」と「Slack の DM で連絡してください」という代わりの手段を出す。Degraded の「Don't remove buttons that are critical … without explanation」に沿い、消した理由をその場で書いた【H:Degraded Experiences／B】。
- **メンバー削除**：ConfirmationDialog、確定ボタンは「削除する」（danger）、初期フォーカスは「キャンセル」。本文に「取り消せない」「参加者が 1 人減り全員の組み合わせが組み直される」「本人が再ログインすると初回設定から」を書く。失敗時はダイアログを閉じずに中へ Banner critical（flush）【H:Delete】。初期フォーカスをキャンセルにしたのは、取り消せない操作を Enter 連打で実行しないため【自】。
- **設定**：明示保存のフォームなので Checkbox（ToggleSwitch にしない）【H:Saving】。保存ボタンは無効化しない【H:Saving】。必須の印「*」は FormControl の `required`【H:Forms】。Caption で「何に使うか」を書き、エラーのときは Caption を消して Validation だけにする【H:Forms「Hide a caption that is redundant with the validation message」】。

### 通知の使い分け（実装）

| 場面 | 部品・variant | 置き場所 |
| --- | --- | --- |
| 未ログイン（S02）・設定画面を未ログインで開いた | Banner info＋「Slack でログイン」 | 主役 Card の位置／ページ上部 |
| Slack ログイン失敗（S08） | Banner critical＋「もう一度ログインする」 | ナビ直下のページ上部 |
| 初回設定の完了 | Banner success（閉じられる） | 組み合わせ画面の上部（移動したので Banner【H:Saving「If the change occurred and the page refreshes or redirects, you can use a Banner」】） |
| 設定の保存成功（S10） | InlineMessage success「保存しました」 | 保存ボタンの右（移動しないので InlineMessage【H:Saving】） |
| 設定の保存失敗（S17） | Banner critical（入力は保持） | フォームの上 |
| 必須未入力で送信（S16） | Banner critical（何件・どの項目へのリンク）＋各項目の Validation | フォームの上＋各項目 |
| 参加の変更による影響（G5） | InlineMessage warning | Checkbox の直下 |
| 相手の uチャンネル未設定（S09） | InlineMessage warning | Card の中、ボタンの代わり |
| メンバー削除の失敗（S14） | Banner critical flush | ダイアログの中 |
| メンバー削除の成功 | InlineMessage success＋AriaStatus | 一覧の上 |
| ハドル開始（デモ） | Banner info compact（閉じられる） | 押したボタンのすぐ下 |
| 読み込み中（S06） | SkeletonText / SkeletonAvatar＋AriaStatus（1 回） | 内容が出る場所 |
| 読み込み失敗（S07）・0 人（S12）・参加者 2 人未満（S05）・404（S18） | Blankslate | 内容が出る場所 |

妥協：Delete パターンは「成功時の目に見えるバナーは既定では出さない」としているが、ブリーフが「結果（成功／失敗）を伝える」を求めているため、控えめな InlineMessage を出した。

### 色の意味

| 色（役割） | このアプリでの意味 | 出典 |
| --- | --- | --- |
| success（緑） | primary ボタン（ハドルを始める・保存）、Label「参加」、保存成功 | 【H:get_color_usage】 |
| accent（青） | 自分（Label「あなた」・自分の行の面）、Label「今週」、リンク | 【H:get_color_usage「selected, active … neutral information」】 |
| attention（黄） | 注意：Label「初回設定が未完了」、影響の予告、uチャンネル未設定 | 【H】 |
| danger（赤） | 削除ボタン、エラー | 【H】 |
| secondary（灰） | Label「不参加」「予定」「CT なし」 | 【自】 |
| display-blue/green/purple/orange | 人ごとの識別色（頭文字アバターのみ） | 【H:find_tokens】。ただし lint は alpha として警告（後述） |

色だけで区別していない：参加／不参加は Label の文字、自分は Label「あなた」、予定は Label「予定」で示す。

### 文言

- です・ます調、短く、次にすることを書く（例：「少し待ってから、もう一度読み込んでください」）。Empty States パターンの「何が起きたか（Primary text）＋どうすればよいか（Secondary text）＋1 つの行動」に合わせた【H】。
- ボタンは動詞で、対象がわかるもの：「ハドルを始める」「削除する」「設定を保存して始める」「もう一度ログインする」【H:Saving「active verb」・Delete「Don't use Yes / OK / Confirm」】。
- 「削除」と「外す」：Delete パターンは「もの自体が残るなら Remove、消えるなら Delete」とする【H】。本アプリでは記録が消え、再ログインすると初回設定からになるので「削除」にした。
- エラーは技術用語を避ける（「通信が途切れたか、サーバーで問題が起きた可能性」）【H:Empty States「For errors」】。

### 決まっていないことの決め方（確定）

| 項目 | 決めたこと | 理由 |
| --- | --- | --- |
| どちらの uチャンネルでハドルを始めるか | **ペアのうち社員番号が大きい方の uチャンネル**。画面には「#u-kenta（高橋 健太 さんの uチャンネル）で始めます。相手も同じチャンネルに来ます」と出す | 2 人が「相手の」チャンネルをそれぞれ開くと別の場所に行ってしまう。どちらから見ても同じ場所になる規則が必要。fixtures では id=1 は常に小さい方なので、ログイン中の id=1 から見ると常に「相手の uチャンネル」になり、ブリーフの記述・S09 とも一致する。どちらかが未設定ならボタンを出さない（ブリーフ）【自】 |
| 削除をログイン中の全員に許すか | 許す。自分自身は削除できない（自分の行は「設定を変える」）。未ログインには削除ボタンを出さない | ブリーフの機能要件どおり。退職者を誰でも片付けられる方が運用に合う。代わりに確認ダイアログで対象と影響を明示【自】 |
| 先の週をどこまで見せるか | fixtures の全 5 週（今週＋4 週） | 約 1 か月。それより先は参加者の増減で変わる可能性が高い【自】 |
| スマートフォン | 390px で G1・G2 をスクロールなしで達成（計測済み）。メンバー一覧は 1 行を 2 段に折り返す | 月曜に Slack の投稿から開く想定【自】 |
| 「特定の人と次に当たるのはいつか」 | 入れない | 主役を薄めるため。これからの予定で「あなた：〇〇 さん」を週ごとに読めば代用できる【自】 |
| 参加者数の数え方 | 組み合わせ画面は参加者だけ（9 人）。メンバー画面とナビの数は全メンバー（11 人）で、内訳（参加・不参加・初回設定が未完了）も出す | 組み合わせに意味があるのは参加者数、メンバー確認では全員が対象【自】 |

### デモの都合で決めたこと

- URL パラメータ：`user`（guest／id）、`data`（loading／error／few／empty）、`unset`（uチャンネルを未設定にする id）、`today`（基準の週）、`login=failed`、`result`（saved／save-failed／delete-failed）、`confirm`（削除確認を開く id）、`submitted=1`。一覧は `states.json`。
- パラメータなしは id=1 でログイン中として開く（ブリーフ「ログイン中の自分は id=1」）。
- 「Slack でログイン」は認証せず id=1 としてログインした扱いにする。ハドルは Banner で通知するだけ。
- fixtures に社員番号がないため、id を社員番号として表示する。

### 自前 CSS（書いた場所と理由）

すべて CSS Modules（`primer_coding_guidelines`「sx と Box を使わず CSS Modules」）。値はすべて primitives のトークン（例外は下に記載）。合計 240 行。

| ファイル | 理由 |
| --- | --- |
| `components/PersonAvatar.module.css` | Primer の Avatar は画像（`src`）が必須で、頭文字の代替表示がない |
| `components/AppHeader.module.css` | Primer の Header は GitHub のダークなグローバルヘッダー用。外部ブランドのロゴを明るい面に置くため、面・余白・ロゴの高さだけ自作（並びは Stack） |
| `pages/SchedulePage.module.css` | 表示専用の「区切り線つきの人の一覧」に当たる部品がない（ActionList は操作の一覧、DataTable は 390px で溢れる） |
| `pages/MembersPage.module.css` | 狭い幅で状態ラベルを名前の下へ回す 2 次元配置。Stack は 1 方向のみ |
| `App.module.css` | ナビ直下の Banner の最大幅・余白と、`p` の既定マージンの打ち消し（`Text as="p"` にブラウザ既定の上下マージンが残り、Stack の gap と二重になった） |

トークンにしていない値：`max-width: 543.98px`（メディアクエリ。primitives の breakpoint は CSS 変数をメディアクエリに使えないため）、`max-width: 1280px`（PageLayout xlarge の幅に合わせた）、`min-height: 100vh`。

### 妥協点

1. 初回設定中も UnderlineNav は残し、URL が `/` なら「組み合わせ」が現在地として下線表示される。画面の中身（ようこそ）とずれる。Degraded の「グローバルナビを消さない」を優先した。
2. 自分の行の面（accent-muted）の上に Label success「参加」を置くとコントラストが 4.46:1 で axe に引っかかった。メンバー画面では自分の行の面色をやめ、Label「あなた」だけで示した。
3. 頭文字アバターの display-* 色は Primer の stylelint で「alpha」と警告されるが、意味を持たない識別色が他にないため使った（無効化コメントに理由を記載）。
4. 削除成功の InlineMessage（上記）。

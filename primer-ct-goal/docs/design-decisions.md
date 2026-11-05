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

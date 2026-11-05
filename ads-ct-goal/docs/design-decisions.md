# 設計判断（design-decisions）

> この文書は **実装前に下書き** し（コミット履歴で確認可能）、実装後に「実装で変えたこと」を追記した。
> 出典の略号：
> - **[MCP:xxx]** ADS 公式 MCP（hosted `https://mcp.atlassian.com/v1/ads/public/mcp`）のツール出力。ファイルは `harness-logs/mcp/`
> - **[CLI:xxx]** `@atlaskit/ads-cli` の出力。ファイルは `harness-logs/cli/`
> - **[llms:xxx]** `https://atlassian.design/llms*.txt`。ファイルは `harness-logs/llms/`
> - **[自分]** ハーネスに根拠がなく、自分の判断・事前知識で決めたもの

## 0. 前提：ハーネスから得たもの・得られなかったもの（設計前の時点）

- 部品ごとの「いつ使うか」（usageGuidelines／contentGuidelines／accessibilityGuidelines）は `ads_get_all_components` の全件出力の中にだけある。`ads_search_components`・`ads_plan`・CLI `component` は props と例だけで、ガイドラインは出ない。→ 全件を取得して抜粋した（`harness-logs/mcp/10-guidelines-digest.md`）。
- メッセージの種類（情報・成功・警告・エラー・空状態）と部品の対応表は `ads_get_guidelines`（"error message" 等）にある [MCP:02-guidelines-messages]。通知の使い分けはこれを主な根拠にする。
- **画面構成・主役の決め方についてのガイダンスは見つからなかった。** "navigation"・"landing page"・"dashboard"・"primary task"・"onboarding" で `ads_get_guidelines` を引いても、日付や色の文書しか返らない [MCP:11-guidelines-structure]。レイアウトの一般原則（近接・類似・大きさと余白で階層を作る）はある [MCP:01-guidelines-layout-hierarchy] が、「どの情報を主役にするか」は自分で決める。
- ADS のページ枠（トップナビ・サイドナビ）は `@atlaskit/navigation-system` だと `docs layout` が案内する [CLI:25-docs-layout] が、部品カタログ（MCP・CLI）には載っておらず、npm の peerDependencies は React 18 のみ（本プロジェクトは React 19）。→ 使わず、primitives（Box／Inline／Stack）でヘッダーを組む [自分]。

## 1. 目標ごとの達成方法（下書き）

| 目標 | どの画面・要素で達成するか | 根拠 |
| --- | --- | --- |
| G1 開いてすぐ今週の相手がわかる | 「組み合わせ」画面（トップ `/`）の最上部に **「今週のあなたの CT」カード** を置き、相手のアバター（大）と名前、日付と 14:00 を出す。1440px でも 390px でもスクロールなしで見える位置。ログインしていなければ同じ場所に「ログインすると今週の相手がここに出る」案内 | 主役の選定は [自分]（ブリーフの利用シーン「滞在は数十秒」から）。「大きさと余白で階層を作る」「全要素を同じ重さにしない」は [MCP:01 Create order and hierarchy] |
| G2 すぐ通話を始められる | 同じカードの中に、ページで唯一の primary ボタン「ハドルを始める」。相手の名前のすぐ下（近接）に置く。ハドルの場所（どの uチャンネルか）も書く | 「primary はページの主要アクションに 1 つ」[MCP:Button usageGuidelines]。近接 [MCP:01 Group by proximity] |
| G3 先の週の予定 | ログイン中は、カードの右（390px では下）に **「あなたの今後の予定」** を週ごとの 1 行リストで出す（相手・お休み・CT なし）。全員分は下の「全員の組み合わせ」に週ごとのセクションで出し、先の週に「予定」Lozenge と「参加者が変わると組み直されます」の注記 | 構成は [自分]。Lozenge は色＋ラベル必須 [MCP:Lozenge] |
| G4 参加者の確認と安全な削除 | 「メンバー」画面。社員番号順の一覧に、参加／不参加／初回設定未完了を Lozenge（文字つき）で。参加・不参加の人数を見出し横に。削除は行ごとの「削除」ボタン → Modal で「誰を」「何が起きるか」「取り消せない」を書いて確認 → 結果を Flag | 確認は Modal＋danger ボタン、ボタン文言はタイトルと一致 [MCP:Modal]、「Confirm a risky action」[MCP:02 warning]。結果通知は Flag [MCP:Flag, 02 表] |
| G5 自分の参加状況を変え、影響が伝わる | 「設定」画面の「CT に参加する」チェックボックス。保存済みの値から変えた瞬間に、すぐ下へ警告の SectionMessage「保存すると今週以降の全員の組み合わせが組み直されます」を出す。保存後は組み合わせ画面に戻し、成功 Flag | 警告＝「将来の問題を事前に知らせる」[MCP:02 warning vs error]。Checkbox は設定の明示的な確認に使う [MCP:Checkbox] |
| G6 初回設定で迷わない | 初回ログインした人（必須未入力）は、組み合わせ画面の代わりに初回設定フォームを出す。冒頭で「何のための設定か（あと 2 項目で今週の相手が見られる）」を書き、必須にアスタリスク、各項目にヘルパー文。送信ボタンは無効化せず、送信時に項目ごとのエラー | Form の構造・アスタリスク・「送信ボタンを無効化しない」[MCP:Form]。新規ユーザー向けの語調（具体的・安心させる）[llms:content Tone: New Users] |
| G7 どの状態でも次の行動がわかる | 読み込み中＝Spinner＋文言、読み込み失敗・ログイン失敗＝SectionMessage（error）＋やり直しボタン、データなし＝EmptyState＋次の行動、保存成功＝Flag（success）、削除失敗＝Flag（error）＋再試行、404＝EmptyState＋組み合わせへ戻るボタン | 部品の割り当ては [MCP:02 Select the right component] と各部品の usageGuidelines（SectionMessage は「接続・認証の問題」「行動が必要なとき」、Flag は「イベント後の確認」） |

## 2. 画面構成（下書き）

画面は 3 つ＋404。画面の数は最小にした：用途は「月曜に数十秒だけ見る」がほとんどで、それ以外（メンバー管理・設定）はまれだから [自分]。

1. **組み合わせ（`/`）** — 主役。上から：
   1. 「今週のあなたの CT」カード（G1・G2）＋ 右に「あなたの今後の予定」（G3、ログイン時のみ）
   2. 「今週の全ペア」（全員分。自分のペアは目印）
   3. 「今後の予定」（来週以降。祝日の週は「CT なし」と祝日名）
   - ページ上部の補助情報：参加者数（「参加 9 人」）と「メンバーを見る」リンク、CT の開始時刻。
2. **メンバー（`/members`）** — 一覧・人数・削除（G4）。自分の行に「設定を変更」。
3. **設定（`/settings`）** — 自分の設定。初回は同じフォームを「はじめての設定」として出す（G5・G6）。
4. **404** — EmptyState。

ヘッダー（全画面共通）：左にロゴ（別タブで開くことを `LinkExternalIcon` とラベルで示す [MCP:Link「新しいウィンドウで開くときは警告」, icon LinkExternal "Reserved for links that open up a new tab"]）、サービス名、ナビ（組み合わせ／メンバー／設定）。右にログイン中の人（アバター＋名前）とログアウト、未ログインなら「Slack でログイン」。今いる画面はナビの `aria-current="page"` と見た目（選択状態）で示す。

## 3. 決まっていないことの決め方（下書き）

| 項目 | 決めたこと | 理由 |
| --- | --- | --- |
| ハドルをどちらの uチャンネルで始めるか | **ペアのうち社員番号が小さい人の uチャンネル**。カードに「#u-misaki で始まります」と場所を書く | 2 人がそれぞれ「相手の」チャンネルで始めると別々のハドルに分かれてしまう。2 人とも同じ規則で同じ場所に集まれるようにした [自分] |
| uチャンネル未設定の人とのペア | ペアのどちらかが未設定ならハドルボタンを出さず、理由と代わりの行動（Slack で直接連絡、相手に設定を頼む）を出す | ブリーフの要件。「行き止まりにしない」[MCP:SectionMessage a11y "Avoid dead ends"] |
| メンバー削除を全員に許すか | ログイン中の全員に許す（自分自身は削除不可）。代わりに確認 Modal で対象と影響を明示 | 小さなチームで管理者を置く運用コストより、誰でも退職者を外せる方が実態に合う [自分]。自分の削除は「参加をやめる」で足りる |
| 先の週をどこまで見せるか | 固定データの全 5 週（今週＋4 週）。来週以降には「予定」 | 約 1 か月あれば「来週」「次のお休み」がほぼ必ず含まれる。参加者が変わると組み直されるので、それ以上先は精度が低い [自分] |
| スマートフォン | 390px で G1・G2 がスクロールなしで完結することを必須にする。管理（削除・設定）は 390px でも操作可能にするが最適化はしない | 利用シーン（Slack の通知から開く）ではスマートフォンも多いと推測 [自分・推測] |
| 「特定の人と次に当たるのはいつか」 | 入れない | 主目的（数十秒で確認して通話）から外れ、画面の主役を薄める。「あなたの今後の予定」で 4 週分の相手は見える [自分] |
| 参加者数の数え方 | 組み合わせ画面は「参加者数」＝参加している人だけ。メンバー画面は「参加 N 人・不参加 M 人」と両方 | 組み合わせに関係するのは参加者だけ。管理では両方必要 [自分] |

## 4. 通知の使い分け（下書き）

| 状況 | 部品 | appearance | 根拠 |
| --- | --- | --- | --- |
| 読み込み失敗（S07） | SectionMessage | error | 「接続や認証の問題」「行動が必要」[MCP:SectionMessage] |
| Slack ログイン失敗（S08） | SectionMessage | error | 同上（認証の問題）。閲覧は続けられるのでページ上部に置き、下に組み合わせを出し続ける |
| 相手の uチャンネル未設定（S09） | SectionMessage（カード内） | warning | ハドルが始められない「状態」で、操作の結果ではない。エラーではなく警告 [MCP:02 warning vs error] |
| 参加をやめる／戻る前（G5） | SectionMessage（フォーム内） | warning | 「データの損失や変化を事前に知らせる」[MCP:02 warning] |
| 設定の保存成功（S10） | Flag | success | 「完了を確認してすぐ退く」[MCP:Flag content] |
| 設定の保存失敗（S17） | SectionMessage（フォーム上部） | error | 入力を保ったまま、その場で再送信してほしい。フォームという「セクション」に起きた問題 [MCP:SectionMessage] |
| 削除の確認（S13） | Modal | danger ボタン | [MCP:Modal]・[MCP:02 Confirm a risky action] |
| 削除の成功／失敗（S14） | Flag | success／error（再試行つき） | イベント後の通知 [MCP:Flag] |
| データなし（S05・S12）・404（S18） | EmptyState | — | [MCP:EmptyState] |
| ログイン・ハドル（デモ） | Flag | information | ブリーフ「デモでは通知を出すだけ」 |
| 使わない部品 | Banner | — | 「データや機能の損失など致命的な全体メッセージだけ」[MCP:Banner]。本アプリにはない |

## 5. 色の意味（下書き）

- 人の識別色（`fixtures.ts` の color）は **accent** トークン（`color.background.accent.<色>.subtler` と `color.text.accent.<色>`）。accent は「意味を持たない色」なので識別に使う [MCP:13 color roles「意味がある色に accent を使わない」の裏返し]。
- 状態の色は semantic：参加＝Lozenge `success`、不参加＝`default`、初回設定未完了＝`moved`（注意を引くが警告ではない）、予定＝`inprogress`（青＝情報）。すべて文字ラベルつきで、色だけに頼らない [MCP:Lozenge a11y]。
- primary ボタン（brand 色）はページに 1 つ。組み合わせ画面では「ハドルを始める」だけ。

## 6. 文言（下書き）

- 日本語。ADS の content 規約（sentence case、ボタンは動詞で 1〜3 語、"Submit"/"OK" を避ける、エラーは原因と次の行動、責めない）を日本語に置き換える [llms:content, MCP:Button/Flag/SectionMessage content]。
- 日付：ADS は「US 形式」と書くが日本語 UI なので `2026年10月5日（月）` [自分。ハーネスは日本語の日付規則を持たない]。時刻は 24 時間表記 `14:00`。
- ボタン例：「ハドルを始める」「Slack でログイン」「もう一度読み込む」「削除する」「保存する」「設定を完了する」。

---

## 7. 実装で変えたこと・妥協点（実装後に追記）

（実装後に追記する）

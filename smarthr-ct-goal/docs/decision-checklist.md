# 判断チェックリスト（D01〜D30）— ハーネスあり版

ハーネスなしの対照実験と比べるための記録。コードと画面はこの文書のために変えていない（コミット `80ff8a8` 時点の実装について書いた）。

## 書き方

- **根拠の種類**：ハーネス／ブリーフ／事前知識（DS）〔確信度〕／事前知識（一般）／型定義・README／検査／その他の自分の判断。
- ハーネスのファイルはリポジトリ直下の `.claude/skills/` からの相対パス（`cg/` ＝ `component-guidelines/`、`dp/` ＝ `design-pattern-guidelines/`）。行番号は `80ff8a8` 時点のコピー。
- **時期**：
  - 「読後」＝ハーネスを読んでから決めた。
  - 「裏付け」＝先に決め、あとでハーネスを引いた。
  - 「不明」＝どちらか分からない。
  - 作業の順番は、スキルを読み込む（`harness-logs/03-skill-activation-and-reading.md`）→ 設計の下書き（コミット `63b6948`）→ 実装 → lint・axe・textlint。画面構成を決める前に pattern-selector と主なパターンは読み終えていた。

## 表

| # | 項目 | 決めたこと | 根拠 | 根拠の種類 | 時期 |
| --- | --- | --- | --- | --- | --- |
| D01 | 画面の数と分け方 | 4 画面：組み合わせ `/`、メンバー `/members`、自分の設定（初回設定を兼ねる）`/settings`、404。組み合わせは 1 画面に今週と先の週をまとめた | ブリーフの機能要件の見出し「組み合わせの表示」「メンバー」「自分の設定（初回設定を含む）」。画面の型は `dp/patterns/page-layout.mdx` の「シングル（1カラム）」「コレクション（テーブル／リスト）」に当てはめた | ブリーフ＋ハーネス＋その他の自分の判断（初回設定を設定画面と同じにする） | 画面の分け方はブリーフから。型の当てはめは読後 |
| D02 | トップ画面で何を主役にしたか | ログイン中：「今週のあなたの相手」と「ハドルを始める」。未ログイン：「ログインすると、あなたの相手がすぐにわかります」と「Slackでログイン」 | ブリーフ「主な利用シーン：月曜の CT 前に『今週の相手は誰か』を確かめ、そのまま相手との通話（Slack ハドル）を始める。滞在は数十秒で終わる。」、G1・G2。ハーネスに主役を選ぶ指示は無い | ブリーフ＋その他の自分の判断 | ハーネスを読んでいる最中に決めた。ハーネス由来ではない |
| D03 | 主役の置き場所と強調のしかた | PageHeading とリード文の直下（最初のセクション）。白い Panel（padding 1.5）の中で、相手のアイコンを 3rem、名前を Text XL・bold にした。色の強調や特別な枠は付けていない | 置き場所：`dp/patterns/visual-guidance.mdx:50`「重要な情報は、上部や左側に配置する」、`:51`「優先度が高い情報は、上部に配置する」。セクション＝見出し＋Panel は `dp/patterns/visual-grouping.mdx`「セクション」。大きさは自分の判断 | ハーネス（置き場所・Panel）＋その他の自分の判断（文字の大きさ） | 「上に置く」はブリーフから先に決め、visual-guidance は裏付け。Panel の使い方は読後 |
| D04 | 主ボタンの数と、どの操作を主ボタンにしたか | 1 画面に 1 つ。組み合わせ（ログイン中）＝「ハドルを始める」、組み合わせ（未ログイン）＝「Slackでログイン」、設定＝「保存」。メンバー画面は主ボタンなし | `cg/components/Button.md:132`「[must] 1 つの画面で Primary ボタンは最大 1 つまでにする」、`:133`「主要な操作が複数ある場合は、画面内の主要な操作が 1 つになるように情報設計と画面構成を見直す」 | ハーネス | 読後（この [must] で、各ペアのハドルボタンを Secondary にすると決めた） |
| D05 | 全員のペアの見せ方 | 週ごとの Panel の中に縦のリスト（`ul`）。1 行に「A と B」とハドルボタン。表やカードにはしていない | 該当するパターンは無かった（`dp/patterns/smarthr-list.mdx` は 1 オブジェクト 1 行の前提）。罫線を使わず余白でまとめたのは `dp/patterns/visual-grouping.mdx`「罫線は余白や矩形でグループを表現できない場合の最終手段」 | その他の自分の判断＋ハーネス（余白でまとめる） | リストにしたのは自分の判断。余白で区切るのは読後 |
| D06 | 自分のペアの強調のしかた | 主役のセクションで別に大きく出す。週ごとのリストでは名前の後ろに「（あなた）」を付け、そのペアのハドルボタンも他と同じ Secondary にした。色の強調はしていない | 主役で示したので、リストで重ねて強調する必要は少ないと判断。色だけに頼らない（`cg/components/StatusLabel.md:49` の考え方。直接の指示ではない） | その他の自分の判断＋事前知識（一般） | 不明 |
| D07 | 先の週の見せ方と範囲 | 2 通り。(1) 主役のセクション内に「あなたの今後の予定」（DefinitionList、4 週）。(2) 「週ごとの組み合わせ」を TabBar（今週／来週／10月19日／10月26日／11月2日）で切り替え、`bordered`、Reel で包む。範囲は固定データの 5 週すべて | `dp/patterns/page-layout.mdx:36`「ページが過度に長くなることを避ける」、`:56`「ページをナビゲーションで分割する」、`dp/patterns/visual-grouping.mdx:153`「見出し領域にTabBarを配置し、Panelを切り替えます。」、`cg/components/TabBar.md:41`（下線）、`:47`（Reel） | ハーネス＋その他の自分の判断（自分の予定の欄を足す、5 週すべて） | TabBar は読後。自分の予定の欄は G3 から自分で決めた |
| D08 | 「先の週は予定」の伝え方 | 今週以外の週の見出しの横に StatusLabel「予定」（grey）。週の下と自分の予定の下に「この週の組み合わせは予定です。参加者が増減すると組み直されます。」 | ブリーフのルール 7「先の週の組み合わせは『予定』であり確定ではない」、機能要件「先の週は『予定』であることが伝わる」。StatusLabel の使い方は `cg/components/StatusLabel.md`（固定のラベル・色だけに頼らない） | ブリーフ＋ハーネス | 部品の選び方は読後 |
| D09 | お休み・祝日・参加者 2 人未満の週の伝え方 | お休み：主役で「今週、あなたはお休みです」と理由。リストでは「お休み」＋人。祝日：StatusLabel「CTなし」と「スポーツの日のため、この週のCTはありません。組み合わせは作らず、翌週に繰り越します。」。2 人未満：Panel の中央に「組み合わせはありません。」、理由、メンバー画面へのリンク | ブリーフのルール 3〜5。空の状態を中央に置くのは `dp/patterns/smarthr-list.mdx` の「初期表示」（Panel 内部にメッセージを上下左右中央に） | ブリーフ＋ハーネス（空の状態の配置） | 読後 |
| D10 | ハドルの導線 | ボタン「ハドルを始める」（主役は Primary、リストは Secondary）。ボタンの下に「場所：#u-kenta」。**ペアのうち社員番号が後の人の uチャンネル**。どちらかの uチャンネルが無ければボタンを出さず案内文 | ブリーフ「相手の uチャンネル（個人用 Slack チャンネル）でハドルを始める導線を置く。uチャンネル未設定の人とのペアでは出さない」、S09（id=2 未設定）。ラベルの形は `cg/components/Button.md:184`「[must] ボタンラベルには動詞の終止形を使用する」 | ブリーフ＋その他の自分の判断（どちらのチャンネルか）＋ハーネス（文言の形） | チャンネルは自分の判断（ハーネスに該当なし）。文言は読後 |
| D11 | 人の表示で使った部品 | 自前の `Avatar`（`span`＋自前 CSS `person.css`。頭文字＝名前の 1 文字目、背景色は fixtures の color）＋ smarthr-ui の `Text`・`Cluster`。色は blue `#0077c7`／green `#0f7f85`／orange `#f56121`（黒文字）／purple `#6d00cc` | smarthr-ui にアバター部品が無い（`cg/component-selector.md` の一覧に無いことを確認）。色の値は smarthr-ui の `lib/themes/createColor.js`（BLUE_100、AI_GRADATION_PURPLE）と `lib/smarthr-ui-preset.js:82-83`（green、orange） | その他の自分の判断＋型定義・README（色の値を node_modules から） | ハーネスに答えが無いことを確かめた後 |
| D12 | ナビゲーションの部品 | `Header`（ロゴ・ユーザーメニュー＝`HeaderDropdownMenuButton`）＋`AppNavi`／`AppNaviCustomTag`（組み合わせ／メンバー／自分の設定）。AppHeader は使わなかった | `dp/patterns/page-layout.mdx:134`「AppHeaderを画面の最上部に配置します。」に対し、`cg/components/Header.md:3`「独自のヘッダー構成が必要なときのみHeader単体で使います」。AppHeader をやめた理由は `node_modules/smarthr-ui/lib/components/AppHeader/components/` の実物（「個人設定」が `target: "_blank"` 固定、モバイルのメニューに「アプリ一覧」など） | ハーネス＋型定義・README（実物のソース） | 読後（最初は AppHeader を使うつもりで、実物を読んでから変えた） |
| D13 | メンバー一覧の部品と 390px での扱い | デスクトップ：`Panel` 内の `Table`／`Th`／`Td`。390px：`useEnvironment().mobile` で切り替え、`Panel` 内のリスト（`ul`）。各行の操作はアイコンボタン 1 つ（削除） | `dp/patterns/page-layout.mdx:355`「コレクション（テーブル）は広い横幅を必要とするため…モバイルには適していません。代わりに、コレクション（リスト）を検討してください。」、`dp/patterns/smarthr-list.mdx:138`「表示できるボタンは defaultサイズのアイコンボタン1つです」、`dp/patterns/mobile-friendly-layout.mdx:52-54`（`useEnvironment`） | ハーネス | 読後 |
| D14 | 参加／不参加・初回設定未完了の表示部品 | 参加状況は `StatusLabel`（「参加」blue／「不参加」grey）。初回設定未完了は `Text` の `icon`＋`WarningIcon`「初回設定が未完了」（StatusLabel にしない） | `cg/components/StatusLabel.md:49`「[must] 色のみでステータスを伝えず、適切な名前を付ける」、`:35`「[avoid] 1つのオブジェクトに対して複数の StatusLabel を設定しない」。ブリーフ「参加と不参加は色だけに頼らず区別できる」 | ハーネス＋ブリーフ | 読後 |
| D15 | 削除の確認の部品と文言、ボタンの種類、初期フォーカス | `ControlledActionDialog`（size S）。タイトル「メンバーの削除」、本文「以下のメンバーを削除しますか？　この操作は元に戻せません。」、`DefinitionList`「削除するメンバー：加藤 大輔（社員番号：0010）」、参加中なら注意文。ボタンは右に Danger「削除」、左に「キャンセル」。初期フォーカスは指定していない（smarthr-ui の既定：`FocusTrap` がダイアログ先頭のダミー要素にフォーカス） | `dp/patterns/delete-dialog.mdx:78`「`{オブジェクト名}の削除`」、`:85`「`以下の{オブジェクト名}を削除しますか？　この操作は元に戻せません。`」、`:90`（DefinitionList）、`:109`（影響の提示）、`:130`「ラベルは`削除`…Dangerボタン」、`:131`「`キャンセル`」。初期フォーカスは `node_modules/smarthr-ui/lib/components/Dialog/client/FocusTrap.js:13` で確認した | ハーネス＋型定義・README（初期フォーカス）。全角スペースは検査で調整（eslint `no-irregular-whitespace` → 文字列リテラルに） | 読後。初期フォーカスは実装時には意識しておらず、この表のために確認した |
| D16 | 削除の成功・失敗の伝え方 | 失敗：ダイアログの `responseStatus`（error）でダイアログ内のボタン付近。成功：ダイアログを閉じ、ヘッダー直下に `NotificationBar`（success、bold、animate、sticky）「〇〇さんをメンバーから削除しました。」 | `dp/patterns/feedback.mdx:221`（近くに ResponseMessage／ActionDialog は responseStatus）、`:236`「Buttonの近くに表示するのが難しい場合」→ NotificationBar[bold]。`cg/components/NotificationBar.md:49`（アニメーション） | ハーネス | 読後 |
| D17 | 参加の切り替えの入力部品と理由 | `Fieldset`＋`RadioButton`「参加する／参加しない」（横並び）。Switch・Checkbox は使わない | `dp/patterns/selection-component-usage.mdx:48`（即時反映なら Switch。今回は「保存」で反映するので外す）、`cg/components/Checkbox.md:73`「2 択の切り替え入力には原則として RadioButton の利用を検討する」 | ハーネス | 読後 |
| D18 | 参加を変えたときの影響の伝え方 | 3 段階：(1) Fieldset の helpMessage に常に「変えると、今週以降の全員の組み合わせが組み直されます。」、(2) 選び直した瞬間にラジオの下へ注意文（WarningIcon）、(3) 保存後に ResponseMessage「保存しました。今週以降の組み合わせを組み直しました。」 | ブリーフ「参加をやめる／戻ると全員の組み合わせが変わることが伝わる」、G5。(3) の場所は `cg/components/ResponseMessage.md:121`「直前に操作した要素の近くに表示する」 | ブリーフ＋その他の自分の判断（3 段階にする）＋ハーネス（結果の場所） | 3 段階は自分の判断、結果の部品は読後 |
| D19 | 初回設定の流れ | 専用の画面は作らず、`/settings` を「初回設定」の見出しで表示。初回設定が済んでいない人は `/` や `/members` を開いても `/settings` へ移す。1 画面のフォーム（ウィザードにしない） | ブリーフ「初回ログインした人には、必須項目が埋まるまで入力を求める」。ウィザードにしないのは項目が少ないため（`dp/patterns/wizard.mdx` は読んでいない） | ブリーフ＋その他の自分の判断 | 不明（ハーネスは使っていない） |
| D20 | フォームの必須表示とエラーの出し方 | 「必須」ラベルは付けない（リード文で「3つの項目を入力して」と書く）。入力に `required`（社員番号は `pattern="[0-9]+"` も）、`onInvalid` で `preventDefault`、`FormControl` の `errorMessages` に項目ごとのエラー、直ったら消す。保存ボタンの下にもまとめのエラー。入力例は `exampleMessage`「例：0123」 | `cg/components/FormControl.md:130-132`（required、errorMessages、onInvalid と preventDefault）、`:138-139`「必須ステータスラベルの省略を検討する／すべて必須であることが自明な場合」、`:146`（exampleMessage）。ボタン近くのまとめは `dp/patterns/feedback.mdx`「フォームの送信時に値が不正」 | ハーネス | 読後 |
| D21 | 保存の成功・失敗の伝え方 | 保存ボタンの直下に `ResponseMessage`（success「保存しました。」／初回は「設定が完了しました。」、error「保存できませんでした。通信状況を確認して、もう一度「保存」を押してください。」）。処理中はボタンを `loading`。成功時はリンク「組み合わせを見る」を ResponseMessage の外に置く | `dp/patterns/feedback.mdx:221`。リンクを外に出したのは axe の `aria-hidden-focus`（S10）を受けて。エラー文の型は公式ドキュメント `error-messages/overview.mdx`（事象・原因・対処。スキル外） | ハーネス＋検査（axe）＋公式ドキュメント | 読後。リンクの位置は検査後に修正 |
| D22 | 読み込み中の表示 | 本来組み合わせが出る場所に `Center`＋`Loader`（text「組み合わせを読み込んでいます」）。ヘッダーとナビは表示したまま | `dp/patterns/feedback.mdx:510`「読み込みの対象となっている領域にLoaderを表示します。」 | ハーネス | 読後 |
| D23 | 読み込み失敗・ログイン失敗の表示と、やり直す手段 | 読み込み失敗：本来の場所に `NotificationBar`（error、bold、paneled）＋ボタン「再読み込み」。ログイン失敗：ヘッダー直下に `NotificationBar`（error、bold）＋ボタン「もう一度ログインする」。未ログインのまま組み合わせは見える。AuthErrorScreen は使わない | `dp/patterns/feedback.mdx:562-564`「特定の要素の表示に失敗した場合／要素が本来表示される場所に、`error`状態のNotificationBar[bold]」。`cg/component-selector.md` は AuthErrorScreen を「SSOやOAuthなどログイン処理に失敗したときに使います」とするが、実物（`ErrorScreen/AuthErrorScreen.d.ts`：props は `smarthrUrl` のみ、文言「SmartHR に戻る」固定）ではやり直しを置けないため採らなかった | ハーネス＋型定義・README＋その他の自分の判断 | 読後 |
| D24 | メンバー 0 人の表示 | テーブル（390px はリスト）の中央に「表示するデータはありません。」「メンバーはSlackでログインすると追加されます。」と Secondary の小ボタン「Slackでログイン」（未ログイン時） | `dp/patterns/smarthr-list.mdx:226`「オブジェクト名が人を指す名詞などで…『表示するデータはありません。』」。テーブルは `EmptyTableBody` | ハーネス | 読後 |
| D25 | 404 の表示 | `ErrorScreen`（logo＝Gaji-Labo、title「お探しのページは見つかりませんでした」、説明 2 文、リンク「組み合わせに戻る」）。ヘッダーは無し | `cg/component-selector.md` の NotFoundErrorScreen（404 相当）を見たが、実物はロゴが SmartHR 固定で logo props が無い（`ErrorScreen/NotFoundErrorScreen.d.ts`：`homeUrl` のみ）。`dp/patterns/feedback.mdx:558`「ページ全体の表示に失敗した場合」→ ErrorScreen | ハーネス＋型定義・README | 読後 |
| D26 | 未ログインの人に「ログインすると何ができるか」を伝える方法 | 組み合わせ画面の主役の位置に `InformationPanel`（info）「ログインすると、あなたの相手がすぐにわかります」＋本文＋ Primary「Slackでログイン」。メンバー画面では「ログインすると、退職した人などをメンバーから削除できます。」。ヘッダー右上にも「Slackでログイン」 | ブリーフ「ログインしていない人に、ログインすると何ができるかが伝わる」。`cg/components/InformationPanel.md:35`「見出しと内容を必ずセットにして使用する」、`cg/components/Panel.md`（InformationPanel を Panel の上に置かない。ページ背景に置いた） | ブリーフ＋ハーネス（部品の使い方） | 置き場所は自分の判断、部品の制約は読後 |
| D27 | 色の使い方 | 主ボタン：smarthr-ui の Primary（MAIN）。状態：StatusLabel の blue（参加）／grey（不参加・予定・CTなし）、エラーは DANGER（NotificationBar、ResponseMessage、Danger ボタン）、警告は WarningIcon。自分の強調に色は使っていない（文字「（あなた）」と主役の位置で示す）。ヘッダーは BRAND のまま、名前の文字は TEXT_BLACK | トークンの意味は smarthr-ui の既定に従った。ヘッダーの文字色は axe の color-contrast 違反（白 `#ffffff` と `#00c4cc` で 2.14:1）を受けて直した。参加を blue にしたのは自分の判断 | 事前知識（DS）〔中〕＋検査（axe color-contrast）＋その他の自分の判断 | 不明（トークンの使い分けを特定のハーネスの記述から決めた記録は無い） |
| D28 | 文言の調子 | 説明・エラーは です・ます。ボタンは動詞の終止形（「ハドルを始める」「保存」「削除」「再読み込み」）。見出しは名詞（「メンバー」「自分の設定」「今週のあなたの相手」）、「一覧」を付けない。全角と半角の間にスペースを入れない（「Slackでログイン」） | `cg/components/Button.md:184`、`cg/components/Heading.md:95`「[must] 画面タイトルや項目名には名詞を使用する」、`dp/patterns/smarthr-list.mdx:45`（「一覧」をつけない）。スペースは textlint `smarthr/ja-space-between-half-and-full-width` の 50 件（`harness-logs/20-textlint-before.txt`）で直した。です・ますは公式ドキュメント `ui-text/app-writing.mdx`（スキル外）と事前知識 | ハーネス＋検査（textlint）＋事前知識（一般） | 動詞・名詞は読後。スペースは検査後に修正（最初は半角スペースを入れていた） |
| D29 | 削除の権限 | ログイン中の全員が削除できる。ただし自分の行には削除を出さず「設定を変更」にする。未ログインでは操作列を出さない | ブリーフ「ログイン中の人はメンバーを削除できる（退職者など）」。自分を除くのは自分の判断（操作中の画面が壊れるため） | ブリーフ＋その他の自分の判断 | ハーネスは使っていない |
| D30 | 先の週の範囲、特定の人と次に当たる日、参加者数の数え方 | 範囲：固定データの 5 週すべて（今週＋4 週）。特定の人と次に当たる日：入れない。参加者数：組み合わせ画面は「参加者9人」（参加者だけ）、メンバー画面は「参加9人・不参加2人（全11人）」 | 範囲はデータのある範囲で自分の判断。「次に当たる日」を入れないのは、ページを長くしないため（`dp/patterns/page-layout.mdx:36` を裏付けに引いた）。人数はブリーフのルール 5「参加している人だけが対象」と機能要件「参加者数と不参加者数がわかる」 | その他の自分の判断＋ブリーフ＋ハーネス（裏付け） | 範囲と人数は自分の判断。page-layout は裏付けとして後から引いた |

## まとめ（根拠の種類の集計）

30 項目のうち、主な根拠にハーネスの記述が入っているもの（裏付けを含む）は 24 項目（D01、D03〜D05、D07〜D10、D12〜D18、D20〜D26、D28、D30）。
ハーネスが根拠にまったく入らないものは 6 項目。
- D02 主役
- D06 自分のペアの強調
- D11 人の表示
- D19 初回設定の流れ
- D27 色
- D29 削除の権限

D30 は 24 項目に数えたが、ハーネスは「次に当たる日」を入れない判断の裏付けとして後から引いただけで、範囲と参加者数の数え方には使っていない。

主役（D02）と主役の強調（D03 の大きさ）は、ハーネスから出てこなかった。
主ボタンの数（D04）は、ハーネスの [must] で決まった。

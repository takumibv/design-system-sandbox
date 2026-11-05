# SmartHR Design System のハーネスはデザイン意図をどこまで実装に届けたか

この調査の主目的です。CTスケジュール UI を smarthr-ui で作り直す作業に、SmartHR Design System が配布している AI エージェント向けの仕組み（以下「ハーネス」）を実際に使い、どの判断がハーネスから来たのかを記録しました。比較対象は、同じ手順で行った ADS 版（[ads-ct-schedule/docs/ai-design-intent-mechanisms.md](../../ads-ct-schedule/docs/ai-design-intent-mechanisms.md)）です。

- 調査日：2026-11-05
- ハーネス：`kufu/smarthr-design-system` のプラグイン（コミット `ed07a77`、2026-11-04）。ガイドの基準は smarthr-ui v100.1.0
- 実装に使った版：smarthr-ui **102.1.0**、eslint-config-smarthr 14.14.0（内部の eslint-plugin-smarthr は 6.28.0）、eslint-plugin-smarthr 6.29.0（全ルール計測用）、textlint-rule-preset-smarthr 1.38.3
- 作業ログ：[harness-logs/README.md](../harness-logs/README.md)

## 結論

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 意図の量と質 | ◎ | 部品 106 件のうち 72 件に使い方チェックリスト（`[must]`/`[should]`/`[avoid]` 計 415 項目）。パターン 24 件。「なぜそうするか」まで書いてある |
| 判断への効き方 | ◎ | 主要な判断 30 件のうち **21 件がハーネス（スキル）から来た**。ほかに 5 件はスキルと別の出典の組み合わせ。うち 6 件は ADS 版と逆の結論。ADS 版はほぼ 0 件（CLI が指針を出さなかったため） |
| 正確さ・鮮度 | ○ | 2 版の差で props が 1 件ずれていた（`disabledReason`）。スキル自身が「型定義を正とせよ」と書いているので、型エラーですぐ気づけた |
| 足りないもの | △ | Avatar・パンくず・スキップリンク・SmartHR 製品外でのヘッダー構成・`EnvironmentProvider`・lint の初期設定は、どこにも書かれていない |
| 日本語 UI 規約 | ◎（ただし原本と衝突） | ボタンラベル、見出し、削除ダイアログの定型文、表記（ひらがな・数字）まで規則がある。原本の文言とスキルの規則が **14 か所**（textlint を含めると 16 か所）ぶつかった |
| lint の効き方 | ○ | 初回 134 件。Heading を Section の外に置いた 4 か所、tabIndex の誤用 2 か所など、**実害のある指摘はハーネスの文書とも一致**。ただし「推奨設定」の入口が分かりにくく、起動に 2 回失敗した |
| 起動条件 | △ | スキルは `**/*.tsx` があるディレクトリでしか認識されない。**何も書いていない段階（＝部品選定をする段階）では自動で呼ばれない**。今回は人の指示があったので最初に読んだ |

**SmartHR のハーネスは「部品をどう使い分けるか」という ① の層を、今回調べたどのデザインシステムよりも具体的に届けてくれました。** 判断の根拠をファイルと行で示せるため、AI が「なんとなく ADS らしく」書くのではなく、「Button.md の `[must]` に従って」書けます。一方で、SmartHR 製品の外で使うときに必要な情報（ヘッダー、アバター、文言の例外）は届きません。

---

## 1. 使ったハーネスの一覧

| 種類 | 名前 | 中身 | 使ったか |
| --- | --- | --- | --- |
| スキル | `component-guidelines` | SKILL.md（手書き）＋ `component-selector.md`（部品の選定表）＋ `components/*.md` 106 件（Props は `metadata.json`、Do/Don't は eslint-plugin-smarthr の README、チェックリストは人がレビューした `checklist.yaml` から自動生成） | ◎ 39 件を読んだ |
| スキル | `design-pattern-guidelines` | SKILL.md ＋ `pattern-selector.md` ＋ `patterns/*.mdx` 24 件（サイトの記事へのシンボリックリンク） | ◎ 8 件を読んだ |
| lint | `eslint-config-smarthr`（共有設定） | eslint-plugin-smarthr のうち 45 ルールを error/warn に設定（16 は off） | ◎ |
| lint | `eslint-plugin-smarthr` | 64 ルール | ○ 全ルール有効で補助計測 |
| 文章の検査 | `textlint-rule-preset-smarthr` ＋ prh 辞書 | 表記ゆれ、全角半角、算用数字、ひらがなにする語 | ○ UI 文言を抜き出して検査 |
| トークン | `smarthr-ui/lib/smarthr-ui-preset`（Tailwind） | 色・余白・角丸・影・文字サイズを `shr-*` に限定 | ◎ 自前 CSS の代わり |
| MCP | — | **提供されていない** | — |
| llms.txt | `smarthr.design/llms.txt` | **404** | — |
| DESIGN.md | — | **なし** | — |
| AGENTS.md / CLAUDE.md | リポジトリ直下 | ドキュメントサイトを編集する人向け。利用者向けではない | 読んだが使わず |

### 導入手順とつまずき

1. **`/plugin marketplace add` が使えなかった。** このセッションでは `claude plugin marketplace add` の実行が自動許可判定で拒否されました。指示どおり、リポジトリを clone して `plugins/smarthr-design-system/skills/` を `smarthr-ct-schedule/.claude/skills/` にコピーしました（[scripts/install-harness.sh](../scripts/install-harness.sh)）。
2. **パターンはシンボリックリンク。** `patterns/*.mdx` はサイトの記事へのリンクなので、普通に `cp -r` するとリンク切れになります。`cp -rL` で実体をコピーしました。README の「サイトを更新すればスキルにも反映される」仕組みの裏返しです。
3. **スキルが認識されたのは .tsx を書いた後だった。** 両スキルの frontmatter に `paths: ["**/*.tsx", "**/*.jsx"]` があります。コピーした直後は認識されず、`src/CTApp.tsx` を作った瞬間に「New skills discovered」と通知されました（4 章で詳述）。
4. **eslint-plugin-smarthr の `recommended` は推奨ではなかった。** `index.js` の `generateRecommendedConfig` は全ルールを `off` にするだけでした。実際に推奨値を持つのは別パッケージの `eslint-config-smarthr` です。どちらもスキルには書かれていません。
5. **eslint-config-smarthr は tsconfig の paths がないと起動しない。** エラー文は「tsconfig.json の compilerOptions.paths に `"@/*": ["any_path/*"]` 形式でフロントエンドの root dir を指定してください」。SmartHR 社内のディレクトリ規約が前提になっています。
6. **全ルールを有効にすると 1 ルール（`format-translate-component`）が options なしで落ちる。** プロジェクト固有の設定が必要なルールが混ざっています。
7. **smarthr-ui 102 の初期設定。** `IntlProvider`、`ThemeProvider` は README にありますが、`useEnvironment` を使うのに `EnvironmentProvider` が必要なことは、パターン（mobile-friendly-layout）にもスキルにも書かれていません。実行時の例外で気づきました。

---

## 2. どの判断がどこから来たか

出典の分類：
- **スキル**：スキルのファイルを読んで決めた（ファイル名と項目）
- **lint**：作った後に ESLint／textlint に指摘されて直した
- **型**：`tsc` のエラーや d.ts を読んで決めた
- **事前**：作業を始める前から知っていた（学習済みの知識、またはこのセッションで先に読んだ ADS 版・原本の資料）
- **原本／ADS**：原本か ADS 版の判断をそのまま引き継いだ

| # | 判断 | 出典 | 根拠・メモ |
| --- | --- | --- | --- |
| 1 | Primary ボタンは 1 画面に 1 つ（ハドルボタンだけ） | 事前 → スキルで確認 | 作業前に ADS 版の資料（`design-system-ai-survey.md` の SmartHR の節）で「SmartHR の Button には `[must]` Primary は最大 1 つ」と読んでいた。`Button.md`「種類 > Primary」で同じ文を確認。原本・ADS 版とも同じ結論 |
| 2 | 画面遷移は TextLink（「メンバー一覧を見る」「自分の参加設定を変更する」「設定」） | **スキル** | `Button.md`「Tertiary > `[must]` 他の画面へ移動するリンクとして使いたい場合は TextLink」、`TextLink.md`「`[avoid]` ボタンとして使わない」。**ADS 版は subtle ボタンだった（逆の結論）** |
| 3 | 目立たせたい遷移は AnchorButton | **スキル** | `Button.md` の AnchorButton の節と `[must]` AnchorButton はリンク先が分かる文言 |
| 4 | パンくず → UpwardLink「CT組み合わせ表に戻る」 | **スキル** | `component-selector.md` に Breadcrumb がない。`UpwardLink.md`「ライティング `[must]` `{一階層上の画面名}に戻る`」「`[must]` モバイルでは indent を無効」 |
| 5 | 通知を「ボタンの横／画面全体／続く状態」の 3 つに分ける | **スキル** | `patterns/feedback.mdx`「操作部の近くでフィードバックする」「Button の近くに表示するのが難しい場合は NotificationBar[bold]」。**ADS 版は 2 種類（SectionMessage／Flag）** |
| 6 | 成功の NotificationBar は自動で閉じず、animate・sticky | **スキル** | `NotificationBar.md`「`[must]` アニメーションを有効に」「`[avoid]` 時間の経過で閉じない」「`[should]` position: sticky」。**ADS 版の Flag は自動で消える（逆）** |
| 7 | 保存失敗は保存ボタンの横の ResponseMessage | **スキル** | `feedback.mdx`「同期的な処理が完了したとき」、`ResponseMessage.md`「`[must]` 直前に操作した要素の近く」。**ADS 版は上部の SectionMessage（逆）** |
| 8 | 削除失敗はダイアログの `responseStatus` | **スキル** | `feedback.mdx`「ActionDialog の場合は responseStatus」 |
| 9 | 入力エラーは上部の InformationPanel ＋ 各項目の errorMessages | スキル＋ADS | `feedback.mdx` の InformationPanel の例、`FormControl.md`「`[must]` errorMessages で表示」「`[must]` 入力要素にも error 状態」。2 段構えは ADS 版と同じ |
| 10 | エラーは直したらすぐ消す | **スキル** | `FormControl.md`「`[must]` エラーの原因が解消されたらメッセージの表示を止める」 |
| 11 | 必須の表示は RequiredLabel | **スキル** | `FormControl.md`「ステータスラベルの有無」、選定表 |
| 12 | 不参加中の案内は paneled の NotificationBar | **スキル** | `InformationPanel.md`「`[should]` 短い一文なら ResponseMessage か paneled の NotificationBar」 |
| 13 | 未ログインの案内は InformationPanel（白い Panel の上に置かない） | **スキル＋lint** | `InformationPanel.md`「`[must]` 見出しと内容をセット」と lint ルール `prohibit-information-panel-in-white-bg` の説明 |
| 14 | ページ背景をグレー（BACKGROUND）にし、白い Panel を重ねる | **スキル** | `visual-grouping.mdx`「背景と異なる色で矩形を表現」、`page-layout.mdx` の実装例 |
| 15 | 太い上ボーダーなど罫線で強調しない | **スキル** | `visual-grouping.mdx`「罫線は余白や矩形で表現できない場合の最終手段」 |
| 16 | 余白 2／1.5／1 | **スキル** | `spacing-layout-pattern.mdx` の表 |
| 17 | 本文は Container（DEFAULT）、画面タイトルは PageHeading ＋リード文 | **スキル** | `page-layout.mdx`「構成」、`Container.md`、`PageHeading.md`「`[must]` 画面ごとに 1 度」 |
| 18 | 2 カラムは Sidebar、主情報は副情報の 2 倍以上 | **スキル** | `page-layout.mdx`「シングル（2 カラム）」 |
| 19 | モバイルでメンバー表をリストにする | **スキル** | `smarthr-table.mdx`「モバイル環境では よくあるリスト を使用」。原本のモバイル表示とも一致した |
| 20 | モバイル判定は `useEnvironment` | **スキル** | `mobile-friendly-layout.mdx`「モバイルかどうかの判定には useEnvironment を使う」 |
| 21 | 空のメンバー一覧は Panel 内に中央寄せ＋Secondary・小 | **スキル** | `smarthr-table.mdx`「初期表示」。**ADS 版は primary（逆）** |
| 22 | 「削除」は Text ボタン＋ゴミ箱アイコン | **スキル** | `Button.md`「`[should]` Secondary が多い場合は見直す」「`[must]` Text ボタン単独ならアイコン」 |
| 23 | 「この先の CT」の行は Text ボタン＋右に › | スキル＋ADS | 行全体を押せる形は ADS 版から。アイコン必須は `Button.md` |
| 24 | アイコンは片側だけ（ハドルボタンは右に「新しいタブ」アイコンのみ） | **スキル** | `Button.md`「`[must]` アイコンは左右どちらかにのみ」「どちらにも付けられそうなら右を優先」。原本・ADS 版は左右両方に付けていた |
| 25 | 前の週・今週ボタンは disabledReason で理由を出す | **スキル＋型** | `Button.md`「`[avoid]` 無効状態はできるだけ使わない」「disabledReason を検討」。props の形はガイドが古く、d.ts で `text` に直した |
| 26 | 「あなた」は Chip、「参加する／しない」と週の状態は StatusLabel、「初回設定が未完了」は文字＋アイコン | **スキル** | `StatusLabel.md`「`[avoid]` 1 つのオブジェクトに複数の StatusLabel」、`Chip.md`「`[must]` ステータス表示には Chip を使わない」 |
| 27 | Heading を必ず Section／Aside の中に置く | **lint** | `a11y-heading-in-sectioning-content` が 4 か所を指摘。ルールの説明は `Heading.md` にもあったが、最初は Panel 内の見出しで見落とした |
| 28 | 属性のない Text を `<p>` や素のテキストにする、既定値の props を消す | **lint** | `best-practice-for-text-component`（15 件）、`best-practice-for-default-props`（20 件）。ほぼ自動修正 |
| 29 | アバターを自作（トークン色の透過＋頭文字） | 事前＋原本 | スキルには Avatar もその代わりの案内もない。色を `shr-bg-*/15` にしたのは Tailwind の知識 |
| 30 | ヘッダーを Header ＋ AppNavi で組み、モバイルでアカウント操作を別の行にする | 事前＋型 | `AppHeader.md`／`Header.md`／`AppNavi.md` はチェックリストが未整備。390px のはみ出しは自分のスクリーンショット検査で見つけた |

**集計：30 件中、スキルが主な出典 21 件（うち ADS 版と逆の結論 6 件：#2・#5・#6・#7・#21・#24）、スキル＋他の出典 5 件（#1・#9・#13・#23・#25）、lint 2 件、事前・原本 2 件。**

### 部品ごとのチェックリスト適合

使った部品の `[must]` と、関係する `[should]`/`[avoid]` への適合です。✓ 適合、△ 一部、✗ 不適合（理由つき）。

| 部品 | 項目 | 結果 |
| --- | --- | --- |
| Button | `[must]` Primary は 1 画面に最大 1 つ | ✓ 全 16 状態で 1 つ以下 |
| | `[must]` form の送信は `type="submit"` | ✓ |
| | `[must]` Text/Tertiary を単独で使うならアイコン | ✓（削除、この先の CT） |
| | `[must]` 他の画面への移動は TextLink | ✓ |
| | `[must]` アイコンは片側だけ／同じ操作には同じアイコン | ✓ |
| | `[must]` アイコンボタンには alt | ✓（前の週・次の週） |
| | `[avoid]` 無効状態のボタン | △ 「前の週」「今週」は disabledReason 付き。最後の週の「次の週」は理由なし |
| | `[must]` ボタンラベルは動詞の終止形 | ✗ 「今週」「Slack でログイン」「ログアウト」「キャンセル」「再読み込み」「削除」は名詞。原本の文言を優先（5 章） |
| | `[avoid]` モバイルで小サイズ | ✓ モバイルでは通常サイズに切り替え |
| | `[must]` 横並びなら Primary は右 | ✓ |
| ActionDialog | `[should]` 内容が少なく縦に並ぶなら S | ✓ |
| | `[should]` フォームを含むなら FormDialog | ✓ 含まない |
| NotificationBar | `[must]` 画面全体ではシステムからの通知だけ | ✓ |
| | `[must]` ページ全体へのフィードバックは animate | ✓ |
| | `[avoid]` 時間で閉じない | ✓ |
| InformationPanel | `[must]` 見出しと内容をセット／白背景に置かない | ✓ |
| ResponseMessage | `[must]` 直前に操作した要素の近く | ✓ |
| FormControl | `[must]` 入力要素は 1 つ | ✓ |
| | `[must]` 必須には required、エラーは errorMessages | ✓ |
| | `[must]` onInvalid で preventDefault してブラウザのツールチップを抑止 | △ `noValidate` で抑止（同じ効果だが書き方が違う） |
| | `[must]` 入力要素にも error 状態／解消したら消す | ✓ |
| Fieldset | `[must]` 2 つ以上の入力要素のときだけ使う | ✗ チェックボックス 1 つ。lint が Checkbox を FormControl に入れることを禁じており、legend を付ける手段がほかにない |
| Checkbox | `[should]` 2 択なら RadioButton を検討 | △ 検討したが、ラベル「CTに参加する」で他方が明らかなので Checkbox のまま（チェックリストの例外条件に該当） |
| Select | `[should]` 6 個以上なら Select／既定は空 | ✓（10 件、未選択から） |
| StatusLabel | `[must]` 色だけで伝えない／`[avoid]` 1 オブジェクトに複数 | ✓ |
| Chip | `[must]` ステータス表示に使わない | ✓ |
| Heading | `[must]` 画面タイトルは PageHeading、レベルは順に | ✓ |
| | `[must]` 画面タイトルや項目名は名詞 | ✗ 「CTをはじめましょう」「あなたらしい名前で。」「参加はいつでも変更できます」。原本の文言を優先 |
| UpwardLink | `[must]` `{画面名}に戻る`／モバイルで indent なし | ✓ |
| Text | `[must]` 見出しには Heading | ✓ |
| Container | `[should]` 標準の画面は DEFAULT | ✓ |
| Table | `[avoid]` セルに Checkbox を直接置かない | ✓（使っていない） |
| Loader | `[avoid]` 1 秒未満の読み込みには使わない | — デモなので判断できない |

---

## 3. ADS 版と比べて良くなった点・悪くなった点

### 良くなった点

1. **判断に出典が付いた。** ADS 版では CLI が使い方の指針を出さず、判断の多くは「もともと持っていた ADS の知識」でした。SmartHR 版は 30 件中 21 件をファイル名と項目で示せます。レビューする人が「なぜ Text ボタンなのか」を同じファイルで確かめられます。
2. **アクセシビリティ寄りの判断が増えた。** 「操作部の近くでフィードバック（拡大鏡を使う人は離れた変化に気づけない）」「成功通知を勝手に消さない」「無効ボタンには理由を出す」は、ADS 版にはなかった判断です。どれもパターンやチェックリストに理由付きで書かれていました。
3. **モバイルの作りが原本に近づいた。** 「モバイルではテーブルをリストに」というパターンに従った結果、原本のモバイル表示（カード型のリスト）とほぼ同じ構造になりました。ADS 版は DynamicTable のままで、390px では列が窮屈でした。
4. **人を見分けるアバターを残せた。** 部品がない分、自作する前提になり、原本の「色付きの頭文字」を再現しました。ADS 版は Avatar 部品の制約で全員が同じ人型アイコンでした。
5. **lint の指摘とスキルの文書が同じ言葉で書かれている。** lint のメッセージ（例：「smarthr-ui の Article, Aside, Nav, Section のいずれかで Heading をラップ」）とスキルの「実装ルール」が同じ README から作られているため、指摘を受けたときに読むべきファイルがすぐ分かりました。
6. **依存が軽い。** 本体 JS は gzip 167KB（ADS 版 285KB）、実行時の依存は 112 パッケージです。

### 悪くなった点

1. **原本の文言と規則がぶつかる。** ボタンは動詞の終止形、見出しは名詞、削除ダイアログは定型文、表記はひらがな・算用数字。原本はやわらかい言い回しを意図的に選んでいるので、スキルの規則と 14 か所、textlint と 2 か所で衝突しました（5 章）。ADS は日本語の規則を持たないので、この問題は起きませんでした。
2. **SmartHR 製品の外で使うと穴が多い。** AppHeader は SmartHR のテナント・ヘルプ・リリースノートが前提で、使えませんでした。代わりの Header と AppNavi にはチェックリストがなく、モバイルではみ出しました。ADS の navigation-system と同じく「その会社の製品のための部品」です。
3. **見た目の変化が増えた箇所がある。** disabledReason の ⓘ アイコン、閉じるまで残る NotificationBar は、規則に従った結果ですが、画面は少しにぎやかになります。
4. **削除確認の最初のフォーカスを「キャンセル」に置けなかった。** ControlledActionDialog の閉じるボタンに ref を渡せないためです。

---

## 4. ハーネスが答えてくれなかったこと／誤っていた・古かったこと

### 答えてくれなかったこと

| 知りたかったこと | 結果 |
| --- | --- |
| アバター（人のアイコン） | 選定表に部品がなく、代わりの案内もない |
| パンくず | 部品がない。UpwardLink にたどり着いたのは、TextLink.md の「一階層上に戻るなら UpwardLink」から |
| スキップリンク | 部品も記述もない |
| SmartHR 製品以外でのヘッダー | AppHeader／Header／AppNavi はチェックリスト「未設定」。モバイルの扱いもない |
| `EnvironmentProvider` が必要なこと | どこにも書かれていない（mobile-friendly-layout は `useEnvironment` の使い方だけ） |
| lint の導入方法 | スキルは Do/Don't を載せるが、`eslint-config-smarthr` を使うこと、tsconfig の paths が要ることは書かれていない |
| Tailwind プリセット（トークン） | パターンの実装例は `shr-*` クラスを使っているが、プリセットの導入方法やトークンの一覧はスキルにない。サイトのデザイントークンの記事はパターンからリンクされるだけで、スキルには含まれていない |
| ライティングの全体像 | スキルにあるのは各部品の「ライティング」節（3 部品・4 項目）だけ。サイトの「UI テキスト」「表記ルール」の記事はスキルに入っていない。表記ルールは textlint の辞書が担っている |
| 原本のような「やさしいトーン」の画面 | SmartHR の規則は業務 SaaS 向け。例外の判断基準はない |

### 誤っていた・古かったこと

| 内容 | ガイド（v100.1.0） | 実装（v102.1.0） | 影響 |
| --- | --- | --- | --- |
| Button の `disabledReason` | `{ icon?, message }` | `{ icon?, text }` | 型エラー。スキルの注意書きどおり d.ts を読んで直した |
| ActionDialog の props | RemoteDialogTrigger 版の props（`onToggle` など）だけ | 開閉を自分で持つなら `ControlledActionDialog`（`isOpen`、`onClickClose`） | 別ファイル（ControlledActionDialog.md）にあるが、props 表は「ActionDialog と同じ」チェックリストだけで、props の違いは d.ts を読まないと分からない |
| EmptyTableBody のチェックリスト | Table のチェックリスト（Checkbox をセルに置かない、TdCheckbox の aria-labelledby）がそのまま入っている | — | 生成スクリプトの継承の誤りと思われる（推測） |
| Header の `featureName` | 「機能名」 | `enableNew`（社内向け、非推奨）と組み合わせないと表示されない | Props 表の説明だけでは分からない |
| `design-system-guideline-prohibit-double-icons` | Button.md の「実装ルール」に載っている | eslint-config-smarthr では **off** | ガイドを読まずに lint だけに頼ると、片側アイコンの規則は検出されない |

**完全に誤った情報はありませんでした。** 古い props は 1 件で、SKILL.md が「バージョンが違えば型定義を正とせよ」と先回りして書いていたので、迷わずに済みました。

---

## 5. 日本語 UI 規約と原本の文言の衝突

原本の文言は変えずに残し、衝突を記録しました。

### スキル（チェックリスト・パターン）との衝突

| 規則（出典） | 原本の文言 | 規則に従うと |
| --- | --- | --- |
| ボタンは動詞の終止形（Button.md `[must]`） | 今週 | 今週を表示する |
| 同上 | Slack でログイン | Slack でログインする |
| 同上 | ログアウト | ログアウトする |
| 同上 | 再読み込み | 再読み込みする |
| 同上 | 削除（一覧の行） | 削除する |
| 同上 | キャンセル | （下の削除ダイアログのパターン自身が「キャンセル」を使っており、規則どうしが食い違う） |
| 画面タイトル・項目名は名詞（Heading.md `[must]`） | CTをはじめましょう | 初回設定 |
| 同上 | あなたらしい名前で。／参加はいつでも変更できます | 表示名について／参加の変更 |
| 削除ダイアログのタイトル（delete-dialog.mdx） | 加藤 大輔さんを削除しますか？ | メンバーの削除 |
| 削除ダイアログの本文（同上） | メンバー一覧と今後の組み合わせから外れます。… | 以下のメンバーを削除しますか？　この操作は元に戻せません。＋ DefinitionList で対象を表示 |
| 削除ダイアログのボタン（同上） | 削除する | 削除（**Button.md の「動詞の終止形」と食い違う**） |
| テーブルの列名は「ステータス」、複数あるときだけ「〇〇状況」（smarthr-table.mdx） | 参加状況 | ステータス |
| 値がない項目は空白（empty-data.mdx） | 未設定（社員番号） | 空白 |
| パンくずの代わり（UpwardLink.md `[must]`） | CT組み合わせ表（パンくず） | CT組み合わせ表に戻る ← **これだけは規則に従った** |

### textlint（preset-smarthr）の指摘

SmartHR Design System のリポジトリと同じ設定では 4 件、プリセットの既定では 11 件でした（[textlint-sds-config.txt](../harness-logs/textlint-sds-config.txt)、[textlint-preset-smarthr.txt](../harness-logs/textlint-preset-smarthr.txt)）。

| 指摘 | 文言 | 判断 |
| --- | --- | --- |
| ひとり → 1人（数字は算用数字） | もうひとりの参加を待っています | 原本のまま。原本は「ひとり」をやわらかさとして選んでいる。なお同じ画面の「ひとりずつ順番に」は指摘されなかった |
| 初めて → はじめて（ひらがなにする語） | Slack で初めてログインすると… | 原本のまま。**規則に従うのが妥当**と考える（原本も「はじめましょう」はひらがな） |
| 全角文字どうしの間にスペースを入れない | 加藤 大輔を削除しました。 | 誤検知（姓名の間のスペース） |
| 同上 | 〇〇 でハドルを… | 誤検知（抽出時に `${channel}` を置き換えた文字） |
| 全角と半角の間にスペースを入れない（既定のみ） | Slack でログイン ほか 7 件 | SmartHR のリポジトリ自身がこのルールを off にしている。原本のまま |

**分かったこと：** 規則の多くは「業務の操作を正確に伝える」ためのもので、原本の「気軽に開くお知らせ」のトーンとはそもそも目的が違います。規則に従うべきもの（「初めて」→「はじめて」、パンくず → 戻るリンク）と、プロダクトの声として残すべきもの（「今週は、ひと休み。」「あなたらしい名前で。」）を分けて判断する必要があります。スキルには「規則から外れてよい条件」が書かれていないので、この線引きはプロジェクト側で決めるしかありません。

---

## 6. lint 由来の Do/Don't は実装に効いたか

| 段階 | 件数 | 内訳 |
| --- | --- | --- |
| 初回（eslint-config-smarthr） | 134 件（エラー 46、警告 88） | require-i18n-text 87、best-practice-for-default-props 20、best-practice-for-text-component 15、a11y-heading-in-sectioning-content 4、a11y-scroller-has-tabindex 2、import/order 2、ほか 4 |
| 最終 | 88 件（エラー 1、警告 87） | 下表 |
| 補助：プラグインの全ルール | 98 件 | 最終の 88 件 ＋ 10 件（下表） |

**事前に効いたもの（書く前にスキルで読んでいたので、一度も指摘されなかった）**
- `best-practice-for-button-element`（素の `<button>` を使わない）
- `design-system-guideline-prohibit-double-icons`（アイコンを両側に付けない。公式設定では off だが全ルール計測で 0 件）
- `a11y-input-has-name-attribute`（入力要素に name）
- `a11y-form-control-in-form`、`a11y-input-in-form-control`
- `a11y-prohibit-input-placeholder`（placeholder を使わない → Select の `blankLabel` で代用）
- `best-practice-for-layouts`（Cluster に子が 1 つだけ、など）

ADS 版では lint の警告 18 件のうち多くを作った後に直しました。SmartHR 版では、**Do/Don't をスキルで先に読んでいたため、書く段階で避けられたルールが少なくとも 7 つ**ありました。

**後から効いたもの**
- `a11y-heading-in-sectioning-content`：Panel 内に置いた「今週のCTはお休みです」などの見出し 4 か所。実害のある指摘（見出しの範囲が支援技術に伝わらない）
- `a11y-scroller-has-tabindex`：エラーまとめ欄の tabIndex。代わりに最初のエラー項目にフォーカスを移す実装に変えた。結果的にこちらの方が親切
- `best-practice-for-reduce-redundant-calls`：分岐ごとに Panel を書いていたのを 1 つにまとめた

**残した警告**

| ルール | 件数 | 理由 |
| --- | --- | --- |
| `smarthr/require-i18n-text` | 87 | 多言語化しないデモ。原本・ADS 版も文言を直書きしている |
| `@typescript-eslint/no-shadow` | 1 | 原本の `fixtures.ts` をそのままコピーしたため |
| （全ルール）`best-practice-for-rest-parameters` | 5 | `fixtures.ts` の `rest`（お休みの人）が「残余引数と紛らわしい」と判定された。原本のデータ構造なので変えない |
| （全ルール）`best-practice-for-unnesessary-early-return` | 2 | 公式設定では off。フォーム送信の早期 return で、読みやすさを優先 |
| （全ルール）`autofixer-smarthr-ui-migration` | 3 | 移行元・移行先の版を options で指定するルール。今回は対象外 |
| 抑止 1 件：`a11y-scroller-has-tabindex`（main） | — | 画面切り替え後に本文へフォーカスを戻す SPA のフォーカス管理に必要。コード内に理由を書いた |

---

## 7. AI は自発的にハーネスを使ったか（起動条件）

| 観点 | 今回の結果 |
| --- | --- |
| 最初に読んだきっかけ | **人の指示**（「実装を始める前にハーネスを導入・起動する」「SKILL.md の指示どおりに」）。自発的ではない |
| スキルが認識されたタイミング | `paths: ["**/*.tsx", "**/*.jsx"]` のため、**最初の .tsx を書いた後**。部品を選ぶのは書く前なので、指示がなければ選定の段階では呼ばれない |
| 認識された後の起動 | Skill ツールで 1 回起動。返るのは SKILL.md だけで、部品ガイドは自分で開く（Progressive Disclosure）。SKILL.md の「必ず読んでから」という強い指示は効いた。実際に 39 件を読んだ |
| 読む対象の決め方 | 選定表とパターン選定表が明確で、迷わなかった。「import 名 = ファイル名」の規則も分かりやすい |
| 読み落とし | パターンの長い記事（page-layout 52KB、smarthr-table 75KB）は一部しか読んでいない。必要な節を見出しで探す必要があり、全部は読み切れない |

**評価：起動条件は「明確だが遅い」。** description と SKILL.md の指示ははっきりしています。ただ `paths` の条件が「.tsx を触っているとき」なので、新しい画面を作り始める段階（もっともハーネスが必要な段階）では自動で読み込まれません。ADS の調査で他社の事例として挙がっていた「MCP を配っただけでは AI が使わない」という問題を、スキルの `paths` でも同じように抱えています。プロジェクトの AGENTS.md に「smarthr-ui を使う作業では最初に component-guidelines を読む」と書いておくのが確実です。

---

## 8. ADS との比較

ADS 版の評価（[ai-design-intent-mechanisms.md](../../ads-ct-schedule/docs/ai-design-intent-mechanisms.md)）と同じ観点で並べました。

| | ADS | SmartHR Design System |
| --- | --- | --- |
| 誰に向けた AI 対応か | DS を使ってアプリを作る人（の AI） | 同じ。ただし実質は **SmartHR のプロダクト開発者**（AppHeader、テナント、ヘルプセンター、社内の lint 規約が前提） |
| 意図の置き場所 | 構造化データ（usage/content/a11y の指針）→ llms.txt、MCP、CLI、スキル | `checklist.yaml`（人がレビュー）＋ lint の README ＋ `metadata.json` → **スキルだけ**に生成 |
| AI が読める形で配っているか | ◎ llms.txt 8 種、ホスト型 MCP、CLI | ○ スキル（Claude Code／Cursor／Codex 用プラグイン）のみ。llms.txt・MCP なし |
| 社外で使えるか | △ スキルは社内限定（npm 404） | ◎ スキルを公開している |
| 今回の作業で意図が届いたか | △ CLI の `component` は指針を出さなかった。判断は主に事前知識 | ◎ 30 件中 21 件の判断がスキル由来 |
| 機械で強制しているか | ◎ ESLint 117 ルール＋型でトークン以外を拒否 | ○ ESLint 64 ルール（公式設定 eslint-config-smarthr で 45 が有効、16 が off）＋ textlint。トークンは Tailwind のプリセットで限定するが、任意値（`shr-basis-[20rem]` など。今回 5 か所）は書ける |
| 型での強制 | ◎ xcss がトークン以外を型エラーにする | △ Tailwind のクラス名は文字列なので型では守れない |
| 日本語 | × | ◎ ライティング規則と表記辞書 |
| 古くならない工夫 | 「CLI は MCP の薄い層、正は 1 つ」 | 「ガイドは直接編集せず入力ソースから再生成」「パターンはサイト記事へのリンク」 |
| 導入のつまずき | 少ない（`npx` だけ） | 多い（plugin が使えない環境での手動コピー、symlink、`eslint-config-smarthr` と paths、`EnvironmentProvider`） |

### ADS の「3 つの層」で見ると

| 層 | ADS | SmartHR | 今回の実感 |
| --- | --- | --- | --- |
| ① 部品の使い分け | ◎ データ＋配布＋lint（ただし CLI では指針が出なかった） | ◎ チェックリスト＋パターン＋lint | **SmartHR の方が実際に効いた**。理由は「スキルが本文を丸ごと渡す」ことと「must/should/avoid で優先度が分かる」こと |
| ② プロダクトのトーン | ○ content standards（英語） | ◎ ライティング規則（ただし部品の節とパターンに散らばり、全体像はサイトと textlint 側） | 規則は強いが、原本のトーンとは衝突 |
| ③ 画面の意図 | × | × | どちらも持たない。原本の `design-decisions.md` と、この版の [design-decisions.md](design-decisions.md) がその役割 |

---

## 9. このプロジェクトで精度を上げるなら

1. **AGENTS.md に起動条件を書く。** 「smarthr-ui を使う UI 作業では、ファイルを作る前に component-guidelines の component-selector.md と design-pattern-guidelines の pattern-selector.md を読む」。`paths` による自動認識より前に読ませるため。
2. **文言の例外をプロジェクトで決めて書く。** 「ボタンは動詞の終止形」「見出しは名詞」をどこまで守るかを、このプロジェクトの design-decisions.md に一覧で書く（今回の 5 章の表がたたき台）。textlint の allowlist にも反映する。
3. **足りない部品の方針を書く。** アバター、スキップリンク、ヘッダーの構成を、プロジェクト側のスキルか AGENTS.md に置く。
4. **lint の導入をテンプレート化する。** `eslint-config-smarthr` ＋ tsconfig の paths ＋ 全ルール計測の設定（この版の [eslint.config.mjs](../eslint.config.mjs)）をそのまま使えるようにしておく。
5. **SmartHR 側への提案（参考）**：`EnvironmentProvider` の必要性、eslint-config-smarthr の導入手順、Tailwind プリセットの導入をスキルに含める。EmptyTableBody のチェックリストの継承を確認する。

# ハーネスの報告

## 1. 使ったハーネスと導入手順

| ハーネス | 版 | 導入 | つまずき |
| --- | --- | --- | --- |
| 公式プラグイン kufu/smarthr-design-system（スキル `design-pattern-guidelines`・`component-guidelines`） | plugin.json 0.6.0、コミット `3222b543`（2026-11-06）。コンポーネントガイドの基準は smarthr-ui v100.1.0 | `/plugin` はこのリモートセッションでは対話コマンドとして使えないため、`git clone` して `plugins/smarthr-design-system/skills/` をリポジトリ直下の `.claude/skills/` にコピー | ① `patterns/*.mdx` はリポジトリ内 `src/content/...` への**シンボリックリンク**で、`cp -r` ではリンク切れになった。`cp -rL` で実体をコピーし直した。② セッション開始後にコピーしたため、**Skill ツールの一覧に現れず、自動では起動しなかった**。SKILL.md の指示に従って自分でファイルを開いて読んだ |
| smarthr.design の公式ドキュメント（情報設計・使用性） | 同じリポジトリの `src/content/articles/products/` | clone したソースを `cat -n` で読み、公開サイトを 1 ページ `curl` して本文が一致することを確認 | 情報設計の記事は**スキルに含まれていない**（pattern-selector.md に情報設計の項目が無い）。ブリーフの指示が無ければ読まなかった可能性が高い。各アウトプットの「作成手順」は社内 Notion へのリンクで、読めなかった（`ia/conceptual-model.mdx.txt`、`ia/object-model.mdx.txt:91-93`） |
| 公式 lint：eslint-config-smarthr（eslint-plugin-smarthr 同梱） | 14.14.2（plugin 6.29.2） | `npm i -D eslint@9 eslint-config-smarthr`、`eslint.config.mjs` に `...smarthr` | ① peer が TypeScript ≤6 のため、TypeScript 7 から 5.9 に下げた。② 初回は**起動しなかった**：「tsconfig.json の compilerOptions.paths に `"@/*"` を指定してください」。`paths` を足して解決 |
| 公式 lint：textlint-rule-preset-smarthr | 1.38.3 | `.textlintrc.json` に `preset-smarthr` | `.tsx` を読むプラグインが無いので、UI 文字列を抽出したテキスト（`lint-logs/ui-strings.txt`）にかけた。見出しやラベルを 1 文として扱うため `ja-no-mixed-period` の誤検出が多い |

実行したコマンドと出力は `harness-logs/00-commands.md` と `lint-logs/`。

## 2. 情報構造（画面の分け方・主役・ナビゲーション）の決め方に効いたか

**結論：手順と点検の観点としてはよく効いた。何を主役にするか・画面をいくつに分けるかの「答え」は出してくれず、そこは自分で決めた。**

### 効いた記述

| 記述（原文） | 場所 | 何が変わったか |
| --- | --- | --- |
| 5 種類のアウトプット（業務の説明・概念モデル・オブジェクトモデル・ビューの呼び出し関係・メインナビゲーション） | `ia/ia-outputs.mdx.txt:38-60` | **作業の順序そのもの**になった。`information-architecture.md` の章立てはこれに従った |
| 「名前の末尾に同じ言葉を持つ概念が複数ないか」…「1つの概念にまとめ」 | `ia/conceptual-model.mdx.txt:130` | ブリーフの「投稿予定」と「公開済みの投稿」を 1 つの「投稿」にまとめ、ステータスで区別した |
| 「『〇〇の▢▢』といった概念が登場していないか」 | `ia/conceptual-model.mdx.txt:127` | 「自分の担当」「予定の無い週」を独立した概念・画面にせず、関係と絞り込みとして扱った |
| 「文字列や数値や日付をオブジェクトとしていないか…『期間』『年度』…はプロパティとして扱います」 | `ia/object-model.mdx.txt:109` | 「週」をオブジェクトにせず、ビューのまとまりの単位にとどめた。これで「週の詳細画面」のような余計なビューを作らずに済んだ |
| 「画面上のレイアウト（ビュー）を示す言葉がオブジェクト名になっていないか」（「図」「表」「一覧」） | `ia/object-model.mdx.txt:108` | 「計画」「スケジュール」をオブジェクトにしないと決めた |
| ビューを「コレクション／シングル／シングル・ダイアログ」＋オブジェクト名で書く図 | `ia/view-relationship-diagram.png` | 画面を「投稿のコレクションが 2 つ、メンバーのコレクション、投稿のシングル、ダイアログ」として数えられた |
| 「同じ画面に表示して編集したい内容が、別々の画面にある」「よく使う機能が深い階層にある」 | `ia/information-architecture.mdx.txt:39, 41` | 遅れ一覧・空き週一覧を別画面にしない、ナビを 1 階層にする根拠 |
| 「オブジェクト同士を属性情報で比較するユースケースがある場合に有効」（コレクション（テーブル）） | `patterns/page-layout.mdx.txt:181` | 書く人の画面をテーブルにした |
| 「重要な情報は、上部や左側に配置する」「優先度が高い情報は、上部に配置する」 | `patterns/visual-guidance.mdx.txt:50-51` | 遅れと空き週を最初の画面の見出し領域に置いた |
| 「［オブジェクトを追加］は一覧画面における主要なアクションにはなりえない」 | `patterns/visual-guidance.mdx.txt:209` | **事前知識なら Primary にしていた「投稿を追加」を Secondary にした**。ページ上の Primary が 0 になった |
| IA レビューの観点（概念モデルとオブジェクトモデルの一致、ビューとユーザーストーリーの一致、ナビとユーザーストーリーの一致） | `ia/usability-ia-review.mdx.txt:65-69` | 情報構造の自己点検（`information-architecture.md` 7 章） |

### 効かなかった点

- **最初の画面の主役を何にするか**：ハーネスには「ダッシュボード」「ホーム」の型が無い（視線誘導で「ダッシュボード画面」に触れるのみ：`patterns/visual-guidance.mdx.txt:47`）。週ごとの予定を主役にしたのはブリーフの目標から自分で決めた。
- **時間軸のビュー（週・月・カレンダー・タイムライン）**：パターンが無い。Calendar は日付選択の部品で単独では使わない（`components/00-component-selector.md:24`）、Timeline は「操作履歴や更新履歴」用（同 `:108`）。「週を見出しにしたリスト」はハーネスの部品を自分で組み合わせたもので、パターンの裏付けは無い。
- **同じオブジェクトのコレクションを 2 つ持つこと（投稿計画と自分の担当）の是非**：判断材料が無かった。IA レビューで指摘されうる点として残した。
- **操作を持たないオブジェクト（メンバー）**：観点 #1 に従えば「プロパティ」だが、比較のためのビューが要る。ハーネスの観点と目標が衝突したとき、どちらを優先するかの指針は無い。
- 作成手順の詳細は社内 Notion にあり、外部からは読めない。

## 3. 部品・状態の判断への効き方

| 判断 | 効いた記述 | 効き方 |
| --- | --- | --- |
| 遅れを StatusLabel にしない | 「1つのオブジェクトに対して複数の StatusLabel を設定しない」「インスタンスごとに異なる値をラベルに埋め込まない」（`components/StatusLabel.md:35, 41`） | 「遅延」ラベルを足す案を取りやめ、ResponseMessage の文字にした |
| 注意の表示部品 | NotificationBar を画面全体で使うのは「システムからの通知の表示に限定する」（`components/NotificationBar.md:33`） | 遅れ・空き週は InformationPanel、操作結果だけ NotificationBar、と分けた |
| 成否・読み込み・空 | `patterns/feedback.mdx.txt:115, 221, 238, 510, 564`、`patterns/smarthr-table.mdx.txt:1207-1218, 1250` | ほぼそのまま採用。文言も「該当する投稿はありません。別の条件を試してください。」をそのまま使った |
| 削除と取りやめ | `patterns/delete-dialog.mdx.txt:10-131` | ダイアログの構成と文言をそのまま採用。「元に戻せるなら確認は不要」（`:12`）で取りやめの確認を省いた |
| 権限 | `patterns/access-control-pattern.mdx.txt:13-15, 23, 41-47` | 表示パターン B（非表示＋理由）に統一 |
| 入力部品 | `patterns/selection-component-usage.mdx.txt:23-31`、`patterns/multiple-inputs-field.mdx.txt:48-73` | カテゴリ・ステータスは RadioButton、書く人は MultiCombobox、期間は Fieldset＋FormControl（`unrecommendedHide`） |
| 必須の未入力 | FormControl「`onInvalid` でエラーを処理し、`preventDefault()`」（`components/FormControl.md:132`） | 操作確認で標準ツールチップが出ていることに気づき、この記述に従って直した |

## 4. 答えてくれなかったこと・誤り・ずれ

| 種類 | 内容 | 根拠・対処 |
| --- | --- | --- |
| **版のずれ** | ガイドは v100.1.0 基準。v102.1.0 では DefinitionList に `items`・`maxColumns` が無く、`<DefinitionListItem term fullWidth>` を並べる形だった。ガイドのチェックリスト「[must] `maxColumns` で列数を指定する」は守れない | `components/DefinitionList.md:20, 57-59` と `node_modules/smarthr-ui/lib/components/DefinitionList/*.d.ts`。SKILL.md の「実際の型定義を正とする」に従った |
| **記述の不足** | `useEnvironment` を使えと書くが、`EnvironmentProvider` が必要なことが書かれていない。実行時エラーになった | `patterns/mobile-friendly-layout.mdx.txt:52-70` |
| **ハーネスと lint の衝突** | 削除ダイアログは「『？』の後には、全角スペースを挿入」と言うが、eslint の `no-irregular-whitespace` が JSX テキスト中の全角スペースをエラーにする | `patterns/delete-dialog.mdx.txt:83`。文字列リテラル `{'…？　…'}` にして両立させた |
| **部品の制約** | AppHeader のロゴリンクは `target` を受け取れない（ブリーフは別タブを求める）。描画後に属性を足した | `node_modules/smarthr-ui/lib/components/Header/Header.js:69` |
| **部品の制約** | `desktopAdditionalContent` はログイン中のユーザーメニューの中にしか出ない。未ログインのログインボタンを置けず、`children` に置いた。ガイドの Props 表には説明が無い | `components/AppHeader.md`（説明欄が「-」）、`DesktopHeader.js:62` |
| **DS 自体のアクセシビリティ** | ヘッダーの既定の背景色 #00c4cc と白文字のコントラスト比が 2.14:1 で axe の color-contrast 違反。色は CSS に直書きで、テーマでは変えられない | `smarthr-ui.css` の `.shr-bg-brand`。自前の CSS で上書き（下記） |
| **ユーティリティクラス** | `shr-*` クラスは smarthr-ui.css に**部品内部で使うものだけ**が入っている。ハーネスの実装例が `className="shr-..."` を使うため、任意のクラスが使えると誤解しやすい | 実装中に CSS を検索して確認。使ったクラスはすべて存在を確かめた |
| **lint と情報設計の用語の衝突** | 情報設計の記事は「ビュー」を用語として使うが、textlint の prh は「アプリケーションの操作画面は『画面』で表記する」としてビューを指摘する。UI 文言向けの規則と、設計文書の用語がぶつかる | `lint-logs/textlint-docs-final.txt` |
| **lint の多言語前提** | `smarthr/require-i18n-text` が日本語の直書きをすべて警告（78 件）。ブリーフは日本語のみで多言語化は不要と判断し、警告のまま残した | `lint-logs/eslint-final.txt` |
| **ResponseMessage の中のリンク** | ResponseMessage は読み上げ用の領域を持ち、中にリンクを置くと aria-hidden の中にフォーカスできる要素ができる（axe aria-hidden-focus）。ガイドにこの注意は無い | `lint-logs/capture-1st.txt`。リンクを外に出した |

## 5. AI が自発的に使ったか

- **スキルは自動では起動しなかった**（上記 1 の②）。ブリーフの指示で導入し、SKILL.md の「事前知識のみで答えず、必ず…読んでから」に従って、自分でファイルを開いた。
- 情報設計の記事は、**ブリーフで指定されたので読んだ**。スキルの選定表からはたどれないため、指定が無ければ読まなかったと思う（推測）。
- 実装中は、部品を使う前に個別ガイドを開く習慣で動いた（`harness-logs/components/` の 18 ファイル）。一方で、版のずれ・部品の制約は**ガイドではなく型定義と smarthr-ui のソースを読んで**解決した。

## 6. 「SmartHR Design System らしさ」

- **らしいところ**：AppHeader＋AppNavi、PageHeading とリード文の見出し領域、見出し＋Panel のセクション、ページ上に Primary を置かない、StatusLabel の色の使い分け（警告色を特別な状態に残す）、権限による非表示＋理由、削除ダイアログの文言、「一覧」を付けない見出し、全角と半角の間にスペースを入れない文言。
- **らしくないところ**：① ヘッダーの色を変えた（コントラストのため。Gaji-Labo のサービスなので SmartHR の色である必要も無い）。② 週ごとのリストはハーネスに無い組み合わせ。③ 「よくあるテーブル」の一時操作エリアに検索ではなく期間と書く人を置いた。④ 書く人のテーブルにページ送り・検索を置いていない（10 人なので不要と判断）。

## 7. 自前の CSS

`index.html` の 2 つだけ。

1. `body { margin: 0; background-color: #f8f7f6; }`：ブラウザ既定の余白を消し、ページの背景を smarthr-ui の BACKGROUND と同じ色にする。smarthr-ui.css は `body` の余白と背景を設定しない。
2. `.smarthr-ui-Header.shr-bg-brand { background-color: #00757a; }`：ヘッダーの既定色は白文字とのコントラスト比 2.14:1 で axe 違反。色が CSS に直書きでテーマから変えられないため上書き（5.49:1）。

ほかに、ロゴの SVG に `height="20"` を属性で付けた（ブリーフの SVG に大きさが無いため）。

## 8. 公式 lint の最終結果

| lint | 対象 | 最終結果 | 記録 |
| --- | --- | --- | --- |
| eslint-config-smarthr 14.14.2 | `src/` | **0 errors、78 warnings**（すべて `smarthr/require-i18n-text`）。初回は 131 件（48 errors：best-practice-for-default-props、best-practice-for-text-component、a11y-anchor-has-href-attribute、best-practice-for-date、best-practice-for-layouts、a11y-heading-in-sectioning-content など）。すべて直した | `lint-logs/eslint-1st.txt`、`eslint-final.txt` |
| textlint-rule-preset-smarthr 1.38.3 | UI 文字列 | `ja-space-between-half-and-full-width` 12 件と、関連する同じ文言を直した。残りは `ja-no-mixed-period` 59 件と `no-unmatched-pair` 1 件で、見出し・ラベル・テンプレート文字列を 1 文として抜き出したことによる誤検出 | `lint-logs/textlint-ui-1st.txt`、`textlint-ui-final.txt` |
| 同上 | `docs/*.md`、README | README は `--fix` を当てて 4 件（「ダイアログ」を「画面」にする prh 3 件と、コロンで終わる行 1 件）。prh の「ダイアログ → 画面」は UI 文言向けの規則で、開発者向けの文書では意味が変わるため戻した（`dict/prh-idiomatic-usage.yml:1230`）。`docs/*.md` は 201 件を**直していない**：ハーネスの原文の引用（原文自体が「1 つの画面で Primary ボタン」のように全角と半角の間にスペースを入れている）と、ハーネスの情報設計の用語「ビュー」（prh は「画面」と書けと言う）を書き換えないため。内訳は全体で ja-space-between-half-and-full-width 97、prh-rules 99（漢字→平仮名、ビュー→画面など）、sentence-length 5、その他 4 | `lint-logs/textlint-docs-1st.txt`、`textlint-docs-final.txt` |
| axe（WCAG 2.1 AA）・横はみ出し | 45 状態 × 1440/390 | **違反 0、はみ出し 0**（初回は color-contrast と aria-hidden-focus） | `lint-logs/capture-1st.txt`、`capture-final.txt` |

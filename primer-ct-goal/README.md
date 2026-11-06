# CTスケジュール（Primer 版）

`brief/` のブリーフから、Primer（GitHub）を使って CTスケジュールを白紙から設計・実装し、Primer の AI 向けハーネスが設計にどこまで効くかを調べたものです。

- 設計の意図：[docs/design-decisions.md](docs/design-decisions.md)（第 1 部は実装前の下書き、第 2 部は実装後のまとめ）
- 判断チェックリスト D01〜D30（根拠の種類と時系列）：[docs/decision-checklist.md](docs/decision-checklist.md)
- 目標の自己評価：[docs/goal-evaluation.md](docs/goal-evaluation.md)
- **ハーネス調査（この調査の主目的）**：[docs/harness-report.md](docs/harness-report.md)
- 状態の一覧：[states.json](states.json)（S01〜S18）
- スクリーンショット：[screenshots/](screenshots/)（S01〜S18 × 1440px／390px、`report.json` に axe とはみ出しの結果。`extra-G5-uncheck-*.png` は G5 の証拠として追加撮影）
- ハーネスの呼び出しログ：[harness-logs/](harness-logs/)

## 結論の要約

- **主役は「今週のあなたの相手」の Card と、その中の緑の「ハドルを始める」ボタン**。390×667 でもスクロールなし、相手の確認は 0 操作、ハドル開始はタップ 1 回（計測済み）。
- Primer のハーネスで実体があるのは **MCP サーバー `@primer/mcp`（ツール 20 個）** と **lint（`@primer/stylelint-config`、`eslint-plugin-primer-react`）**。サイト全体の llms.txt と DESIGN.md はない（部品ごとの llms.txt はある）。
- **パターン（19 個）は、部品の選び方・置き場所・文言にはよく効いた**。通知の使い分け、削除の確認、フォームの保存、劣化・空状態の判断は、ほぼパターンの記述どおりに決められた。
- **画面構成と主役の決め方には効かなかった**。何を主役にし、画面をどう分けるかを扱う指示はなく、ブリーフと自分の判断で決めた。
- 道具としてはむらがある：部品ガイドラインの 52 回中 16 回が中身の代わりに primer.style のトップページを返した（エラーにならない）。`lint_css` は stylelint と設定を手で入れるまで動かず、動いても違反の内容を返さない。`review_alt_text` は判定を呼び出し元の LLM に任せる仕組みだった。
- 検査：axe（WCAG 2.1 AA）違反 0、横はみ出し 0（36 枚）。stylelint と eslint-plugin-primer-react も 0 件（理由つきで無効化した箇所あり）。

## 画面構成

| 画面 | URL | 何があるか |
| --- | --- | --- |
| 共通 | — | ヘッダー：Gaji-Labo ロゴ（別タブで gaji.jp）、アプリ名、ログイン中の人（アイコン＋名前のメニュー：自分の設定／ログアウト）または「Slack でログイン」。その下に UnderlineNav（組み合わせ／メンバー（人数）／自分の設定） |
| 組み合わせ | `/` | 上から、CT の時刻と参加者数 → **今週のあなたの相手**（大きいアイコンと名前、ハドルを始める）→ 今週の組み合わせ（全ペア、自分の行を強調、各ペアのハドルボタン、お休みの人）。右（390px では下）に**これからの予定**（次のあなたのお休み、各週の「あなた：〇〇 さん」と他のペア、祝日は「CT なし」、すべて「予定」の印つき） |
| メンバー | `/members` | 参加／不参加／初回設定未完了の人数、社員番号順の一覧（状態は文字の Label）、自分の行から設定へ、他の人の行から削除（確認ダイアログ） |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・CT に参加する。参加を変えると、その場で「全員の組み合わせが組み直される／参加者 9 人 → 8 人」を予告 |
| 初回設定 | どの URL でも | 必須項目が未入力の人には、設定フォームを「CTスケジュールへようこそ」として出す。終わると組み合わせへ |
| 404 | その他 | 「組み合わせに戻る」 |

状態ごとの表示（読み込み中・失敗・空・お休み・祝日・未設定など）は [docs/design-decisions.md](docs/design-decisions.md) 第 2 部の「通知の使い分け」を参照。

## 部品の対応

| ブリーフの要素 | Primer の部品 |
| --- | --- |
| 画面の骨格 | `PageLayout`（`Content`＋`Pane`）、`Stack` |
| 現在地・画面の切り替え | `UnderlineNav`（`aria-current="page"`、メンバー数は `counter`） |
| ログイン中の人とメニュー | `ActionMenu`＋`ActionList`、`VisuallyHidden` |
| 今週の相手 | `Card`（experimental）、`Heading`、`Label`、`Button variant="primary" size="large"` |
| 人の表示 | `Avatar`（画像があるとき）、**自作の頭文字アバター**（画像がないとき） |
| 状態の印（あなた・参加・不参加・予定・CT なし・初回設定未完了） | `Label`（accent／success／secondary／attention） |
| ハドル（デモ通知） | `Button`／`Banner variant="info" layout="compact"` |
| 未ログインの案内・ログイン失敗・保存失敗・初回設定完了 | `Banner`（info／critical／success） |
| 保存成功・影響の予告・uチャンネル未設定・削除成功 | `InlineMessage`（experimental。success／warning） |
| 読み込み中 | `SkeletonText`、`SkeletonAvatar`、`AriaStatus` |
| 失敗・空・404 | `Blankslate`（experimental） |
| 削除 | `IconButton`（`TrashIcon`）、`ConfirmationDialog`（danger）、ダイアログ内 `Banner flush` |
| 設定フォーム | `FormControl`、`TextInput`、`Select`、`Checkbox`、`Button loading` |
| アイコン | `@primer/octicons-react`（Calendar、Clock、People、Gear、SignIn/Out、CommentDiscussion、Moon、Sync、Alert、Trash） |

## Primer の制約（今回ぶつかったもの）

- `Avatar` は画像が必須で、頭文字の代替表示がない → CSS Modules で自作。人ごとの色に使える `display-*` トークンは Primer の stylelint で「alpha」と警告される（理由を書いて無効化）。
- `Header` は GitHub 用のダークなヘッダーで、外部ブランドのロゴを置く用途に合わない → 面と余白だけ自作し、並びは `Stack`。
- 「表示専用の人の一覧」に当たる部品がない（`ActionList` は操作用、`DataTable` は 390px で溢れる）→ `ul/li` にトークンで区切り線だけを付けた。
- `Blankslate`・`InlineMessage`・`Card`・`Skeleton*` は `@primer/react/experimental` からの読み込み。
- `Blankslate.PrimaryAction` は `href` と `onClick` を同時に受けないため、画面内の移動もページの読み込みになる。
- `Text as="p"` にブラウザ既定の段落マージンが残る → `.Main p` で打ち消し。
- `sx` と `Box` は使わない（`primer_coding_guidelines`）。自前 CSS は 5 ファイル・240 行。各ファイル先頭に理由を書いた（一覧は design-decisions 第 2 部）。
- CSS Modules のクラス名は PascalCase（`eslint-plugin-primer-react` の `enforce-css-module-identifier-casing`）。

## 依存とサイズ

| 種類 | パッケージ |
| --- | --- |
| 実行時 | `@primer/react` 38.44.0、`@primer/primitives` 11.10.0、`@primer/octicons-react` 19.42.0、`react` / `react-dom` 19.3.1 |
| ハーネス | `@primer/mcp` 1.1.2、`@modelcontextprotocol/sdk` 1.32.2（MCP を呼ぶため）、`@primer/stylelint-config` 13.6.0 ＋ `stylelint` 16.26.1、`eslint-plugin-primer-react` 9.4.0 ＋ `eslint` 9.39.5 ＋ `typescript-eslint` 8.72.1 |
| ビルド・検査 | `vite` 8.3.6、`typescript` 5.9.3（typescript-eslint が 7 に未対応のため 5.9 に固定）、`@axe-core/playwright` 4.14.0 |

本番ビルド（`npm run build`）：JS 878.81 kB（gzip 218.51 kB）、CSS 278.59 kB（gzip 41.55 kB）、`dist/` 合計 1.2 MB。コード分割はしていない。

## 動かし方

```sh
cd primer-ct-goal
npm install
npm run dev            # http://localhost:5173
```

状態を直接開く（一覧は `states.json`）：

| 例 | 状態 |
| --- | --- |
| `/` | S01 今週・ログイン中（id=1） |
| `/?user=guest` | S02 未ログイン |
| `/?user=9` | S03 自分が今週お休み |
| `/?today=2026-10-12` | S04 祝日の週 |
| `/?data=loading` ／ `/?data=error` | S06 読み込み中 ／ S07 読み込み失敗 |
| `/?user=11` | S15 初回設定 |
| `/members?confirm=10&result=delete-failed` | S14 削除に失敗 |

パラメータ：`user`（`guest` か id）、`data`（`loading`／`error`／`few`／`empty`）、`unset`（uチャンネルを未設定にする id）、`today`（基準の週）、`login=failed`、`result`（`saved`／`save-failed`／`delete-failed`）、`confirm`（削除確認を開く id）、`submitted=1`。`user`・`data`・`unset`・`today` は画面を移動しても引き継がれます。

検査：

```sh
npm run lint           # eslint-plugin-primer-react
npm run lint:css       # @primer/stylelint-config（MCP の lint_css と同じ設定）
npm run build && npx vite preview --port 5173 &
npm run capture        # brief/scripts/capture.mjs と同じ内容。screenshots/ に撮影・axe・はみ出し
npm run mcp -- call get_pattern '{"name":"Delete"}'   # Primer MCP を呼ぶ（harness-logs/ に保存）
```

`npm run capture` は、プリインストールの Playwright を使うため `NODE_PATH=$(npm root -g)` を付けて `harness/capture.mjs`（`brief/scripts/capture.mjs` の写し）を実行します。

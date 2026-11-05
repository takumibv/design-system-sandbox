# CTスケジュール UI × Ant Design 再現検証

[takumibv/digital-go-design-system `codex/ct-schedule-ui`](https://github.com/takumibv/digital-go-design-system/tree/codex/ct-schedule-ui) で、デジタル庁デザインシステム（DADS）を使って作った画面があります。この画面を Ant Design（antd v6.7.0）で再現し、Ant Design が公開している AI エージェント向けの仕組み（ハーネス）を実際に使って、デザイン意図がどこまで実装に効くかを調べました。同じ調査を Atlassian Design System で行った [ads-ct-schedule](../ads-ct-schedule/) と、手順と成果物の形をそろえています。

- 使ったハーネス：公式 CLI `@ant-design/cli`（v6.7.0）、同梱スキル `antd`、`antd mcp`、公式 [DESIGN.md](https://ant.design/design.md)、[llms.txt](https://ant.design/llms.txt) と部品文書・設計仕様、`antd lint`、`@google/design.md` の lint
- Ant Design 版：[`src/CTApp.tsx`](src/CTApp.tsx)（1 ファイル）＋ [`src/main.tsx`](src/main.tsx)（テーマ）。**自前の CSS ファイルは 0 行**。`style` は 17 か所で、値はすべてトークンから取得
- **ハーネスの検証レポート（この調査の主目的）**：[docs/harness-report.md](docs/harness-report.md)
- デザイン判断の言語化：[docs/design-decisions.md](docs/design-decisions.md)
- プロジェクト用 DESIGN.md（公式との差分だけを書いたもの）：[DESIGN.md](DESIGN.md)
- 実行したコマンドと出力：[harness-logs/](harness-logs/)（索引は [commands.md](harness-logs/commands.md)）
- 原本の props、状態、固定データ（[`src/fixtures.ts`](src/fixtures.ts)）、文言はそのまま使いました。

## 結論（要約）

| 観点 | 評価 | ひとこと |
| --- | --- | --- |
| 機能・情報構造 | ◎ ほぼ 100% | 16 状態すべてを antd の部品で表現できた。足りないのはスキップリンクだけ |
| 見た目の再現度 | △ 約 5 割 | アバター・和文フォントは原本どおりになったが、DESIGN.md に従った結果「灰色の背景＋白いカード」の管理画面らしい見た目になり、主役の強調も弱くなった |
| アクセシビリティ | ○ | axe（WCAG 2.1 AA）は 16 状態 × 2 幅で **0 件**、横はみ出しも 0。ただし**既定のテーマのままでは 1 画面 5〜33 件のコントラスト違反**があり、トークンを 7 つ変えた |
| Ant Design 準拠度 | ◎ | `antd lint` 0 件、`antd doctor` 14 項目すべて合格。ただし lint はほぼ非推奨 API しか検査しない |
| 日本語 UI | ○ | `locale={jaJP}` と `fontFamily` トークンで素直に入った。和文についての指針はハーネスに何もない |
| 依存・サイズ | △ | 本体 JS は gzip で **347KB**（ADS 版 285KB、原本は JS 55KB ＋ CSS 115KB）。依存ツリーは 279 行（ADS 版は約 1,000 行） |

**Ant Design のハーネスで最も効いたのは DESIGN.md でした。** 「primary は 1 画面に 1 つ」「1 回限りのアクセント色を作らない」「ページ → カード → 浮く面の 3 層」といった画面全体の原則が、実装前に判断の根拠になりました（31 件の判断のうち 19 件がハーネス由来）。CLI は、学習データにない `Listy`（v6.6 で `List` の後継）や非推奨の props を正しく教えてくれました。一方で、DESIGN.md は Ant Design の既定（業務の管理画面）の意図なので、**この画面の主役や和文の扱いは書かれておらず、従うほど原本の「やさしい案内」からは遠ざかりました。** lint もデザインの規則は検査しません。

ADS は「部品を正しく使わせる」仕組み（部品ごとの指針、117 の lint ルール、型）が強く、Ant Design は「画面全体の見せ方をそろえさせる」仕組み（DESIGN.md）が強い、という違いがはっきりしました。

## ハーネスの使用感

詳しくは [docs/harness-report.md](docs/harness-report.md) にあります。

**良かった点**

- **DESIGN.md が画面の判断に直接効く。** 色の役割（主色・機能色・プリセット色）、面の構成、強調の方針が 1 ファイルにまとまっている。ADS には同じ層がない。
- **CLI がすべてオフラインで、版ごとに正確。** `antd doc List` で非推奨の注記、`antd info --detail --format json` で Alert の `message`→`title`、Space の `direction`→`orientation` が分かり、事前知識の古さを正せた。
- **スキルの起動条件が明確。** 「antd のコードを書く前に必ず `antd info` で調べる。記憶に頼らない」「変更後に `antd lint`」。
- 設計仕様（`docs/spec/*.md`）に、ボタンのアイコンは 1 つまで、アイコンだけのボタンには Tooltip、通知の部品の使い分け、404 ページのテンプレートなどの具体的な指針がある。

**気になった点**

- **DESIGN.md を読むきっかけが弱い。** スキルでは「部品のコードを書く」手順の 5 つ目、MCP の指示文では「テーマ・トークンの作業のとき」だけ。MCP のページ生成プロンプトは DESIGN.md に触れていない。
- **DESIGN.md のアクセシビリティの注記が足りない。** 主色だけを AA 未満としているが、補足文の灰色（3.29:1）、Tag の warning（1.82:1）なども AA 未満だった。
- **ハーネスの中で食い違いがある。** 文字の太さ（DESIGN.md は 400／600、設計仕様 font は 400／500）、余白のスケール（DESIGN.md は 6 段、実際は 12・20 もある）、primary の単位（画面／セクション／ボタングループ）。
- `antd token` は既定値を返さない。`antd info` のテキスト出力には非推奨の印がない（`--detail --format json` が必要）。`antd --version` は CLI の版ではなく対象の antd の版を指定するオプション。
- `antd lint` は primary の数、直書きの色、マジックナンバー、Tag の誤用などを検出しない（わざと違反を入れたファイルで確認）。

## 部品の対応表

| 原本（DADS／自作） | Ant Design 版 | 再現度・メモ |
| --- | --- | --- |
| DADS `Button`（solid-fill／outline／text） | `Button` type=primary／default／text／link | ○ 高さは 32px が基本（large で 40px） |
| 削除ボタン（独自定義） | `Button danger` | ◎ |
| 週送り ‹ › | `Button icon` ＋ `Tooltip` | ◎ 設計仕様に従い Tooltip を付けた |
| 自作 `Avatar`（色付き＋イニシャル） | `Avatar`（文字）＋プリセット色トークン | ◎ 原本どおり。色は `style` で当てた |
| 自作 `Notice`（status／alert） | `Alert`（続く状態）＋ `message`（操作の結果） | ◎ message は約 3 秒で消える |
| `<dialog>` ＋自前のフォーカストラップ | `Modal` | ◎ フォーカス管理は antd 任せ。最初のフォーカスはキャンセル |
| パンくず | `Breadcrumb` | ◎ |
| DADS `Input`／`Select`（native） | `Form` ＋ `Input`／`Select` | ○ Select はネイティブではない。検証は `rules` で行う |
| DADS `Checkbox` | `Checkbox` | ◎ |
| 必須ラベル・補足文 | `Form.Item` の `requiredMark`／`extra`／`rules` | ◎ 「（必須）」は `requiredMark` で表記 |
| タグ（今週・祝日・設定未完了・あなた） | `Tag` | ◎ |
| 参加状況のタグ | `Badge status` ＋文字 | ○ DESIGN.md に従い、分類（Tag）と状態（Badge）を分けた |
| みんなの組み合わせ（自作リスト） | `Listy`（v6.6 の新部品） | ○ 自分の行の色は `style` で当てた |
| メンバー表（自作 grid） | `Table` | ○ 390px で社員番号の列を隠した。参加状況の列は窮屈 |
| 人数の表示 | `Statistic` | ◎ |
| 空・失敗状態 | `Empty`、`Result`（error／404） | ◎ |
| 読み込み中 | `Spin` | ◎ |
| 自作 SVG アイコン 4 種 | `@ant-design/icons` | ◎ |
| 2 カラム | `Row`／`Col`（24 グリッド） | ◎ |
| ヘッダー（ブランドバー＋サービスバー） | `Layout.Header` ＋ `Flex` | ○ Header の高さ 64px 固定を `style` で外した |
| スキップリンク | 自作（素の `<a>`） | △ 部品がない |

## 画面比較

`screenshots/compare/` に 16 状態 × 2 幅（1440／390px）の比較画像（左：原本、右：Ant Design）があります。

- 今週（PC）：[compare/schedule-default-1440.png](screenshots/compare/schedule-default-1440.png)
- 今週（SP）：[compare/schedule-default-390.png](screenshots/compare/schedule-default-390.png)
- 未ログイン：[compare/schedule-guest-1440.png](screenshots/compare/schedule-guest-1440.png)
- メンバー一覧：[compare/members-default-1440.png](screenshots/compare/members-default-1440.png)
- 削除確認：[compare/members-delete-confirm-1440.png](screenshots/compare/members-delete-confirm-1440.png)
- 入力エラー（SP）：[compare/settings-validation-390.png](screenshots/compare/settings-validation-390.png)

見た目で大きく違うところ：

1. **背景とカード**：原本は白い背景に枠線。Ant Design 版は DESIGN.md の 3 層モデルに従い、灰色の背景に白いカードを並べた。
2. **主役の強調**：原本は濃い青の太い線、ADS 版は薄い青の面。Ant Design 版は DESIGN.md の「アクセント色を作らない」に従い色を足さず、大きいアバターと 1 つの primary ボタンだけで示した。
3. **文字**：本文 14px（原本 16px）。見出しは 30／20／16px に割り当て直した。
4. **アバターと和文フォント**：原本どおり（色付きのイニシャル、Noto Sans JP）。ADS 版で再現できなかった 2 点。

原本の画像は、ADS 版の検証で撮影したものを流用しています。このセッションでは原本の Storybook のビルドが権限判定で実行できなかったためです。原本リポジトリは撮影時から更新されていません（`c6ee7a6`、2026-10-10）。

## Ant Design の制約として分かったこと

- **`Typography.Title` の `level` は、見出しの要素と大きさを同時に決める。** h2 は 30px になる。グローバルの `fontSizeHeading*` を変えると Statistic・Result・Modal・Alert まで変わるので、`components.Typography` で部品単位に上書きした。
- **既定のテーマは WCAG AA を満たさない箇所が多い。** 補足文の灰色（0.45 の透過黒）、Tag の状態色、エラー文の赤など。seed を暗くすると派生色が濁る場合もある（warning の背景が #C7C2B3）。
- **`style` は任意の値を受け付ける。** トークンを使うかは書く人次第で、型も lint も守ってくれない（ADS の `xcss` は型で拒否）。
- **antd v6 は body をリセットしない。** モーダルを開くとスクロールを止める処理と body の 8px の余白が重なり、横に 8px はみ出した。`antd/dist/reset.css` で解消した。
- `Layout.Header` は高さ・行間 64px 固定が既定で、2 段のヘッダーには `style` が必要。
- `Card` に `component`（要素の指定）がない。`Flex` にはある。
- `message`（操作の結果の通知）は約 3 秒で消える。読み上げに時間のかかる人には短い可能性がある（未検証）。

### 公式の検査の結果

| 検査 | 結果 | メモ |
| --- | --- | --- |
| `antd lint ./src` | **0 件** | わざと違反を入れたファイルでは非推奨 6 件だけを検出（[23](harness-logs/23-lint-probe.txt)） |
| `antd doctor` | 14 項目すべて合格 | |
| `design.md lint`（公式 DESIGN.md） | エラー 0、警告 19 | コントラスト 2（primary ボタン 4.10:1、選択メニュー 3.66:1）、未参照のトークン 17 |
| `design.md lint`（プロジェクト用 DESIGN.md） | エラー 0、警告 0 | |
| axe（WCAG 2.1 AA）初回 | 32 ケースすべてで違反、合計 583 ノード | すべて color-contrast（[30](harness-logs/30-axe-initial-report.json)） |
| axe（WCAG 2.1 AA）最終 | 32 ケースすべて 0 件、横はみ出し 0 | [screenshots/report.json](screenshots/report.json) |
| ブラウザのコンソール | 警告・エラー 0 件 | antd の非推奨警告も出ていない（[screenshots/console.txt](screenshots/console.txt)） |

残した警告はありません。

## 動かし方

```sh
npm ci
npm run dev           # http://localhost:6011/?screen=members&state=loading&signedIn=0&dialog=1
npm run build         # 型チェックとビルド
npm run lint:antd     # antd 公式 lint
npx antd doctor       # 設定の診断
npx design.md lint DESIGN.md
```

比較スクリーンショットを撮るには、開発サーバーを起動してから実行します。原本の Storybook を 6008 番ポートで配信している場合は `ORIGINAL_URL` を付けると原本も撮影します。付けない場合は `../ads-ct-schedule/screenshots/original/` の画像を流用します。

```sh
ANTD_URL=http://localhost:6011 npm run screenshots
ORIGINAL_URL=http://localhost:6008 ANTD_URL=http://localhost:6011 npm run screenshots
```

`screenshots/report.json` に各ケースの axe 違反と横はみ出し量、`screenshots/console.txt` にブラウザの警告が出力されます。

MCP サーバーの中身を確かめるには次を実行します（エージェントの設定に登録せずに、ツールやプロンプトを直接呼べます）。

```sh
node scripts/mcp-probe.mjs out.json '[["tools/list",{}],["prompts/get",{"name":"antd-page-generator"}]]'
```

## 次に試すとよさそうなこと

- `npx skills add ant-design/ant-design-cli` か `antd setup --client claude --mode both` でスキルと MCP を実際に入れ、**指示なしで** AI に同じ画面を作らせる。DESIGN.md を自発的に読むかを確かめる（今回は権限の都合で検証できなかった）。
- プロジェクト用 [DESIGN.md](DESIGN.md) を AGENTS.md から参照させ、ある場合とない場合で生成結果を比べる。
- `antd lint` で検出されないデザインの規則（primary の数、`style` の直書きの値）を ESLint の独自ルールで足す。

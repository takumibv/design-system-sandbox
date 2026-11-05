# CTスケジュール（Ant Design 版・白紙からの設計）

`brief/` の設計ブリーフをもとに、Ant Design v6（antd 6.7.0）で白紙から設計・実装した CTスケジュールです。あわせて、Ant Design が AI エージェント向けに用意したハーネス（CLI・スキル・MCP・DESIGN.md・llms.txt・spec・lint）が設計にどこまで効くかを調べました。

- 設計判断：[docs/design-decisions.md](docs/design-decisions.md)（前半が実装前の下書き、後半が確定版）
- 目標の自己評価：[docs/goal-evaluation.md](docs/goal-evaluation.md)
- **ハーネス調査報告（主目的）**：[docs/harness-report.md](docs/harness-report.md)
- ハーネスの実行ログ：[harness-logs/](harness-logs/README.md)
- 状態一覧：[states.json](states.json)、スクリーンショット：`screenshots/`

## 結論の要約

- **G1・G2 は 1440px・390px とも、スクロールなし・クリック 1 回**（ログイン中）で「今週の相手の確認 → ハドル開始」まで行ける。未ログインからでもクリック 2 回（ログイン → ハドル）。
- 18 状態 × 2 幅の 36 枚すべてで、axe（WCAG 2.1 AA）違反 0・横はみ出し 0。`antd lint ./src` は 0 件。
- **ハーネスが効いたのは「部品の選び分け」と「primary は 1 つ」**。通知の使い分け（message／Alert／Form 検証／Modal／Result／Empty／Skeleton）は spec の記述からほぼそのまま決まった。
- **「何を主役にし、どう置くか」はハーネスから決まらなかった。** 「今週の相手」を最上部の 1 枚のカードにする構成は、ブリーフの利用シーンと自分の判断による。ハーネスの前提（高密度の業務コンソール）とこのアプリ（数十秒の確認）が合わない部分もあった。
- **antd の既定値のままでは AA を満たさなかった**（1 回目の撮影で 36 枚すべてに対比違反。secondary 文字 3.36:1、状態色の Tag 2.2:1 など）。DESIGN.md も lint もこれを事前に教えてくれなかった。token の上書きで直した。
- この実行環境では、スキルの導入と `antd setup` が権限の都合で拒否され、AI が自発的にスキル・MCP を起動するかは検証できていない。

## 画面構成

上部のナビゲーション（組み合わせ／メンバー／自分の設定）で 3 画面を切り替えます。390px ではヘッダーを 2 段（ロゴとログイン状態／ナビゲーション）にしています。

### 組み合わせ（`/`、ホーム）

- **主役：今週のあなたの相手。** 相手のアバターと名前（見出し）、「10月5日（月） 14:00〜」、ハドルの場所（#u-kenta、2 人で共通）、画面で唯一の primary ボタン「高橋 健太さんとハドルを始める」。お休み・祝日・相手なし・未ログイン・uチャンネル未設定・不参加・初回設定未完了のときは、このカードの中身が理由と次の行動に変わる。
- **今週の組み合わせ**：全ペアを社員番号順に。自分のペアは太字＋「あなたのペア」。各行に「ハドル」。お休みの人。右上に「参加者 9 人」（メンバー画面へ）。
- **これからの予定**：次のお休み、「先の週は予定」の注記、週ごとの行（日付・「予定」または「CT なし・祝日名」・あなたの相手）。開くと全ペア。
- 1440px では左列に上 2 つ、右列に予定。390px では縦に積む。

### メンバー（`/members`）

参加・不参加・初回設定未完了の人数、社員番号順の一覧（アバター、名前、社員番号、uチャンネル、参加状態の Tag）。自分の行に「設定を変える」、他人の行に「削除」。削除は確認のモーダルで誰を消すか・元に戻せないことを示してから実行。

### 自分の設定（`/settings`）・はじめての設定（`/setup`）

名前・社員番号・uチャンネル（一覧から選ぶ）・CT に参加する（参加する／参加しない）。参加状況を変えると、保存前に「全員の組み合わせが組み直しになる」と警告。初回は同じフォームを「はじめての設定」として、目的と各項目の用途を添えて出す。

### その他

存在しないページは 404 の Result と「組み合わせに戻る」。

## 状態の開き方

すべての状態は URL の `?state=` で直接開けます（[states.json](states.json)）。

| ID | URL | 状態 |
| --- | --- | --- |
| S01 | `/?state=S01` | 今週・ログイン中（通常） |
| S02 | `/?state=S02` | 未ログイン |
| S03 | `/?state=S03` | 自分が今週お休み（id=9） |
| S04 | `/?state=S04` | 祝日の週（今週＝10月12日 スポーツの日として開く） |
| S05 | `/?state=S05` | 参加者 2 人未満 |
| S06 | `/?state=S06` | 読み込み中 |
| S07 | `/?state=S07` | 読み込み失敗 |
| S08 | `/?state=S08` | Slack ログイン失敗 |
| S09 | `/?state=S09` | 今週の相手（id=2）の uチャンネル未設定 |
| S10 | `/settings?state=S10` | 設定の保存に成功した直後 |
| S11 | `/members?state=S11` | メンバー一覧（ログイン中） |
| S12 | `/members?state=S12` | メンバー 0 人 |
| S13 | `/members?state=S13` | メンバー削除の確認中 |
| S14 | `/members?state=S14` | メンバー削除に失敗 |
| S15 | `/setup?state=S15` | 初回設定（未入力、id=11） |
| S16 | `/setup?state=S16` | 初回設定で未入力のまま送信 |
| S17 | `/settings?state=S17` | 設定の保存に失敗 |
| S18 | `/no-such-page?state=S18` | 存在しないページ |

状態を指定しないで開くと、ログイン中（id=1）として約 0.3 秒の読み込みのあと通常の画面になります。ログイン・ログアウト・削除・保存・ハドル開始は実際に操作でき、Slack への接続はせず通知だけを出します。

## 部品の対応

| 要件 | antd の部品 |
| --- | --- |
| 全体の枠・ヘッダー | Layout, Layout.Header, Layout.Content, Menu（横並び）, Dropdown（ログイン中の人のメニュー）, Grid.useBreakpoint |
| ロゴ | `<a>`＋`<img>`（別タブ、aria-label で「新しいタブで開きます」） |
| 主役カード・各セクション | Card, Typography（Title / Text / Paragraph / Link）, Flex, Row / Col |
| 人の表示 | Avatar（頭文字＋プリセット色） |
| 自分のペア・予定・CT なし・お休み・参加状態 | Tag（アイコン＋文字） |
| ハドル開始・ログイン・保存など | Button（primary は画面に 1 つ、他は default / text、削除は danger） |
| 先の週 | Collapse |
| メンバー一覧 | Listy（List は v6 で非推奨） |
| 人数 | Statistic |
| 削除の確認 | Modal |
| 設定 | Form, Input, Select（showSearch）, Radio.Group |
| 成功・軽い通知 | App.useApp の message |
| 失敗・注意・案内 | Alert |
| 読み込み中 | Skeleton |
| 読み込み失敗・404・要ログイン | Result |
| データなし | Empty |
| 日本語化・テーマ | ConfigProvider（`locale={jaJP}`、`theme.token`） |

アイコンは `@ant-design/icons`（PhoneOutlined、SlackOutlined、CoffeeOutlined など）。

## Ant Design の制約と、それへの対応

- **既定の色が AA を満たさない**：primary（#1677FF に白文字 4.10:1）、`Typography type="secondary"`（0.45 の透明度で 3.36:1）、状態色の Tag 文字（success 2.2:1 など）、`colorError`（白地 3.27:1）。ConfigProvider の token で、プリセットの濃い段（blue-7 / green-8 / gold-9 / red-7）に上書きした。状態色の seed を変えると派生する背景が濁るため、背景・枠の token は既定値に固定した。
- **見出しが大きい**：既定の h1 は 38px。主役を 1 画面目に収めるため、h1/h2/h3 を 24/20/16px に token で下げた。
- **Layout.Content / Layout.Header に余白・境界線の token が無い**：本文の最大幅・余白、ヘッダー下の線は `style` で token の値を渡した。
- **横並びの Menu は狭いと「…」に畳まれる**：390px ではヘッダーを 2 段にし、Menu を横幅いっぱいにした。
- **Modal は背面を inert にしない**：開いている間は背面の Layout に `inert` を付けた。
- **全体のリセットは別読み込み**：`antd/dist/reset.css` を読み込まないと body の既定の余白 8px が残り、Modal を開いたときに 8px の横はみ出しが起きた。
- **List は非推奨**：Listy を使った（Listy の想定は長いリストの仮想化で、短い一覧への推奨は明示されていない）。
- 自前の CSS ファイルは書いていない。`style` 属性は 19 か所（内訳と理由は design-decisions.md の 7 節）。

## 依存とサイズ

| 区分 | パッケージ |
| --- | --- |
| dependencies | antd 6.7.0、@ant-design/icons 6.3.4、react 19.3.1、react-dom 19.3.1 |
| devDependencies | @ant-design/cli 6.7.0、@google/design.md 0.4.0、@axe-core/playwright 4.14、vite 8.3、typescript 7.0、oxlint、@vitejs/plugin-react ほか |

`npm run build` の結果：JS 948.83 kB（gzip 304.33 kB）、CSS 2.98 kB（gzip 1.13 kB、`reset.css` のみ）、ロゴ 11.38 kB。コード分割はしていない（Vite が 500 kB 超の警告を出す）。node_modules は合計 359 MB（antd 61 MB、@ant-design/icons 25 MB、@ant-design/cli 29 MB）。

## 動かし方

```bash
cd antd-ct-goal
npm install
npm run dev            # http://localhost:5173/
npm run build          # 型検査＋本番ビルド
npm run lint           # oxlint
npx antd lint ./src    # Ant Design 公式の lint
npx design.md lint DESIGN.md   # このアプリの DESIGN.md の検査
```

撮影と検査（開発サーバーを起動した状態で。Playwright はプリインストール版を使う）：

```bash
APP_URL=http://localhost:5173 NODE_PATH=$(npm root -g) node scripts/capture.mjs states.json   # 撮影・axe・横はみ出し
NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs   # G1・G2 の計測
NODE_PATH=$(npm root -g) node scripts/smoke.mjs          # 操作の通り道の確認
NODE_PATH=$(npm root -g) node scripts/axe-detail.mjs "/?state=S01" 390   # 違反の詳細
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` の写しです。

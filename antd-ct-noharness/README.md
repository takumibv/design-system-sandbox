# CTスケジュール — Ant Design・ハーネスなし版（対照実験）

`brief/` のブリーフから、Ant Design v6 で白紙から設計・実装した版です。**Ant Design の AI 向けハーネス（@ant-design/cli、スキル、DESIGN.md、llms.txt、公式サイトの仕様・部品文書）は一切使っていません。** 判断材料は、ブリーフ、npm で入れたパッケージの型定義と同梱 README、自分の事前知識、共通の検査（axe・横はみ出し）だけです。ハーネスあり版と比べるための版です。

## 結論の要約

- 組み合わせ画面の最上部に「今週のあなたの相手」を置き、主ボタン「ハドルを始める」を 1 つだけ置いた。1440px／390px とも**相手の確認は操作 0 回・スクロール 0、ハドル開始はクリック 1 回**（`docs/g1g2-measure.json`）。
- ハドルは「ペアのうち社員番号が若い人の uチャンネル」で始める、と決めた（2 人が別々のチャンネルですれ違わないため）。
- 18 状態すべてを `?state=…` で直接開ける。最終的に **axe（WCAG 2.1 AA）違反 0・横はみ出し 0（36 件中 36 件）**。
- ただし **antd の既定のまま組むと、全 36 件で color-contrast 違反**（主色 #1677ff が白地で 4.1:1 など）と、Modal 表示時に 8px の横はみ出しが出た。テーマのトークン上書きと antd 同梱の `reset.css` で直した。自前の CSS ファイルは 0。
- 判断チェックリスト 30 項目の主な根拠は、ブリーフ 14、Ant Design の事前知識 12（確信度 高 8・中 4）、一般的な知識 3、検査 1。型定義は「props の有無・非推奨か」を確かめるためにだけ使った。
- 事後計測の `antd lint` の結果は `docs/post-hoc-lint.md`。

## 画面構成

| 画面 | パス | 中身 |
| --- | --- | --- |
| 組み合わせ | `/` | 今週のあなたの CT（相手・ハドル・今後の予定の要約）／未ログインならログインの誘い → 今週のペア（グリッド）→ 今後の予定（開閉） |
| メンバー | `/members` | 人数（参加・不参加・全体）→ 一覧（社員番号順、状態タグ、削除／自分の設定）→ 削除の確認ダイアログ |
| 自分の設定 | `/settings` | 名前・社員番号・uチャンネル・CT への参加。参加を変えると影響の警告 |
| 初回設定 | `/setup` | 設定と同じフォームを、初回向けの見出しと説明で |
| 404 | それ以外 | 「ページが見つかりません」＋「組み合わせへ戻る」 |

全画面共通：ヘッダー（Gaji-Labo のロゴ＝gaji.jp を別タブ、アプリ名、画面切り替え、ログイン中の人／ログインボタン）。

## 部品の対応

| 要素 | antd の部品 |
| --- | --- |
| 全体の枠 | `Layout`（Header / Content / Footer）、`ConfigProvider`（`ja_JP`、テーマのトークン）、`App`（message） |
| 画面切り替え | `Menu mode="horizontal"`（`disabledOverflow`） |
| ログイン中の人 | `Dropdown`＋`Button type="text"`＋`Avatar` |
| 今週のあなたの相手 | `Card`、`Avatar size={64}`、`Typography.Title`、`Button type="primary" size="large"`、`Descriptions` |
| uチャンネル未設定 | `Alert type="warning"` |
| 今週のペア | `Card`、`Row`/`Col`、`Badge.Ribbon`（自分のペア）、`Tag`（お休み） |
| 今後の予定 | `Collapse`、`Tag`（予定／祝日・CT なし／来週） |
| メンバー一覧 | `Statistic`、`List`（`List.Item.Meta`）、`Tag`（参加・不参加・初回設定未完了） |
| 削除の確認 | `Modal`（制御）、`Button danger`、`Alert type="error"`、`message.success` |
| 自分の設定・初回設定 | `Form`、`Input`、`Select showSearch`、`Radio.Group`、`Alert` |
| 読み込み中 | `Skeleton` |
| 失敗・空・404 | `Result`（error / 404）、`Empty`、`Alert` |

## 依存とサイズ

| パッケージ | 版 |
| --- | --- |
| antd | 6.7.0 |
| @ant-design/icons | 6.3.4 |
| react / react-dom | 19.3.1 |
| vite / @vitejs/plugin-react | 8.3.6 / 6.2.1（開発） |
| typescript | 7.0.2（開発） |
| @axe-core/playwright | 4.14.0（開発・検査用） |

- 本番ビルド（`vite build`）：JS 999 KB（gzip 約 315 KB）、CSS 3 KB（`reset.css`。部品の CSS は CSS-in-JS で JS に含まれる）。コード分割はしていない。
- `node_modules`：約 242 MB（Playwright 本体は含まない。プリインストール版を使用）。

## 動かし方

```bash
cd antd-ct-noharness
npm install
npm run dev          # http://localhost:5173
```

状態は URL で開く（一覧は `states.json`）：

| ID | URL |
| --- | --- |
| S01 | `/?state=ready` |
| S02 | `/?state=guest` |
| S03 | `/?state=rest` |
| S04 | `/?state=holiday` |
| S05 | `/?state=few` |
| S06 | `/?state=loading` |
| S07 | `/?state=load-error` |
| S08 | `/?state=login-error` |
| S09 | `/?state=no-channel` |
| S10 | `/settings?state=saved` |
| S11 | `/members?state=members` |
| S12 | `/members?state=members-empty` |
| S13 | `/members?state=delete-confirm` |
| S14 | `/members?state=delete-error` |
| S15 | `/setup?state=setup` |
| S16 | `/setup?state=setup-invalid` |
| S17 | `/settings?state=save-error` |
| S18 | `/no-such-page` |

撮影・検査・計測（dev サーバーを起動したまま）：

```bash
npm run capture                                              # screenshots/ と screenshots/report.json
NODE_PATH=$(npm root -g) node scripts/measure-g1g2.mjs       # G1・G2 の計測
```

`scripts/capture.mjs` は `brief/scripts/capture.mjs` の複製（内容は同一）。brief 側の場所から実行すると `@axe-core/playwright` を解決できないため。

## 文書

- `docs/design-decisions.md` — 目標ごとの設計判断、自前のスタイルの記録
- `docs/goal-evaluation.md` — 目標の自己評価（計測・論証・限界）
- `docs/decision-checklist.md` — 判断チェックリスト D01〜D30 と根拠の種類
- `docs/post-hoc-lint.md` — 事後計測（`antd lint`）
- `screenshots/` — 18 状態 × 1440px / 390px

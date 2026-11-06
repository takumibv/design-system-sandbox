# 事後計測：`antd lint`

実装を確定・コミット・push した**後**に、「ハーネスの検査があれば何が見つかったか」を測るためだけに実行した。**結果を見てコードは直していない。**

## 条件

- 対象コミット：`7b5a9df`（ブランチ `claude/antd-ct-noharness`。設計・実装・文書をすべてコミットした後）
- コマンド：`npx -y @ant-design/cli lint ./src`（`antd-ct-noharness/` で実行）
- @ant-design/cli：6.7.0（npx が取得した版）／antd：6.7.0
- 導入：npx で問題なく実行できた（終了コード 0）

## 結果

```
Scanned 9 files. Found 3 issues:

  ⚠ src/MembersPage.tsx:110 [deprecated]
    `List` is deprecated. List component has been deprecated. Will be removed in the next major version. Please use [Listy](/components/listy) instead. See [How do I migrate off List?](#faq-migrate-from-list).
  ⚠ src/MembersPage.tsx:126 [deprecated]
    `List` is deprecated. （同上。`List.Item`）
  ⚠ src/MembersPage.tsx:127 [deprecated]
    `List` is deprecated. （同上。`List.Item.Meta`）

Summary: 3 deprecated, 0 a11y, 0 usage, 0 performance, 0 skipped
```

| 区分 | 件数 |
| --- | --- |
| エラー | 0 |
| 警告 | 3（すべて deprecated。同じ原因：`List` の使用） |
| a11y | 0 |
| usage | 0 |
| performance | 0 |

## 読み取れること

1. **見つかったのは 1 種類だけ：`List` は v6 で非推奨（6.6.0 以降は `Listy` を使う）。** メンバー一覧（D13）に使った部品。
2. **私の判断の根拠が誤っていた。** 判断チェックリスト D13 で「List が v6 で非推奨になっていないかは型定義（`antd/es/list/index.d.ts` に `@deprecated` が無い）で確認」と書いたが、型定義に JSDoc の `@deprecated` が付いていないだけで、実行時の警告（`antd/es/list/index.js` 201 行目、開発ビルドのみ）では非推奨とされていた。
   - 事後に確かめたところ、開発サーバーのブラウザのコンソールにも `Warning: [antd: List] The List component is deprecated …` が出ていた。**実装中はコンソールを見ていなかったので気づかなかった**（ハーネスの有無とは別の、自分の確認漏れ）。
   - `node_modules/antd/es` に `listy/` があることは実装前に一覧で見ていたが、`List` の後継だとは結びつけなかった。事前知識の Ant Design（v5 まで）では `List` が標準の部品で、`Listy` は知らなかった。
3. **a11y・usage は 0 件。** ただし axe（WCAG 2.1 AA）で既定色のコントラスト違反を全状態で直した後の計測なので、「直す前のコードに lint が何を言ったか」はこの計測からはわからない。lint の a11y 規則が色のコントラストを見るものかどうかも、この結果からは判断できない。
4. つまり、ハーネスの検査があれば実装中に避けられたのは「非推奨の部品の選択」1 件。axe と横はみ出しで見つかったこと（コントラスト、reset の欠落、文中リンクの下線）は lint では出ていない（直した後なので、出たかどうかは不明）。

## 判断チェックリストへの影響（記録のみ）

- D13（メンバー一覧の部品）：「List を選び、非推奨でないことを型定義で確認」→ 実際には非推奨。根拠「型定義・README」は不十分だった。
- それ以外の D01〜D30 について、lint は何も指摘していない。

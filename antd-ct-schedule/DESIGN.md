---
version: alpha
name: CT Schedule (Ant Design)
description: Ant Design v6 の既定テーマを土台に、WCAG AA と和文表示のために最小限のトークンだけを変えた、CTスケジュール画面のデザイン言語。
colors:
  primary: '#0958D9'
  error: '#CF1322'
  warning: '#874D00'
  warning-bg: '#FFFBE6'
  info: '#0958D9'
  surface: '#FFFFFF'
  surface-layout: '#F5F5F5'
  selected: '#E6F4FF'
  on-surface: '#1F1F1F'
  on-surface-variant: '#595959'
  outline-variant: '#F0F0F0'
typography:
  page-title:
    fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  section-title:
    fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  card-title:
    fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
rounded:
  DEFAULT: 6px
  lg: 8px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
  button-danger:
    backgroundColor: '{colors.error}'
    textColor: '{colors.surface}'
    rounded: '{rounded.DEFAULT}'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 24px
  page:
    backgroundColor: '{colors.surface-layout}'
    textColor: '{colors.on-surface-variant}'
  pair-row-mine:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.on-surface}'
  tag-info:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.info}'
  tag-warning:
    backgroundColor: '{colors.warning-bg}'
    textColor: '{colors.warning}'
  divider:
    backgroundColor: '{colors.outline-variant}'
---

## Overview

月曜の CT 直前に「今週の自分の相手は誰で、どこで話せばよいか」を確かめるメンバーのための画面です。Ant Design の 4 つの価値のうち、この画面では **Certain**（今どの週・どの状態かが常に分かる）と **Meaningful**（強調は行動にだけ使う）を優先します。

この文書は Ant Design 公式の [design.md](https://ant.design/design.md) を前提に、**変えたところだけ**を書いています。書いていない値は公式のままです。

## Colors

- `primary` は公式の `#1677FF` ではなく、同じ青のパレットの 7 段目 `#0958D9` です。公式 design.md の注記（白文字 × `#1677FF` は 4.10:1 で AA 未満）に従いました。
- `error` は red-7、`warning` は gold-9 です。Tag の状態色は文字色に seed をそのまま使うため、既定の `#FAAD14` では 1.82:1 になりました。
- `warning-bg` は gold-1 を明示します。濃い seed から自動で派生する背景は `#C7C2B3` と濁るためです。
- 補足文の灰色（`rgba(0,0,0,0.45)`）は使わず、`on-surface-variant`（0.65）にそろえます。`surface-layout` の上で 3.29:1 になるためです。
- `selected` は「自分のペア」の行にだけ使います。公式 design.md の「現在地を示す唯一の合図」（Menu の選択色）と同じ役割です。
- 人ごとの色（アバター）は分類の表示なので、プリセット色の 1 段目（背景）と 8 段目（文字）を使います。

## Typography

- 和文は Noto Sans JP（400／600）をローカル配信し、公式の欧文スタックの前に置きます。公式の文書には和文フォントの記述がありません。
- 見出しはレベル（h1〜h3）と大きさを分けます。h1 = 30px、h2 = 20px、h3 = 16px。どれも公式スケールにある段です。Typography にだけ適用し、Statistic などの数字は公式の大きさのままにします。

## Layout

公式の 3 層モデルに従います。ページは `surface-layout`、内容は Card（`surface`）に載せます。本文の最大幅は `screenXL`（1200px）、PC は本文 16 列＋補足 8 列、モバイルは同じ順序で縦に積みます。

## Components

- **Button（primary）**：1 画面に 1 つ。スケジュール画面では「Slack でハドルを始める」、フォームでは保存、404 では戻る。一覧のハドルは default、表の操作は text。
- **Button（アイコンのみ）**：必ず Tooltip と aria-label を付けます。1 つのボタンにアイコンは 1 つまで。
- **Alert**：続く状態（ログイン失敗、保存失敗、入力エラー、未ログインの案内、不参加中）。消えません。
- **message**：操作の結果（保存・削除・デモ通知）。上部中央に出て自動で消えます。
- **Tag**：分類（今週、あなた、今週のお休み、祝日、設定未完了）。重大な状態には使いません。
- **Badge（status）**：参加する／参加しない。必ず文字と組み合わせます。
- **Modal**：削除の確認だけ。最初のフォーカスは「キャンセル」。

## Do's and Don'ts

- **Do** 自分のペアを、大きなアバターと 1 つの primary ボタンで主役にする。
- **Don't** 主役を目立たせるために独自の色や太い線を足さない。強調はサイズと primary ボタンだけで行う。
- **Do** 状態は色と文字の両方で伝える（「あなた」「参加する」「祝日のためお休み」）。
- **Don't** 小さい文字に `0.45` の灰色や seed の状態色をそのまま使わない。AA を満たす段を選ぶ。

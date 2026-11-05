# lint_css

- args: `{"css":"/*\n * Primer の部品とトークンで表せないレイアウトだけをここに書く。\n * - 値はすべて @primer/primitives のトークン（get_design_token_specs「raw 値を使わない」）\n * - 書いたら @primer/mcp の lint_css と stylelint（@primer/stylelint-config）で検査する\n * 何をなぜ自前で書いたかは docs/design-decisions.md「自前で書いた CSS」を参照\n */\n\n/* ページ全体と、ヘッダー／フッターの内側の幅（PageLayout xlarge と同じ幅・余白に揃える） */\n.Shell {\n  min-height: 100vh;\n  background-color: var(--bgColor-default);\n}\n\n.Inner {\n  max-width: calc(var(--breakpoint-xlarge) + var(--base-size-16) * 2);\n  padding-inline: var(--base-size-16);\n  margin-inline: auto;\n}\n\n@media (min-width: 63.25rem) {\n  .Inner {\n    max-width: calc(var(--breakpoint-xlarge) + var(--base-size-24) * 2);\n    padding-inline: var(--base-size-24);\n  }\n}\n\n/* 段落の余白は Stack の gap で管理する（BaseStyles は p の margin をリセットしない） */\n.Paragraph {\n  margin: 0;\n}\n\n.Main {\n  padding-block: var(--stack-padding-spacious);\n}\n\n.Main:focus {\n  outline: none;\n}\n\n/* スキップリンク：フォーカス時だけ表示する。Primer に単体の部品がない */\n.SkipLink {\n  position: absolute;\n  top: var(--base-size-8);\n  left: var(--base-size-8);\n  z-index: var(--zIndex-skipLink);\n  padding: var(--stack-padding-condensed);\n  font: var(--text-body-shorthand-medium);\n  color: var(--fgColor-accent);\n  background-color: var(--bgColor-default);\n  border-radius: var(--borderRadius-medium);\n  box-shadow: var(--shadow-floating-small);\n  transform: translateY(-200%);\n}\n\n.SkipLink:focus-visible {\n  transform: none;\n  outline: var(--focus-outline);\n  outline-offset: var(--outline-focus-offset);\n}\n\n/* ブランドバー（Header 部品）とサービスバー。Header の背景を全幅に敷き、中身だけ本文の幅に揃える */\n.BrandBar {\n  background-color: var(--header-bgColor);\n}\n\n.Header {\n  padding-inline: 0;\n}\n\n.NoMargin {\n  margin-inline-end: 0;\n}\n\n.Logo {\n  display: block;\n  height: var(--base-size-24);\n}\n\n.ServiceBar {\n  padding-block: var(--stack-padding-normal);\n  border-block-end: var(--borderWidth-thin) solid var(--borderColor-default);\n}\n\n.ServiceName {\n  display: inline-flex;\n  gap: var(--stack-gap-condensed);\n  align-items: center;\n  font: var(--text-title-shorthand-small);\n  color: var(--fgColor-default);\n}\n\n.UserLink {\n  display: inline-flex;\n  gap: var(--stack-gap-condensed);\n  align-items: center;\n}\n\n.Footer {\n  padding-block: var(--stack-padding-spacious);\n  margin-block-start: var(--base-size-48);\n  border-block-start: var(--borderWidth-thin) solid var(--borderColor-default);\n}\n\n/* 文字色の補助（Text に色の prop がないため） */\n.Muted {\n  color: var(--fgColor-muted);\n}\n\n.Subtle {\n  color: var(--fgColor-muted);\n}\n\n.AccentText {\n  color: var(--fgColor-accent);\n}\n\n.MinW0 {\n  min-width: 0;\n}\n\n/* 大きな数字（人数）。title 系の shorthand を使う */\n.BigNumber {\n  font: var(--text-title-shorthand-large);\n}\n\n/* 枠付きの面（カード） */\n.Box {\n  overflow: hidden;\n  border: var(--borderWidth-thin) solid var(--borderColor-default);\n  border-radius: var(--borderRadius-medium);\n}\n\n/* 主役「今週のあなたのCT」：accent の muted 面＋上の太線（原本の濃い青の上ボーダーを再現） */\n.Featured {\n  padding: var(--stack-padding-spacious);\n  background-color: var(--bgColor-accent-muted);\n  border: var(--borderWidth-thin) solid var(--borderColor-accent-muted);\n  border-block-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);\n  border-radius: var(--borderRadius-medium);\n}\n\n/* 未ログイン時の案内（Banner は 1 ページ 1 つまでのため面で表す） */\n.Prompt {\n  padding: var(--stack-padding-spacious);\n  background-color: var(--bgColor-accent-muted);\n  border-inline-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);\n  border-radius: var(--borderRadius-medium);\n}\n\n/* みんなの組み合わせ */\n.PairList {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  border-block-start: var(--borderWidth-thin) solid var(--borderColor-default);\n}\n\n.PairRow {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: var(--stack-gap-normal);\n  align-items: center;\n  padding: var(--stack-padding-normal);\n  border-block-end: var(--borderWidth-thin) solid var(--borderColor-default);\n}\n\n.PairRow[data-mine] {\n  background-color: var(--bgColor-accent-muted);\n  border-inline-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);\n}\n\n.PairMembers {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n  gap: var(--stack-gap-condensed);\n  align-items: center;\n}\n\n@media (min-width: 48rem) {\n  .PairRow {\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n}\n\n.RestRow {\n  padding: var(--stack-padding-normal);\n  background-color: var(--bgColor-muted);\n  border-radius: var(--borderRadius-medium);\n}\n\n/* メンバー一覧の人数まとめ */\n.Summary {\n  padding: var(--stack-padding-spacious);\n  background-color: var(--bgColor-accent-muted);\n  border-block-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);\n}\n\n/* メンバー表：狭い画面では表の最小幅を保ち、ScrollableRegion で横スクロールさせる */\n.TableMinWidth {\n  min-width: var(--breakpoint-small);\n}\n\n/* 自分の設定：Slack アカウント欄 */\n.Account {\n  padding: var(--stack-padding-normal);\n  background-color: var(--bgColor-muted);\n  border-radius: var(--borderRadius-medium);\n}\n\n/* イニシャルのアバター（Avatar は画像専用のため自作）。色は Logic Matrix の muted 背景＋同じ役割の前景 */\n.Avatar {\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: var(--base-size-40);\n  height: var(--base-size-40);\n  font: var(--text-body-shorthand-large);\n  color: var(--fgColor-accent);\n  background-color: var(--bgColor-accent-muted);\n  border-radius: var(--borderRadius-full);\n  border: var(--borderWidth-thick) solid var(--borderColor-default);\n}\n\n.Avatar[data-size=\"small\"] {\n  width: var(--base-size-24);\n  height: var(--base-size-24);\n  font: var(--text-caption-shorthand);\n}\n\n.Avatar[data-size=\"large\"] {\n  width: var(--base-size-48);\n  height: var(--base-size-48);\n  font: var(--text-title-shorthand-small);\n}\n\n.Avatar[data-size=\"xlarge\"] {\n  width: var(--base-size-80);\n  height: var(--base-size-80);\n  font: var(--text-title-shorthand-large);\n}\n\n.Avatar[data-color=\"green\"] {\n  color: var(--fgColor-success);\n  background-color: var(--bgColor-success-muted);\n}\n\n.Avatar[data-color=\"purple\"] {\n  color: var(--fgColor-done);\n  background-color: var(--bgColor-done-muted);\n}\n\n.Avatar[data-color=\"orange\"] {\n  color: var(--fgColor-severe);\n  background-color: var(--bgColor-severe-muted);\n}\n"}`
- isError: false
- ms: 1644
- chars: 6097

---

/*
 * Primer の部品とトークンで表せないレイアウトだけをここに書く。
 * - 値はすべて @primer/primitives のトークン（get_design_token_specs「raw 値を使わない」）
 * - 書いたら @primer/mcp の lint_css と stylelint（@primer/stylelint-config）で検査する
 * 何をなぜ自前で書いたかは docs/design-decisions.md「自前で書いた CSS」を参照
 */

/* ページ全体と、ヘッダー／フッターの内側の幅（PageLayout xlarge と同じ幅・余白に揃える） */
.Shell {
  min-height: 100vh;
  background-color: var(--bgColor-default);
}

.Inner {
  max-width: calc(var(--breakpoint-xlarge) + var(--base-size-16) * 2);
  padding-inline: var(--base-size-16);
  margin-inline: auto;
}

@media (min-width: 63.25rem) {
  .Inner {
    max-width: calc(var(--breakpoint-xlarge) + var(--base-size-24) * 2);
    padding-inline: var(--base-size-24);
  }
}

/* 段落の余白は Stack の gap で管理する（BaseStyles は p の margin をリセットしない） */
.Paragraph {
  margin: 0;
}

.Main {
  padding-block: var(--stack-padding-spacious);
}

.Main:focus {
  outline: none;
}

/* スキップリンク：フォーカス時だけ表示する。Primer に単体の部品がない */
.SkipLink {
  position: absolute;
  top: var(--base-size-8);
  left: var(--base-size-8);
  z-index: var(--zIndex-skipLink);
  padding: var(--stack-padding-condensed);
  font: var(--text-body-shorthand-medium);
  color: var(--fgColor-accent);
  background-color: var(--bgColor-default);
  border-radius: var(--borderRadius-medium);
  box-shadow: var(--shadow-floating-small);
  transform: translateY(-200%);
}

.SkipLink:focus-visible {
  transform: none;
  outline: var(--focus-outline);
  outline-offset: var(--outline-focus-offset);
}

/* ブランドバー（Header 部品）とサービスバー。Header の背景を全幅に敷き、中身だけ本文の幅に揃える */
.BrandBar {
  background-color: var(--header-bgColor);
}

.Header {
  padding-inline: 0;
}

.NoMargin {
  margin-inline-end: 0;
}

.Logo {
  display: block;
  height: var(--base-size-24);
}

.ServiceBar {
  padding-block: var(--stack-padding-normal);
  border-block-end: var(--borderWidth-thin) solid var(--borderColor-default);
}

.ServiceName {
  display: inline-flex;
  gap: var(--stack-gap-condensed);
  align-items: center;
  font: var(--text-title-shorthand-small);
  color: var(--fgColor-default);
}

.UserLink {
  display: inline-flex;
  gap: var(--stack-gap-condensed);
  align-items: center;
}

.Footer {
  padding-block: var(--stack-padding-spacious);
  margin-block-start: var(--base-size-48);
  border-block-start: var(--borderWidth-thin) solid var(--borderColor-default);
}

/* 文字色の補助（Text に色の prop がないため） */
.Muted {
  color: var(--fgColor-muted);
}

.Subtle {
  color: var(--fgColor-muted);
}

.AccentText {
  color: var(--fgColor-accent);
}

.MinW0 {
  min-width: 0;
}

/* 大きな数字（人数）。title 系の shorthand を使う */
.BigNumber {
  font: var(--text-title-shorthand-large);
}

/* 枠付きの面（カード） */
.Box {
  overflow: hidden;
  border: var(--borderWidth-thin) solid var(--borderColor-default);
  border-radius: var(--borderRadius-medium);
}

/* 主役「今週のあなたのCT」：accent の muted 面＋上の太線（原本の濃い青の上ボーダーを再現） */
.Featured {
  padding: var(--stack-padding-spacious);
  background-color: var(--bgColor-accent-muted);
  border: var(--borderWidth-thin) solid var(--borderColor-accent-muted);
  border-block-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);
  border-radius: var(--borderRadius-medium);
}

/* 未ログイン時の案内（Banner は 1 ページ 1 つまでのため面で表す） */
.Prompt {
  padding: var(--stack-padding-spacious);
  background-color: var(--bgColor-accent-muted);
  border-inline-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);
  border-radius: var(--borderRadius-medium);
}

/* みんなの組み合わせ */
.PairList {
  padding: 0;
  margin: 0;
  list-style: none;
  border-block-start: var(--borderWidth-thin) solid var(--borderColor-default);
}

.PairRow {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--stack-gap-normal);
  align-items: center;
  padding: var(--stack-padding-normal);
  border-block-end: var(--borderWidth-thin) solid var(--borderColor-default);
}

.PairRow[data-mine] {
  background-color: var(--bgColor-accent-muted);
  border-inline-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);
}

.PairMembers {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--stack-gap-condensed);
  align-items: center;
}

@media (min-width: 48rem) {
  .PairRow {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.RestRow {
  padding: var(--stack-padding-normal);
  background-color: var(--bgColor-muted);
  border-radius: var(--borderRadius-medium);
}

/* メンバー一覧の人数まとめ */
.Summary {
  padding: var(--stack-padding-spacious);
  background-color: var(--bgColor-accent-muted);
  border-block-start: var(--borderWidth-thicker) solid var(--borderColor-accent-emphasis);
}

/* メンバー表：狭い画面では表の最小幅を保ち、ScrollableRegion で横スクロールさせる */
.TableMinWidth {
  min-width: var(--breakpoint-small);
}

/* 自分の設定：Slack アカウント欄 */
.Account {
  padding: var(--stack-padding-normal);
  background-color: var(--bgColor-muted);
  border-radius: var(--borderRadius-medium);
}

/* イニシャルのアバター（Avatar は画像専用のため自作）。色は Logic Matrix の muted 背景＋同じ役割の前景 */
.Avatar {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: var(--base-size-40);
  height: var(--base-size-40);
  font: var(--text-body-shorthand-large);
  color: var(--fgColor-accent);
  background-color: var(--bgColor-accent-muted);
  border-radius: var(--borderRadius-full);
  border: var(--borderWidth-thick) solid var(--borderColor-default);
}

.Avatar[data-size="small"] {
  width: var(--base-size-24);
  height: var(--base-size-24);
  font: var(--text-caption-shorthand);
}

.Avatar[data-size="large"] {
  width: var(--base-size-48);
  height: var(--base-size-48);
  font: var(--text-title-shorthand-small);
}

.Avatar[data-size="xlarge"] {
  width: var(--base-size-80);
  height: var(--base-size-80);
  font: var(--text-title-shorthand-large);
}

.Avatar[data-color="green"] {
  color: var(--fgColor-success);
  background-color: var(--bgColor-success-muted);
}

.Avatar[data-color="purple"] {
  color: var(--fgColor-done);
  background-color: var(--bgColor-done-muted);
}

.Avatar[data-color="orange"] {
  color: var(--fgColor-severe);
  background-color: var(--bgColor-severe-muted);
}


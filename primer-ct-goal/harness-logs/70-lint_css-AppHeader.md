<!-- tool: lint_css / args: {"css":"/*\n * サイト全体のヘッダー。Primer React の Header は GitHub.com のダークなグローバルヘッダー向けで、\n * 外部サービス（Gaji-Labo）のロゴと明るい面を置く用途に合わないため、PageLayout の外に最小限の枠だけ自作した。\n * 並べ方は Stack に任せ、ここでは面の色・区切り線・余白・ロゴの高さだけを持つ。\n */\n.header {\n  background-color: var(--bgColor-default);\n  padding-block: var(--stack-padding-condensed);\n  padding-inline: var(--stack-padding-normal);\n}\n\n.logoLink {\n  display: inline-flex;\n  border-radius: var(--borderRadius-small);\n}\n\n.logoLink:focus-visible {\n  outline: var(--focus-outline);\n  outline-offset: var(--outline-focus-offset);\n}\n\n.logo {\n  display: block;\n  height: var(--base-size-20);\n  width: auto;\n}\n\n.appName {\n  font: var(--text-title-shorthand-small);\n  color: var(--fgColor-default);\n  white-space: nowrap;\n}\n\n.userName {\n  max-width: 10em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n/* 390px 幅でロゴ・アプリ名・ログイン中の人が 1 行に収まるよう、狭い幅では左右の余白を condensed にする */\n@media (max-width: 543.98px) {\n  .header {\n    padding-inline: var(--stack-padding-condensed);\n  }\n}\n"} / at: 2026-11-05T11:10:34.989Z / isError: false -->

/*
 * サイト全体のヘッダー。Primer React の Header は GitHub.com のダークなグローバルヘッダー向けで、
 * 外部サービス（Gaji-Labo）のロゴと明るい面を置く用途に合わないため、PageLayout の外に最小限の枠だけ自作した。
 * 並べ方は Stack に任せ、ここでは面の色・区切り線・余白・ロゴの高さだけを持つ。
 */
.header {
  background-color: var(--bgColor-default);
  padding-block: var(--stack-padding-condensed);
  padding-inline: var(--stack-padding-normal);
}

.logoLink {
  display: inline-flex;
  border-radius: var(--borderRadius-small);
}

.logoLink:focus-visible {
  outline: var(--focus-outline);
  outline-offset: var(--outline-focus-offset);
}

.logo {
  display: block;
  height: var(--base-size-20);
  width: auto;
}

.appName {
  font: var(--text-title-shorthand-small);
  color: var(--fgColor-default);
  white-space: nowrap;
}

.userName {
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 390px 幅でロゴ・アプリ名・ログイン中の人が 1 行に収まるよう、狭い幅では左右の余白を condensed にする */
@media (max-width: 543.98px) {
  .header {
    padding-inline: var(--stack-padding-condensed);
  }
}


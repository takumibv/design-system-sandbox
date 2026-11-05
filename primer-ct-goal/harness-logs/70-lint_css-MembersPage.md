<!-- tool: lint_css / args: {"css":"/*\n * メンバー 1 行の並び。Stack だけでは「狭い幅で状態ラベルを名前の下へ回す」2 次元の並びが作れないため grid を使う。\n * 値はすべて primitives のトークン。\n */\n.row {\n  display: grid;\n  grid-template-columns: auto 1fr auto auto;\n  grid-template-areas: 'avatar who status actions';\n  align-items: center;\n  gap: var(--stack-gap-condensed);\n}\n\n.row > :first-child {\n  grid-area: avatar;\n}\n\n.who {\n  grid-area: who;\n  min-width: 0;\n}\n\n.status {\n  grid-area: status;\n}\n\n.actions {\n  grid-area: actions;\n}\n\n@media (max-width: 543.98px) {\n  .row {\n    grid-template-columns: auto 1fr auto;\n    grid-template-areas:\n      'avatar who actions'\n      '. status status';\n  }\n}\n"} / at: 2026-11-05T11:10:39.039Z / isError: false -->

/*
 * メンバー 1 行の並び。Stack だけでは「狭い幅で状態ラベルを名前の下へ回す」2 次元の並びが作れないため grid を使う。
 * 値はすべて primitives のトークン。
 */
.row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-template-areas: 'avatar who status actions';
  align-items: center;
  gap: var(--stack-gap-condensed);
}

.row > :first-child {
  grid-area: avatar;
}

.who {
  grid-area: who;
  min-width: 0;
}

.status {
  grid-area: status;
}

.actions {
  grid-area: actions;
}

@media (max-width: 543.98px) {
  .row {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      'avatar who actions'
      '. status status';
  }
}

